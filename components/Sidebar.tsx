"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { ScrollArea } from "../components/ui/scroll-area";

const Sidebar = () => {
  const { user, role } = useAuth();

  if (!user) return null; // hide sidebar if not logged in

  return (
    <aside className="w-64 bg-white shadow-md border-r hidden md:flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Navigation</h2>
        </div>

        <nav className="flex flex-col space-y-2">
          {role === "freelancer" ? (
            <>
              <Link
                href="/dashboard/freelancer"
                className="px-3 py-2 rounded hover:bg-blue-100"
              >
                Dashboard
              </Link>
              <Link
                href="/jobs"
                className="px-3 py-2 rounded hover:bg-blue-100"
              >
                Browse Jobs
              </Link>
              <Link
                href="/tests"
                className="px-3 py-2 rounded hover:bg-blue-100"
              >
                My Tests
              </Link>
              <Link
                href="/proposals"
                className="px-3 py-2 rounded hover:bg-blue-100"
              >
                My Proposals
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard/client"
                className="px-3 py-2 rounded hover:bg-blue-100"
              >
                Dashboard
              </Link>
              <Link
                href="/jobs/create"
                className="px-3 py-2 rounded hover:bg-blue-100"
              >
                Post Job
              </Link>
              <Link
                href="/jobs"
                className="px-3 py-2 rounded hover:bg-blue-100"
              >
                Manage Jobs
              </Link>
              <Link
                href="/proposals"
                className="px-3 py-2 rounded hover:bg-blue-100"
              >
                Freelancers Applied
              </Link>
            </>
          )}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
