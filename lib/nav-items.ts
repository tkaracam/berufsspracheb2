"use client";

import {
  LayoutDashboard,
  Library,
  Search,
  Heart,
  User,
  Users,
  GraduationCap,
  FileText,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Database } from "@/types/database";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Role = Database["public"]["Enums"]["app_role"];

export interface NavItem {
  href: string;
  labelKey: keyof Dictionary["nav"];
  icon: LucideIcon;
}

function getBaseNav(): NavItem[] {
  return [
    { href: "/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
    { href: "/decks", labelKey: "decks", icon: Library },
    { href: "/suche", labelKey: "search", icon: Search },
    { href: "/favoriten", labelKey: "favorites", icon: Heart },
    { href: "/settings", labelKey: "settings", icon: Settings },
    { href: "/profil", labelKey: "profile", icon: User },
  ];
}

export function getNavItems(role: Role): NavItem[] {
  const base = getBaseNav();

  if (role === "teacher") {
    return [
      { href: "/lehrer/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
      { href: "/lehrer/klassen", labelKey: "classes", icon: Users },
      { href: "/lehrer/aufgaben", labelKey: "assignments", icon: GraduationCap },
      { href: "/suche", labelKey: "search", icon: Search },
      { href: "/profil", labelKey: "profile", icon: User },
    ];
  }

  if (role === "admin") {
    return [
      { href: "/admin/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
      { href: "/admin/benutzer", labelKey: "users", icon: Users },
      { href: "/admin/uebungen", labelKey: "exercises", icon: FileText },
      { href: "/suche", labelKey: "search", icon: Search },
      { href: "/profil", labelKey: "profile", icon: User },
    ];
  }

  if (role === "guest") {
    return [
      { href: "/", labelKey: "home", icon: LayoutDashboard },
      { href: "/suche", labelKey: "search", icon: Search },
      { href: "/login", labelKey: "login", icon: User },
    ];
  }

  return base;
}

export function getMobileNavItems(role: Role): NavItem[] {
  if (role === "guest") {
    return getNavItems("guest");
  }
  if (role === "teacher") {
    return [
      { href: "/lehrer/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
      { href: "/lehrer/klassen", labelKey: "classes", icon: Users },
      { href: "/suche", labelKey: "search", icon: Search },
      { href: "/profil", labelKey: "profile", icon: User },
    ];
  }
  if (role === "admin") {
    return [
      { href: "/admin/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
      { href: "/admin/benutzer", labelKey: "users", icon: Users },
      { href: "/suche", labelKey: "search", icon: Search },
      { href: "/profil", labelKey: "profile", icon: User },
    ];
  }
  // learner
  return [
    { href: "/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
    { href: "/decks", labelKey: "decks", icon: Library },
    { href: "/suche", labelKey: "search", icon: Search },
    { href: "/settings", labelKey: "settings", icon: Settings },
    { href: "/profil", labelKey: "profile", icon: User },
  ];
}
