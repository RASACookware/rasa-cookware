import React from "react";
import {
    Html,
    Body,
    Head,
    Heading,
    Hr,
    Container,
    Preview,
    Section,
    Text,
    Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
};

export default function ContactFormEmail({
    fullName,
    email,
    phone,
    subject,
}: ContactFormEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>New message from your website contact form</Preview>
            <Tailwind>
                <Body className="bg-gray-100 text-gray-800 font-sans">
                    <Container className="bg-white my-10 mx-auto p-8 rounded-xl shadow-md max-w-xl">
                        {/* Logo Header */}
                        <Section className="text-center mb-6">
                            <Img
                                src="https://yourdomain.com/rasa-cookware-logo.png"
                                alt="Rasa Cookware"
                                width="120"
                                className="mx-auto"
                            />
                        </Section>

                        {/* Heading */}
                        <Section>
                            <Heading className="text-2xl font-bold text-center mb-6">
                                New Contact Form Submission
                            </Heading>
                        </Section>

                        {/* Message Details */}
                        <Section className="space-y-4 text-base">
                            <Text>
                                <strong>Full Name:</strong> {fullName}
                            </Text>
                            <Text>
                                <strong>Email:</strong> {email}
                            </Text>
                            <Text>
                                <strong>Phone:</strong> {phone}
                            </Text>
                            <Hr className="my-4 border-gray-300" />
                            <Text>
                                <strong>Message:</strong>
                            </Text>
                            <Text className="text-gray-700">{subject}</Text>
                        </Section>

                        {/* Footer */}
                        <Section className="mt-10 border-t pt-4 text-xs text-gray-500 text-center">
                            <Text>
                                This message was sent from the contact form on
                                your website.
                            </Text>
                            <Text>
                                © {new Date().getFullYear()} Rasa Cookware. All
                                rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
