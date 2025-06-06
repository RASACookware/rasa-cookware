"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { toast } from "sonner";
import { sendEmail } from "../actions/send-email";
import { MapPin, Mail, Clock } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
    });

    const [errors, setErrors] = useState({
        fullName: false,
        email: false,
        phone: false,
        subject: false,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const newErrors = {
            fullName: !form.fullName.trim(),
            email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
            phone: !/^\d{10}$/.test(form.phone),
            subject: !form.subject.trim(),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(Boolean);
        if (hasErrors) {
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("fullName", form.fullName);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("subject", form.subject);

        const res = await sendEmail(formData);
        toast.loading("Submitting...", {
            id: "submit-toast",
        });
        if (res.error) {
            toast.error(res.error, {
                id: "submit-toast",
            });
            setLoading(false);
        } else {
            toast.success(
                "We have received your message, expect a response soon!",
                {
                    id: "submit-toast",
                }
            );
            setLoading(false);
            setForm({
                fullName: "",
                email: "",
                phone: "",
                subject: "",
            });
        }
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: "Address",
            details: [
                "Domineer Mettech Company",
                "Ganga Industrial Area",
                "Rajkot, Gujarat, India",
            ],
        },
        {
            icon: Mail,
            title: "Email",
            details: ["care@rasacookware.com"],
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: ["Mon - Sat: 9:00 AM - 6:00 PM"],
        },
    ];

    return (
        <div className="min-h-screen grainy">
            {/* Hero Section */}
            <section className="relative sm:h-[850px] h-[700px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1520923642038-b4259acecbd7?q=80&w=3438&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Contact Us Hero"
                        fill
                        className="object-bottom object-cover brightness-[0.4]"
                        priority
                    />
                    <div className="absolute inset-0 "></div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center items-center justify-center px-6"
                >
                    <h1 className="text-4xl md:text-6xl font-aboreto text-white drop-shadow-sm">
                        Get in Touch
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mt-4 font-cormorant text-zinc-200 drop-shadow-sm">
                        We&apos;d love to hear from you. Send us a message and
                        we&apos;ll respond as soon as possible.
                    </p>
                </motion.div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-3xl p-10 shadow-lg border border-gray-200"
                >
                    <h2 className="text-3xl font-aboreto text-gray-900 mb-6">
                        Send us a Message
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 font-cormorant text-gray-800"
                    >
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="fullName"
                                className="text-lg text-gray-700"
                            >
                                Full Name *
                            </Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                placeholder="John Doe"
                                value={form.fullName}
                                onChange={handleChange}
                                className={`h-12 border ${
                                    errors.fullName
                                        ? "border-red-600 focus:border-red-600"
                                        : "border-gray-300 focus:border-gray-900"
                                } rounded-lg`}
                            />
                            {errors.fullName && (
                                <p className="text-red-600 text-sm">
                                    Full name is required.
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-lg text-gray-700"
                            >
                                Email Address *
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                className={`h-12 border ${
                                    errors.email
                                        ? "border-red-600 focus:border-red-600"
                                        : "border-gray-300 focus:border-gray-900"
                                } rounded-lg`}
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm">
                                    Enter a valid email address.
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="phone"
                                className="text-lg text-gray-700"
                            >
                                Phone Number *
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                name="phone"
                                placeholder="(555) 123-4567"
                                value={form.phone}
                                onChange={handleChange}
                                className={`h-12 border ${
                                    errors.phone
                                        ? "border-red-600 focus:border-red-600"
                                        : "border-gray-300 focus:border-gray-900"
                                } rounded-lg`}
                            />
                            {errors.phone && (
                                <p className="text-red-600 text-sm">
                                    Enter a valid 10-digit phone number.
                                </p>
                            )}
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="subject"
                                className="text-lg text-gray-700"
                            >
                                Message *
                            </Label>
                            <Textarea
                                id="subject"
                                name="subject"
                                placeholder="Tell us how we can help you..."
                                value={form.subject}
                                onChange={handleChange}
                                rows={5}
                                className={`resize-none border ${
                                    errors.subject
                                        ? "border-red-600 focus:border-red-600"
                                        : "border-gray-300 focus:border-gray-900"
                                } rounded-lg`}
                            />
                            {errors.subject && (
                                <p className="text-red-600 text-sm">
                                    Message is required.
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-8 font-cormorant text-gray-800"
                >
                    <div>
                        <h2 className="text-3xl font-aboreto text-gray-900 mb-6">
                            Contact Information
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Have questions about our cookware? We&apos;re here
                            to help. Reach out to us through any of the
                            following channels.
                        </p>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-6">
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.6 + index * 0.1,
                                }}
                                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md border border-gray-200"
                            >
                                <div className="flex-shrink-0">
                                    <item.icon className="w-6 h-6 text-gray-900" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        {item.title}
                                    </h3>
                                    {item.details.map((detail, idx) => (
                                        <p key={idx} className="text-gray-700">
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Map Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4527.893022806989!2d70.85120855243774!3d22.146799098404973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39584bdf50335d59%3A0xe699071007cae288!2sDomineer%20Mettech%20Company!5e1!3m2!1sen!2sus!4v1749200390519!5m2!1sen!2sus"
                            width="100%"
                            height="256"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
