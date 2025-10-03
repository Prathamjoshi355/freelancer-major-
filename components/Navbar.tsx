"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";

const Navbar = () => {
  const { user, role, switchRole } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <h1 className="text-xl font-bold text-blue-600">FreelanceX</h1>
        </Link>
        {user && (
          <div className="hidden md:flex space-x-4">
            {role === "freelancer" ? (
              <>
                <Link href="/dashboard/freelancer" className="hover:text-blue-500">
                  Dashboard
                </Link>
                <Link href="/jobs" className="hover:text-blue-500">
                  Jobs
                </Link>
                <Link href="/tests" className="hover:text-blue-500">
                  My Tests
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard/client" className="hover:text-blue-500">
                  Dashboard
                </Link>
                <Link href="/jobs/create" className="hover:text-blue-500">
                  Post Job
                </Link>
                <Link href="/proposals" className="hover:text-blue-500">
                  Proposals
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600">Hello, {user.name}</span>
            <Button variant="outline" size="sm" onClick={switchRole}>
              Switch to {role === "freelancer" ? "Client" : "Freelancer"}
            </Button>
          </>
        ) : (
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
