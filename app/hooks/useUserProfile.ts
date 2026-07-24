"use client";

import { useState, useEffect } from "react";

export type UserProfile = {
  name: string;
  avatar: string;
  totalQuizzesTaken: number;
  totalCorrectAnswers: number;
  streakDays: number;
};

const DEFAULT_PROFILE: UserProfile = {
  name: "Math Explorer",
  avatar: "🎓",
  totalQuizzesTaken: 0,
  totalCorrectAnswers: 0,
  streakDays: 1,
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    const saved = localStorage.getItem("frankinstant_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    }
  }, []);

  const updateStats = (correctCount: number) => {
    setProfile((prev) => {
      const updated = {
        ...prev,
        totalQuizzesTaken: prev.totalQuizzesTaken + 1,
        totalCorrectAnswers: prev.totalCorrectAnswers + correctCount,
      };
      localStorage.setItem("frankinstant_profile", JSON.stringify(updated));
      return updated;
    });
  };

  const updateProfileDetails = (newName: string, newAvatar: string) => {
    setProfile((prev) => {
      const updated = { ...prev, name: newName, avatar: newAvatar };
      localStorage.setItem("frankinstant_profile", JSON.stringify(updated));
      return updated;
    });
  };

  return { profile, updateStats, updateProfileDetails };
}