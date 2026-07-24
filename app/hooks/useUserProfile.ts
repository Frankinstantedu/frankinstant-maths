"use client";

import { useState, useEffect } from "react";

export type YearStats = {
  quizzesTaken?: number;
  correctAnswers?: number;
  correct?: number;
  total?: number;
};

export type UserProfile = {
  name: string;
  avatar: string;
  streakDays: number;
  streak?: number;
  pin?: string;
  totalCorrect?: number;
  totalQuizzes?: number;
  years: {
    [key: string]: YearStats;
  };
};

const DEFAULT_PROFILE: UserProfile = {
  name: "Math Explorer",
  avatar: "🎓",
  streakDays: 1,
  years: {},
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

  const updateProfileDetails = (newName: string, newAvatar: string) => {
    setProfile((prev) => {
      const updated = { ...prev, name: newName, avatar: newAvatar };
      localStorage.setItem("frankinstant_profile", JSON.stringify(updated));
      return updated;
    });
  };

  return { profile, updateProfileDetails };
}