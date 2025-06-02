"use server";
import React from "react";
import { Resend } from "resend";
import { getErrorMessage, validateString } from "@/lib/utils";
import ContactFormEmail from "@/src/email/contact-form-template";

const resendAPIKey = process.env.RESEND_API_KEY as string;
if (!resendAPIKey) {
    throw new Error("Resend API Key is not set in environment variables");
}

const resend = new Resend(resendAPIKey);
const receiverEmail = process.env.CONTACT_FORM_RECEIVER_EMAIL as string;
if (!receiverEmail) {
    throw new Error("Receiver is not set in environment variables");
}

export const sendEmail = async (formData: FormData) => {
    const fullName = formData.get("fullName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const subject = formData.get("subject")?.toString() || "";

    // Basic validation
    const newErrors = {
        fullName: !validateString(fullName, 100),
        email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        phone: !/^\d{10}$/.test(phone),
        subject: !validateString(subject, 10000),
    };

    if (Object.values(newErrors).some(Boolean)) {
        return {
            error: "Validation failed. Please check your input.",
        };
    }

    try {
        const data = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: receiverEmail,
            subject: `New contact form submission from ${fullName}`,
            replyTo: email,
            react: React.createElement(ContactFormEmail, {
                fullName,
                email,
                phone,
                subject,
            }),
        });
        return { data };
    } catch (error: unknown) {
        return {
            error: getErrorMessage(error),
        };
    }
};
