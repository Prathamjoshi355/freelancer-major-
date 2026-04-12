"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";

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
              <Link href="/dashboard" className="px-3 py-2 rounded hover:bg-blue-100">
                Dashboard
              </Link>
              <Link href="/jobs" className="px-3 py-2 rounded hover:bg-blue-100">
                Browse Jobs
              </Link>
              <Link href="/freelancer/skills" className="px-3 py-2 rounded hover:bg-blue-100">
                Skills
              </Link>
              <Link href="/contracts" className="px-3 py-2 rounded hover:bg-blue-100">
                Contracts
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="px-3 py-2 rounded hover:bg-blue-100">
                Dashboard
              </Link>
              <Link href="/client/post-job" className="px-3 py-2 rounded hover:bg-blue-100">
                Post Job
              </Link>
              <Link href="/client/jobs" className="px-3 py-2 rounded hover:bg-blue-100">
                Manage Jobs
              </Link>
              <Link href="/contracts" className="px-3 py-2 rounded hover:bg-blue-100">
                Contracts
              </Link>
            </>
          )}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
