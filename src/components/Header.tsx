"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 bg-opacity-90 border-b flex justify-between items-center p-4 h-16">
      <Link
        href="/"
        className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-500 transition-all duration-500 text-lg"
      >
        Event App
      </Link>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-white hover:text-[#d1c4e9] font-medium">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-white text-[#6c47ff] hover:bg-[#ede9fe] rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link
            href="/dashboard"
            className="text-white hover:text-[#d1c4e9] font-medium"
          >
            Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
