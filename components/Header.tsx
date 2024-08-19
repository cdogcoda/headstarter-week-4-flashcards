"use client"

import { SignedOut } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header () {
    return (
        <header className="w-full bg-blue-800 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-extrabold">FlashMind ⚡</h1>
                <div className="flex gap-4">
                    <SignedOut>
                        <Link href="/sign-in">Login</Link>
                        <Link href="/sign-up">Sign Up</Link>
                    </SignedOut>
                    <div className="scale-125"><UserButton/></div>
                </div>
            </div>
        </header>
    )
}