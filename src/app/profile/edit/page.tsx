"use client";

import { useState, useEffect } from "react";
import { EditProfileForm }from "@/components/profile/edit-profile-form";

interface BackendUserData {
  userType: "client" | "freelancer";
  name: string;
  email: string;
}

export default function EditProfilePage() {
  const [userData, setUserData] = useState<BackendUserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user", { credentials: "include" }); // ✅ backend should return user info
        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading profile...</p>;
  }

  if (!userData) {
    return <p className="text-center py-20 text-red-500">Unable to load user data.</p>;
  }

  return (
    <EditProfileForm
      userType={userData.userType}
      backendData={{ name: userData.name, email: userData.email }}
    />
  );
}
