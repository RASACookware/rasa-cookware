/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function ProfilePage() {
    const [admin, setAdmin] = useState<{
        fullName: string;
        email: string;
    } | null>(null);
    const [loadingAdmin, setLoadingAdmin] = useState(true);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const passwordsMatch =
        newPassword === confirmPassword || confirmPassword === "";

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await fetch("/api/admin/get");
                const data = await res.json();

                if (data?.admin) {
                    setAdmin(data.admin);
                } else {
                    toast.error("Failed to load profile.");
                }
            } catch (err: any) {
                toast.error(
                    err.message ||
                        "Something went wrong while fetching admin data."
                );
            } finally {
                setLoadingAdmin(false);
            }
        };

        fetchAdmin();
    }, []);

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters.");
            return;
        }

        setChangingPassword(true);

        try {
            const res = await fetch("/api/admin/auth/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();

            if (data?.message === "success") {
                toast.success("Password changed successfully.");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(data?.error || "Failed to change password.");
            }
        } catch (err) {
            toast.error("Something went wrong." + (err as Error).message);
        } finally {
            setChangingPassword(false);
        }
    };

    const renderPasswordField = (
        id: string,
        label: string,
        value: string,
        onChange: (val: string) => void,
        show: boolean,
        setShow: (val: boolean) => void
    ) => (
        <div className="space-y-1">
            <Label
                htmlFor={id}
                className="block mb-1 text-gray-700 font-medium text-sm"
            >
                {label}
            </Label>
            <div className="relative">
                <Input
                    id={id}
                    type={show ? "text" : "password"}
                    placeholder={label}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pr-10 bg-white border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    aria-label={show ? `Hide ${label}` : `Show ${label}`}
                >
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto md:mt-10 p-6 md:bg-white md:rounded-lg md:shadow-md">
            <h1 className="text-3xl font-semibold mb-6 text-gray-900">
                Admin Profile
            </h1>

            {loadingAdmin ? (
                <div className="flex items-center justify-center h-40">
                    <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                </div>
            ) : admin ? (
                <div className="space-y-3">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">
                            Full Name
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {admin.fullName}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">
                            Email
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {admin.email}
                        </p>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                        Change Password
                    </h2>
                    <div className="space-y-5">
                        {renderPasswordField(
                            "currentPassword",
                            "Current Password",
                            currentPassword,
                            setCurrentPassword,
                            showCurrent,
                            setShowCurrent
                        )}
                        {renderPasswordField(
                            "newPassword",
                            "New Password",
                            newPassword,
                            setNewPassword,
                            showNew,
                            setShowNew
                        )}
                        {renderPasswordField(
                            "confirmPassword",
                            "Confirm New Password",
                            confirmPassword,
                            setConfirmPassword,
                            showConfirm,
                            setShowConfirm
                        )}
                        {!passwordsMatch && (
                            <p className="text-sm text-red-600 -mt-2 font-medium">
                                New passwords do not match.
                            </p>
                        )}
                        <Button
                            onClick={handleChangePassword}
                            disabled={changingPassword}
                            className="mt-6 w-full"
                        >
                            {changingPassword ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    Changing...
                                </>
                            ) : (
                                "Change Password"
                            )}
                        </Button>
                    </div>
                </div>
            ) : (
                <p className="text-red-600 font-medium">
                    Unable to load admin data.
                </p>
            )}
        </div>
    );
}
