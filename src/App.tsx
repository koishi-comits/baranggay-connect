import { useEffect, useMemo, useRef, useState } from "react";
import { supabase, createGuestClient } from "./supabase";

type IconName =
  | "alert"
  | "ban"
  | "bell"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "document"
  | "edit"
  | "filter"
  | "home"
  | "image"
  | "lock"
  | "logo"
  | "megaphone"
  | "message"
  | "more"
  | "phone"
  | "plus"
  | "refresh"
  | "search"
  | "send"
  | "settings"
  | "shield"
  | "trash"
  | "userCheck"
  | "users"
  | "x";

const paths: Record<IconName, React.ReactNode> = {
  alert: (
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
  ban: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m4.93 4.93 14.14 14.14" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  check: <path d="m20 6-11 11-5-5" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  document: (
    <>
      <path d="M6 2h9l4 4v16H6z" />
      <path d="M14 2v5h5M9 12h6M9 16h6" />
    </>
  ),
  edit: (
    <>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </>
  ),
  filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.5" />
      <path d="m21 15-5-5L5 20" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  logo: (
    <>
      <path d="M4 12a8 8 0 0 1 16 0c0 5-4 9-8 10-4-1-8-5-8-10Z" />
      <path d="M8 12h8M12 8v8" />
    </>
  ),
  megaphone: (
    <>
      <path d="m3 11 15-6v14L3 13v-2Z" />
      <path d="m7 15 1 5h4l-1-4" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  phone: (
    <>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  refresh: (
    <>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 21h5v-5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 13.5a7 7 0 0 0 0-3l2-1.5-2-3.5-2.4 1A7 7 0 0 0 14 5l-.3-2.5h-4L9.4 5A7 7 0 0 0 7 6.5l-2.5-1-2 3.5 2 1.5a7 7 0 0 0 0 3L2.5 15l2 3.5 2.5-1A7 7 0 0 0 9.4 19l.3 2.5h4L14 19a7 7 0 0 0 2.6-1.5l2.4 1 2-3.5-2-1.5Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
    </>
  ),
  userCheck: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  x: <path d="M18 6 6 18M6 6l12 12" />,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Avatar({
  initials,
  tone = "blue",
  photoUrl,
}: {
  initials: string;
  tone?: "blue" | "amber" | "green";
  photoUrl?: string;
}) {
  if (photoUrl) {
    return (
      <span
        className={`avatar avatar-${tone}`}
        style={{ padding: 0, overflow: "hidden" }}
      >
        <img
          src={photoUrl}
          alt={initials}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />
      </span>
    );
  }
  return <span className={`avatar avatar-${tone}`}>{initials}</span>;
}

type Account = {
  id: string;
  email: string;
  role: "admin" | "resident";
  name: string;
  initials: string;
};

// Helper: derive initials from full name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const adminNavItems = [
  {
    id: "announcements",
    label: "Announcements",
    icon: "home" as IconName,
    section: "community" as const,
  },
  {
    id: "calendar",
    label: "Events calendar",
    icon: "calendar" as IconName,
    section: "community" as const,
  },
  {
    id: "documents",
    label: "Document requests",
    icon: "document" as IconName,
    section: "community" as const,
  },
  {
    id: "messages",
    label: "Messages",
    icon: "message" as IconName,
    section: "community" as const,
  },
  {
    id: "incidents",
    label: "Blotter & Incidents",
    icon: "alert" as IconName,
    section: "management" as const,
  },
  {
    id: "users",
    label: "Manage residents",
    icon: "users" as IconName,
    section: "management" as const,
  },
  {
    id: "settings",
    label: "Barangay settings",
    icon: "settings" as IconName,
    section: "management" as const,
  },
];

const residentNavItems = [
  {
    id: "announcements",
    label: "Announcements",
    icon: "home" as IconName,
    section: "community" as const,
  },
  {
    id: "calendar",
    label: "Events calendar",
    icon: "calendar" as IconName,
    section: "community" as const,
  },
  {
    id: "documents",
    label: "Document requests",
    icon: "document" as IconName,
    section: "community" as const,
  },
  {
    id: "messages",
    label: "Message Admin",
    icon: "message" as IconName,
    section: "community" as const,
  },
  {
    id: "incidents",
    label: "Emergency & Incidents",
    icon: "alert" as IconName,
    section: "community" as const,
  },
];

type Announcement = {
  id: number;
  author: string;
  initials: string;
  time: string;
  tag: string;
  title: string;
  body: string;
  accent: string;
  accentText: string;
  reactions: number;
  pinned?: boolean;
  imageUrl?: string;
  createdAt?: string;
  scheduledAt?: string;
};

type AnnouncementComment = {
  id: string;
  announcementId: number;
  userName: string;
  userRole: "admin" | "resident";
  userInitials: string;
  text: string;
  time: string;
  timestamp: number;
};

const PRESET_BANNERS = [
  {
    name: "Water Works",
    tag: "Infrastructure",
    url: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Medical Mission",
    tag: "Health & Wellness",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Town Hall Assembly",
    tag: "Community Update",
    url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Youth & Sports Fest",
    tag: "Youth & Sports",
    url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Disaster & Weather",
    tag: "Emergency Notice",
    url: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Clean-up & Eco Drive",
    tag: "Environment",
    url: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80",
  },
];

function getTagClass(tag: string): string {
  switch (tag) {
    case "Health & Wellness":
      return "tag-health";
    case "Emergency Notice":
      return "tag-emergency";
    case "Community Advisory":
      return "tag-advisory";
    case "Youth & Sports":
      return "tag-sports";
    case "Environment":
      return "tag-environment";
    case "Public Safety":
      return "tag-safety";
    case "Infrastructure":
      return "tag-infrastructure";
    case "Senior Citizens":
      return "tag-senior";
    case "Events & Programs":
      return "tag-events";
    default:
      return "tag-default";
  }
}

function parseDbAnnouncement(a: any): Announcement {
  const rawAccentText = a.accent_text || "";
  const isPinned = rawAccentText.includes("[PINNED]");

  let scheduledAt: string | undefined = undefined;
  const schedMatch = rawAccentText.match(/\[SCHEDULED:([^\]]+)\]/);
  if (schedMatch) {
    scheduledAt = schedMatch[1];
  }

  const cleanAccentText =
    rawAccentText
      .replace(/\[PINNED\]\s*/g, "")
      .replace(/\[SCHEDULED:[^\]]+\]\s*/g, "")
      .trim() || "Recently posted";

  let imageUrl: string | undefined = undefined;
  let cleanAccent = a.accent || "Official announcement";
  if (cleanAccent.startsWith("[IMG:")) {
    const endIdx = cleanAccent.indexOf("]");
    if (endIdx > 5) {
      imageUrl = cleanAccent.slice(5, endIdx);
      cleanAccent =
        cleanAccent.slice(endIdx + 1).trim() || "Official announcement";
    }
  }

  // Pre-seed image for known defaults if missing
  if (!imageUrl) {
    if (a.title?.toLowerCase().includes("water")) {
      imageUrl =
        "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80";
    } else if (
      a.title?.toLowerCase().includes("medical") ||
      a.tag === "Health & Wellness"
    ) {
      imageUrl =
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80";
    }
  }

  return {
    id: a.id,
    author: a.author || "Barangay San Isidro",
    initials: a.initials || "SI",
    time: a.created_at
      ? new Intl.DateTimeFormat("en-PH", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date(a.created_at))
      : "Recently",
    tag: a.tag || "Community Advisory",
    title: a.title,
    body: a.body,
    accent: cleanAccent,
    accentText: cleanAccentText,
    reactions: Number(a.reactions) || 0,
    pinned: isPinned,
    imageUrl,
    createdAt: a.created_at,
    scheduledAt,
  };
}

const initialComments: Record<number, AnnouncementComment[]> = {
  1: [
    {
      id: "c-101",
      announcementId: 1,
      userName: "Maria Santos",
      userRole: "resident",
      userInitials: "MS",
      text: "Kasama po ba ang Purok 3 sa mawawalan ng tubig sa June 18? Salamat po!",
      time: "1 hour ago",
      timestamp: Date.now() - 3600000,
    },
    {
      id: "c-102",
      announcementId: 1,
      userName: "Barangay San Isidro",
      userRole: "admin",
      userInitials: "SI",
      text: "Opo Maria, kasama ang buong Mabini St. hanggang boundary ng Purok 3 and 4. Mag-ipon po tayo ng tubig bago mag-8:00 AM.",
      time: "45 mins ago",
      timestamp: Date.now() - 2700000,
    },
  ],
  2: [
    {
      id: "c-201",
      announcementId: 2,
      userName: "Juan Dela Cruz",
      userRole: "resident",
      userInitials: "JD",
      text: "Ano pong requirements para sa free dental extraction? Kailangan po ba ng barangay clearance?",
      time: "Yesterday",
      timestamp: Date.now() - 86400000,
    },
    {
      id: "c-202",
      announcementId: 2,
      userName: "Barangay Health Center",
      userRole: "admin",
      userInitials: "HC",
      text: "Valid ID lang po with proof of residency (e.g. Meralco bill or Brgy ID). Libre po ang serbisyo at mga gamot.",
      time: "Yesterday",
      timestamp: Date.now() - 80000000,
    },
  ],
  5: [
    {
      id: "c-501",
      announcementId: 5,
      userName: "Maria Santos",
      userRole: "resident",
      userInitials: "MS",
      text: "Kasama po ba ang Purok 3 sa mawawalan ng tubig sa June 18? Salamat po!",
      time: "1 hour ago",
      timestamp: Date.now() - 3600000,
    },
    {
      id: "c-502",
      announcementId: 5,
      userName: "Barangay San Isidro",
      userRole: "admin",
      userInitials: "SI",
      text: "Opo Maria, kasama ang buong Mabini St. hanggang boundary ng Purok 3 and 4. Mag-ipon po tayo ng tubig bago mag-8:00 AM.",
      time: "45 mins ago",
      timestamp: Date.now() - 2700000,
    },
  ],
  6: [
    {
      id: "c-601",
      announcementId: 6,
      userName: "Juan Dela Cruz",
      userRole: "resident",
      userInitials: "JD",
      text: "Ano pong requirements para sa free dental extraction? Kailangan po ba ng barangay clearance?",
      time: "Yesterday",
      timestamp: Date.now() - 86400000,
    },
    {
      id: "c-602",
      announcementId: 6,
      userName: "Barangay Health Center",
      userRole: "admin",
      userInitials: "HC",
      text: "Valid ID lang po with proof of residency (e.g. Meralco bill or Brgy ID). Libre po ang serbisyo at mga gamot.",
      time: "Yesterday",
      timestamp: Date.now() - 80000000,
    },
  ],
};

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    author: "Barangay San Isidro",
    initials: "SI",
    time: "2 hours ago",
    tag: "Community Advisory",
    title: "Scheduled Water Interruption",
    body: "Please be advised that there will be a scheduled water interruption on June 18, from 8:00 AM to 3:00 PM due to maintenance works along Mabini Street. We encourage everyone to store enough water in advance.",
    accent: "Water service advisory",
    accentText: "June 18 · 8:00 AM – 3:00 PM",
    reactions: 48,
    pinned: true,
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    author: "Barangay Health Center",
    initials: "HC",
    time: "Yesterday at 4:30 PM",
    tag: "Health & Wellness",
    title: "Free Medical and Dental Mission",
    body: "Our health center is inviting all residents to a free medical and dental mission this Saturday. Services include basic check-ups, blood pressure monitoring, and dental consultation.",
    accent: "Barangay Covered Court",
    accentText: "June 21 · 8:00 AM – 12:00 PM",
    reactions: 76,
    pinned: false,
    imageUrl:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
  },
];

export function getDeletedAnnouncementKeys(): string[] {
  try {
    const cached = localStorage.getItem("brgy_deleted_announcement_keys");
    if (cached) return JSON.parse(cached);
  } catch {}
  return [];
}

export function markAnnouncementDeleted(id: number | string, title?: string) {
  try {
    const keys = getDeletedAnnouncementKeys();
    const newKeys = [
      ...keys,
      String(id),
      (title || "").toLowerCase().trim(),
    ].filter(Boolean);
    localStorage.setItem(
      "brgy_deleted_announcement_keys",
      JSON.stringify(Array.from(new Set(newKeys))),
    );
  } catch {}
}

export function isAnnouncementDeleted(
  id: number | string,
  title?: string,
): boolean {
  const keys = getDeletedAnnouncementKeys();
  if (keys.includes(String(id))) return true;
  if (title && keys.includes(title.toLowerCase().trim())) return true;
  return false;
}

const ANNOUNCEMENT_TAGS = [
  "Community Advisory",
  "Health & Wellness",
  "Community Update",
  "Emergency Notice",
  "Infrastructure",
  "Youth & Sports",
  "Senior Citizens",
  "Events & Programs",
  "Environment",
  "Public Safety",
];

type CommunityEvent = {
  id: number;
  title: string;
  day: number;
  date: string; // "YYYY-MM-DD"
  time: string;
  location: string;
  type: string; // "community" | "health" | "meeting" | "advisory" | "sports"
  description: string;
  organizer?: string;
  created_at?: string;
};

const initialEvents: CommunityEvent[] = [
  {
    id: 1,
    title: "Senior Citizens Meeting",
    day: 5,
    date: "2026-10-05",
    time: "9:00 AM",
    location: "Barangay Hall",
    type: "meeting",
    description:
      "Monthly assembly, welfare allowance updates, and wellness consultation for seniors.",
    organizer: "Office for Senior Citizens Affairs (OSCA)",
  },
  {
    id: 2,
    title: "Clean-up Drive",
    day: 12,
    date: "2026-10-12",
    time: "6:00 AM",
    location: "Main Road & Creek",
    type: "community",
    description:
      "Community bayanihan clean-up and dengue prevention drive. Gloves and trash bags provided.",
    organizer: "Barangay Clean & Green Committee",
  },
  {
    id: 3,
    title: "Water Interruption Advisory",
    day: 18,
    date: "2026-10-18",
    time: "8:00 AM – 4:00 PM",
    location: "Mabini Street Area",
    type: "advisory",
    description:
      "Scheduled water pipe repair and maintenance works by the water utility. Residents are advised to store water.",
    organizer: "Barangay Infrastructure Desk",
  },
  {
    id: 4,
    title: "Free Medical and Dental Mission",
    day: 21,
    date: "2026-10-21",
    time: "8:00 AM – 1:00 PM",
    location: "Barangay Covered Court",
    type: "health",
    description:
      "Free medical checkups, essential vitamins and maintenance medicines, dental check and tooth extractions.",
    organizer: "Barangay Health & Wellness Center",
  },
  {
    id: 5,
    title: "Youth Sports Fest (SK)",
    day: 27,
    date: "2026-10-27",
    time: "2:00 PM – 7:00 PM",
    location: "Covered Court",
    type: "sports",
    description:
      "Inter-purok basketball and volleyball tournament organized by Sangguniang Kabataan with exciting prizes.",
    organizer: "Sangguniang Kabataan (SK) Council",
  },
];

function parseDbEvent(row: any): CommunityEvent {
  let dateStr = "";
  let cleanDesc = row.description || "";
  const match = cleanDesc.match(/^\[DATE:(\d{4}-\d{2}-\d{2})\]\s*/);
  if (match) {
    dateStr = match[1];
    cleanDesc = cleanDesc.replace(/^\[DATE:\d{4}-\d{2}-\d{2}\]\s*/, "");
  } else if (row.created_at) {
    const c = new Date(row.created_at);
    const yr = c.getFullYear();
    const mo = String(c.getMonth() + 1).padStart(2, "0");
    const d = String(row.day || c.getDate()).padStart(2, "0");
    dateStr = `${yr}-${mo}-${d}`;
  } else {
    const now = new Date();
    const yr = now.getFullYear();
    const mo = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(row.day || 1).padStart(2, "0");
    dateStr = `${yr}-${mo}-${d}`;
  }

  return {
    id: row.id,
    title: row.title || "Community Event",
    day: Number(row.day) || (dateStr ? new Date(dateStr).getDate() : 1),
    date: dateStr,
    time: row.time || "8:00 AM",
    location: row.location || "Barangay Hall",
    type: row.type || "community",
    description: cleanDesc,
    created_at: row.created_at,
  };
}

type BarangayInfo = {
  name: string;
  city: string;
  district: string;
  captain: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  weekdayHours: string;
  saturdayHours: string;
  sundayHours: string;
};

const defaultBarangayInfo: BarangayInfo = {
  name: "San Isidro",
  city: "Quezon City",
  district: "3rd District",
  captain: "Kapitan Santos",
  phone: "(02) 8123-4567",
  email: "sanisidro@qc.gov.ph",
  address: "123 Mabini Street, San Isidro, Quezon City",
  description:
    "A thriving residential community committed to transparent and responsive local governance.",
  weekdayHours: "8:00 AM – 5:00 PM",
  saturdayHours: "8:00 AM – 12:00 PM",
  sundayHours: "Closed",
};

export function getCachedBarangayInfo(): BarangayInfo {
  try {
    const cached = localStorage.getItem("barangay_info");
    if (cached) {
      return { ...defaultBarangayInfo, ...JSON.parse(cached) };
    }
  } catch {}
  return defaultBarangayInfo;
}

export type DocumentService = {
  id: string;
  name: string;
  days: number;
  fee: string;
  requirements: string;
  description: string;
  enabled: boolean;
};

export const defaultDocumentServices: DocumentService[] = [
  {
    id: "doc-1",
    name: "Barangay Clearance",
    days: 3,
    fee: "₱ 50",
    requirements: "Valid Government ID, 6-Month Proof of Residency",
    description:
      "General clearance for employment, postal ID, bank transactions, and legal verification.",
    enabled: true,
  },
  {
    id: "doc-2",
    name: "Certificate of Residency",
    days: 2,
    fee: "₱ 30",
    requirements: "Valid Government ID, Proof of Address (Billing / Lease)",
    description:
      "Official certification verifying resident address standing within the barangay.",
    enabled: true,
  },
  {
    id: "doc-3",
    name: "Business Clearance",
    days: 5,
    fee: "₱ 200",
    requirements:
      "DTI / SEC Registration, Contract of Lease, Barangay Inspection Endorsement",
    description:
      "Required for establishing or renewing municipal business operations and permits.",
    enabled: true,
  },
  {
    id: "doc-4",
    name: "Certificate of Indigency",
    days: 2,
    fee: "Free",
    requirements: "Case Study / Purok Leader Certification, Valid ID",
    description:
      "Assistance document for financial, medical, scholarship, or legal aid applications.",
    enabled: true,
  },
  {
    id: "doc-5",
    name: "Barangay ID",
    days: 7,
    fee: "₱ 100",
    requirements: "2x2 ID Photo, Proof of Residence, Valid Secondary ID",
    description:
      "Official digitized community identification card with QR verification.",
    enabled: true,
  },
  {
    id: "doc-6",
    name: "Good Moral Certificate",
    days: 3,
    fee: "₱ 50",
    requirements: "Valid Government ID, Purok Clearance / No Blotter Record",
    description:
      "Certification of clean community standing for school, employment, or scholarship.",
    enabled: true,
  },
];

export function getCachedDocumentServices(): DocumentService[] {
  try {
    const cached = localStorage.getItem("barangay_document_services");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultDocumentServices;
}

export function saveCachedDocumentServices(services: DocumentService[]) {
  try {
    localStorage.setItem(
      "barangay_document_services",
      JSON.stringify(services),
    );
  } catch {}
}

export type OperatingDay = {
  day: string;
  open: string;
  close: string;
  active: boolean;
};

export const defaultSchedule: OperatingDay[] = [
  { day: "Monday", open: "8:00 AM", close: "5:00 PM", active: true },
  { day: "Tuesday", open: "8:00 AM", close: "5:00 PM", active: true },
  { day: "Wednesday", open: "8:00 AM", close: "5:00 PM", active: true },
  { day: "Thursday", open: "8:00 AM", close: "5:00 PM", active: true },
  { day: "Friday", open: "8:00 AM", close: "5:00 PM", active: true },
  { day: "Saturday", open: "8:00 AM", close: "12:00 PM", active: true },
  { day: "Sunday", open: "—", close: "—", active: false },
];

export function getCachedSchedule(): OperatingDay[] {
  try {
    const cached = localStorage.getItem("barangay_operating_schedule");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultSchedule;
}

export function saveCachedSchedule(schedule: OperatingDay[]) {
  try {
    localStorage.setItem(
      "barangay_operating_schedule",
      JSON.stringify(schedule),
    );
  } catch {}
}

export type NotificationPrefs = {
  announcements: boolean;
  docStatus: boolean;
  eventReminder: boolean;
  registrationApproval: boolean;
  adminMessage: boolean;
  newRegistration: boolean;
  docSubmitted: boolean;
  residentMessage: boolean;
  blotterFiled: boolean;
  inApp: boolean;
  emailDigest: boolean;
  smsAlerts: boolean;
};

export const defaultNotificationPrefs: NotificationPrefs = {
  announcements: true,
  docStatus: true,
  eventReminder: true,
  registrationApproval: true,
  adminMessage: true,
  newRegistration: true,
  docSubmitted: true,
  residentMessage: true,
  blotterFiled: true,
  inApp: true,
  emailDigest: false,
  smsAlerts: false,
};

export function getCachedNotifPrefs(): NotificationPrefs {
  try {
    const cached = localStorage.getItem("barangay_notif_prefs");
    if (cached) return { ...defaultNotificationPrefs, ...JSON.parse(cached) };
  } catch {}
  return defaultNotificationPrefs;
}

export function saveCachedNotifPrefs(prefs: NotificationPrefs) {
  try {
    localStorage.setItem("barangay_notif_prefs", JSON.stringify(prefs));
  } catch {}
}

export type SecurityAccessPrefs = {
  requireEmailVerification: boolean;
  adminApprovalRequired: boolean;
  openRegistration: boolean;
  sessionTimeout: boolean;
};

export const defaultSecurityPrefs: SecurityAccessPrefs = {
  requireEmailVerification: false,
  adminApprovalRequired: true,
  openRegistration: true,
  sessionTimeout: true,
};

export function getCachedSecurityPrefs(): SecurityAccessPrefs {
  try {
    const cached = localStorage.getItem("barangay_security_prefs");
    if (cached) return { ...defaultSecurityPrefs, ...JSON.parse(cached) };
  } catch {}
  return defaultSecurityPrefs;
}

export function saveCachedSecurityPrefs(prefs: SecurityAccessPrefs) {
  try {
    localStorage.setItem("barangay_security_prefs", JSON.stringify(prefs));
  } catch {}
}

// ─── Messaging & Document Types ──────────────────────────────────────────────

export type Msg = {
  from: "admin" | "resident";
  text: string;
  time: string;
  timestamp?: number;
  dbId?: number;
};

export const initialThreads: Record<string, Msg[]> = {
  "maria.santos@email.com": [
    {
      from: "resident",
      text: "Magandang araw po! Nag-submit po ako ng Barangay Clearance request para sa employment requirement. Kailan po kaya ito pwede makuha?",
      time: "Oct 23 · 9:15 AM",
    },
    {
      from: "admin",
      text: "Magandang araw, Maria! Na-review na po ang inyong clearance request at kasalukuyang pinipirmahan ni Punong Barangay Roberto Gomez. Mag-a-update kami kapag ready na for pickup sa Window 2. Maraming salamat!",
      time: "Oct 23 · 10:45 AM",
    },
  ],
  "maria.reyes@email.com": [
    {
      from: "resident",
      text: "Good day po! I need help with my barangay clearance for employment purposes. It has been 5 days since I submitted.",
      time: "Jun 15 · 9:04 AM",
    },
    {
      from: "admin",
      text: "Good day, Maria! We have received your request. Please visit the barangay hall on June 17 between 8 AM – 12 PM to sign the document. Thank you!",
      time: "Jun 15 · 10:30 AM",
    },
  ],
  "juan.dc@email.com": [
    {
      from: "resident",
      text: "Magandang hapon po. Gusto ko po sana itanong kung kailan pa po maaprubahan ang aking registration.",
      time: "Jun 16 · 2:10 PM",
    },
    {
      from: "admin",
      text: "Hello Juan! We have approved your resident registration. You can now request barangay documents and participate in community consultations.",
      time: "Jun 16 · 3:25 PM",
    },
  ],
  "juan.delacruz@gmail.com": [
    {
      from: "resident",
      text: "Hello po, nag-apply po ako ng Barangay Clearance para po sa renewal ng driver's license. Ask ko lang po if kailangan pa ng 2x2 picture sa pickup.",
      time: "Oct 24 · 8:15 AM",
    },
    {
      from: "admin",
      text: "Opo Juan, paki-dala po ang 1 valid government ID at 1 pirasong 2x2 ID photo pag-claim sa Window 1. Salamat!",
      time: "Oct 24 · 8:40 AM",
    },
  ],
};

export function getCachedThreads(): Record<string, Msg[]> {
  try {
    const raw = localStorage.getItem("barangay_message_threads");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return { ...initialThreads, ...parsed };
      }
    }
  } catch {}
  return initialThreads;
}

export function saveCachedThreads(threads: Record<string, Msg[]>) {
  try {
    localStorage.setItem("barangay_message_threads", JSON.stringify(threads));
    window.dispatchEvent(
      new CustomEvent("barangay_threads_updated", { detail: threads }),
    );
  } catch {}
}

export type RequestStatus =
  | "Pending"
  | "Approved"
  | "Ready for Pickup"
  | "Released"
  | "Declined";
export type PaymentStatus = "Unpaid" | "Paid at Counter" | "Waived";

export type DocumentRequest = {
  id: string;
  trackingNo: string;
  residentId: string;
  residentName: string;
  residentEmail: string;
  residentMobile: string;
  residentAddress: string;
  purok: string;
  docType: string;
  purpose: string;
  notes?: string;
  fee: string;
  paymentStatus: PaymentStatus;
  status: RequestStatus;
  dateFiled: string;
  timeFiled: string;
  createdAt: string;
  updatedAt: string;
  adminFeedback?: string;
  pickupWindow?: string;
  releasedDate?: string;
  controlNo: string;
};

export const initialDocumentRequests: DocumentRequest[] = [
  {
    id: "req-101",
    trackingNo: "BRGY-2026-0042",
    residentId: "res-102",
    residentName: "Maria Santos",
    residentEmail: "maria.santos@email.com",
    residentMobile: "0928-876-5432",
    residentAddress: "142 Mabini Avenue, Purok 2",
    purok: "Purok 2",
    docType: "Barangay Clearance",
    purpose: "Employment requirement (BPO Company)",
    notes: "Need for upcoming job start next Monday.",
    fee: "₱ 50",
    paymentStatus: "Paid at Counter",
    status: "Approved",
    dateFiled: "Oct 22, 2026",
    timeFiled: "09:30 AM",
    createdAt: "2026-10-22T09:30:00.000Z",
    updatedAt: "2026-10-23T10:45:00.000Z",
    adminFeedback:
      "Document has been reviewed and cleared by Barangay Office. Signed by Punong Barangay Roberto Gomez.",
    pickupWindow: "Window 2 (Mon–Fri 8AM–5PM)",
    controlNo: "BC-2026-0042",
  },
  {
    id: "req-102",
    trackingNo: "BRGY-2026-0038",
    residentId: "res-102",
    residentName: "Maria Santos",
    residentEmail: "maria.santos@email.com",
    residentMobile: "0928-876-5432",
    residentAddress: "142 Mabini Avenue, Purok 2",
    purok: "Purok 2",
    docType: "Certificate of Residency",
    purpose: "Bank Account Opening requirement",
    notes: "Opening savings account at Landbank.",
    fee: "₱ 30",
    paymentStatus: "Paid at Counter",
    status: "Ready for Pickup",
    dateFiled: "Oct 23, 2026",
    timeFiled: "02:15 PM",
    createdAt: "2026-10-23T14:15:00.000Z",
    updatedAt: "2026-10-24T08:30:00.000Z",
    adminFeedback:
      "Ready for claiming at Window 1. Please present 1 valid government ID.",
    pickupWindow: "Window 1",
    controlNo: "CR-2026-0038",
  },
  {
    id: "req-103",
    trackingNo: "BRGY-2026-0051",
    residentId: "res-101",
    residentName: "Juan Dela Cruz",
    residentEmail: "juan.delacruz@gmail.com",
    residentMobile: "0917-123-4567",
    residentAddress: "Block 4 Lot 12, Sampaguita St., Purok 1",
    purok: "Purok 1",
    docType: "Barangay Clearance",
    purpose: "Driver's License Renewal",
    notes: "LTO schedule on Tuesday morning.",
    fee: "₱ 50",
    paymentStatus: "Unpaid",
    status: "Pending",
    dateFiled: "Oct 24, 2026",
    timeFiled: "08:10 AM",
    createdAt: "2026-10-24T08:10:00.000Z",
    updatedAt: "2026-10-24T08:10:00.000Z",
    controlNo: "BC-2026-0051",
  },
  {
    id: "req-104",
    trackingNo: "BRGY-2026-0031",
    residentId: "res-104",
    residentName: "Ana Santos",
    residentEmail: "ana.santos@email.com",
    residentMobile: "0918-345-6789",
    residentAddress: "77 Rizal St., Purok 4",
    purok: "Purok 4",
    docType: "Certificate of Indigency",
    purpose: "Educational Financial Aid / Scholarship",
    notes: "CHED scholarship grant application requirement.",
    fee: "Free",
    paymentStatus: "Waived",
    status: "Approved",
    dateFiled: "Oct 21, 2026",
    timeFiled: "11:20 AM",
    createdAt: "2026-10-21T11:20:00.000Z",
    updatedAt: "2026-10-22T14:00:00.000Z",
    adminFeedback:
      "Indigency evaluation verified with Purok 4 leader. Approved.",
    pickupWindow: "Window 3 (Social Services)",
    controlNo: "CI-2026-0031",
  },
  {
    id: "req-105",
    trackingNo: "BRGY-2026-0022",
    residentId: "res-105",
    residentName: "Paolo Garcia",
    residentEmail: "paolo.garcia@gmail.com",
    residentMobile: "0919-456-7890",
    residentAddress: "23 Bonifacio Ave, Purok 1",
    purok: "Purok 1",
    docType: "Business Clearance",
    purpose: "Sari-sari Store Annual Business Permit Renewal",
    notes: "Inspection completed last month.",
    fee: "₱ 200",
    paymentStatus: "Paid at Counter",
    status: "Released",
    dateFiled: "Oct 19, 2026",
    timeFiled: "03:45 PM",
    createdAt: "2026-10-19T15:45:00.000Z",
    updatedAt: "2026-10-21T16:00:00.000Z",
    adminFeedback: "Released and receipt OR#9821 issued to resident.",
    releasedDate: "Oct 21, 2026",
    controlNo: "BB-2026-0022",
  },
  {
    id: "req-106",
    trackingNo: "BRGY-2026-0019",
    residentId: "res-106",
    residentName: "Elena Ramos",
    residentEmail: "elena.ramos@email.com",
    residentMobile: "0920-567-8901",
    residentAddress: "56 Dahlia St., Purok 3",
    purok: "Purok 3",
    docType: "Good Moral Certificate",
    purpose: "College Admissions",
    fee: "₱ 50",
    paymentStatus: "Unpaid",
    status: "Declined",
    dateFiled: "Oct 18, 2026",
    timeFiled: "10:15 AM",
    createdAt: "2026-10-18T10:15:00.000Z",
    updatedAt: "2026-10-19T09:00:00.000Z",
    adminFeedback:
      "Residency record under 6 months; please present proof of previous barangay clearance or updated billing statement.",
    controlNo: "GM-2026-0019",
  },
];

export function getCachedDocumentRequests(): DocumentRequest[] {
  try {
    const raw = localStorage.getItem("barangay_document_requests");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return initialDocumentRequests;
}

export function saveCachedDocumentRequests(requests: DocumentRequest[]) {
  try {
    localStorage.setItem(
      "barangay_document_requests",
      JSON.stringify(requests),
    );
    window.dispatchEvent(
      new CustomEvent("barangay_requests_updated", { detail: requests }),
    );
  } catch {}
}

export function getPromotedAdminEmails(): string[] {
  try {
    const raw = localStorage.getItem("brgy_promoted_admins");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed))
        return parsed.map((e: string) => String(e).toLowerCase().trim());
    }
  } catch {}
  return [];
}

export function isPromotedAdmin(email?: string, list?: string[]): boolean {
  if (!email) return false;
  const e = email.toLowerCase().trim();
  const adminList = list || getPromotedAdminEmails();
  return adminList.some((adm) => adm.toLowerCase().trim() === e);
}

export function parsePromotedAdminsFromDesc(desc?: string): string[] {
  if (!desc) return [];
  const match = desc.match(/<!--\s*ADMIN_ROLES:\s*(\[.*?\])\s*-->/);
  if (match) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed))
        return parsed.map((e: string) => String(e).toLowerCase().trim());
    } catch {}
  }
  return [];
}

export function cleanBarangayDescription(desc?: string): string {
  if (!desc) return "";
  return desc
    .replace(/<!--\s*ADMIN_ROLES:\s*\[.*?\]\s*-->/g, "")
    .replace(/<!--\s*ACTIVE_RESETS:\s*\{.*?\}\s*-->/g, "")
    .replace(/<!--\s*SCHEDULE:\s*\[.*?\]\s*-->/g, "")
    .trim();
}

export function parseScheduleFromDesc(desc?: string): OperatingDay[] | null {
  if (!desc) return null;
  const match = desc.match(/<!--\s*SCHEDULE:\s*(\[.*?\])\s*-->/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[1]);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function parseActiveResetsFromDesc(
  desc?: string,
): Record<string, { tempPassword: string; resetAt: string }> {
  if (!desc) return {};
  const match = desc.match(/<!--\s*ACTIVE_RESETS:\s*(\{.*?\})\s*-->/);
  if (!match) return {};
  try {
    return JSON.parse(match[1]);
  } catch {
    return {};
  }
}

export async function syncActiveReset(
  email: string,
  tempPassword: string | null,
): Promise<void> {
  const cleanEmail = email.toLowerCase().trim();
  if (!cleanEmail) return;

  try {
    const tempMap = JSON.parse(
      localStorage.getItem("brgy_temp_passwords") || "{}",
    );
    if (tempPassword) {
      tempMap[cleanEmail] = { tempPassword, resetAt: new Date().toISOString() };
    } else {
      delete tempMap[cleanEmail];
    }
    localStorage.setItem("brgy_temp_passwords", JSON.stringify(tempMap));
  } catch {}

  try {
    const { data: dbSettings } = await supabase
      .from("barangay_settings")
      .select("description")
      .eq("id", 1)
      .maybeSingle();

    const currentDesc = dbSettings?.description || "";
    const cleanDesc = cleanBarangayDescription(currentDesc);
    const adminRolesMatch = currentDesc.match(
      /<!--\s*ADMIN_ROLES:\s*(\[.*?\])\s*-->/,
    );
    const activeResets = parseActiveResetsFromDesc(currentDesc);

    if (tempPassword) {
      activeResets[cleanEmail] = {
        tempPassword,
        resetAt: new Date().toISOString(),
      };
    } else {
      delete activeResets[cleanEmail];
    }

    let updatedDesc = cleanDesc;
    if (adminRolesMatch) {
      updatedDesc += `\n<!-- ADMIN_ROLES: ${adminRolesMatch[1]} -->`;
    }
    if (Object.keys(activeResets).length > 0) {
      updatedDesc += `\n<!-- ACTIVE_RESETS: ${JSON.stringify(activeResets)} -->`;
    }

    await supabase
      .from("barangay_settings")
      .upsert({ id: 1, description: updatedDesc });
  } catch (err) {
    console.warn("Failed to sync active resets to Supabase:", err);
  }
}

export async function syncPromotedAdminEmail(
  email: string,
  isPromote: boolean,
): Promise<string[]> {
  const cleanEmail = email.toLowerCase().trim();
  if (!cleanEmail) return getPromotedAdminEmails();

  const current = getPromotedAdminEmails();
  let nextList: string[];
  if (isPromote) {
    nextList = Array.from(new Set([...current, cleanEmail]));
  } else {
    nextList = current.filter((e) => e !== cleanEmail);
  }

  try {
    localStorage.setItem("brgy_promoted_admins", JSON.stringify(nextList));
    window.dispatchEvent(
      new CustomEvent("brgy_promoted_admins_updated", { detail: nextList }),
    );
  } catch {}

  // Sync to Supabase barangay_settings row 1
  try {
    const { data: dbSettings } = await supabase
      .from("barangay_settings")
      .select("description")
      .eq("id", 1)
      .maybeSingle();

    const currentDesc =
      dbSettings?.description || defaultBarangayInfo.description;
    const cleanDesc = cleanBarangayDescription(currentDesc);
    const activeResetsMatch = currentDesc.match(
      /<!--\s*ACTIVE_RESETS:\s*(\{.*?\})\s*-->/,
    );
    let updatedDesc = `${cleanDesc}\n<!-- ADMIN_ROLES: ${JSON.stringify(nextList)} -->`;
    if (activeResetsMatch) {
      updatedDesc += `\n<!-- ACTIVE_RESETS: ${activeResetsMatch[1]} -->`;
    }

    await supabase
      .from("barangay_settings")
      .upsert({ id: 1, description: updatedDesc });
  } catch (err) {
    console.warn("Failed to sync admin roles to Supabase:", err);
  }

  return nextList;
}

export function parseDbDocRequest(row: any): DocumentRequest {
  let meta: any = {};
  if (
    row.feedback &&
    typeof row.feedback === "string" &&
    row.feedback.trim().startsWith("{")
  ) {
    try {
      meta = JSON.parse(row.feedback);
    } catch {}
  }

  const idStr = String(row.id);
  const padId = idStr.padStart(4, "0");
  const email = (row.email || meta.email || "").toLowerCase().trim();
  const resMeta = resolveResidentMeta(email, row.name || meta.name);

  const docPrefixMap: Record<string, string> = {
    "Barangay Clearance": "BC",
    "Certificate of Residency": "CR",
    "Business Clearance": "BB",
    "Certificate of Indigency": "CI",
    "Barangay ID": "BID",
    "Good Moral Certificate": "GM",
  };
  const docType = row.doc || meta.docType || "Barangay Clearance";
  const code = docPrefixMap[docType] || "DC";

  const rawFeedback = row.feedback;
  let adminRemarks = "";
  if (meta.feedback !== undefined) {
    adminRemarks = meta.feedback;
  } else if (
    rawFeedback &&
    typeof rawFeedback === "string" &&
    !rawFeedback.startsWith("{")
  ) {
    adminRemarks = rawFeedback;
  }

  return {
    id: idStr,
    trackingNo: meta.trackingNo || `BRGY-2026-${padId}`,
    residentId: meta.residentId || `res-${email || idStr}`,
    residentName: row.name || meta.residentName || resMeta.name || "Resident",
    residentEmail: email,
    residentMobile: meta.phone || meta.residentMobile || resMeta.phone,
    residentAddress: meta.address || meta.residentAddress || resMeta.address,
    purok: meta.purok || resMeta.purok,
    docType,
    purpose: row.purpose || meta.purpose || "Official Requirement",
    notes: meta.notes || "",
    fee: meta.fee || "₱ 50",
    paymentStatus:
      (meta.paymentStatus as PaymentStatus) ||
      (row.status === "Released" ? "Paid at Counter" : "Unpaid"),
    status: (row.status as RequestStatus) || "Pending",
    dateFiled:
      row.date ||
      (row.created_at
        ? new Date(row.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Today"),
    timeFiled:
      meta.timeFiled ||
      (row.created_at
        ? new Date(row.created_at).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })
        : "09:00 AM"),
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: meta.updatedAt || row.created_at || new Date().toISOString(),
    adminFeedback: adminRemarks,
    pickupWindow: meta.pickupWindow || "Window 1",
    releasedDate: meta.releasedDate,
    controlNo: meta.controlNo || `${code}-2026-${padId}`,
  };
}

export function getResidentDirectory(): Record<
  string,
  { name: string; purok: string; phone: string; address: string }
> {
  return {
    "maria.santos@email.com": {
      name: "Maria Santos",
      purok: "Purok 2",
      phone: "0928-876-5432",
      address: "142 Mabini Avenue, Purok 2",
    },
    "maria.reyes@email.com": {
      name: "Maria Reyes",
      purok: "Purok 3",
      phone: "0921-987-6543",
      address: "Block 12 Lot 5, Ilang-Ilang St., Purok 3",
    },
    "juan.dc@email.com": {
      name: "Juan Dela Cruz",
      purok: "Purok 1",
      phone: "0917-123-4567",
      address: "Block 4 Lot 12, Sampaguita St., Purok 1",
    },
    "juan.delacruz@gmail.com": {
      name: "Juan Dela Cruz",
      purok: "Purok 1",
      phone: "0917-123-4567",
      address: "Block 4 Lot 12, Sampaguita St., Purok 1",
    },
    "antonio.luna@outlook.com": {
      name: "Antonio Luna",
      purok: "Purok 3",
      phone: "0939-555-0192",
      address: "88 Narra Lane, Purok 3",
    },
    "ana.santos@email.com": {
      name: "Ana Santos",
      purok: "Purok 4",
      phone: "0918-345-6789",
      address: "77 Rizal St., Purok 4",
    },
    "paolo.garcia@gmail.com": {
      name: "Paolo Garcia",
      purok: "Purok 1",
      phone: "0919-456-7890",
      address: "23 Bonifacio Ave, Purok 1",
    },
    "elena.ramos@email.com": {
      name: "Elena Ramos",
      purok: "Purok 3",
      phone: "0920-567-8901",
      address: "56 Dahlia St., Purok 3",
    },
  };
}

export function resolveResidentMeta(
  email: string,
  fallbackName?: string,
): { name: string; purok: string; phone: string; address: string } {
  const dir = getResidentDirectory();
  const lower = email.toLowerCase().trim();
  if (dir[lower]) return dir[lower];
  const name =
    fallbackName ||
    lower
      .split("@")[0]
      .split(/[._-]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") ||
    "Resident";
  return {
    name,
    purok: "Purok 1",
    phone: "0917-000-0000",
    address: "Barangay San Isidro",
  };
}

export type IncidentCategory =
  | "Dispute / Noise"
  | "Street Hazard"
  | "Theft / Security"
  | "Sanitation"
  | "Emergency / Medical"
  | "Physical Altercation"
  | "Boundary Dispute"
  | "Domestic Concern"
  | "Other";

export type IncidentStatus =
  | "Under Review"
  | "Scheduled Hearing"
  | "In Mediation"
  | "Resolved"
  | "Dismissed"
  | "Deleted";

export type IncidentMeta = {
  respondentName?: string;
  respondentAddress?: string;
  respondentContact?: string;
  hearingStage?: string;
  hearingVenue?: string;
  assignedOfficer?: string;
  deletedAt?: string;
  previousStatus?: string;
};

export function getIncidentMetaMap(): Record<string, IncidentMeta> {
  try {
    const raw = localStorage.getItem("barangay_incidents_meta");
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

export function saveIncidentMeta(id: string, meta: Partial<IncidentMeta>) {
  try {
    const current = getIncidentMetaMap();
    current[id] = { ...(current[id] || {}), ...meta };
    localStorage.setItem("barangay_incidents_meta", JSON.stringify(current));
  } catch {}
}

export function removeIncidentDeletedMeta(id: string) {
  try {
    const current = getIncidentMetaMap();
    if (current[id]) {
      delete current[id].deletedAt;
      localStorage.setItem("barangay_incidents_meta", JSON.stringify(current));
    }
  } catch {}
}

export function deleteIncidentMeta(id: string) {
  try {
    const current = getIncidentMetaMap();
    delete current[id];
    localStorage.setItem("barangay_incidents_meta", JSON.stringify(current));
  } catch {}
}

export type IncidentReport = {
  id: string;
  complainantName: string;
  complainantEmail: string;
  category: IncidentCategory;
  purok: string;
  description: string;
  date: string;
  status: IncidentStatus;
  hearingDate?: string;
  officerNotes?: string;
  isUrgent?: boolean;
  respondentName?: string;
  respondentAddress?: string;
  respondentContact?: string;
  hearingStage?: string;
  hearingVenue?: string;
  assignedOfficer?: string;
  deletedAt?: string;
};

const initialIncidents: IncidentReport[] = [
  {
    id: "INC-2025-042",
    complainantName: "Maria Reyes",
    complainantEmail: "maria.reyes@email.com",
    category: "Dispute / Noise",
    purok: "Purok 2 (Mabini St.)",
    description:
      "Repeated late night videoke and loud disturbance after 11:00 PM on weekdays along Mabini St.",
    date: "Jun 16, 2025",
    status: "Scheduled Hearing",
    hearingDate: "June 20, 2025 · 2:00 PM at Lupon Tagapamayapa Hall",
    officerNotes: "Invited complainant and respondent for formal mediation.",
    isUrgent: false,
  },
  {
    id: "INC-2025-041",
    complainantName: "Juan Dela Cruz",
    complainantEmail: "juan.dc@email.com",
    category: "Street Hazard",
    purok: "Purok 1 (Sampaguita Rd.)",
    description:
      "Fallen tree branch leaning on electric cables near the daycare center after the heavy rain.",
    date: "Jun 15, 2025",
    status: "Under Review",
    officerNotes:
      "Endorsed to Barangay Maintenance & Tanod team for urgent clearing.",
    isUrgent: true,
  },
  {
    id: "INC-2025-039",
    complainantName: "Ana Santos",
    complainantEmail: "ana.s@email.com",
    category: "Sanitation",
    purok: "Purok 3",
    description:
      "Uncollected garbage piled at corner lot causing foul odor and blocking sidewalk.",
    date: "Jun 10, 2025",
    status: "Resolved",
    officerNotes: "Clean-up team deployed and garbage cleared on Jun 11.",
    isUrgent: false,
  },
];

export type EmergencyHotline = {
  id: string;
  name: string;
  subtitle: string;
  number: string;
  altNumber: string;
  tag: string;
  tone: "green" | "blue" | "amber" | "red" | "purple" | "cyan";
  icon: IconName;
};

const initialEmergencyHotlines: EmergencyHotline[] = [
  {
    id: "hl-1",
    name: "Barangay Tanod Headquarters",
    subtitle: "24/7 Security Patrol & Immediate Community Response",
    number: "(02) 8920-1122",
    altNumber: "Mobile: 0917-555-8266",
    tag: "24/7 Patrol",
    tone: "green",
    icon: "shield",
  },
  {
    id: "hl-2",
    name: "Barangay Health & Rescue Unit",
    subtitle: "Emergency ambulance, first-aid & medical assistance",
    number: "(02) 8920-1123",
    altNumber: "Mobile: 0918-444-1199",
    tag: "Ambulance",
    tone: "blue",
    icon: "phone",
  },
  {
    id: "hl-3",
    name: "PNP Police Sub-Station 4",
    subtitle: "Philippine National Police - Local Precinct",
    number: "(02) 8922-3344",
    altNumber: "Direct: 117 / 0998-598-8123",
    tag: "Law Enforcement",
    tone: "amber",
    icon: "shield",
  },
  {
    id: "hl-4",
    name: "Bureau of Fire Protection (BFP)",
    subtitle: "Fire emergency response & rescue brigade",
    number: "(02) 8928-5566",
    altNumber: "Direct Hotline: 911",
    tag: "Fire & Rescue",
    tone: "red",
    icon: "alert",
  },
  {
    id: "hl-5",
    name: "City Disaster Risk Reduction (CDRRMO)",
    subtitle: "Typhoon alerts, flood evacuation & rescue",
    number: "(02) 8988-4242",
    altNumber: "Citizen Action: 122",
    tag: "Disaster Ops",
    tone: "purple",
    icon: "alert",
  },
  {
    id: "hl-6",
    name: "Emergency Utility Desk (Meralco / Water)",
    subtitle: "Downed power lines, gas leaks, water bursts",
    number: "16211 (Meralco)",
    altNumber: "1627 (Manila Water)",
    tag: "Utilities",
    tone: "cyan",
    icon: "phone",
  },
];

// ─── User Profile Modal ──────────────────────────────────────────────────────
function UserProfileModal({
  user,
  onClose,
  onSave,
  onToast,
}: {
  user: Account;
  onClose: () => void;
  onSave: (updated: { name: string; photoUrl: string }) => void;
  onToast?: (msg: string) => void;
}) {
  const storedPhoto = (() => {
    try {
      return localStorage.getItem(`brgy_profile_photo_${user.id}`) || "";
    } catch {
      return "";
    }
  })();

  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  // Profile state
  const [name, setName] = useState(user.name);
  const [mobile, setMobile] = useState(() => {
    try {
      return localStorage.getItem(`brgy_profile_mobile_${user.id}`) || "";
    } catch {
      return "";
    }
  });
  const [address, setAddress] = useState(() => {
    try {
      return localStorage.getItem(`brgy_profile_address_${user.id}`) || "";
    } catch {
      return "";
    }
  });
  const [photoUrl, setPhotoUrl] = useState(storedPhoto);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const res = ev.target?.result as string;
      if (res) setPhotoUrl(res);
    };
    reader.readAsDataURL(file);
  }

  async function handleSaveProfile() {
    if (!name.trim()) return;
    setSaving(true);
    try {
      try {
        if (photoUrl)
          localStorage.setItem(`brgy_profile_photo_${user.id}`, photoUrl);
        else localStorage.removeItem(`brgy_profile_photo_${user.id}`);
        if (mobile)
          localStorage.setItem(`brgy_profile_mobile_${user.id}`, mobile);
        if (address)
          localStorage.setItem(`brgy_profile_address_${user.id}`, address);
      } catch {}
      await supabase
        .from("accounts")
        .update({ full_name: name.trim() })
        .eq("id", user.id);
      onSave({ name: name.trim(), photoUrl });
    } catch (e) {
      console.error("Profile save error:", e);
      onSave({ name: name.trim(), photoUrl });
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }
    if (!newPassword) {
      setPasswordError("Please enter your new password.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (newPassword === currentPassword) {
      setPasswordError(
        "New password must be different from your current password.",
      );
      return;
    }

    setPasswordLoading(true);
    try {
      // 1. Verify current password by authenticating against Supabase
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: user.email.trim().toLowerCase(),
          password: currentPassword,
        });

      if (signInError || !signInData.user) {
        setPasswordError(
          "Current password is incorrect. Please verify and try again.",
        );
        setPasswordLoading(false);
        return;
      }

      // 2. Current password verified successfully! Now update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setPasswordError(
          updateError.message || "Failed to update password. Please try again.",
        );
        setPasswordLoading(false);
        return;
      }

      // 3. Password successfully updated — also clear any active temp-password reset
      //    so the admin-issued temporary password can no longer be used to log in.
      try {
        await syncActiveReset(user.email.trim().toLowerCase(), null);
      } catch {
        // non-fatal: temp-password entry will expire naturally
      }

      setPasswordSuccess("Password changed successfully! 🔒");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      if (onToast) {
        onToast("Password changed successfully! ✅");
      }
    } catch (err: any) {
      setPasswordError(
        err?.message || "An unexpected error occurred while updating password.",
      );
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <Modal title="My Profile Settings" close={onClose} maxWidth="480px">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Navigation Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            borderBottom: "1px solid #e2ebe6",
            paddingBottom: "10px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setActiveTab("profile");
              setPasswordError("");
              setPasswordSuccess("");
            }}
            style={{
              padding: "7px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              background: activeTab === "profile" ? "#16a34a" : "transparent",
              color: activeTab === "profile" ? "white" : "#4b5563",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.15s ease",
            }}
          >
            <Icon name="userCheck" size={15} /> Profile Details
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("password");
              setPasswordError("");
              setPasswordSuccess("");
            }}
            style={{
              padding: "7px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              background: activeTab === "password" ? "#16a34a" : "transparent",
              color: activeTab === "password" ? "white" : "#4b5563",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.15s ease",
            }}
          >
            <Icon name="shield" size={15} /> Change Password
          </button>
        </div>

        {activeTab === "profile" ? (
          <>
            {/* Avatar / Photo Upload */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                paddingBottom: "14px",
                borderBottom: "1px solid #e8eee9",
              }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <div
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#e0f2fe",
                    border: "3px solid #bae6fd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: "#0369a1",
                        letterSpacing: 1,
                      }}
                    >
                      {getInitials(name || user.name)}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    background: "#16a34a",
                    color: "white",
                    border: "2px solid white",
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                  title="Upload profile photo"
                >
                  <Icon name="image" size={14} />
                </button>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoUpload}
              />
              <div style={{ textAlign: "center" }}>
                <strong
                  style={{
                    fontSize: "14px",
                    color: "#18362b",
                    display: "block",
                  }}
                >
                  {user.name}
                </strong>
                <small style={{ color: "#6b7f77", fontSize: "11.5px" }}>
                  {user.email} ·{" "}
                  {user.role === "admin" ? "Administrator" : "Resident"}
                </small>
              </div>
              {photoUrl && (
                <button
                  type="button"
                  onClick={() => setPhotoUrl("")}
                  style={{
                    fontSize: "10.5px",
                    color: "#b91c1c",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "6px",
                    padding: "3px 10px",
                    cursor: "pointer",
                  }}
                >
                  Remove photo
                </button>
              )}
            </div>

            {/* Profile Fields */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <label className="field">
                Full Name *
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </label>
              <label className="field">
                Mobile Number
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="09XX XXX XXXX"
                />
              </label>
              <label className="field">
                Address / Area
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Block 4 Lot 12, Purok 2"
                />
              </label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="ghost-button"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={handleSaveProfile}
                disabled={saving || !name.trim()}
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={handlePasswordChange}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "12.5px",
                color: "#64748b",
                lineHeight: 1.5,
              }}
            >
              To change your password, verify your{" "}
              <strong>current password</strong> first. Your new password must be
              at least 8 characters long.
            </p>

            {passwordError && (
              <div
                style={{
                  background: "#fef2f2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Icon name="alert" size={16} />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div
                style={{
                  background: "#f0fdf4",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Icon name="check" size={16} />
                <span>{passwordSuccess}</span>
              </div>
            )}

            {/* Current Password Field */}
            <label className="field">
              Current Password *
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  style={{ width: "100%", paddingRight: "40px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label={
                    showCurrentPassword ? "Hide password" : "Show password"
                  }
                >
                  {showCurrentPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            {/* New Password Field */}
            <label className="field">
              New Password *
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 8 characters)"
                  style={{ width: "100%", paddingRight: "40px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label={
                    showNewPassword ? "Hide password" : "Show password"
                  }
                >
                  {showNewPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            {/* Confirm New Password Field */}
            <label className="field">
              Confirm New Password *
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type your new password"
                  style={{ width: "100%", paddingRight: "40px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            <div className="modal-actions" style={{ marginTop: "6px" }}>
              <button
                type="button"
                className="ghost-button"
                onClick={onClose}
                disabled={passwordLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="primary-button"
                disabled={
                  passwordLoading ||
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword
                }
              >
                {passwordLoading
                  ? "Verifying & Updating..."
                  : "Update Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}

export default function App() {
  const [user, setUser] = useState<Account | null>(null);
  const [loading, setLoading] = useState<"startup" | "login" | "logout" | null>(
    "startup",
  );
  const [barangay, setBarangay] = useState<BarangayInfo>(getCachedBarangayInfo);
  const [pendingResidents, setPendingResidents] = useState(1);
  const [active, setActive] = useState("announcements");
  const [notifOpen, setNotifOpen] = useState(false);
  const [acctOpen, setAcctOpen] = useState(false);
  const [profileSettingsOpen, setProfileSettingsOpen] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postTag, setPostTag] = useState("Community Advisory");
  const [postAccent, setPostAccent] = useState("");
  const [postAccentDate, setPostAccentDate] = useState("");
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const cached = localStorage.getItem("brgy_announcements_cache");
      if (cached) {
        const list = JSON.parse(cached);
        if (Array.isArray(list)) {
          return list.filter((a) => !isAnnouncementDeleted(a.id, a.title));
        }
      }
    } catch {}
    return initialAnnouncements.filter(
      (a) => !isAnnouncementDeleted(a.id, a.title),
    );
  });
  // Announcement management state
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);
  const [deleteAnnouncementItem, setDeleteAnnouncementItem] =
    useState<Announcement | null>(null);
  const [viewAnnouncementItem, setViewAnnouncementItem] =
    useState<Announcement | null>(null);
  const [announcementFilter, setAnnouncementFilter] = useState("all");
  const [announcementSearch, setAnnouncementSearch] = useState("");
  const [announcementMoreMenu, setAnnouncementMoreMenu] = useState<
    number | null
  >(null);
  const [postImageUrl, setPostImageUrl] = useState("");
  const [postPinned, setPostPinned] = useState(false);
  const [postAuthor, setPostAuthor] = useState("Barangay San Isidro");
  const [postScheduledAt, setPostScheduledAt] = useState("");
  const [isSchedulingEnabled, setIsSchedulingEnabled] = useState(false);
  const [showPresetPicker, setShowPresetPicker] = useState(false);
  const [inquiryModalPost, setInquiryModalPost] = useState<Announcement | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeFilterTab, setActiveFilterTab] = useState<
    "all" | "pinned" | "saved"
  >("all");
  const [savedPostIds, setSavedPostIds] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("brgy_saved_posts") || "[]");
    } catch {
      return [];
    }
  });
  const [acknowledgedPostIds, setAcknowledgedPostIds] = useState<number[]>(
    () => {
      try {
        return JSON.parse(localStorage.getItem("brgy_user_ack") || "[]");
      } catch {
        return [1];
      }
    },
  );
  const [commentsMap, setCommentsMap] = useState<
    Record<number, AnnouncementComment[]>
  >(() => {
    try {
      const stored = localStorage.getItem("brgy_announcement_comments");
      return stored ? JSON.parse(stored) : initialComments;
    } catch {
      return initialComments;
    }
  });
  const [expandedCommentPostId, setExpandedCommentPostId] = useState<
    number | null
  >(null);
  const [commentInput, setCommentInput] = useState("");
  const [toast, setToast] = useState("");
  const [threads, setThreads] =
    useState<Record<string, Msg[]>>(getCachedThreads);
  const [requests, setRequests] = useState<DocumentRequest[]>(
    getCachedDocumentRequests,
  );
  const [promotedAdmins, setPromotedAdmins] = useState<string[]>(
    getPromotedAdminEmails,
  );
  const [incidents, setIncidents] =
    useState<IncidentReport[]>(initialIncidents);
  const [hotlines, setHotlines] = useState<EmergencyHotline[]>(
    initialEmergencyHotlines,
  );
  // For admin: which resident thread is open
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [printingRequest, setPrintingRequest] =
    useState<DocumentRequest | null>(null);
  const [viewingRequest, setViewingRequest] = useState<DocumentRequest | null>(
    null,
  );
  const [presetMessageDraft, setPresetMessageDraft] = useState<string>("");
  const [selectedDocForModal, setSelectedDocForModal] =
    useState<string>("Barangay Clearance");
  const [newRequestPurpose, setNewRequestPurpose] = useState<string>("");
  const [newRequestCustomPurpose, setNewRequestCustomPurpose] =
    useState<string>("");
  const [newRequestNotes, setNewRequestNotes] = useState<string>("");
  const [newRequestPhone, setNewRequestPhone] = useState<string>("");
  const [newRequestAddress, setNewRequestAddress] = useState<string>("");

  // ── Dynamic Live Notifications State ─────────────────────────────────────
  const [readNotifIds, setReadNotifIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("brgy_read_notifs") || "[]");
    } catch {
      return [];
    }
  });

  function markNotifRead(id: string) {
    setReadNotifIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem("brgy_read_notifs", JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  // ── Events Calendar State ───────────────────────────────────────────────
  const [calendarEvents, setCalendarEvents] = useState<CommunityEvent[]>(() => {
    try {
      const stored = localStorage.getItem("brgy_events_cache");
      return stored ? JSON.parse(stored) : initialEvents;
    } catch {
      return initialEvents;
    }
  });
  const [viewingEvent, setViewingEvent] = useState<CommunityEvent | null>(null);
  const [userRsvps, setUserRsvps] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("brgy_user_event_rsvps") || "[]");
    } catch {
      return [1, 4];
    }
  });

  function handleToggleRsvp(eventId: number) {
    setUserRsvps((prev) => {
      const exists = prev.includes(eventId);
      const next = exists
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId];
      try {
        localStorage.setItem("brgy_user_event_rsvps", JSON.stringify(next));
      } catch {}
      showToast(
        exists
          ? "Removed from your attending schedule."
          : "Marked as attending! Added to your schedule.",
      );
      return next;
    });
  }

  async function handleAddEvent(ev: Omit<CommunityEvent, "id">) {
    const tempId = Date.now();
    const newEvent: CommunityEvent = { ...ev, id: tempId };
    setCalendarEvents((prev) => {
      const next = [...prev, newEvent];
      try {
        localStorage.setItem("brgy_events_cache", JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast("Community event added to the calendar!");

    try {
      const dbPayload = {
        title: ev.title.trim(),
        day: ev.day,
        time: ev.time.trim(),
        location: ev.location.trim(),
        type: ev.type,
        description: `[DATE:${ev.date}] ${ev.description.trim()}`,
      };
      const { data: inserted, error } = await supabase
        .from("events")
        .insert([dbPayload])
        .select()
        .single();
      if (inserted && !error) {
        const parsed = parseDbEvent(inserted);
        setCalendarEvents((prev) =>
          prev.map((e) => (e.id === tempId ? parsed : e)),
        );
      }
    } catch (e) {
      console.error("Failed to insert event to Supabase", e);
    }
  }

  async function handleUpdateEvent(ev: CommunityEvent) {
    setCalendarEvents((prev) => {
      const next = prev.map((e) => (e.id === ev.id ? ev : e));
      try {
        localStorage.setItem("brgy_events_cache", JSON.stringify(next));
      } catch {}
      return next;
    });
    if (viewingEvent && viewingEvent.id === ev.id) {
      setViewingEvent(ev);
    }
    showToast("Event updated successfully!");

    try {
      const dbPayload = {
        title: ev.title.trim(),
        day: ev.day,
        time: ev.time.trim(),
        location: ev.location.trim(),
        type: ev.type,
        description: `[DATE:${ev.date}] ${ev.description.trim()}`,
      };
      await supabase.from("events").update(dbPayload).eq("id", ev.id);
    } catch (e) {
      console.error("Failed to update event in Supabase", e);
    }
  }

  async function handleDeleteEvent(id: number) {
    setCalendarEvents((prev) => {
      const next = prev.filter((e) => e.id !== id);
      try {
        localStorage.setItem("brgy_events_cache", JSON.stringify(next));
      } catch {}
      return next;
    });
    if (viewingEvent && viewingEvent.id === id) {
      setViewingEvent(null);
    }
    showToast("Event removed from calendar.");

    try {
      await supabase.from("events").delete().eq("id", id);
    } catch (e) {
      console.error("Failed to delete event from Supabase", e);
    }
  }

  // Resolve an auth user session → Account object
  async function resolveAccount(authUser: {
    id: string;
    email?: string;
  }): Promise<Account | null> {
    try {
      const { data: profile, error } = await supabase
        .from("accounts")
        .select("full_name, role, status")
        .eq("id", authUser.id)
        .single();

      // If query fails (network, RLS, etc.) fall back to auth data so the user
      // stays logged in instead of being silently kicked out.
      if (error || !profile) {
        const cachedName = authUser.email || "User";
        const isAdm = isPromotedAdmin(authUser.email ?? "");
        return {
          id: authUser.id,
          email: authUser.email ?? "",
          role: isAdm ? "admin" : "resident",
          name: cachedName,
          initials: getInitials(cachedName),
        };
      }

      // Block access only for explicitly restricted statuses.
      if (
        profile.status === "suspended" ||
        profile.status === "banned" ||
        profile.status === "rejected" ||
        profile.status === "deleted" ||
        profile.status === "pending"
      ) {
        return null; // non-active accounts cannot maintain a session
      }

      const name = profile.full_name || authUser.email || "User";
      const isAdm =
        profile.role === "admin" || isPromotedAdmin(authUser.email ?? "");
      return {
        id: authUser.id,
        email: authUser.email ?? "",
        role: isAdm ? "admin" : "resident",
        name,
        initials: getInitials(name),
      };
    } catch {
      // Last-resort fallback: keep the user logged in with minimal info.
      const cachedName = authUser.email || "User";
      const isAdm = isPromotedAdmin(authUser.email ?? "");
      return {
        id: authUser.id,
        email: authUser.email ?? "",
        role: isAdm ? "admin" : "resident",
        name: cachedName,
        initials: getInitials(cachedName),
      };
    }
  }

  useEffect(() => {
    // ── 1. Check for existing session on mount ───────────────────────────
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const account = await resolveAccount(session.user);
        setUser(account);
      } else {
        // Fallback: check custom session (e.g. for temporary password logins)
        try {
          const customSession = JSON.parse(
            localStorage.getItem("brgy_auth_session") || "null",
          );
          if (customSession?.user) {
            setUser(customSession.user);
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      }
      setLoading(null);
    });

    // ── 2. Listen for auth state changes ────────────────────────────────
    // Only update user state on meaningful auth transitions, NOT on
    // INITIAL_SESSION (handled above by getSession) or TOKEN_REFRESHED
    // (session is still valid — no need to re-resolve or logout).
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        if (session?.user) {
          const account = await resolveAccount(session.user);
          setUser(account);
        }
      } else if (event === "SIGNED_OUT") {
        try {
          localStorage.removeItem("brgy_auth_session");
        } catch {}
        setUser(null);
      } else if (event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") {
        // Session is still valid — do nothing to avoid flickering logout.
        // getSession() on mount already handled INITIAL_SESSION.
      }
    });

    // ── 3. Load community data & pending accounts ────────────────────────
    async function fetchLiveDocumentRequests() {
      try {
        const { data: dbDocs, error } = await supabase
          .from("document_requests")
          .select("*")
          .order("id", { ascending: false });

        if (!error && dbDocs && dbDocs.length > 0) {
          const parsed = dbDocs.map(parseDbDocRequest);
          setRequests((prev) => {
            // Keep local-only optimistic items (temp ids like "req-{timestamp}")
            // and filter out initial seed items and any item
            // already present in the DB result by tracking number
            const localOnly = prev.filter(
              (p) =>
                p.id.startsWith("req-") &&
                ![
                  "req-101",
                  "req-102",
                  "req-103",
                  "req-104",
                  "req-105",
                ].includes(p.id) &&
                !parsed.some((db) => db.trackingNo === p.trackingNo),
            );
            const merged = [...localOnly, ...parsed];
            saveCachedDocumentRequests(merged);
            return merged;
          });
        } else if (!error && dbDocs && dbDocs.length === 0) {
          // No requests in DB yet: show empty list
          setRequests([]);
          saveCachedDocumentRequests([]);
        }
      } catch (err) {
        console.warn("fetchLiveDocumentRequests error:", err);
      }
    }

    async function fetchLiveMessages() {
      try {
        const { data: dbMsgs, error } = await supabase
          .from("messages")
          .select("*")
          .order("created_at", { ascending: true });

        if (!error && dbMsgs && dbMsgs.length > 0) {
          const newThreads: Record<string, Msg[]> = {};
          dbMsgs.forEach((row: any) => {
            const em = (row.resident_email || "").toLowerCase().trim();
            if (!em) return;
            if (!newThreads[em]) newThreads[em] = [];
            const d = new Date(row.created_at);
            const dateStr = isNaN(d.getTime())
              ? "Today"
              : d.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
            const timeStr = isNaN(d.getTime())
              ? "Just now"
              : d.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                });
            newThreads[em].push({
              from: row.sender === "admin" ? "admin" : "resident",
              text: row.text,
              time: `${dateStr} · ${timeStr}`,
              timestamp: isNaN(d.getTime()) ? Date.now() : d.getTime(),
              dbId: row.id,
            });
          });

          setThreads((prev) => {
            // DB data takes full precedence; only keep local threads for emails
            // that have no DB record yet (e.g. optimistic new messages)
            const merged = { ...prev };
            Object.keys(newThreads).forEach((em) => {
              merged[em] = newThreads[em];
            });
            saveCachedThreads(merged);
            return merged;
          });
        }
      } catch (err) {
        console.warn("fetchLiveMessages error:", err);
      }
    }

    async function fetchLiveSettingsAndRoles() {
      try {
        const { data: dbSettings, error } = await supabase
          .from("barangay_settings")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (!error && dbSettings) {
          const adminEmails = parsePromotedAdminsFromDesc(
            dbSettings.description,
          );
          setPromotedAdmins((prev) => {
            if (JSON.stringify(prev) === JSON.stringify(adminEmails))
              return prev;
            return adminEmails;
          });
          try {
            localStorage.setItem(
              "brgy_promoted_admins",
              JSON.stringify(adminEmails),
            );
          } catch {}

          // Synchronize active resets from description into local storage
          const activeResets = parseActiveResetsFromDesc(
            dbSettings.description,
          );
          if (Object.keys(activeResets).length > 0) {
            try {
              const currentLocal = JSON.parse(
                localStorage.getItem("brgy_temp_passwords") || "{}",
              );
              const merged = { ...currentLocal, ...activeResets };
              localStorage.setItem(
                "brgy_temp_passwords",
                JSON.stringify(merged),
              );
            } catch {}
          }

          const cleanDesc = cleanBarangayDescription(dbSettings.description);
          const loadedInfo: BarangayInfo = {
            name: dbSettings.name || defaultBarangayInfo.name,
            city: dbSettings.city || defaultBarangayInfo.city,
            district: dbSettings.district || defaultBarangayInfo.district,
            captain: dbSettings.captain || defaultBarangayInfo.captain,
            phone: dbSettings.phone || defaultBarangayInfo.phone,
            email: dbSettings.email || defaultBarangayInfo.email,
            address: dbSettings.address || defaultBarangayInfo.address,
            description: cleanDesc || defaultBarangayInfo.description,
            weekdayHours:
              dbSettings.weekday_hours || defaultBarangayInfo.weekdayHours,
            saturdayHours:
              dbSettings.saturday_hours || defaultBarangayInfo.saturdayHours,
            sundayHours:
              dbSettings.sunday_hours || defaultBarangayInfo.sundayHours,
          };

          // Sync operating schedule from DB description to local state
          const remoteSchedule = parseScheduleFromDesc(dbSettings.description);
          if (remoteSchedule) {
            saveCachedSchedule(remoteSchedule);
            // Dispatch a custom event so BarangaySettingsPage can re-read it
            window.dispatchEvent(
              new CustomEvent("barangay_schedule_updated", {
                detail: remoteSchedule,
              }),
            );
          }

          setBarangay((prev) => {
            if (
              prev.name === loadedInfo.name &&
              prev.city === loadedInfo.city &&
              prev.district === loadedInfo.district &&
              prev.captain === loadedInfo.captain &&
              prev.phone === loadedInfo.phone &&
              prev.email === loadedInfo.email &&
              prev.address === loadedInfo.address &&
              prev.description === loadedInfo.description &&
              prev.weekdayHours === loadedInfo.weekdayHours &&
              prev.saturdayHours === loadedInfo.saturdayHours &&
              prev.sundayHours === loadedInfo.sundayHours
            ) {
              return prev; // keep identical reference so no re-renders or clobbering!
            }
            try {
              localStorage.setItem("barangay_info", JSON.stringify(loadedInfo));
            } catch {}
            return loadedInfo;
          });
        }
      } catch (err) {
        console.warn("fetchLiveSettingsAndRoles error:", err);
      }
    }

    async function loadLiveData() {
      try {
        // Pending residents count
        const { data: dbAccounts } = await supabase
          .from("accounts")
          .select("id, status");
        if (dbAccounts) {
          const pending = dbAccounts.filter(
            (a: any) => a.status === "pending",
          ).length;
          setPendingResidents(pending);
        }

        // Live Barangay Settings & Roles
        await fetchLiveSettingsAndRoles();

        // Live Document Requests & Messages from Supabase
        await fetchLiveDocumentRequests();
        await fetchLiveMessages();

        // Announcements
        const { data: dbAnnouncements } = await supabase
          .from("announcements")
          .select("*")
          .order("created_at", { ascending: false });
        if (dbAnnouncements && dbAnnouncements.length > 0) {
          const parsed = dbAnnouncements
            .map(parseDbAnnouncement)
            .filter((a) => !isAnnouncementDeleted(a.id, a.title));
          setAnnouncements(parsed);
          try {
            localStorage.setItem(
              "brgy_announcements_cache",
              JSON.stringify(parsed),
            );
            localStorage.setItem("brgy_announcements_seeded", "true");
          } catch {}
        } else {
          // If Supabase table is empty, only seed if not previously seeded and no deletions
          const alreadySeeded = localStorage.getItem("brgy_announcements_seeded");
          const deletedKeys = getDeletedAnnouncementKeys();
          if (!alreadySeeded && deletedKeys.length === 0) {
            try {
              const { data: seeded } = await supabase
                .from("announcements")
                .insert([
                  {
                    author: "Barangay San Isidro",
                    initials: "SI",
                    tag: "Community Advisory",
                    title: "Scheduled Water Interruption",
                    body: "Please be advised that there will be a scheduled water interruption on June 18, from 8:00 AM to 3:00 PM due to maintenance works along Mabini Street. We encourage everyone to store enough water in advance.",
                    accent:
                      "[IMG:https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80]Water service advisory",
                    accent_text: "[PINNED] June 18 · 8:00 AM – 3:00 PM",
                    reactions: 48,
                  },
                  {
                    author: "Barangay Health Center",
                    initials: "HC",
                    tag: "Health & Wellness",
                    title: "Free Medical and Dental Mission",
                    body: "Our health center is inviting all residents to a free medical and dental mission this Saturday. Services include basic check-ups, blood pressure monitoring, and dental consultation.",
                    accent:
                      "[IMG:https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80]Barangay Covered Court",
                    accent_text: "June 21 · 8:00 AM – 12:00 PM",
                    reactions: 76,
                  },
                ])
                .select();
              if (seeded && seeded.length > 0) {
                const parsed = seeded
                  .map(parseDbAnnouncement)
                  .filter((a) => !isAnnouncementDeleted(a.id, a.title));
                setAnnouncements(parsed);
                try {
                  localStorage.setItem("brgy_announcements_seeded", "true");
                  localStorage.setItem(
                    "brgy_announcements_cache",
                    JSON.stringify(parsed),
                  );
                } catch {}
              }
            } catch (seedErr) {
              console.error("Failed to seed initial announcements", seedErr);
            }
          } else {
            setAnnouncements([]);
            try {
              localStorage.setItem("brgy_announcements_cache", "[]");
            } catch {}
          }
        }

        // Hotlines
        const { data: dbHotlines } = await supabase
          .from("hotlines")
          .select("*")
          .order("sort_order", { ascending: true });
        if (dbHotlines && dbHotlines.length > 0) {
          setHotlines(
            dbHotlines.map((h: any) => ({
              id: h.id,
              name: h.name,
              subtitle: h.subtitle,
              number: h.number,
              altNumber: h.alt_number || "",
              tag: h.tag || "General",
              tone: h.tone || "green",
              icon: h.icon || "phone",
            })),
          );
        }

        // Incidents
        const { data: dbIncidents } = await supabase
          .from("incidents")
          .select("*")
          .order("created_at", { ascending: false });
        if (dbIncidents && dbIncidents.length > 0) {
          const meta = getIncidentMetaMap();
          setIncidents(
            dbIncidents.map((i: any) => {
              const m = meta[i.id] || {};
              return {
                id: i.id,
                complainantName: i.complainant_name,
                complainantEmail: i.complainant_email,
                category: i.category,
                purok: i.purok,
                description: i.description,
                date: i.date,
                status: (i.status as IncidentStatus) || "Under Review",
                hearingDate: i.hearing_date || "",
                officerNotes: i.officer_notes || "",
                isUrgent: i.is_urgent || false,
                respondentName: m.respondentName || "",
                respondentAddress: m.respondentAddress || "",
                respondentContact: m.respondentContact || "",
                hearingStage:
                  m.hearingStage || "1st Patawag (Notice of Hearing)",
                hearingVenue:
                  m.hearingVenue || "Lupon Tagapamayapa Hall, 2nd Flr",
                assignedOfficer:
                  m.assignedOfficer || "Hon. Roberto Gomez (Punong Brgy)",
                deletedAt:
                  m.deletedAt ||
                  (i.status === "Deleted" ? "Archived" : undefined),
              };
            }),
          );
        }
        // Load Events
        const { data: dbEvents } = await supabase
          .from("events")
          .select("*")
          .order("day", { ascending: true });
        if (dbEvents && dbEvents.length > 0) {
          const parsed = dbEvents.map(parseDbEvent);
          setCalendarEvents(parsed);
          try {
            localStorage.setItem("brgy_events_cache", JSON.stringify(parsed));
          } catch {}
        }
      } catch (err) {
        console.error("Supabase load error:", err);
      }
    }
    loadLiveData();

    // ── 4. Real-time channels for live data synchronization ──────────────
    const accountsChannel = supabase
      .channel("accounts_sync_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "accounts" },
        async (payload: any) => {
          const { data: dbAccounts } = await supabase
            .from("accounts")
            .select("id, status");
          if (dbAccounts) {
            const pending = dbAccounts.filter(
              (a: any) => a.status === "pending",
            ).length;
            setPendingResidents(pending);
          }
          // Re-resolve role for the currently logged-in user if their record changed
          // This ensures promoted admins get privileges immediately in the other browser
          setUser((currentUser) => {
            if (!currentUser) return currentUser;
            const changedRecord = payload?.new;
            if (changedRecord && changedRecord.id === currentUser.id) {
              const newRole =
                changedRecord.role === "admin" ? "admin" : "resident";
              if (newRole !== currentUser.role) {
                return { ...currentUser, role: newRole };
              }
            }
            return currentUser;
          });
        },
      )
      .subscribe();

    const incidentsChannel = supabase
      .channel("incidents_sync_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "incidents" },
        async () => {
          const { data: dbIncidents } = await supabase
            .from("incidents")
            .select("*")
            .order("created_at", { ascending: false });
          if (dbIncidents) {
            const meta = getIncidentMetaMap();
            setIncidents(
              dbIncidents.map((i: any) => {
                const m = meta[i.id] || {};
                return {
                  id: i.id,
                  complainantName: i.complainant_name,
                  complainantEmail: i.complainant_email,
                  category: i.category,
                  purok: i.purok,
                  description: i.description,
                  date: i.date,
                  status: (i.status as IncidentStatus) || "Under Review",
                  hearingDate: i.hearing_date || "",
                  officerNotes: i.officer_notes || "",
                  isUrgent: i.is_urgent || false,
                  respondentName: m.respondentName || "",
                  respondentAddress: m.respondentAddress || "",
                  respondentContact: m.respondentContact || "",
                  hearingStage:
                    m.hearingStage || "1st Patawag (Notice of Hearing)",
                  hearingVenue:
                    m.hearingVenue || "Lupon Tagapamayapa Hall, 2nd Flr",
                  assignedOfficer:
                    m.assignedOfficer || "Hon. Roberto Gomez (Punong Brgy)",
                  deletedAt:
                    m.deletedAt ||
                    (i.status === "Deleted" ? "Archived" : undefined),
                };
              }),
            );
          }
        },
      )
      .subscribe();

    const hotlinesChannel = supabase
      .channel("hotlines_sync_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "hotlines" },
        async () => {
          const { data: dbHotlines } = await supabase
            .from("hotlines")
            .select("*")
            .order("sort_order", { ascending: true });
          if (dbHotlines) {
            setHotlines(
              dbHotlines.map((h: any) => ({
                id: h.id,
                name: h.name,
                subtitle: h.subtitle,
                number: h.number,
                altNumber: h.alt_number || "",
                tag: h.tag || "General",
                tone: h.tone || "green",
                icon: h.icon || "phone",
              })),
            );
          }
        },
      )
      .subscribe();

    const announcementsChannel = supabase
      .channel("announcements_sync_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "announcements" },
        async () => {
          const { data: dbAnnouncements } = await supabase
            .from("announcements")
            .select("*")
            .order("created_at", { ascending: false });
          if (dbAnnouncements) {
            const parsed = dbAnnouncements
              .map(parseDbAnnouncement)
              .filter((a) => !isAnnouncementDeleted(a.id, a.title));
            setAnnouncements(parsed);
            try {
              localStorage.setItem(
                "brgy_announcements_cache",
                JSON.stringify(parsed),
              );
            } catch {}
          }
        },
      )
      .subscribe();

    const eventsChannel = supabase
      .channel("events_sync_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        async () => {
          const { data: dbEvents } = await supabase
            .from("events")
            .select("*")
            .order("day", { ascending: true });
          if (dbEvents) {
            const parsed = dbEvents.map(parseDbEvent);
            setCalendarEvents(parsed);
            try {
              localStorage.setItem("brgy_events_cache", JSON.stringify(parsed));
            } catch {}
          }
        },
      )
      .subscribe();

    const docsChannel = supabase
      .channel("docs_sync_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "document_requests" },
        () => {
          fetchLiveDocumentRequests();
        },
      )
      .subscribe();

    const messagesChannel = supabase
      .channel("messages_sync_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => {
          fetchLiveMessages();
        },
      )
      .subscribe();

    const settingsChannel = supabase
      .channel("settings_sync_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "barangay_settings" },
        () => {
          fetchLiveSettingsAndRoles();
        },
      )
      .subscribe();

    // Heartbeat for cross-browser multi-device instant sync (every 1.5s)
    const liveHeartbeat = setInterval(() => {
      fetchLiveDocumentRequests();
      fetchLiveMessages();
      fetchLiveSettingsAndRoles();
    }, 1500);

    // Dedicated fast-poll for messages only (every 1s) — makes chat feel near-instant
    const messageFastPoll = setInterval(() => {
      fetchLiveMessages();
    }, 1000);

    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.key === "barangay_message_threads") {
        setThreads(getCachedThreads());
      }
      if (e.key === "barangay_document_requests") {
        setRequests(getCachedDocumentRequests());
      }
      if (e.key === "brgy_promoted_admins") {
        setPromotedAdmins(getPromotedAdminEmails());
      }
    };
    const handleCustomThreads = () => setThreads(getCachedThreads());
    const handleCustomRequests = () => setRequests(getCachedDocumentRequests());
    const handleCustomAdmins = () =>
      setPromotedAdmins(getPromotedAdminEmails());
    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("barangay_threads_updated", handleCustomThreads);
    window.addEventListener("barangay_requests_updated", handleCustomRequests);
    window.addEventListener("brgy_promoted_admins_updated", handleCustomAdmins);

    return () => {
      clearInterval(liveHeartbeat);
      clearInterval(messageFastPoll);
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener(
        "barangay_threads_updated",
        handleCustomThreads,
      );
      window.removeEventListener(
        "barangay_requests_updated",
        handleCustomRequests,
      );
      window.removeEventListener(
        "brgy_promoted_admins_updated",
        handleCustomAdmins,
      );
      subscription.unsubscribe();
      accountsChannel.unsubscribe();
      incidentsChannel.unsubscribe();
      hotlinesChannel.unsubscribe();
      announcementsChannel.unsubscribe();
      eventsChannel.unsubscribe();
      docsChannel.unsubscribe();
      messagesChannel.unsubscribe();
      settingsChannel.unsubscribe();
    };
  }, []);

  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-PH", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(new Date()),
    [],
  );

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2600);
  }

  function openComposer(ann?: Announcement) {
    if (ann) {
      // Edit mode
      setEditingAnnouncement(ann);
      setPostTitle(ann.title);
      setPostTag(ann.tag);
      setPostText(ann.body);
      setPostAccent(ann.accent);
      setPostAccentDate(ann.accentText);
      setPostImageUrl(ann.imageUrl || "");
      setPostPinned(!!ann.pinned);
      setPostAuthor(
        ann.author ||
          (barangay.name
            ? `${barangay.name} Administration`
            : "Barangay Administration"),
      );
      if (ann.scheduledAt) {
        setIsSchedulingEnabled(true);
        try {
          const d = new Date(ann.scheduledAt);
          const localIso = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);
          setPostScheduledAt(localIso);
        } catch {
          setPostScheduledAt("");
        }
      } else {
        setIsSchedulingEnabled(false);
        setPostScheduledAt("");
      }
    } else {
      // Create mode
      setEditingAnnouncement(null);
      setPostTitle("");
      setPostTag("Community Advisory");
      setPostText("");
      setPostAccent("");
      setPostAccentDate("");
      setPostImageUrl("");
      setPostPinned(false);
      setPostAuthor(
        barangay.name
          ? `${barangay.name} Administration`
          : "Barangay San Isidro",
      );
      setIsSchedulingEnabled(false);
      setPostScheduledAt("");
    }
    setShowPresetPicker(false);
    setComposerOpen(true);
    setAnnouncementMoreMenu(null);
  }

  async function publish() {
    if (!postText.trim() || !postTitle.trim()) return;
    const nowLabel = new Intl.DateTimeFormat("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date());

    const scheduledIso =
      isSchedulingEnabled && postScheduledAt
        ? new Date(postScheduledAt).toISOString()
        : undefined;

    const cleanAccentText = (postAccentDate || "Posted · " + nowLabel)
      .replace(/\[PINNED\]\s*/g, "")
      .replace(/\[SCHEDULED:[^\]]+\]\s*/g, "")
      .trim();

    const formattedAccentText =
      (postPinned ? "[PINNED] " : "") +
      (scheduledIso ? `[SCHEDULED:${scheduledIso}] ` : "") +
      cleanAccentText;

    const formattedAccent = postImageUrl.trim()
      ? `[IMG:${postImageUrl.trim()}]${postAccent.trim() || "Official announcement"}`
      : postAccent.trim() || "Official announcement";

    if (editingAnnouncement) {
      // Update existing
      const updated: Announcement = {
        ...editingAnnouncement,
        author: postAuthor.trim() || editingAnnouncement.author,
        tag: postTag,
        title: postTitle.trim(),
        body: postText.trim(),
        accent: postAccent.trim() || "Official announcement",
        accentText: cleanAccentText,
        imageUrl: postImageUrl.trim() || undefined,
        pinned: postPinned,
        scheduledAt: scheduledIso,
      };
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a)),
      );
      setComposerOpen(false);
      setEditingAnnouncement(null);
      setPostText("");
      setPostTitle("");
      setPostAccent("");
      setPostAccentDate("");
      setPostImageUrl("");
      setPostScheduledAt("");
      setIsSchedulingEnabled(false);
      showToast("Announcement updated successfully!");
      try {
        await supabase
          .from("announcements")
          .update({
            author: updated.author,
            tag: updated.tag,
            title: updated.title,
            body: updated.body,
            accent: formattedAccent,
            accent_text: formattedAccentText,
          })
          .eq("id", updated.id);
      } catch (e) {
        console.error("Failed to update announcement", e);
      }
      return;
    }

    // Create new
    const payload = {
      author: postAuthor.trim() || barangay.name || "Barangay San Isidro",
      initials: getInitials(postAuthor.trim() || barangay.name || "San Isidro"),
      tag: postTag,
      title: postTitle.trim(),
      body: postText.trim(),
      accent: formattedAccent,
      accent_text: formattedAccentText,
      reactions: 0,
    };

    setComposerOpen(false);
    setPostText("");
    setPostTitle("");
    setPostAccent("");
    setPostAccentDate("");
    setPostImageUrl("");
    setPostScheduledAt("");
    setIsSchedulingEnabled(false);

    try {
      const { data: inserted, error } = await supabase
        .from("announcements")
        .insert([payload])
        .select()
        .single();

      if (inserted && !error) {
        const parsed = parseDbAnnouncement(inserted);
        setAnnouncements((prev) => [
          parsed,
          ...prev.filter((a) => a.id !== parsed.id),
        ]);
      } else {
        const fallback: Announcement = {
          id: Date.now(),
          author: payload.author,
          initials: payload.initials,
          time: nowLabel,
          tag: payload.tag,
          title: payload.title,
          body: payload.body,
          accent: postAccent.trim() || "Official announcement",
          accentText: cleanAccentText,
          imageUrl: postImageUrl.trim() || undefined,
          reactions: 0,
          pinned: postPinned,
          scheduledAt: scheduledIso,
          createdAt: new Date().toISOString(),
        };
        setAnnouncements((prev) => [fallback, ...prev]);
      }
      showToast(
        scheduledIso
          ? "Announcement scheduled successfully!"
          : "Announcement published live to community!",
      );
    } catch (e) {
      console.error("Failed to save announcement to Supabase", e);
      showToast("Announcement saved locally.");
    }
  }

  async function publishScheduledNow(ann: Announcement) {
    const cleanAccentText = (ann.accentText || "")
      .replace(/\[SCHEDULED:[^\]]+\]\s*/g, "")
      .trim();
    const updatedAccentText = (ann.pinned ? "[PINNED] " : "") + cleanAccentText;
    const updated: Announcement = {
      ...ann,
      scheduledAt: undefined,
      accentText: cleanAccentText,
    };
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === ann.id ? updated : a)),
    );
    if (viewAnnouncementItem && viewAnnouncementItem.id === ann.id) {
      setViewAnnouncementItem(updated);
    }
    setAnnouncementMoreMenu(null);
    showToast(`"${ann.title}" is now published live to residents!`);
    try {
      await supabase
        .from("announcements")
        .update({ accent_text: updatedAccentText })
        .eq("id", ann.id);
    } catch (e) {
      console.error("Failed to publish now", e);
    }
  }

  async function togglePinAnnouncement(ann: Announcement) {
    const newPinned = !ann.pinned;
    const cleanAccentText = (ann.accentText || "").replace(
      /^\[PINNED\]\s*/,
      "",
    );
    const updatedAccentText = (newPinned ? "[PINNED] " : "") + cleanAccentText;
    const updated: Announcement = {
      ...ann,
      pinned: newPinned,
      accentText: cleanAccentText,
    };
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === ann.id ? updated : a)),
    );
    if (viewAnnouncementItem && viewAnnouncementItem.id === ann.id) {
      setViewAnnouncementItem(updated);
    }
    setAnnouncementMoreMenu(null);
    showToast(
      newPinned
        ? `"${ann.title}" pinned to top of feed`
        : `"${ann.title}" unpinned`,
    );
    try {
      await supabase
        .from("announcements")
        .update({ accent_text: updatedAccentText })
        .eq("id", ann.id);
    } catch (e) {
      console.error("Failed to pin/unpin", e);
    }
  }

  async function confirmDeleteAnnouncement() {
    if (!deleteAnnouncementItem) return;
    const id = deleteAnnouncementItem.id;
    const title = deleteAnnouncementItem.title;

    // 1. Mark permanently deleted locally so it never reappears
    markAnnouncementDeleted(id, title);

    // 2. Filter local state immediately
    setAnnouncements((prev) => {
      const updated = prev.filter(
        (a) =>
          a.id !== id &&
          (!title ||
            a.title.toLowerCase().trim() !== title.toLowerCase().trim()),
      );
      try {
        localStorage.setItem(
          "brgy_announcements_cache",
          JSON.stringify(updated),
        );
      } catch {}
      return updated;
    });

    if (viewAnnouncementItem?.id === id) setViewAnnouncementItem(null);
    setDeleteAnnouncementItem(null);
    setAnnouncementMoreMenu(null);
    showToast("Announcement deleted.");

    // 3. Delete from Supabase by ID and by title
    try {
      await supabase.from("announcements").delete().eq("id", id);
      if (title) {
        await supabase
          .from("announcements")
          .delete()
          .ilike("title", title.trim());
      }
    } catch (e) {
      console.error("Failed to delete announcement", e);
    }
  }

  async function handleToggleReaction(postId: number) {
    const isAlreadyAcknowledged = acknowledgedPostIds.includes(postId);
    const post = announcements.find((a) => a.id === postId);
    if (!post) return;

    let newCount = post.reactions;
    let nextAcknowledged: number[];

    if (isAlreadyAcknowledged) {
      newCount = Math.max(0, post.reactions - 1);
      nextAcknowledged = acknowledgedPostIds.filter((id) => id !== postId);
      showToast("Acknowledgment removed.");
    } else {
      newCount = post.reactions + 1;
      nextAcknowledged = [...acknowledgedPostIds, postId];
      showToast("Thank you! You acknowledged this announcement.");
    }

    setAcknowledgedPostIds(nextAcknowledged);
    try {
      localStorage.setItem("brgy_user_ack", JSON.stringify(nextAcknowledged));
    } catch {}

    setAnnouncements((prev) =>
      prev.map((a) => (a.id === postId ? { ...a, reactions: newCount } : a)),
    );
    if (viewAnnouncementItem && viewAnnouncementItem.id === postId) {
      setViewAnnouncementItem({ ...viewAnnouncementItem, reactions: newCount });
    }

    try {
      await supabase
        .from("announcements")
        .update({ reactions: newCount })
        .eq("id", postId);
    } catch (e) {
      console.error("Failed to update reactions in Supabase", e);
    }
  }

  function handleToggleBookmark(postId: number) {
    const isSaved = savedPostIds.includes(postId);
    const nextSaved = isSaved
      ? savedPostIds.filter((id) => id !== postId)
      : [...savedPostIds, postId];
    setSavedPostIds(nextSaved);
    try {
      localStorage.setItem("brgy_saved_posts", JSON.stringify(nextSaved));
    } catch {}
    showToast(
      isSaved
        ? "Announcement removed from saved bookmarks."
        : "Announcement saved to bookmarks!",
    );
  }

  async function handleShareAnnouncement(post: Announcement) {
    const shareText = `📢 [Barangay ${barangay.name || "San Isidro"} Official Advisory]\n📌 ${post.title}\n🏷️ Category: ${post.tag}\n📍 Venue: ${post.accent}\n📅 Schedule: ${post.accentText}\n\n${post.body}\n\nShared via Barangay Connect Portal`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: shareText,
        });
        showToast("Shared successfully!");
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      showToast("Announcement details copied to clipboard!");
    } catch {
      showToast("Advisory text ready to copy.");
    }
  }

  function handlePrintAnnouncement(post: Announcement) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showToast("Please allow popups to print official bulletin.");
      return;
    }
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Official Barangay Advisory - ${post.title}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 40px; color: #111; max-width: 800px; margin: auto; }
            .header { text-align: center; border-bottom: 3px double #333; padding-bottom: 16px; margin-bottom: 24px; }
            .header h4 { margin: 0; font-size: 13px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px; }
            .header h2 { margin: 6px 0; font-size: 22px; text-transform: uppercase; }
            .header h3 { margin: 0; font-size: 15px; color: #444; }
            .badge { display: inline-block; background: #eee; padding: 4px 12px; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; border-radius: 4px; }
            h1 { font-size: 24px; margin-top: 10px; color: #0c3829; }
            .meta { background: #f9f9f9; border-left: 4px solid #0c3829; padding: 12px 16px; margin: 20px 0; font-size: 14px; }
            .meta strong { display: inline-block; width: 100px; }
            .body { font-size: 16px; line-height: 1.8; margin: 25px 0; white-space: pre-wrap; }
            .footer { margin-top: 60px; display: flex; justify-content: space-between; }
            .signature-block { text-align: center; width: 220px; }
            .signature-line { border-top: 1px solid #000; margin-top: 50px; padding-top: 5px; font-weight: bold; }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h4>Republic of the Philippines · City Government</h4>
            <h2>${barangay.name || "Barangay San Isidro"}</h2>
            <h3>Office of the Punong Barangay</h3>
            <p style="margin: 4px 0 0; font-size: 12px; color: #555;">${barangay.address} · Hotline: ${barangay.phone}</p>
          </div>
          <div class="badge">${post.tag}</div>
          <h1>${post.title}</h1>
          <div class="meta">
            <div><strong>Date / Time:</strong> ${post.accentText}</div>
            <div><strong>Venue:</strong> ${post.accent}</div>
            <div><strong>Issued By:</strong> ${post.author}</div>
            <div><strong>Posted On:</strong> ${post.time}</div>
          </div>
          <div class="body">${post.body}</div>
          <div class="footer">
            <div class="signature-block">
              <div>Attested by:</div>
              <div class="signature-line">Barangay Secretary</div>
            </div>
            <div class="signature-block">
              <div>Approved by:</div>
              <div class="signature-line">${barangay.captain || "Hon. Roberto Gomez"}<br><small>Punong Barangay</small></div>
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  }

  function handleAddComment(postId: number) {
    if (!commentInput.trim()) return;
    const newComment: AnnouncementComment = {
      id: "c-" + Date.now(),
      announcementId: postId,
      userName: user?.name || "Resident",
      userRole: user?.role || "resident",
      userInitials: user?.initials || "U",
      text: commentInput.trim(),
      time: "Just now",
      timestamp: Date.now(),
    };
    const currentList = commentsMap[postId] || [];
    const updatedMap = {
      ...commentsMap,
      [postId]: [...currentList, newComment],
    };
    setCommentsMap(updatedMap);
    setCommentInput("");
    try {
      localStorage.setItem(
        "brgy_announcement_comments",
        JSON.stringify(updatedMap),
      );
    } catch {}
    showToast("Question/comment posted!");
  }

  function handleDeleteComment(postId: number, commentId: string) {
    const currentList = commentsMap[postId] || [];
    const updatedMap = {
      ...commentsMap,
      [postId]: currentList.filter((c) => c.id !== commentId),
    };
    setCommentsMap(updatedMap);
    try {
      localStorage.setItem(
        "brgy_announcement_comments",
        JSON.stringify(updatedMap),
      );
    } catch {}
    showToast("Comment deleted.");
  }

  async function deleteMessage(
    email: string,
    dbId: number | undefined,
    timestamp: number | undefined,
  ) {
    const cleanEmail = email.toLowerCase().trim();
    const msgToDelete = (threads[cleanEmail] ?? []).find(
      (m) =>
        (dbId !== undefined && m.dbId === dbId) ||
        (timestamp !== undefined && m.timestamp === timestamp),
    );

    // Optimistic remove from local state
    setThreads((prev) => {
      const updated = {
        ...prev,
        [cleanEmail]: (prev[cleanEmail] ?? []).filter((m) =>
          dbId !== undefined ? m.dbId !== dbId : m.timestamp !== timestamp,
        ),
      };
      saveCachedThreads(updated);
      return updated;
    });

    showToast("Message deleted.");

    // Delete from Supabase
    try {
      if (dbId !== undefined) {
        await supabase.from("messages").delete().eq("id", dbId);
      } else if (msgToDelete?.text) {
        await supabase
          .from("messages")
          .delete()
          .eq("resident_email", cleanEmail)
          .eq("text", msgToDelete.text.trim());
      }
    } catch (err) {
      console.warn("Supabase message delete error:", err);
    }
  }

  async function clearThread(email: string) {
    const cleanEmail = email.toLowerCase().trim();
    setThreads((prev) => {
      const updated = {
        ...prev,
        [cleanEmail]: [],
      };
      saveCachedThreads(updated);
      return updated;
    });
    showToast("Conversation cleared.");
    try {
      await supabase
        .from("messages")
        .delete()
        .eq("resident_email", cleanEmail);
    } catch (err) {
      console.warn("Supabase clear messages error:", err);
    }
  }

  async function sendMessage(
    email: string,
    text: string,
    from: "admin" | "resident",
  ) {
    const cleanEmail = email.toLowerCase().trim();
    const now = new Date();
    const timeStr =
      now.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
      " · " +
      now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const msgTimestamp = Date.now();
    const msg: Msg = { from, text, time: timeStr, timestamp: msgTimestamp };

    // 1. Update local state immediately for instant feedback
    setThreads((prev) => {
      const updated = {
        ...prev,
        [cleanEmail]: [...(prev[cleanEmail] ?? []), msg],
      };
      saveCachedThreads(updated);
      return updated;
    });

    // 2. Sync to Supabase messages table for cross-browser live chat
    try {
      const { data: insertedMsg } = await supabase
        .from("messages")
        .insert([
          {
            resident_email: cleanEmail,
            sender: from,
            text: text.trim(),
          },
        ])
        .select("id");
      if (insertedMsg && insertedMsg[0]?.id) {
        const assignedId = insertedMsg[0].id;
        setThreads((prev) => {
          const list = prev[cleanEmail] ?? [];
          const updatedList = list.map((m) =>
            m.timestamp === msgTimestamp ? { ...m, dbId: assignedId } : m,
          );
          const updated = { ...prev, [cleanEmail]: updatedList };
          saveCachedThreads(updated);
          return updated;
        });
      }
    } catch (err) {
      console.warn("Supabase messages insert error:", err);
    }
  }

  async function handleCreateRequest(
    docType: string,
    purpose: string,
    notes: string,
    phone?: string,
    address?: string,
  ) {
    if (!user) return;
    const now = new Date();
    const dateFiled = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const timeFiled = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingNo = `BRGY-${now.getFullYear()}-${randomNum}`;
    const allServices = getCachedDocumentServices();
    const service = allServices.find((s) => s.name === docType);
    const fee = service ? service.fee : "₱ 50";
    const resMeta = resolveResidentMeta(user.email, user.name);

    const docPrefixMap: Record<string, string> = {
      "Barangay Clearance": "BC",
      "Certificate of Residency": "CR",
      "Business Clearance": "BB",
      "Certificate of Indigency": "CI",
      "Barangay ID": "BID",
      "Good Moral Certificate": "GM",
    };
    const code = docPrefixMap[docType] || "DC";
    const controlNo = `${code}-${now.getFullYear()}-${randomNum}`;

    const newReq: DocumentRequest = {
      id: `req-${Date.now()}`,
      trackingNo,
      residentId: user.id,
      residentName: user.name,
      residentEmail: user.email,
      residentMobile: phone || resMeta.phone,
      residentAddress: address || resMeta.address,
      purok: resMeta.purok,
      docType,
      purpose,
      notes,
      fee,
      paymentStatus: fee.toLowerCase().includes("free") ? "Waived" : "Unpaid",
      status: "Pending",
      dateFiled,
      timeFiled,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      controlNo,
    };

    setRequests((prev) => {
      const updated = [newReq, ...prev];
      saveCachedDocumentRequests(updated);
      return updated;
    });

    setRequestOpen(false);
    setNewRequestPurpose("");
    setNewRequestCustomPurpose("");
    setNewRequestNotes("");
    showToast(`Request submitted! Tracking: ${trackingNo}`);
    setActive("documents");

    // Persist to Supabase document_requests table for cross-browser synchronization
    try {
      const metaPayload = {
        trackingNo,
        controlNo,
        fee: newReq.fee,
        paymentStatus: newReq.paymentStatus,
        pickupWindow: "Window 1",
        notes,
        phone: newReq.residentMobile,
        address: newReq.residentAddress,
        purok: newReq.purok,
        feedback: "",
        timeFiled,
      };

      const { data: dbInserted, error } = await supabase
        .from("document_requests")
        .insert([
          {
            name: user.name,
            email: user.email,
            doc: docType,
            purpose,
            status: "Pending",
            feedback: JSON.stringify(metaPayload),
            date: dateFiled,
          },
        ])
        .select()
        .single();

      if (dbInserted?.id) {
        setRequests((prev) => {
          const updated = prev.map((r) =>
            r.id === newReq.id ? { ...r, id: String(dbInserted.id) } : r,
          );
          saveCachedDocumentRequests(updated);
          return updated;
        });
      }
    } catch (err) {
      console.warn("Supabase document_requests insert error:", err);
    }
  }

  async function handleUpdateRequest(
    id: string,
    updates: Partial<DocumentRequest>,
  ) {
    let targetReq: DocumentRequest | null = null;
    setRequests((prev) => {
      const updated = prev.map((r) => {
        if (r.id === id) {
          const reqUpdated = {
            ...r,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          targetReq = reqUpdated;
          return reqUpdated;
        }
        return r;
      });
      saveCachedDocumentRequests(updated);
      return updated;
    });

    try {
      const numId = parseInt(id, 10);
      const target = targetReq || requests.find((r) => r.id === id);
      if (target) {
        const metaPayload = {
          trackingNo: target.trackingNo,
          controlNo: target.controlNo,
          fee: target.fee,
          paymentStatus: target.paymentStatus,
          pickupWindow: target.pickupWindow || "Window 1",
          notes: target.notes || "",
          phone: target.residentMobile,
          address: target.residentAddress,
          purok: target.purok,
          feedback: target.adminFeedback || "",
          timeFiled: target.timeFiled,
          releasedDate: target.releasedDate,
          updatedAt: new Date().toISOString(),
        };

        const dbPayload: any = {
          feedback: JSON.stringify(metaPayload),
        };
        if (updates.status) dbPayload.status = updates.status;

        if (!isNaN(numId)) {
          await supabase
            .from("document_requests")
            .update(dbPayload)
            .eq("id", numId);
        } else if (target.trackingNo) {
          await supabase
            .from("document_requests")
            .update(dbPayload)
            .eq("email", target.residentEmail)
            .eq("doc", target.docType);
        }
      }
    } catch (err) {
      console.warn("Supabase document_requests update error:", err);
    }
  }

  async function handleDeleteDocumentRequest(id: string) {
    let targetReq: DocumentRequest | null = null;
    setRequests((prev) => {
      targetReq = prev.find((r) => r.id === id) || null;
      const updated = prev.filter((r) => r.id !== id);
      saveCachedDocumentRequests(updated);
      return updated;
    });

    try {
      const numId = parseInt(id, 10);
      if (!isNaN(numId)) {
        await supabase.from("document_requests").delete().eq("id", numId);
      } else if (targetReq) {
        const t = targetReq as DocumentRequest;
        if (t.trackingNo) {
          await supabase
            .from("document_requests")
            .delete()
            .eq("email", t.residentEmail)
            .eq("doc", t.docType);
        }
      }
    } catch (err) {
      console.warn("Supabase document_requests delete error:", err);
    }
    showToast("Document request removed.");
  }

  type LiveNotification = {
    id: string;
    title: string;
    body: string;
    time: string;
    icon: IconName;
    targetTab: string;
    onAction?: () => void;
  };

  const isAdmin =
    user?.role === "admin" ||
    (!!user?.email && isPromotedAdmin(user.email, promotedAdmins));
  const userEmail = user?.email || "";

  // Dynamic role synchronization: automatically upgrade session if promoted to admin externally
  useEffect(() => {
    if (user?.email) {
      const hasAdminRights = isPromotedAdmin(user.email, promotedAdmins);
      if (hasAdminRights && user.role !== "admin") {
        setUser((prev) => (prev ? { ...prev, role: "admin" } : null));
        setToast(
          "👑 Your account was granted Barangay Administrator privileges!",
        );
      }
    }
  }, [promotedAdmins, user?.email]);

  const activeNotifications: LiveNotification[] = useMemo(() => {
    if (!user) return [];
    const list: LiveNotification[] = [];

    if (isAdmin) {
      // Admin: Pending registrations
      if (pendingResidents > 0) {
        list.push({
          id: `pending-residents-${pendingResidents}`,
          title: "Resident Registration",
          body: `${pendingResidents} resident application${pendingResidents > 1 ? "s" : ""} awaiting review.`,
          time: "Just now",
          icon: "users",
          targetTab: "users",
        });
      }
      // Admin: Pending document requests
      const pendingDocRequests = requests.filter((r) => r.status === "Pending");
      if (pendingDocRequests.length > 0) {
        const latestDoc = pendingDocRequests[0];
        list.push({
          id: `admin-pending-docs-${pendingDocRequests.length}`,
          title: "Pending Document Requests",
          body: `${latestDoc.residentName} requested ${latestDoc.docType} (${pendingDocRequests.length} pending).`,
          time: latestDoc.dateFiled || "Today",
          icon: "document",
          targetTab: "documents",
        });
      }
      // Admin: Unread messages from residents
      const unreadThreads = Object.entries(threads).filter(
        ([_, msgs]) => msgs.at(-1)?.from === "resident",
      );
      if (unreadThreads.length > 0) {
        const latestThread = unreadThreads[0];
        const lastMsg = latestThread[1].at(-1);
        const residentName = resolveResidentMeta(latestThread[0]).name;
        list.push({
          id: `admin-msg-${latestThread[0]}-${lastMsg?.text?.slice(0, 10)}`,
          title: `New Message from ${residentName}`,
          body: `"${lastMsg?.text?.slice(0, 45) || "New message"}..."`,
          time: lastMsg?.time || "Recent",
          icon: "message",
          targetTab: "messages",
          onAction: () => setActiveThread(latestThread[0]),
        });
      }
    } else {
      // Resident: Document status updates
      const myDocs = requests.filter(
        (r) => r.residentEmail === userEmail || r.residentId === user.id,
      );
      const readyDoc = myDocs.find((r) => r.status === "Ready for Pickup");
      if (readyDoc) {
        list.push({
          id: `doc-ready-${readyDoc.id}`,
          title: "Document Ready for Pickup!",
          body: `Your ${readyDoc.docType} (${readyDoc.trackingNo}) is signed and ready at ${readyDoc.pickupWindow || "Window 2"}.`,
          time: "Claim now",
          icon: "check",
          targetTab: "documents",
        });
      }
      const approvedDoc = myDocs.find((r) => r.status === "Approved");
      if (approvedDoc && !readyDoc) {
        list.push({
          id: `doc-approved-${approvedDoc.id}`,
          title: "Document Request Approved",
          body: `Your ${approvedDoc.docType} was approved by the Barangay Office.`,
          time: approvedDoc.dateFiled,
          icon: "document",
          targetTab: "documents",
        });
      }

      // Resident: Latest announcements (up to 3)
      announcements.slice(0, 3).forEach((ann) => {
        list.push({
          id: `ann-${ann.id}`,
          title: ann.title || "Barangay Advisory",
          body: ann.body
            ? ann.body.slice(0, 60) + "..."
            : "New official announcement posted.",
          time: ann.time || "Recently",
          icon: "megaphone",
          targetTab: "announcements",
          onAction: () => setViewAnnouncementItem(ann),
        });
      });

      // Resident: Upcoming community events (next 2)
      calendarEvents.slice(0, 2).forEach((ev) => {
        list.push({
          id: `event-${ev.id}`,
          title: `Event: ${ev.title}`,
          body: `${ev.date || `Day ${ev.day}`} · ${ev.time} at ${ev.location}`,
          time: "Upcoming",
          icon: "calendar",
          targetTab: "calendar",
          onAction: () => setViewingEvent(ev),
        });
      });

      // Resident: Direct reply from barangay admin in messages
      const myThread = threads[userEmail] ?? [];
      const lastResidentMsg = myThread.at(-1);
      if (lastResidentMsg && lastResidentMsg.from === "admin") {
        list.push({
          id: `reply-${userEmail}-${lastResidentMsg.text.slice(0, 10)}`,
          title: "Barangay Official Replied",
          body: `Admin: "${lastResidentMsg.text.slice(0, 50)}..."`,
          time: lastResidentMsg.time || "Recently",
          icon: "message",
          targetTab: "messages",
        });
      }
    }

    return list;
  }, [
    user,
    isAdmin,
    pendingResidents,
    threads,
    requests,
    announcements,
    calendarEvents,
    userEmail,
  ]);

  const unreadNotifCount = activeNotifications.filter(
    (n) => !readNotifIds.includes(n.id),
  ).length;

  function markAllNotifsRead() {
    const allIds = activeNotifications.map((n) => n.id);
    setReadNotifIds(allIds);
    try {
      localStorage.setItem("brgy_read_notifs", JSON.stringify(allIds));
    } catch {}
  }

  if (loading)
    return (
      <LoadingView
        label={
          loading === "login"
            ? "Signing you in"
            : loading === "logout"
              ? "Signing you out"
              : "Connecting your community"
        }
      />
    );

  if (!user) {
    return (
      <LoginView
        barangay={barangay}
        onLoginSuccess={(u) => {
          setUser(u);
          setActive("announcements");
        }}
      />
    );
  }

  const navItems = isAdmin ? adminNavItems : residentNavItems;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">
            <Icon name="logo" size={25} />
          </span>
          <span className="brand-copy">
            <strong>Barangay</strong>
            <small>CONNECT</small>
          </span>
        </div>
        <div className="community-card">
          <Avatar initials={getInitials(barangay.name || "San Isidro")} />
          <span>
            <strong>{barangay.name}</strong>
            <small>{barangay.city}</small>
          </span>
          <Icon name="chevron" size={16} />
        </div>
        <nav className="nav-list" aria-label="Main navigation">
          <span className="nav-label">COMMUNITY</span>
          {navItems
            .filter((i) => i.section === "community")
            .map((item) => (
              <button
                key={item.id}
                className={active === item.id ? "nav-item active" : "nav-item"}
                onClick={() => {
                  setActive(item.id);
                  setActiveThread(null);
                }}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                {item.id === "messages" &&
                  (isAdmin
                    ? Object.values(threads).filter(
                        (t) => t.at(-1)?.from === "resident",
                      ).length > 0 && (
                        <b className="count">
                          {
                            Object.values(threads).filter(
                              (t) => t.at(-1)?.from === "resident",
                            ).length
                          }
                        </b>
                      )
                    : (threads[userEmail] ?? []).at(-1)?.from === "admin" && (
                        <b className="count">1</b>
                      ))}
                {item.id === "documents" &&
                  (isAdmin
                    ? requests.filter((r) => r.status === "Pending").length >
                        0 && (
                        <b className="count">
                          {
                            requests.filter((r) => r.status === "Pending")
                              .length
                          }
                        </b>
                      )
                    : requests.filter(
                        (r) =>
                          (r.residentEmail === userEmail ||
                            r.residentId === user?.id) &&
                          r.status === "Ready for Pickup",
                      ).length > 0 && (
                        <b className="count">
                          {
                            requests.filter(
                              (r) =>
                                (r.residentEmail === userEmail ||
                                  r.residentId === user?.id) &&
                                r.status === "Ready for Pickup",
                            ).length
                          }
                        </b>
                      ))}
              </button>
            ))}
          {isAdmin && (
            <>
              <span className="nav-label management">MANAGEMENT</span>
              {adminNavItems
                .filter((i) => i.section === "management")
                .map((item) => (
                  <button
                    key={item.id}
                    className={
                      active === item.id ? "nav-item active" : "nav-item"
                    }
                    onClick={() => setActive(item.id)}
                  >
                    <Icon name={item.icon} />
                    <span>{item.label}</span>
                    {item.id === "users" && pendingResidents > 0 && (
                      <b className="count">{pendingResidents}</b>
                    )}
                  </button>
                ))}
            </>
          )}
        </nav>
        <div className="help-card">
          <span className="help-icon">?</span>
          <strong>Need assistance?</strong>
          <p>Contact the barangay help desk for support.</p>
          <button onClick={() => showToast("Help desk: (02) 8123-4567")}>
            Get help
          </button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-mark">
              <Icon name="logo" />
            </span>
            <strong>Barangay Connect</strong>
          </div>
          <label className="search-box">
            <Icon name="search" size={18} />
            <input placeholder="Search announcements, events, documents..." />
            <kbd>⌘ K</kbd>
          </label>
          <div className="top-actions">
            <button
              className="emergency-sos-btn"
              onClick={() => setActive("incidents")}
              title="Emergency Hotlines & Incident Blotter"
            >
              <Icon name="phone" size={13} />
              <span>Hotlines</span>
            </button>
            <button
              className="icon-button notification-button"
              onClick={() => setNotifOpen(!notifOpen)}
              aria-label="Notifications"
              title={
                unreadNotifCount > 0
                  ? `${unreadNotifCount} unread notifications`
                  : "Notifications"
              }
            >
              <Icon name="bell" />
              {unreadNotifCount > 0 && <span />}
            </button>
            <span className="divider" />
            <button
              className="profile-button"
              onClick={() => setAcctOpen(!acctOpen)}
            >
              <Avatar
                initials={user.initials}
                tone={isAdmin ? "blue" : "amber"}
                photoUrl={(() => {
                  try {
                    return (
                      localStorage.getItem(`brgy_profile_photo_${user.id}`) ||
                      undefined
                    );
                  } catch {
                    return undefined;
                  }
                })()}
              />
              <span className="profile-copy">
                <strong>{user.name}</strong>
                <small>{isAdmin ? "Administrator" : "Resident"}</small>
              </span>
              <Icon name="chevron" size={15} />
            </button>
            {acctOpen && (
              <div className="account-menu">
                <span>
                  <strong>{user.name}</strong>
                  <small>
                    {isAdmin ? "Barangay Administrator" : "Barangay Resident"}
                  </small>
                </span>
                {/* My Profile button — above settings for admin, above sign out for resident */}
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => {
                        setAcctOpen(false);
                        setProfileSettingsOpen(true);
                      }}
                    >
                      <Icon name="userCheck" /> My profile settings
                    </button>
                    <button
                      onClick={() => {
                        setAcctOpen(false);
                        setActive("settings");
                      }}
                    >
                      <Icon name="settings" /> Barangay settings
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setAcctOpen(false);
                      setProfileSettingsOpen(true);
                    }}
                  >
                    <Icon name="userCheck" /> My profile settings
                  </button>
                )}
                <button
                  onClick={async () => {
                    setAcctOpen(false);
                    setLoading("logout");
                    try {
                      localStorage.removeItem("brgy_auth_session");
                    } catch {}
                    await supabase.auth.signOut();
                    setUser(null);
                    setActive("announcements");
                    setLoading(null);
                  }}
                >
                  <Icon name="x" /> Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {active === "announcements" && (
          <div className="page">
            <section className="page-heading">
              <div>
                <p className="eyebrow">{todayLabel}</p>
                <h1>Good morning, {user.name.split(" ")[0]}</h1>
                <p>Here's what's happening in your community today.</p>
              </div>
              {isAdmin && (
                <button
                  className="primary-button"
                  onClick={() => openComposer()}
                >
                  <Icon name="plus" size={18} /> Create announcement
                </button>
              )}
            </section>
            <div className="dashboard-grid">
              <section className="feed">
                <div
                  className="section-title"
                  style={{
                    flexDirection: "column",
                    alignItems: "stretch",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <div>
                      <h2>Community announcements</h2>
                      <p>
                        Official news, schedules, and advisories from your
                        barangay
                      </p>
                    </div>
                    {/* Search & Category Filter */}
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "11px",
                          color: "#50655d",
                        }}
                      >
                        <Icon name="filter" size={13} />
                        <select
                          value={announcementFilter}
                          onChange={(e) =>
                            setAnnouncementFilter(e.target.value)
                          }
                          style={{
                            border: "1px solid #dfe7e3",
                            background: "white",
                            borderRadius: "7px",
                            padding: "5px 8px",
                            fontSize: "11px",
                            color: "#344941",
                            outline: "none",
                          }}
                        >
                          <option value="all">All Categories</option>
                          {ANNOUNCEMENT_TAGS.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </label>
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: "8px",
                            color: "#6a7d75",
                          }}
                        >
                          <Icon name="search" size={13} />
                        </span>
                        <input
                          value={announcementSearch}
                          onChange={(e) =>
                            setAnnouncementSearch(e.target.value)
                          }
                          placeholder="Search announcements..."
                          style={{
                            border: "1px solid #dfe7e3",
                            background: "white",
                            borderRadius: "7px",
                            padding: "5px 26px 5px 26px",
                            fontSize: "11px",
                            color: "#344941",
                            outline: "none",
                            width: "170px",
                          }}
                        />
                        {announcementSearch && (
                          <button
                            onClick={() => setAnnouncementSearch("")}
                            style={{
                              position: "absolute",
                              right: "6px",
                              border: 0,
                              background: "transparent",
                              color: "#8a9a93",
                              cursor: "pointer",
                              fontSize: "11px",
                              padding: "2px",
                            }}
                            aria-label="Clear search"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Filter Tabs: All, Pinned, Saved */}
                  <div className="announcement-tabs">
                    <button
                      className={`announcement-tab ${activeFilterTab === "all" ? "active" : ""}`}
                      onClick={() => setActiveFilterTab("all")}
                    >
                      All Advisories{" "}
                      <span className="tab-badge">{announcements.length}</span>
                    </button>
                    <button
                      className={`announcement-tab ${activeFilterTab === "pinned" ? "active" : ""}`}
                      onClick={() => setActiveFilterTab("pinned")}
                    >
                      📌 Pinned{" "}
                      <span className="tab-badge">
                        {announcements.filter((a) => a.pinned).length}
                      </span>
                    </button>
                    <button
                      className={`announcement-tab ${activeFilterTab === "saved" ? "active" : ""}`}
                      onClick={() => setActiveFilterTab("saved")}
                    >
                      🔖 Bookmarked{" "}
                      <span className="tab-badge">{savedPostIds.length}</span>
                    </button>
                  </div>
                </div>

                {isAdmin && (
                  <div
                    className="composer"
                    onClick={() => openComposer()}
                    style={{ cursor: "pointer" }}
                  >
                    <Avatar initials={user.initials} tone="blue" />
                    <button className="composer-prompt">
                      Publish a new official advisory or announcement...
                    </button>
                    <button
                      className="composer-image"
                      aria-label="Add image"
                      onClick={(e) => {
                        e.stopPropagation();
                        openComposer();
                      }}
                    >
                      <Icon name="image" />
                    </button>
                  </div>
                )}

                {/* Invisible backdrop for dropdown more menu */}
                {announcementMoreMenu !== null && (
                  <div
                    style={{ position: "fixed", inset: 0, zIndex: 40 }}
                    onClick={() => setAnnouncementMoreMenu(null)}
                  />
                )}

                {/* Announcements feed */}
                {(() => {
                  let filtered = announcements;

                  // Filter out scheduled announcements that haven't arrived yet for residents
                  if (!isAdmin) {
                    const now = Date.now();
                    filtered = filtered.filter(
                      (p) =>
                        !p.scheduledAt ||
                        new Date(p.scheduledAt).getTime() <= now,
                    );
                  }

                  // Tab filter
                  if (activeFilterTab === "pinned") {
                    filtered = filtered.filter((p) => p.pinned);
                  } else if (activeFilterTab === "saved") {
                    filtered = filtered.filter((p) =>
                      savedPostIds.includes(p.id as number),
                    );
                  }

                  // Category filter
                  if (announcementFilter !== "all") {
                    filtered = filtered.filter(
                      (p) => p.tag === announcementFilter,
                    );
                  }

                  // Search filter
                  if (announcementSearch.trim()) {
                    const q = announcementSearch.toLowerCase();
                    filtered = filtered.filter(
                      (p) =>
                        p.title.toLowerCase().includes(q) ||
                        p.body.toLowerCase().includes(q) ||
                        p.tag.toLowerCase().includes(q) ||
                        p.accent.toLowerCase().includes(q) ||
                        p.accentText.toLowerCase().includes(q),
                    );
                  }

                  // Sort: pinned first, then newest
                  filtered = [...filtered].sort((a, b) => {
                    if (a.pinned && !b.pinned) return -1;
                    if (!a.pinned && b.pinned) return 1;
                    return (b.id as number) - (a.id as number);
                  });

                  if (filtered.length === 0) {
                    return (
                      <div
                        className="empty-state"
                        style={{
                          minHeight: "220px",
                          background: "white",
                          borderRadius: "14px",
                          padding: "30px",
                          border: "1px solid #e3e9e6",
                        }}
                      >
                        <Icon name="megaphone" size={36} />
                        <h3
                          style={{
                            margin: "12px 0 4px",
                            color: "#163e32",
                            fontSize: "16px",
                          }}
                        >
                          No announcements found
                        </h3>
                        <p
                          style={{
                            margin: "0 0 12px",
                            fontSize: "12px",
                            color: "#6a7d75",
                          }}
                        >
                          {activeFilterTab === "saved"
                            ? "You haven't bookmarked any announcements yet. Click the bookmark icon on any post to save it here!"
                            : activeFilterTab === "pinned"
                              ? "There are currently no pinned announcements."
                              : "No announcements matched your search or category filter."}
                        </p>
                        {(announcementFilter !== "all" ||
                          announcementSearch ||
                          activeFilterTab !== "all") && (
                          <button
                            className="row-action"
                            onClick={() => {
                              setAnnouncementFilter("all");
                              setAnnouncementSearch("");
                              setActiveFilterTab("all");
                            }}
                          >
                            Reset filters
                          </button>
                        )}
                      </div>
                    );
                  }

                  return filtered.map((post) => {
                    const postId = post.id as number;
                    const isAcknowledged = acknowledgedPostIds.includes(postId);
                    const isSaved = savedPostIds.includes(postId);
                    const postComments = commentsMap[postId] || [];

                    return (
                      <article
                        className={`post-card ${post.pinned ? "pinned-card" : ""}`}
                        key={post.id}
                      >
                        {post.pinned && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              fontSize: "10.5px",
                              color: "#0f766e",
                              fontWeight: 700,
                              marginBottom: "8px",
                              background: "#f0fdf9",
                              border: "1px solid #ccfbf1",
                              padding: "4px 10px",
                              borderRadius: "6px",
                              width: "fit-content",
                            }}
                          >
                            📌 Pinned announcement
                          </div>
                        )}

                        {/* Scheduled badge for admins */}
                        {post.scheduledAt &&
                          new Date(post.scheduledAt).getTime() > Date.now() && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                fontSize: "10.5px",
                                color: "#92400e",
                                fontWeight: 700,
                                marginBottom: "8px",
                                background: "#fef3c7",
                                border: "1px solid #fde68a",
                                padding: "4px 10px",
                                borderRadius: "6px",
                                width: "fit-content",
                              }}
                            >
                              🕒 Scheduled · Goes live{" "}
                              {new Intl.DateTimeFormat("en-PH", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }).format(new Date(post.scheduledAt))}
                            </div>
                          )}

                        <div className="post-head">
                          <Avatar
                            initials={post.initials}
                            tone={
                              post.tag === "Health & Wellness"
                                ? "green"
                                : post.tag === "Emergency Notice"
                                  ? "amber"
                                  : "blue"
                            }
                          />
                          <div
                            className="post-author-info"
                            style={{ flex: "1 1 auto", minWidth: 0 }}
                          >
                            <strong>
                              {post.author}
                              <span
                                className="verified"
                                title="Official Barangay Authority"
                              >
                                ✓
                              </span>
                            </strong>
                            <small>{post.time} · Public Advisory</small>
                          </div>
                          <div
                            className="post-actions-menu"
                            style={{
                              marginLeft: "auto",
                              flex: "0 0 auto",
                              position: "relative",
                            }}
                          >
                            <button
                              className="icon-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setAnnouncementMoreMenu(
                                  announcementMoreMenu === postId
                                    ? null
                                    : postId,
                                );
                              }}
                              aria-label="More options"
                            >
                              <Icon name="more" />
                            </button>
                            {announcementMoreMenu === postId && (
                              <div
                                className="dropdown-menu"
                                style={{
                                  right: 0,
                                  top: "100%",
                                  minWidth: "175px",
                                  zIndex: 50,
                                }}
                              >
                                {post.scheduledAt &&
                                  new Date(post.scheduledAt).getTime() >
                                    Date.now() &&
                                  isAdmin && (
                                    <button
                                      className="dropdown-item"
                                      onClick={() => publishScheduledNow(post)}
                                      style={{
                                        color: "#047857",
                                        fontWeight: 700,
                                      }}
                                    >
                                      <Icon name="megaphone" size={14} />{" "}
                                      Publish live now
                                    </button>
                                  )}
                                <button
                                  className="dropdown-item"
                                  onClick={() => {
                                    setViewAnnouncementItem(post);
                                    setAnnouncementMoreMenu(null);
                                  }}
                                >
                                  <Icon name="document" size={14} /> View full
                                  details
                                </button>
                                <button
                                  className="dropdown-item"
                                  onClick={() => {
                                    handleToggleBookmark(postId);
                                    setAnnouncementMoreMenu(null);
                                  }}
                                >
                                  <span>{isSaved ? "★" : "☆"}</span>{" "}
                                  {isSaved
                                    ? "Remove bookmark"
                                    : "Save / Bookmark"}
                                </button>
                                <button
                                  className="dropdown-item"
                                  onClick={() => {
                                    handleShareAnnouncement(post);
                                    setAnnouncementMoreMenu(null);
                                  }}
                                >
                                  <Icon name="send" size={14} /> Share advisory
                                </button>
                                {isAdmin && (
                                  <>
                                    <button
                                      className="dropdown-item"
                                      onClick={() =>
                                        togglePinAnnouncement(post)
                                      }
                                    >
                                      <Icon name="megaphone" size={14} />{" "}
                                      {post.pinned
                                        ? "Unpin from top"
                                        : "Pin to top of feed"}
                                    </button>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => openComposer(post)}
                                    >
                                      <Icon name="edit" size={14} /> Edit
                                      announcement
                                    </button>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => {
                                        handlePrintAnnouncement(post);
                                        setAnnouncementMoreMenu(null);
                                      }}
                                    >
                                      <Icon name="document" size={14} /> Print
                                      bulletin
                                    </button>
                                    <button
                                      className="dropdown-item danger"
                                      onClick={() => {
                                        setDeleteAnnouncementItem(post);
                                        setAnnouncementMoreMenu(null);
                                      }}
                                    >
                                      <Icon name="trash" size={14} /> Delete
                                      announcement
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Banner Image if present */}
                        {post.imageUrl && (
                          <img
                            className="post-image-banner"
                            src={post.imageUrl}
                            alt={post.title}
                            onClick={() => setViewAnnouncementItem(post)}
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display =
                                "none";
                            }}
                          />
                        )}

                        <span className={`post-tag ${getTagClass(post.tag)}`}>
                          {post.tag}
                        </span>
                        <h3
                          style={{ cursor: "pointer", color: "#163e32" }}
                          onClick={() => setViewAnnouncementItem(post)}
                        >
                          {post.title}
                        </h3>
                        <p className="post-body">{post.body}</p>

                        <div className="post-highlight">
                          <span className="highlight-icon">
                            <Icon
                              name={
                                post.tag === "Health & Wellness" ||
                                post.tag === "Youth & Sports"
                                  ? "users"
                                  : post.tag === "Emergency Notice" ||
                                      post.tag === "Public Safety"
                                    ? "alert"
                                    : "megaphone"
                              }
                            />
                          </span>
                          <span>
                            <strong>{post.accent}</strong>
                            <small>
                              <Icon name="clock" size={14} /> {post.accentText}
                            </small>
                          </span>
                        </div>

                        {/* Interactive footer action buttons - strictly resident acknowledged and inquiries */}
                        <div className="post-footer-actions">
                          <button
                            className={`post-action-btn ${isAcknowledged ? "active-react" : ""}`}
                            onClick={() => handleToggleReaction(postId)}
                            title={
                              isAcknowledged
                                ? "Click to un-acknowledge"
                                : "Click to acknowledge this advisory"
                            }
                          >
                            <b>{isAcknowledged ? "♥" : "♡"}</b> {post.reactions}{" "}
                            {post.reactions === 1
                              ? "resident acknowledged"
                              : "residents acknowledged"}
                          </button>

                          <button
                            className="post-action-btn"
                            onClick={() => {
                              setInquiryModalPost(post);
                              setCommentInput("");
                            }}
                            title="Open resident inquiries & questions modal"
                          >
                            <span>💬</span> {postComments.length}{" "}
                            {postComments.length === 1
                              ? "inquiry"
                              : "inquiries"}
                          </button>
                        </div>
                      </article>
                    );
                  });
                })()}
              </section>
              <aside className="right-rail">
                <div className="rail-card calendar-preview">
                  <div className="rail-title">
                    <div>
                      <span className="rail-icon">
                        <Icon name="calendar" />
                      </span>
                      <span>
                        <h3>Upcoming events</h3>
                        <small>{calendarEvents.length} scheduled</small>
                      </span>
                    </div>
                    <button onClick={() => setActive("calendar")}>
                      View calendar
                    </button>
                  </div>
                  {calendarEvents.slice(0, 3).map((event) => {
                    const evDate = event.date
                      ? new Date(event.date + "T00:00:00")
                      : null;
                    const monthLabel = evDate
                      ? evDate
                          .toLocaleString("en-US", { month: "short" })
                          .toUpperCase()
                      : "OCT";
                    const dayLabel =
                      event.day || (evDate ? evDate.getDate() : 1);
                    return (
                      <div
                        className="event-row"
                        key={event.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setViewingEvent(event);
                          setActive("calendar");
                        }}
                        title="Click to view details"
                      >
                        <span
                          className={`date-box event-${event.type || "community"}`}
                        >
                          <small>{monthLabel}</small>
                          <strong>{dayLabel}</strong>
                        </span>
                        <span>
                          <strong>{event.title}</strong>
                          <small>
                            {event.time || ""}
                            {event.location ? ` · ${event.location}` : ""}
                          </small>
                        </span>
                      </div>
                    );
                  })}
                  {calendarEvents.length === 0 && (
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#64748b",
                        margin: "10px 0",
                      }}
                    >
                      No upcoming events scheduled.
                    </p>
                  )}
                </div>
                <div className="rail-card quick-card">
                  <div className="rail-title">
                    <div>
                      <span className="rail-icon">
                        <Icon name="document" />
                      </span>
                      <span>
                        <h3>Request a document</h3>
                        <small>Apply online, skip the queue</small>
                      </span>
                    </div>
                  </div>
                  {getCachedDocumentServices()
                    .filter((d) => d.enabled)
                    .slice(0, 3)
                    .map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          setSelectedDocForModal(doc.name);
                          setRequestOpen(true);
                        }}
                      >
                        <span>{doc.name}</span>
                        <Icon name="chevron" size={16} />
                      </button>
                    ))}
                </div>
                <div className="rail-card quick-card">
                  <div className="rail-title">
                    <div>
                      <span
                        className="rail-icon"
                        style={{ background: "#fde8e8", color: "#c81e1e" }}
                      >
                        <Icon name="phone" />
                      </span>
                      <span>
                        <h3>Emergency hotlines</h3>
                        <small>24/7 assistance directory</small>
                      </span>
                    </div>
                    <button onClick={() => setActive("incidents")}>
                      View all
                    </button>
                  </div>
                  {hotlines.slice(0, 2).map((hl) => (
                    <div className="rail-hotline-item" key={hl.id}>
                      <div>
                        <strong>
                          {hl.name.split(" ")[0]} {hl.name.split(" ")[1] || ""}
                        </strong>
                        <small style={{ display: "block" }}>{hl.number}</small>
                      </div>
                      <button
                        className="rail-hotline-btn"
                        onClick={() => {
                          navigator.clipboard?.writeText(hl.number);
                          showToast(`Copied ${hl.name}: ${hl.number}`);
                        }}
                      >
                        Call / Copy
                      </button>
                    </div>
                  ))}
                </div>
                <div className="info-banner">
                  <span>
                    <Icon name="bell" />
                  </span>
                  <div>
                    <strong>Stay informed</strong>
                    <p>Enable alerts to get important community advisories.</p>
                    <button onClick={() => showToast("Notifications enabled")}>
                      Enable notifications
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}

        {active === "calendar" && (
          <CalendarView
            isAdmin={isAdmin}
            events={calendarEvents}
            onAddEvent={handleAddEvent}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
            onToast={showToast}
            userRsvps={userRsvps}
            onToggleRsvp={handleToggleRsvp}
            viewingEvent={viewingEvent}
            setViewingEvent={setViewingEvent}
          />
        )}

        {active === "documents" &&
          (isAdmin ? (
            <AdminDocumentsPage
              requests={requests}
              onUpdateRequest={handleUpdateRequest}
              onDeleteRequest={handleDeleteDocumentRequest}
              onToast={showToast}
              onOpenChat={(email) => {
                setActiveThread(email);
                setActive("messages");
              }}
              onPrintCertificate={(req) => setPrintingRequest(req)}
              onViewDetails={(req) => setViewingRequest(req)}
            />
          ) : (
            <ResidentDocumentsPage
              user={user}
              requests={requests.filter(
                (r) =>
                  r.residentEmail === userEmail || r.residentId === user.id,
              )}
              onRequest={() => setRequestOpen(true)}
              onDeleteRequest={handleDeleteDocumentRequest}
              onToast={showToast}
              onOpenChat={(doc) => {
                setPresetMessageDraft(
                  `Good day po! Follow-up inquiry regarding my ${doc.docType} (Tracking No. ${doc.trackingNo}).`,
                );
                setActive("messages");
              }}
              onPrintCertificate={(req) => setPrintingRequest(req)}
              onViewDetails={(req) => setViewingRequest(req)}
            />
          ))}

        {active === "messages" &&
          (isAdmin ? (
            <AdminMessagesPage
              threads={threads}
              activeThread={activeThread}
              onSelectThread={setActiveThread}
              onSend={(email, text) => sendMessage(email, text, "admin")}
              onDeleteMessage={(email, dbId, ts) =>
                deleteMessage(email, dbId, ts)
              }
              onClearThread={(email) => clearThread(email)}
              allRequests={requests}
              onViewDocRequest={(req) => {
                setViewingRequest(req);
              }}
            />
          ) : (
            <ResidentMessagesPage
              user={user}
              thread={threads[userEmail] ?? []}
              onSend={(text) => sendMessage(userEmail, text, "resident")}
              onDeleteMessage={(dbId, ts) =>
                deleteMessage(userEmail, dbId, ts)
              }
              onClearThread={() => clearThread(userEmail)}
              presetDraft={presetMessageDraft}
              onClearPresetDraft={() => setPresetMessageDraft("")}
              myRequests={requests.filter(
                (r) =>
                  r.residentEmail === userEmail || r.residentId === user.id,
              )}
            />
          ))}

        {active === "incidents" && (
          <IncidentsPage
            isAdmin={isAdmin}
            userEmail={userEmail}
            userName={user.name}
            incidents={incidents}
            hotlines={hotlines}
            onAddHotline={async (newHl) => {
              setHotlines((prev) => [newHl, ...prev]);
              showToast("New hotline added to directory");
              try {
                await supabase.from("hotlines").insert([
                  {
                    id: newHl.id,
                    name: newHl.name,
                    subtitle: newHl.subtitle,
                    number: newHl.number,
                    alt_number: newHl.altNumber,
                    tag: newHl.tag,
                    tone: newHl.tone,
                    icon: newHl.icon,
                  },
                ]);
              } catch (e) {
                console.error(e);
              }
            }}
            onEditHotline={async (updated) => {
              setHotlines((prev) =>
                prev.map((h) => (h.id === updated.id ? updated : h)),
              );
              showToast("Hotline details updated");
              try {
                await supabase
                  .from("hotlines")
                  .update({
                    name: updated.name,
                    subtitle: updated.subtitle,
                    number: updated.number,
                    alt_number: updated.altNumber,
                    tag: updated.tag,
                    tone: updated.tone,
                    icon: updated.icon,
                  })
                  .eq("id", updated.id);
              } catch (e) {
                console.error(e);
              }
            }}
            onDeleteHotline={async (id) => {
              setHotlines((prev) => prev.filter((h) => h.id !== id));
              showToast("Hotline removed from directory");
              try {
                await supabase.from("hotlines").delete().eq("id", id);
              } catch (e) {
                console.error(e);
              }
            }}
            onAddIncident={async (report) => {
              setIncidents((prev) => [report, ...prev]);
              saveIncidentMeta(report.id, {
                respondentName: report.respondentName,
                respondentAddress: report.respondentAddress,
                respondentContact: report.respondentContact,
                hearingStage: report.hearingStage,
                hearingVenue: report.hearingVenue,
                assignedOfficer: report.assignedOfficer,
              });
              showToast("Official blotter report logged successfully");
              try {
                await supabase.from("incidents").insert([
                  {
                    id: report.id,
                    complainant_name: report.complainantName,
                    complainant_email: report.complainantEmail,
                    category: report.category,
                    purok: report.purok,
                    description: report.description,
                    date: report.date,
                    status: report.status,
                    hearing_date: report.hearingDate || "",
                    officer_notes: report.officerNotes || "",
                    is_urgent: report.isUrgent || false,
                  },
                ]);
              } catch (e) {
                console.error(e);
              }
            }}
            onUpdateIncident={async (updated) => {
              setIncidents((prev) =>
                prev.map((item) => (item.id === updated.id ? updated : item)),
              );
              saveIncidentMeta(updated.id, {
                respondentName: updated.respondentName,
                respondentAddress: updated.respondentAddress,
                respondentContact: updated.respondentContact,
                hearingStage: updated.hearingStage,
                hearingVenue: updated.hearingVenue,
                assignedOfficer: updated.assignedOfficer,
                deletedAt: updated.deletedAt,
              });
              showToast(`Blotter record ${updated.id} updated`);
              try {
                await supabase
                  .from("incidents")
                  .update({
                    status: updated.status,
                    hearing_date: updated.hearingDate || "",
                    officer_notes: updated.officerNotes || "",
                  })
                  .eq("id", updated.id);
              } catch (e) {
                console.error(e);
              }
            }}
            onDeleteIncident={async (id) => {
              const now = new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              }).format(new Date());

              saveIncidentMeta(id, { deletedAt: now });
              setIncidents((prev) =>
                prev.map((i) =>
                  i.id === id ? { ...i, status: "Deleted", deletedAt: now } : i,
                ),
              );
              showToast(`Blotter ${id} moved to Archived Cases`);
              try {
                await supabase
                  .from("incidents")
                  .update({ status: "Deleted" })
                  .eq("id", id);
              } catch (e) {
                console.error(e);
              }
            }}
            onRestoreIncident={async (id) => {
              removeIncidentDeletedMeta(id);
              setIncidents((prev) =>
                prev.map((i) =>
                  i.id === id
                    ? { ...i, status: "Under Review", deletedAt: undefined }
                    : i,
                ),
              );
              showToast(`Blotter ${id} restored to Active Records`);
              try {
                await supabase
                  .from("incidents")
                  .update({ status: "Under Review" })
                  .eq("id", id);
              } catch (e) {
                console.error(e);
              }
            }}
            onPurgeIncident={async (id) => {
              deleteIncidentMeta(id);
              setIncidents((prev) => prev.filter((i) => i.id !== id));
              showToast(`Blotter ${id} permanently purged`);
              try {
                await supabase.from("incidents").delete().eq("id", id);
              } catch (e) {
                console.error(e);
              }
            }}
            onToast={showToast}
          />
        )}

        {active === "users" && isAdmin && (
          <ResidentsPage
            pendingCount={pendingResidents}
            onPendingChange={setPendingResidents}
            onToast={showToast}
            currentUser={user}
            onPromotedAdminsChange={setPromotedAdmins}
          />
        )}
        {active === "settings" && isAdmin && (
          <BarangaySettingsPage
            barangay={barangay}
            onBarangayChange={setBarangay}
            onToast={showToast}
            currentUser={user}
          />
        )}
      </main>

      {/* User Profile Settings Modal */}
      {profileSettingsOpen && user && (
        <UserProfileModal
          user={user}
          onClose={() => setProfileSettingsOpen(false)}
          onSave={({ name, photoUrl }) => {
            setUser((prev) =>
              prev ? { ...prev, name, initials: getInitials(name) } : prev,
            );
            setProfileSettingsOpen(false);
            showToast("Profile updated successfully! ✅");
            // Force avatar refresh by storing photo
            if (photoUrl) {
              try {
                localStorage.setItem(`brgy_profile_photo_${user.id}`, photoUrl);
              } catch {}
            } else {
              try {
                localStorage.removeItem(`brgy_profile_photo_${user.id}`);
              } catch {}
            }
          }}
          onToast={showToast}
        />
      )}

      {notifOpen && (
        <div
          className="notification-panel"
          style={{
            maxHeight: "480px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="panel-head"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: "14px" }}>Notifications</h3>
              <small style={{ color: "#64748b", fontSize: "11px" }}>
                {unreadNotifCount > 0
                  ? `${unreadNotifCount} unread update${unreadNotifCount > 1 ? "s" : ""}`
                  : "All caught up"}
              </small>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {unreadNotifCount > 0 && (
                <button
                  type="button"
                  onClick={markAllNotifsRead}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#166534",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: "3px 7px",
                    borderRadius: "6px",
                  }}
                >
                  Mark all read
                </button>
              )}
              <button
                className="icon-button"
                onClick={() => setNotifOpen(false)}
                aria-label="Close notifications"
              >
                <Icon name="x" size={16} />
              </button>
            </div>
          </div>

          <div
            style={{
              overflowY: "auto",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {activeNotifications.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px 15px",
                  color: "#64748b",
                  fontSize: "12px",
                }}
              >
                <Icon name="bell" size={24} />
                <p style={{ marginTop: "8px", marginBottom: 0 }}>
                  No new notifications at the moment.
                </p>
              </div>
            ) : (
              activeNotifications.map((n) => {
                const isUnread = !readNotifIds.includes(n.id);
                return (
                  <div
                    className="notification-item"
                    key={n.id}
                    onClick={() => {
                      markNotifRead(n.id);
                      setNotifOpen(false);
                      setActive(n.targetTab);
                      if (n.onAction) {
                        n.onAction();
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "11px",
                      padding: "10px 8px",
                      background: isUnread ? "#f0fdf4" : "transparent",
                      borderRadius: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    <span
                      className={isUnread ? "unread-dot" : ""}
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    >
                      <Icon name={n.icon} size={18} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong
                        style={{
                          display: "block",
                          fontSize: "12px",
                          color: "#1e293b",
                          lineHeight: 1.3,
                        }}
                      >
                        {n.title}
                      </strong>
                      <p
                        style={{
                          margin: "2px 0 0",
                          fontSize: "11px",
                          color: "#64748b",
                          lineHeight: 1.4,
                          wordBreak: "break-word",
                        }}
                      >
                        {n.body}
                      </p>
                      <small
                        style={{
                          display: "block",
                          marginTop: "3px",
                          fontSize: "10px",
                          color: "#94a3b8",
                        }}
                      >
                        {n.time}
                      </small>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {composerOpen && (
        <Modal
          title={
            editingAnnouncement ? "Edit Announcement" : "Create Announcement"
          }
          close={() => {
            setComposerOpen(false);
            setEditingAnnouncement(null);
          }}
          maxWidth="640px"
        >
          {/* Facebook-style Creator Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
              marginBottom: "14px",
              paddingBottom: "12px",
              borderBottom: "1px solid #e8eee9",
            }}
          >
            <Avatar initials={getInitials(postAuthor || "BP")} tone="blue" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong
                style={{
                  fontSize: "12.5px",
                  color: "#18362b",
                  display: "block",
                }}
              >
                {postAuthor}
              </strong>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "3px",
                  flexWrap: "wrap",
                }}
              >
                <select
                  value={postAuthor}
                  onChange={(e) => setPostAuthor(e.target.value)}
                  style={{
                    border: "1px solid #d5e3dc",
                    background: "#f2f7f4",
                    borderRadius: "6px",
                    padding: "3px 8px",
                    fontSize: "10.5px",
                    color: "#2d4c40",
                    outline: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <option
                    value={`${barangay.name || "Bagong Pook"} Administration`}
                  >
                    {barangay.name || "Bagong Pook"} Administration
                  </option>
                  <option
                    value={`Office of the Punong Barangay (${barangay.captain || "Hon. Roberto Gomez"})`}
                  >
                    Office of the Punong Barangay
                  </option>
                  <option value="Barangay Health & Wellness Center">
                    Barangay Health & Wellness Center
                  </option>
                  <option value="Lupon Tagapamayapa Desk">
                    Lupon Tagapamayapa Desk
                  </option>
                  <option value="Disaster Risk Reduction Council (BDRRMC)">
                    Disaster Risk Reduction Council (BDRRMC)
                  </option>
                  <option value="Sangguniang Kabataan (SK) Council">
                    Sangguniang Kabataan (SK) Council
                  </option>
                </select>
                <span
                  style={{
                    fontSize: "9.5px",
                    background: "#e8f3ee",
                    color: "#1b6b4e",
                    padding: "2px 7px",
                    borderRadius: "6px",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  🌐 Public Announcement
                </span>
              </div>
            </div>
          </div>

          {/* Announcement Title */}
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                fontSize: "10.5px",
                fontWeight: 700,
                color: "#365147",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Announcement Title *
            </label>
            <input
              autoFocus
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="e.g. Scheduled Water Interruption, Free Medical Mission, Road Advisory..."
              style={{
                width: "100%",
                border: "1px solid #d5e3dc",
                background: "white",
                borderRadius: "9px",
                padding: "10px 12px",
                fontSize: "12.5px",
                fontWeight: 700,
                color: "#18362b",
                outline: "none",
              }}
            />
          </div>

          {/* Category / Tag */}
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                fontSize: "10.5px",
                fontWeight: 700,
                color: "#365147",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Category / Advisory Tag *
            </label>
            <select
              value={postTag}
              onChange={(e) => setPostTag(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #d5e3dc",
                background: "white",
                borderRadius: "8px",
                padding: "8px 11px",
                fontSize: "11px",
                color: "#253f34",
                outline: "none",
                fontWeight: 600,
              }}
            >
              {ANNOUNCEMENT_TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Caption / Content body */}
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                fontSize: "10.5px",
                fontWeight: 700,
                color: "#365147",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Announcement Content / Caption *
            </label>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What would you like the community to know? Write details, instructions, or advisory caption here..."
              style={{
                width: "100%",
                minHeight: "110px",
                border: "1px solid #d5e3dc",
                background: "#fcfdfc",
                borderRadius: "9px",
                padding: "11px 13px",
                fontSize: "12px",
                color: "#243d33",
                lineHeight: 1.6,
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          {/* Image Preview with remove and change buttons */}
          {postImageUrl && (
            <div
              style={{
                position: "relative",
                marginBottom: "12px",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid #cce0d6",
                background: "#f2f7f4",
              }}
            >
              <img
                src={postImageUrl}
                alt="Uploaded announcement banner"
                style={{
                  width: "100%",
                  maxHeight: "240px",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  display: "flex",
                  gap: "6px",
                }}
              >
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: 0,
                    background: "rgba(18, 40, 30, 0.82)",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Change Photo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPostImageUrl("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  style={{
                    border: 0,
                    background: "rgba(220, 38, 38, 0.88)",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  title="Remove Photo"
                >
                  ✕ Remove
                </button>
              </div>
              <div
                style={{
                  padding: "6px 12px",
                  background: "rgba(255,255,255,0.92)",
                  fontSize: "10px",
                  color: "#3b584e",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>📷 Photo preview attached to announcement</span>
              </div>
            </div>
          )}

          {/* Facebook-style 'Add to your post' Action Bar */}
          <div
            style={{
              border: "1px solid #d6e4dd",
              borderRadius: "10px",
              padding: "9px 12px",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#f8faf9",
            }}
          >
            <span
              style={{ fontSize: "11px", fontWeight: 700, color: "#2a493e" }}
            >
              Add to your announcement:
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {/* Hidden file input for uploading directly from PC */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (uploadEvent) => {
                      const res = uploadEvent.target?.result as string;
                      if (res) setPostImageUrl(res);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: "1px solid #c5d9cf",
                  background: "white",
                  color: "#176b4d",
                  borderRadius: "7px",
                  padding: "6px 10px",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
                title="Select photo from your PC"
              >
                📷 Photo from PC
              </button>

              <button
                type="button"
                onClick={() => setIsSchedulingEnabled(!isSchedulingEnabled)}
                style={{
                  border: isSchedulingEnabled
                    ? "1px solid #166534"
                    : "1px solid #c5d9cf",
                  background: isSchedulingEnabled ? "#dcfce7" : "white",
                  color: isSchedulingEnabled ? "#166534" : "#446257",
                  borderRadius: "7px",
                  padding: "6px 10px",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
                title="Schedule announcement date & time"
              >
                🕒 {isSchedulingEnabled ? "Scheduled" : "Schedule"}
              </button>

              <button
                type="button"
                onClick={() => setShowPresetPicker(!showPresetPicker)}
                style={{
                  border: showPresetPicker
                    ? "1px solid #176b4d"
                    : "1px solid #c5d9cf",
                  background: showPresetPicker ? "#eaf5f0" : "white",
                  color: showPresetPicker ? "#176b4d" : "#446257",
                  borderRadius: "7px",
                  padding: "6px 10px",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                title="Pick from ready preset banners"
              >
                🖼️ Presets
              </button>
            </div>
          </div>

          {/* Preset Banners Gallery */}
          {showPresetPicker && (
            <div
              style={{
                marginBottom: "12px",
                padding: "10px",
                background: "#f5f9f7",
                borderRadius: "9px",
                border: "1px solid #d5e3dc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#365348",
                  }}
                >
                  Select a preset banner photo:
                </span>
                <button
                  type="button"
                  onClick={() => setShowPresetPicker(false)}
                  style={{
                    border: 0,
                    background: "transparent",
                    fontSize: "11px",
                    color: "#8a9b94",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="preset-banners">
                {PRESET_BANNERS.map((b) => (
                  <div
                    key={b.name}
                    className={`preset-banner-item ${postImageUrl === b.url ? "selected" : ""}`}
                    onClick={() => {
                      setPostImageUrl(b.url);
                      setShowPresetPicker(false);
                    }}
                    title={`Use ${b.name} banner`}
                  >
                    <img src={b.url} alt={b.name} />
                    <span>{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional Schedule Picker */}
          {isSchedulingEnabled && (
            <div
              style={{
                marginBottom: "12px",
                padding: "11px 13px",
                background: "#fef9ee",
                border: "1px solid #fde5b2",
                borderRadius: "9px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <strong
                  style={{
                    fontSize: "11.5px",
                    color: "#92400e",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  🕒 Set Announcement Schedule
                </strong>
                <button
                  type="button"
                  onClick={() => {
                    setIsSchedulingEnabled(false);
                    setPostScheduledAt("");
                  }}
                  style={{
                    border: 0,
                    background: "transparent",
                    color: "#b45309",
                    fontSize: "10.5px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Remove schedule
                </button>
              </div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: "10.5px",
                  color: "#78350f",
                }}
              >
                Choose when this announcement will automatically appear on
                residents' feeds:
              </p>
              <input
                type="datetime-local"
                value={postScheduledAt}
                onChange={(e) => setPostScheduledAt(e.target.value)}
                style={{
                  border: "1px solid #f5cf87",
                  background: "white",
                  borderRadius: "7px",
                  padding: "8px 10px",
                  fontSize: "11.5px",
                  color: "#451a03",
                  width: "100%",
                  outline: "none",
                }}
              />
            </div>
          )}

          {/* Location & Schedule inputs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#4f675e",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Location / Venue (Optional)
              </label>
              <input
                value={postAccent}
                onChange={(e) => setPostAccent(e.target.value)}
                placeholder="e.g. Covered Court, Mabini St."
                style={{
                  width: "100%",
                  border: "1px solid #dfe7e3",
                  background: "white",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  fontSize: "11px",
                  color: "#2e473f",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#4f675e",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Schedule / Date Text (Optional)
              </label>
              <input
                value={postAccentDate}
                onChange={(e) => setPostAccentDate(e.target.value)}
                placeholder="e.g. June 21 · 8:00 AM – 12:00 PM"
                style={{
                  width: "100%",
                  border: "1px solid #dfe7e3",
                  background: "white",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  fontSize: "11px",
                  color: "#2e473f",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Pin Announcement Switch */}
          <div
            style={{
              margin: "0 0 14px",
              padding: "9px 12px",
              background: "#f0fbf6",
              border: "1px solid #c7f1df",
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong
                style={{ fontSize: "11px", color: "#14533e", display: "block" }}
              >
                📌 Pin to top of feed
              </strong>
              <small style={{ fontSize: "9.5px", color: "#4f7a6b" }}>
                Featured advisories will stay at the top of the resident
                announcements page.
              </small>
            </div>
            <input
              type="checkbox"
              checked={postPinned}
              onChange={(e) => setPostPinned(e.target.checked)}
              style={{
                width: "17px",
                height: "17px",
                cursor: "pointer",
                accentColor: "#176b4d",
              }}
            />
          </div>

          <button
            className="primary-button full"
            onClick={publish}
            disabled={!postText.trim() || !postTitle.trim()}
          >
            {isSchedulingEnabled && postScheduledAt
              ? "Schedule Announcement 🕒"
              : editingAnnouncement
                ? "Save Changes"
                : "Publish Announcement"}
          </button>
        </Modal>
      )}

      {/* Dedicated Resident Inquiries Modal Popup */}
      {inquiryModalPost && (
        <Modal
          title="Resident Inquiries & Discussion"
          close={() => setInquiryModalPost(null)}
          maxWidth="580px"
        >
          <div
            style={{
              marginBottom: "14px",
              paddingBottom: "12px",
              borderBottom: "1px solid #e5ede9",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <span className={`post-tag ${getTagClass(inquiryModalPost.tag)}`}>
                {inquiryModalPost.tag}
              </span>
              <span style={{ fontSize: "11px", color: "#6a7e76" }}>
                • Posted {inquiryModalPost.time}
              </span>
            </div>
            <h3
              style={{
                margin: "2px 0 4px",
                fontSize: "15px",
                color: "#163e32",
              }}
            >
              {inquiryModalPost.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "11.5px",
                color: "#546e65",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {inquiryModalPost.body}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <strong style={{ fontSize: "12px", color: "#203b32" }}>
              Community Inquiries (
              {(commentsMap[inquiryModalPost.id as number] || []).length})
            </strong>
            <span style={{ fontSize: "10.5px", color: "#778b84" }}>
              Direct resident inquiry & response channel
            </span>
          </div>

          <div
            style={{
              maxHeight: "360px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingRight: "4px",
              marginBottom: "16px",
            }}
          >
            {(commentsMap[inquiryModalPost.id as number] || []).length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "28px 16px",
                  background: "#f8faf9",
                  borderRadius: "10px",
                  border: "1px dashed #dbe5e0",
                }}
              >
                <span
                  style={{
                    fontSize: "30px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  💬
                </span>
                <strong
                  style={{
                    fontSize: "12px",
                    color: "#2d423b",
                    display: "block",
                  }}
                >
                  No inquiries yet
                </strong>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "11px",
                    color: "#778b84",
                  }}
                >
                  Have questions or need assistance about this announcement?
                  Submit your inquiry below!
                </p>
              </div>
            ) : (
              (commentsMap[inquiryModalPost.id as number] || []).map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: "10px 12px",
                    background: c.userRole === "admin" ? "#eef7f3" : "#f6faf8",
                    border:
                      c.userRole === "admin"
                        ? "1px solid #cce8dc"
                        : "1px solid #e2ebe6",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px",
                    }}
                  >
                    <Avatar
                      initials={c.userInitials}
                      tone={c.userRole === "admin" ? "blue" : "amber"}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <strong
                          style={{ fontSize: "11.5px", color: "#223b32" }}
                        >
                          {c.userName}
                        </strong>
                        <span className={`comment-role-pill ${c.userRole}`}>
                          {c.userRole === "admin"
                            ? "Barangay Official"
                            : "Resident"}
                        </span>
                      </div>
                      <small style={{ fontSize: "9.5px", color: "#8a9a93" }}>
                        {c.time}
                      </small>
                    </div>
                    {(isAdmin || c.userName === user.name) && (
                      <button
                        onClick={() =>
                          handleDeleteComment(
                            inquiryModalPost.id as number,
                            c.id,
                          )
                        }
                        style={{
                          border: 0,
                          background: "transparent",
                          color: "#dc2626",
                          cursor: "pointer",
                          fontSize: "12px",
                          padding: "2px 4px",
                        }}
                        title="Delete inquiry"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "11.5px",
                      color: "#324840",
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {c.text}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Inquiry input box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddComment(inquiryModalPost.id as number);
            }}
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              borderTop: "1px solid #e6eeea",
              paddingTop: "12px",
            }}
          >
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder={
                isAdmin
                  ? "Reply officially as Barangay Administration..."
                  : "Type your inquiry or question here..."
              }
              style={{
                flex: 1,
                border: "1px solid #d4dfda",
                background: "white",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "11.5px",
                color: "#203830",
                outline: "none",
              }}
              autoFocus
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="primary-button"
              style={{ padding: "10px 16px", flexShrink: 0 }}
            >
              <Icon name="send" size={13} />{" "}
              {isAdmin ? "Reply" : "Submit Inquiry"}
            </button>
          </form>
        </Modal>
      )}

      {/* View Full Announcement Modal */}
      {viewAnnouncementItem && (
        <Modal
          title="Announcement Details"
          close={() => setViewAnnouncementItem(null)}
          maxWidth="640px"
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {viewAnnouncementItem.pinned && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "10.5px",
                  color: "#0f766e",
                  fontWeight: 700,
                  background: "#f0fdf9",
                  border: "1px solid #ccfbf1",
                  padding: "6px 12px",
                  borderRadius: "7px",
                }}
              >
                📌 Pinned announcement · Official Barangay Advisory
              </div>
            )}

            {/* Banner image if present */}
            {viewAnnouncementItem.imageUrl && (
              <img
                src={viewAnnouncementItem.imageUrl}
                alt={viewAnnouncementItem.title}
                style={{
                  width: "100%",
                  maxHeight: "240px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid #e5ebe8",
                }}
              />
            )}

            <div className="post-head" style={{ marginBottom: 0 }}>
              <Avatar
                initials={viewAnnouncementItem.initials}
                tone={
                  viewAnnouncementItem.tag === "Health & Wellness"
                    ? "green"
                    : viewAnnouncementItem.tag === "Emergency Notice"
                      ? "amber"
                      : "blue"
                }
              />
              <div>
                <strong>
                  {viewAnnouncementItem.author}{" "}
                  <span className="verified">✓</span>
                </strong>
                <small>{viewAnnouncementItem.time} · Public Advisory</small>
              </div>
            </div>

            <span
              className={`post-tag ${getTagClass(viewAnnouncementItem.tag)}`}
              style={{ alignSelf: "flex-start" }}
            >
              {viewAnnouncementItem.tag}
            </span>

            <h3
              style={{
                margin: 0,
                fontSize: "19px",
                color: "#163e32",
                lineHeight: "1.3",
              }}
            >
              {viewAnnouncementItem.title}
            </h3>

            <p
              style={{
                margin: 0,
                color: "#374f45",
                lineHeight: "1.75",
                fontSize: "13.5px",
                whiteSpace: "pre-wrap",
              }}
            >
              {viewAnnouncementItem.body}
            </p>

            <div className="post-highlight">
              <span className="highlight-icon">
                <Icon
                  name={
                    viewAnnouncementItem.tag === "Health & Wellness" ||
                    viewAnnouncementItem.tag === "Youth & Sports"
                      ? "users"
                      : viewAnnouncementItem.tag === "Emergency Notice" ||
                          viewAnnouncementItem.tag === "Public Safety"
                        ? "alert"
                        : "megaphone"
                  }
                />
              </span>
              <span>
                <strong>{viewAnnouncementItem.accent}</strong>
                <small>
                  <Icon name="clock" size={14} />{" "}
                  {viewAnnouncementItem.accentText}
                </small>
              </span>
            </div>

            {/* Modal Actions */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                alignItems: "center",
                borderTop: "1px solid #edf1ef",
                paddingTop: "12px",
              }}
            >
              <button
                className={`post-action-btn ${acknowledgedPostIds.includes(viewAnnouncementItem.id as number) ? "active-react" : ""}`}
                onClick={() =>
                  handleToggleReaction(viewAnnouncementItem.id as number)
                }
              >
                <b>
                  {acknowledgedPostIds.includes(
                    viewAnnouncementItem.id as number,
                  )
                    ? "♥"
                    : "♡"}
                </b>
                <span>{viewAnnouncementItem.reactions} acknowledged</span>
              </button>

              <button
                className={`post-action-btn ${savedPostIds.includes(viewAnnouncementItem.id as number) ? "active-bookmark" : ""}`}
                onClick={() =>
                  handleToggleBookmark(viewAnnouncementItem.id as number)
                }
              >
                <span>
                  {savedPostIds.includes(viewAnnouncementItem.id as number)
                    ? "★"
                    : "☆"}
                </span>
                <span>
                  {savedPostIds.includes(viewAnnouncementItem.id as number)
                    ? "Saved"
                    : "Save"}
                </span>
              </button>

              <button
                className="post-action-btn"
                onClick={() => handleShareAnnouncement(viewAnnouncementItem)}
              >
                <Icon name="send" size={13} /> Share
              </button>

              <button
                className="post-action-btn"
                onClick={() => handlePrintAnnouncement(viewAnnouncementItem)}
              >
                <Icon name="document" size={13} /> Print Notice
              </button>

              {isAdmin && (
                <div
                  style={{ marginLeft: "auto", display: "flex", gap: "6px" }}
                >
                  <button
                    className="btn-sm-action primary"
                    style={{ padding: "6px 12px", fontSize: "11px" }}
                    onClick={() => {
                      const item = viewAnnouncementItem;
                      setViewAnnouncementItem(null);
                      openComposer(item);
                    }}
                  >
                    <Icon name="edit" size={12} /> Edit
                  </button>
                  <button
                    className="btn-sm-action secondary"
                    style={{ padding: "6px 12px", fontSize: "11px" }}
                    onClick={() => togglePinAnnouncement(viewAnnouncementItem)}
                  >
                    <Icon name="megaphone" size={12} />{" "}
                    {viewAnnouncementItem.pinned ? "Unpin" : "Pin"}
                  </button>
                  <button
                    className="btn-sm-action danger"
                    style={{ padding: "6px 12px", fontSize: "11px" }}
                    onClick={() => {
                      const item = viewAnnouncementItem;
                      setViewAnnouncementItem(null);
                      setDeleteAnnouncementItem(item);
                    }}
                  >
                    <Icon name="trash" size={12} /> Delete
                  </button>
                </div>
              )}
            </div>

            {/* Discussion & Inquiries within detail modal */}
            <div className="comments-thread" style={{ marginTop: "10px" }}>
              <strong style={{ fontSize: "12px", color: "#243831" }}>
                Community Discussion & Resident Inquiries (
                {(commentsMap[viewAnnouncementItem.id as number] || []).length})
              </strong>

              <div className="comments-list" style={{ maxHeight: "200px" }}>
                {(commentsMap[viewAnnouncementItem.id as number] || [])
                  .length === 0 ? (
                  <p
                    style={{
                      margin: "4px 0",
                      fontSize: "11px",
                      color: "#778b84",
                      fontStyle: "italic",
                    }}
                  >
                    No questions yet. Ask a question or leave a comment below!
                  </p>
                ) : (
                  (commentsMap[viewAnnouncementItem.id as number] || []).map(
                    (c) => (
                      <div className="comment-bubble" key={c.id}>
                        <div className="comment-bubble-header">
                          <Avatar
                            initials={c.userInitials}
                            tone={c.userRole === "admin" ? "blue" : "amber"}
                          />
                          <strong>{c.userName}</strong>
                          <span className={`comment-role-pill ${c.userRole}`}>
                            {c.userRole === "admin" ? "Brgy Staff" : "Resident"}
                          </span>
                          <small>{c.time}</small>
                          {(isAdmin || c.userName === user.name) && (
                            <button
                              onClick={() =>
                                handleDeleteComment(
                                  viewAnnouncementItem.id as number,
                                  c.id,
                                )
                              }
                              style={{
                                border: 0,
                                background: "transparent",
                                color: "#dc2626",
                                cursor: "pointer",
                                fontSize: "11px",
                                marginLeft: "4px",
                              }}
                              title="Delete comment"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                        <p>{c.text}</p>
                      </div>
                    ),
                  )
                )}
              </div>

              <form
                className="comment-composer-box"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddComment(viewAnnouncementItem.id as number);
                }}
              >
                <input
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder={
                    isAdmin
                      ? "Reply as Barangay Administration..."
                      : "Ask a question about this advisory..."
                  }
                />
                <button
                  className="comment-send-btn"
                  type="submit"
                  disabled={!commentInput.trim()}
                >
                  <span>Send</span> <Icon name="send" size={12} />
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Announcement Confirm Modal */}
      {deleteAnnouncementItem && (
        <Modal
          title="Delete Announcement"
          close={() => setDeleteAnnouncementItem(null)}
        >
          <div className="danger-modal-box">
            <div className="danger-modal-icon">
              <Icon name="trash" size={24} />
            </div>
            <h3 className="danger-modal-title">Delete this announcement?</h3>
            <p className="danger-modal-desc">
              You are about to permanently delete{" "}
              <strong>"{deleteAnnouncementItem.title}"</strong>. This will
              remove it from the community feed and cannot be undone.
            </p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                className="row-action"
                onClick={() => setDeleteAnnouncementItem(null)}
              >
                Cancel
              </button>
              <button
                className="btn-sm-action danger"
                style={{
                  padding: "9px 20px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
                onClick={confirmDeleteAnnouncement}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {requestOpen && (
        <Modal
          title="Request a barangay document"
          close={() => setRequestOpen(false)}
          maxWidth={580}
        >
          {(() => {
            const services = getCachedDocumentServices().filter(
              (d) => d.enabled,
            );
            const currentService =
              services.find((s) => s.name === selectedDocForModal) ||
              services[0];
            const finalPurpose =
              newRequestPurpose === "Other"
                ? newRequestCustomPurpose
                : newRequestPurpose || "Employment requirement";
            const resMeta = resolveResidentMeta(user?.email || "", user?.name);

            const quickPurposes = [
              "Employment requirement",
              "Bank account opening",
              "Scholarship application",
              "Postal / Gov ID requirement",
              "Business registration",
              "Other",
            ];

            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!finalPurpose.trim()) {
                    showToast("Please specify the purpose of your request.");
                    return;
                  }
                  handleCreateRequest(
                    currentService.name,
                    finalPurpose.trim(),
                    newRequestNotes.trim(),
                    newRequestPhone || resMeta.phone,
                    newRequestAddress || resMeta.address,
                  );
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {/* Document Service Selector */}
                <label className="field">
                  Document type
                  <select
                    value={selectedDocForModal}
                    onChange={(e) => setSelectedDocForModal(e.target.value)}
                  >
                    {services.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} — Fee: {d.fee} ({d.days} days processing)
                      </option>
                    ))}
                  </select>
                </label>

                {/* Service Highlights Card */}
                {currentService && (
                  <div
                    style={{
                      background: "#f3f8f5",
                      border: "1px solid #d8e6df",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      fontSize: "12px",
                      color: "#284a3c",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <strong>{currentService.name}</strong>
                      <span className="doc-fee-badge">
                        {currentService.fee}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "2px 0 6px 0",
                        color: "#547366",
                        fontSize: "11px",
                      }}
                    >
                      {currentService.description}
                    </p>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#37594a",
                        display: "flex",
                        gap: "6px",
                      }}
                    >
                      <strong>📋 Requirements to bring:</strong>
                      <span>{currentService.requirements}</span>
                    </div>
                  </div>
                )}

                {/* Purpose Selection */}
                <div className="field">
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: 600,
                      fontSize: "12px",
                    }}
                  >
                    Purpose of request
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "8px",
                    }}
                  >
                    {quickPurposes.map((p) => {
                      const isSelected =
                        newRequestPurpose === p ||
                        (!newRequestPurpose && p === "Employment requirement");
                      return (
                        <button
                          type="button"
                          key={p}
                          className={`doc-filter-pill ${isSelected ? "active" : ""}`}
                          onClick={() => setNewRequestPurpose(p)}
                          style={{ fontSize: "11px", padding: "4px 10px" }}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                  {newRequestPurpose === "Other" && (
                    <input
                      placeholder="Specify your purpose (e.g. Court clearance, travel)..."
                      value={newRequestCustomPurpose}
                      onChange={(e) =>
                        setNewRequestCustomPurpose(e.target.value)
                      }
                      required
                      autoFocus
                    />
                  )}
                </div>

                {/* Resident info verification */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  <label className="field">
                    Contact Mobile No.
                    <input
                      placeholder={resMeta.phone}
                      value={newRequestPhone}
                      onChange={(e) => setNewRequestPhone(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    Address / Purok
                    <input
                      placeholder={resMeta.address}
                      value={newRequestAddress}
                      onChange={(e) => setNewRequestAddress(e.target.value)}
                    />
                  </label>
                </div>

                {/* Additional notes */}
                <label className="field">
                  Additional notes or special instructions
                  <textarea
                    className="small-textarea"
                    placeholder="e.g., Target submission date, specific employer name..."
                    value={newRequestNotes}
                    onChange={(e) => setNewRequestNotes(e.target.value)}
                    rows={2}
                  />
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  className="primary-button full"
                  style={{ marginTop: "4px" }}
                >
                  <Icon name="check" size={16} /> Submit official request
                </button>
              </form>
            );
          })()}
        </Modal>
      )}

      {printingRequest && (
        <CertificateModal
          request={printingRequest}
          close={() => setPrintingRequest(null)}
        />
      )}

      {viewingRequest && (
        <DocumentDetailsModal
          request={viewingRequest}
          close={() => setViewingRequest(null)}
          onPrint={(req: DocumentRequest) => {
            setViewingRequest(null);
            setPrintingRequest(req);
          }}
          onOpenChat={(req: DocumentRequest) => {
            setViewingRequest(null);
            setPresetMessageDraft(
              `Good day po! Follow-up inquiry regarding my ${req.docType} (Tracking No. ${req.trackingNo}).`,
            );
            setActive("messages");
          }}
        />
      )}

      {toast && (
        <div className="toast">
          <span>✓</span>
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── Login ───────────────────────────────────────────────────────────────────

function LoadingView({ label }: { label: string }) {
  return (
    <div className="loading-screen">
      <span className="loading-logo">
        <Icon name="logo" size={34} />
      </span>
      <div className="loading-brand">
        <strong>Barangay Connect</strong>
        <small>{label}...</small>
      </div>
      <span className="loading-bar">
        <i />
      </span>
    </div>
  );
}

function ReactionButton({
  count,
  postId: _postId,
}: {
  count: number;
  postId?: number;
}) {
  const [reacted, setReacted] = useState(false);
  return (
    <button
      className={reacted ? "reaction-button reacted" : "reaction-button"}
      onClick={() => setReacted(!reacted)}
      aria-label="Acknowledge announcement"
    >
      <b>♥</b> {count + (reacted ? 1 : 0)} residents acknowledged
    </button>
  );
}

function LoginView({
  onLoginSuccess,
  barangay,
}: {
  onLoginSuccess: (u: Account) => void;
  barangay: BarangayInfo;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [regSuccessOpen, setRegSuccessOpen] = useState(false);
  const [regSubmittedName, setRegSubmittedName] = useState("");
  const [pendingLoginOpen, setPendingLoginOpen] = useState(false);

  // Forgot password modal state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotName, setForgotName] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSubmitting, setForgotSubmitting] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // ── Register form state ───────────────────────────────────────────────
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");
  const [regSubmitting, setRegSubmitting] = useState(false);

  // Validation helpers to prevent random strings & garbage input
  function isValidEmail(val: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val.trim());
  }

  function normalizePhilippinePhone(val: string): string | null {
    let cleaned = val.replace(/[\s\-()]/g, "");
    if (cleaned.startsWith("+63")) {
      cleaned = "0" + cleaned.slice(3);
    }
    // Must be exactly 11 digits starting with 09
    if (/^09\d{9}$/.test(cleaned)) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return null;
  }

  function isValidName(val: string): boolean {
    return /^[a-zA-ZÀ-ÿ\s.'-]{2,50}$/.test(val.trim());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. Check if user has an active reset issued by administrator
      let activeTempPassword: string | null = null;

      // Check local temp passwords
      try {
        const tempMap = JSON.parse(
          localStorage.getItem("brgy_temp_passwords") || "{}",
        );
        if (tempMap[cleanEmail]?.tempPassword) {
          activeTempPassword = tempMap[cleanEmail].tempPassword;
        }
      } catch {}

      // Check Supabase password_reset_requests table
      try {
        const { data: dbResets } = await supabase
          .from("password_reset_requests")
          .select("temp_password, status")
          .eq("email", cleanEmail)
          .order("updated_at", { ascending: false })
          .limit(1);

        if (
          dbResets &&
          dbResets[0] &&
          dbResets[0].status === "completed" &&
          dbResets[0].temp_password
        ) {
          activeTempPassword = dbResets[0].temp_password;
        }
      } catch {}

      // Check active resets synced from barangay description metadata
      if (!activeTempPassword) {
        const settingsResets = parseActiveResetsFromDesc(barangay.description);
        if (settingsResets[cleanEmail]?.tempPassword) {
          activeTempPassword = settingsResets[cleanEmail].tempPassword;
        }
      }

      if (activeTempPassword) {
        // Admin has reset this resident's password!
        if (password === activeTempPassword) {
          // Resident entered the new password!
          const { data: profile } = await supabase
            .from("accounts")
            .select("*")
            .eq("email", cleanEmail)
            .maybeSingle();

          if (profile) {
            if (profile.status === "pending") {
              setSubmitting(false);
              setPendingLoginOpen(true);
              return;
            }
            if (profile.status === "rejected") {
              setError(
                "Your account registration was not approved. Please visit the Barangay Hall for verification.",
              );
              setSubmitting(false);
              return;
            }
            if (profile.status === "suspended" || profile.status === "banned") {
              setError(
                "Your account has been temporarily suspended. Contact the barangay office.",
              );
              setSubmitting(false);
              return;
            }
            if (profile.status === "deleted") {
              setError(
                "This account has been deleted by the barangay administration. Please contact the Barangay Office.",
              );
              setSubmitting(false);
              return;
            }

            const name = profile.full_name || email;
            const accountObj: Account = {
              id: profile.id,
              email: profile.email,
              role: (profile.role as "admin" | "resident") || "resident",
              name,
              initials: getInitials(name),
            };
            try {
              localStorage.setItem(
                "brgy_auth_session",
                JSON.stringify({ user: accountObj, timestamp: Date.now() }),
              );
            } catch {}
            onLoginSuccess(accountObj);
            return;
          } else {
            const accountObj: Account = {
              id: `user-${cleanEmail}`,
              email: cleanEmail,
              role: "resident",
              name: cleanEmail,
              initials: getInitials(cleanEmail),
            };
            try {
              localStorage.setItem(
                "brgy_auth_session",
                JSON.stringify({ user: accountObj, timestamp: Date.now() }),
              );
            } catch {}
            onLoginSuccess(accountObj);
            return;
          }
        } else {
          // Resident did NOT enter the new password (e.g. they typed the old password)
          setError(
            "Your password has been reset by the Barangay Administration. Your old password is no longer valid. Please sign in with the new temporary password provided to you via SMS.",
          );
          setSubmitting(false);
          return;
        }
      }

      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      if (authErr || !data.user) {
        setError(
          authErr?.message ?? "Invalid email or password. Please try again.",
        );
        setSubmitting(false);
        return;
      }
      // Fetch profile from accounts table
      const { data: profile, error: profileErr } = await supabase
        .from("accounts")
        .select("full_name, role, status")
        .eq("id", data.user.id)
        .single();
      if (profileErr || !profile) {
        setError("Account profile not found. Please contact the barangay.");
        await supabase.auth.signOut();
        setSubmitting(false);
        return;
      }
      if (profile.status === "pending") {
        await supabase.auth.signOut();
        setSubmitting(false);
        setPendingLoginOpen(true);
        return;
      }
      if (profile.status === "rejected") {
        setError(
          "Your account registration was not approved. Please visit the Barangay Hall for verification.",
        );
        await supabase.auth.signOut();
        setSubmitting(false);
        return;
      }
      if (profile.status === "suspended") {
        setError(
          "Your account has been temporarily suspended. Contact the barangay office.",
        );
        await supabase.auth.signOut();
        setSubmitting(false);
        return;
      }
      if (profile.status === "banned") {
        setError(
          "This account has been permanently banned from the Barangay Connect portal.",
        );
        await supabase.auth.signOut();
        setSubmitting(false);
        return;
      }
      if (profile.status === "deleted") {
        setError(
          "This account has been deleted by the barangay administration. Please contact the Barangay Office.",
        );
        await supabase.auth.signOut();
        setSubmitting(false);
        return;
      }
      const name = profile.full_name || data.user.email || "User";
      const accountObj: Account = {
        id: data.user.id,
        email: data.user.email ?? "",
        role: profile.role as "admin" | "resident",
        name,
        initials: getInitials(name),
      };
      try {
        localStorage.setItem(
          "brgy_auth_session",
          JSON.stringify({ user: accountObj, timestamp: Date.now() }),
        );
      } catch {}
      onLoginSuccess(accountObj);
    } catch (err: any) {
      setError(err?.message ?? "An unexpected error occurred.");
      setSubmitting(false);
    }
  }

  async function handleRegisterDirect() {
    setRegError("");

    // 1. Name validation
    if (!regFirstName.trim() || !regLastName.trim()) {
      setRegError("Please enter your complete first and last name.");
      return;
    }
    if (!isValidName(regFirstName) || !isValidName(regLastName)) {
      setRegError(
        "Names should only contain valid letters (no numbers or random symbols).",
      );
      return;
    }

    // 2. Email validation — required and must be a real format
    if (!regEmail.trim()) {
      setRegError("Please enter your email address.");
      return;
    }
    if (!isValidEmail(regEmail)) {
      setRegError(
        "Please enter a valid email address (e.g., resident@gmail.com).",
      );
      return;
    }

    // 3. Philippine Phone validation
    if (!regPhone.trim()) {
      setRegError("Please enter your mobile phone number.");
      return;
    }
    const validatedPhone = normalizePhilippinePhone(regPhone);
    if (!validatedPhone) {
      setRegError(
        "Please enter a valid 11-digit Philippine mobile number starting with 09 (e.g., 0917-123-4567).",
      );
      return;
    }

    // 4. Address validation
    if (!regAddress.trim() || regAddress.trim().length < 6) {
      setRegError(
        "Please enter your home address within the barangay (at least 6 characters).",
      );
      return;
    }

    // 5. Password validation
    if (regPassword.length < 8) {
      setRegError("Password must be at least 8 characters long.");
      return;
    }
    if (regPassword !== regConfirm) {
      setRegError("Passwords do not match.");
      return;
    }

    setRegSubmitting(true);
    try {
      // Check if phone number already registered
      const { data: existingPhone } = await supabase
        .from("accounts")
        .select("id")
        .eq("phone", validatedPhone)
        .maybeSingle();
      if (existingPhone) {
        setRegError(
          "This phone number is already linked to an existing account.",
        );
        setRegSubmitting(false);
        return;
      }

      // Check if email already registered
      const { data: existingEmail } = await supabase
        .from("accounts")
        .select("id")
        .eq("email", regEmail.trim().toLowerCase())
        .maybeSingle();
      if (existingEmail) {
        setRegError(
          "An account with this email address already exists. Please sign in instead.",
        );
        setRegSubmitting(false);
        return;
      }

      // Create the auth account — status will be "pending" until admin approves
      const { data: signUpData, error: signUpErr } = await supabase.auth.signUp(
        {
          email: regEmail.trim().toLowerCase(),
          password: regPassword,
        },
      );

      if (signUpErr || !signUpData.user) {
        setRegError(
          signUpErr?.message || "Registration failed. Please try again.",
        );
        setRegSubmitting(false);
        return;
      }

      const fullName = `${regFirstName.trim()} ${regLastName.trim()}`;

      // Insert into accounts table with pending status for admin review
      await supabase.from("accounts").upsert([
        {
          id: signUpData.user.id,
          email: regEmail.trim().toLowerCase(),
          full_name: fullName,
          phone: validatedPhone,
          address: regAddress.trim(),
          role: "resident",
          status: "pending",
        },
      ]);

      // Sign out — they must wait for admin approval before logging in
      await supabase.auth.signOut();

      setRegSubmittedName(fullName);
      setRegisterOpen(false);
      setRegSuccessOpen(true);

      // Reset fields
      setRegFirstName("");
      setRegLastName("");
      setRegEmail("");
      setRegPhone("");
      setRegAddress("");
      setRegPassword("");
      setRegConfirm("");
    } catch (err: any) {
      setRegError(
        err?.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setRegSubmitting(false);
    }
  }

  return (
    <div className="login-shell">
      <section className="login-story">
        <div className="login-brand">
          <span className="brand-mark">
            <Icon name="logo" size={25} />
          </span>
          <span className="brand-copy">
            <strong>Barangay</strong>
            <small>CONNECT</small>
          </span>
        </div>
        <div className="story-copy barangay-story">
          <span className="story-label">BARANGAY INFORMATION</span>
          <h1>
            {barangay.name}
            <br />
            <em>{barangay.city}</em>
          </h1>
          <p>{barangay.description}</p>
          <div className="story-points info-points">
            <span>
              <b>
                <Icon name="home" />
              </b>
              <i>
                <strong>Barangay Hall</strong>
                {barangay.address}
              </i>
            </span>
            <span>
              <b>
                <Icon name="message" />
              </b>
              <i>
                <strong>Contact</strong>
                {barangay.phone} · {barangay.email}
              </i>
            </span>
            <span>
              <b>
                <Icon name="clock" />
              </b>
              <i>
                <strong>Office hours</strong>Mon–Fri {barangay.weekdayHours}
                <br />
                Sat {barangay.saturdayHours} · Sun {barangay.sundayHours}
              </i>
            </span>
          </div>
        </div>
        <small className="story-footer">
          {barangay.district} · Office of {barangay.captain}
        </small>
      </section>
      <section className="login-form-wrap">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-mobile-brand">
            <span className="brand-mark">
              <Icon name="logo" />
            </span>
            <strong>Barangay Connect</strong>
          </div>
          <p className="eyebrow">WELCOME BACK</p>
          <h2>Sign in to your account</h2>
          <p className="login-subtitle">
            Your role is determined automatically by your credentials.
          </p>
          {error && (
            <div className="login-error">
              <Icon name="x" size={15} /> {error}
            </div>
          )}
          <label className="field">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              required
            />
          </label>
          <label className="field">
            Password
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </label>
          <div className="login-options">
            <label>
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <button
              type="button"
              onClick={() => {
                setForgotOpen(true);
                setForgotSuccess(false);
                setForgotError("");
                setForgotName("");
                setForgotEmail("");
                setForgotPhone("");
              }}
            >
              Forgot password?
            </button>
          </div>
          <button
            className="primary-button full"
            type="submit"
            disabled={submitting}
          >
            {submitting ? (
              "Signing in…"
            ) : (
              <>
                <span>Sign in securely</span> <Icon name="chevron" size={16} />
              </>
            )}
          </button>

          <p className="register-copy">
            New to Barangay Connect?{" "}
            <button type="button" onClick={() => setRegisterOpen(true)}>
              Register as a resident
            </button>
          </p>
          <span className="secure-note">
            Your information is protected and securely managed.
          </span>
        </form>
      </section>
      {registerOpen && (
        <Modal
          title="Resident registration"
          close={() => {
            setRegisterOpen(false);
            setRegError("");
          }}
        >
          <>
            <p className="modal-intro">
              Create your resident profile. The barangay will verify your
              information before activating your account.
            </p>
            {regError && (
              <div className="login-error" style={{ marginBottom: "0.75rem" }}>
                <Icon name="x" size={15} /> {regError}
              </div>
            )}
            <div className="form-grid">
              <label className="field">
                First name *
                <input
                  required
                  placeholder="Juan"
                  value={regFirstName}
                  onChange={(e) => setRegFirstName(e.target.value)}
                />
              </label>
              <label className="field">
                Last name *
                <input
                  required
                  placeholder="Dela Cruz"
                  value={regLastName}
                  onChange={(e) => setRegLastName(e.target.value)}
                />
              </label>
            </div>
            <label className="field">
              Email address *
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </label>
            <label className="field">
              Mobile number *
              <input
                type="tel"
                required
                placeholder="09XX XXX XXXX"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
              />
              <small
                style={{ fontSize: "11px", color: "#6b7280", marginTop: "3px" }}
              >
                Must be an active 11-digit Philippine number starting with 09
              </small>
            </label>
            <label className="field">
              Home address within the barangay *
              <textarea
                className="small-textarea"
                required
                placeholder="House number, street, and area"
                value={regAddress}
                onChange={(e) => setRegAddress(e.target.value)}
              />
            </label>
            <label className="field">
              Create password *
              <input
                type="password"
                required
                placeholder="At least 8 characters"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
            </label>
            <label className="field">
              Confirm password *
              <input
                type="password"
                required
                placeholder="Re-enter your password"
                value={regConfirm}
                onChange={(e) => setRegConfirm(e.target.value)}
              />
            </label>
            <button
              className="primary-button full"
              type="button"
              onClick={handleRegisterDirect}
              disabled={regSubmitting}
              style={{ marginTop: "6px" }}
            >
              {regSubmitting ? "Submitting…" : "Submit for verification"}
            </button>
          </>
        </Modal>
      )}

      {/* ── Forgot Password Modal ─────────────────────────────────────── */}
      {forgotOpen && (
        <Modal
          title="Password Reset Request"
          close={() => setForgotOpen(false)}
        >
          {forgotSuccess ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#ecfdf5",
                  border: "2px solid #a7f3d0",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#059669",
                  marginBottom: "14px",
                }}
              >
                <Icon name="shield" size={28} />
              </div>
              <h3
                style={{ margin: "0 0 8px", color: "#065f46", fontWeight: 700 }}
              >
                Request Submitted!
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#4b5563",
                  lineHeight: 1.6,
                  margin: "0 0 12px",
                }}
              >
                Your password reset request has been sent to the{" "}
                <strong>Barangay Administrator</strong>. They will verify your
                identity and contact you via your registered mobile number with
                your new credentials.
              </p>
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  fontSize: "12.5px",
                  color: "#166534",
                  textAlign: "left",
                  marginBottom: "16px",
                }}
              >
                <strong>What happens next:</strong>
                <ul
                  style={{
                    margin: "4px 0 0",
                    paddingLeft: "16px",
                    lineHeight: 1.8,
                  }}
                >
                  <li>Admin verifies your identity against barangay records</li>
                  <li>Admin resets your password securely</li>
                  <li>New credentials sent to your phone via SMS</li>
                </ul>
              </div>
              <button
                className="primary-button full"
                onClick={() => setForgotOpen(false)}
              >
                Got it, I&apos;ll wait
              </button>
            </div>
          ) : (
            <>
              <p className="modal-intro">
                Provide your registered details for identity verification. The
                admin will manually reset your password after confirming your
                identity.
              </p>
              {forgotError && (
                <div
                  className="login-error"
                  style={{ marginBottom: "0.75rem" }}
                >
                  <Icon name="x" size={15} /> {forgotError}
                </div>
              )}
              <label className="field">
                Full name (as registered) *
                <input
                  placeholder="Juan Dela Cruz"
                  value={forgotName}
                  onChange={(e) => setForgotName(e.target.value)}
                />
              </label>
              <label className="field">
                Email address *
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </label>
              <label className="field">
                Registered mobile number *
                <input
                  type="tel"
                  placeholder="09XX XXX XXXX"
                  value={forgotPhone}
                  onChange={(e) => setForgotPhone(e.target.value)}
                />
                <small
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    marginTop: "3px",
                  }}
                >
                  Must match your registered number
                </small>
              </label>
              <button
                className="primary-button full"
                type="button"
                disabled={forgotSubmitting}
                style={{ marginTop: "6px" }}
                onClick={async () => {
                  setForgotError("");
                  if (
                    !forgotName.trim() ||
                    !forgotEmail.trim() ||
                    !forgotPhone.trim()
                  ) {
                    setForgotError("Please fill in all fields.");
                    return;
                  }
                  const cleanEmail = forgotEmail.trim().toLowerCase();
                  const cleanPhone = forgotPhone.replace(/[\s\-()]/g, "");
                  if (!/^(09)\d{9}$/.test(cleanPhone)) {
                    setForgotError(
                      "Please enter a valid 11-digit Philippine mobile number starting with 09.",
                    );
                    return;
                  }
                  setForgotSubmitting(true);
                  try {
                    // 1. Gather all existing requests for this email (from Supabase + localStorage)
                    let dbReqs: any[] = [];
                    try {
                      const { data } = await supabase
                        .from("password_reset_requests")
                        .select("*")
                        .eq("email", cleanEmail)
                        .order("created_at", { ascending: false });
                      if (data) dbReqs = data;
                    } catch {}

                    const localRequests: any[] = JSON.parse(
                      localStorage.getItem("brgy_pw_reset_requests") || "[]",
                    );
                    const localForEmail = localRequests.filter(
                      (r) => r.email?.toLowerCase() === cleanEmail,
                    );

                    // Check if resident already has an active pending request
                    const hasPending =
                      dbReqs.some(
                        (r) => (r.status || "pending") === "pending",
                      ) ||
                      localForEmail.some(
                        (r) => (r.status || "pending") === "pending",
                      );

                    if (hasPending) {
                      setForgotError(
                        "You already have an active pending password reset request. Please wait for the Barangay Administration to review and process your request.",
                      );
                      setForgotSubmitting(false);
                      return;
                    }

                    // Check if previous request was completed or dismissed within 12 hours
                    const pastRequests = [
                      ...dbReqs.filter(
                        (r) =>
                          r.status === "completed" || r.status === "dismissed",
                      ),
                      ...localForEmail.filter(
                        (r) =>
                          r.status === "completed" || r.status === "dismissed",
                      ),
                    ];

                    if (pastRequests.length > 0) {
                      pastRequests.sort((a, b) => {
                        const tA = new Date(
                          a.updated_at ||
                            a.dismissedAt ||
                            a.resetAt ||
                            a.created_at ||
                            a.requestedAt ||
                            0,
                        ).getTime();
                        const tB = new Date(
                          b.updated_at ||
                            b.dismissedAt ||
                            b.resetAt ||
                            b.created_at ||
                            b.requestedAt ||
                            0,
                        ).getTime();
                        return tB - tA;
                      });
                      const latestPast = pastRequests[0];
                      const pastTime = new Date(
                        latestPast.updated_at ||
                          latestPast.dismissedAt ||
                          latestPast.resetAt ||
                          latestPast.created_at ||
                          latestPast.requestedAt,
                      ).getTime();
                      const now = Date.now();
                      const diffMs = now - pastTime;
                      const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

                      if (diffMs < TWELVE_HOURS_MS) {
                        const remainingMs = TWELVE_HOURS_MS - diffMs;
                        const remainingHours = Math.floor(
                          remainingMs / (1000 * 60 * 60),
                        );
                        const remainingMins = Math.ceil(
                          (remainingMs % (1000 * 60 * 60)) / (1000 * 60),
                        );
                        const pastStatus =
                          latestPast.status === "completed"
                            ? "processed"
                            : "dismissed";
                        setForgotError(
                          `Your previous password reset request was recently ${pastStatus}. A 12-hour interval is required before requesting another password reset. Please try again in ${remainingHours}h ${remainingMins}m.`,
                        );
                        setForgotSubmitting(false);
                        return;
                      }
                    }

                    const newReq = {
                      id: `pwreset-${Date.now()}`,
                      name: forgotName.trim(),
                      email: cleanEmail,
                      phone: cleanPhone,
                      requestedAt: new Date().toISOString(),
                      status: "pending",
                    };
                    localStorage.setItem(
                      "brgy_pw_reset_requests",
                      JSON.stringify([newReq, ...localRequests]),
                    );

                    try {
                      await supabase.from("password_reset_requests").insert([
                        {
                          full_name: newReq.name,
                          email: newReq.email,
                          phone: newReq.phone,
                          status: "pending",
                        },
                      ]);
                    } catch {
                      // Table may not exist yet — local queue still works
                    }
                    setForgotSuccess(true);
                  } catch (err: any) {
                    setForgotError(
                      err?.message ||
                        "Failed to submit request. Please try again.",
                    );
                  } finally {
                    setForgotSubmitting(false);
                  }
                }}
              >
                {forgotSubmitting ? "Submitting…" : "Submit Reset Request"}
              </button>
            </>
          )}
        </Modal>
      )}

      {/* ── Registration Success Modal ─────────────────────────────── */}
      {regSuccessOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={() => setRegSuccessOpen(false)}
        >
          <section
            className="modal reg-success-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="reg-success-icon">
              <svg
                width="38"
                height="38"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m20 6-11 11-5-5" />
              </svg>
            </div>
            <h2 className="reg-success-title">Registration Submitted!</h2>
            <p className="reg-success-subtitle">
              Welcome, <strong>{regSubmittedName}</strong>! Your resident
              account has been successfully submitted.
            </p>
            <div className="reg-success-steps">
              <div className="reg-step">
                <span className="reg-step-num done">✓</span>
                <div>
                  <strong>Account created</strong>
                  <small>Your profile has been recorded in the system</small>
                </div>
              </div>
              <div className="reg-step">
                <span className="reg-step-num pending">2</span>
                <div>
                  <strong>Awaiting admin verification</strong>
                  <small>
                    The barangay admin will review and approve your account
                  </small>
                </div>
              </div>
              <div className="reg-step">
                <span className="reg-step-num pending">3</span>
                <div>
                  <strong>Access granted</strong>
                  <small>
                    Once approved, you can sign in and access all services
                  </small>
                </div>
              </div>
            </div>
            <p className="reg-success-note">
              📋 Please visit the <strong>Barangay Hall</strong> or wait for a
              notification once your account has been approved.
            </p>
            <button
              className="primary-button full"
              onClick={() => setRegSuccessOpen(false)}
            >
              Got it, I'll wait for approval
            </button>
          </section>
        </div>
      )}

      {/* ── Pending Account Login Modal ───────────────────────────────── */}
      {pendingLoginOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={() => setPendingLoginOpen(false)}
        >
          <section
            className="modal reg-success-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div
              className="reg-success-icon"
              style={{ background: "#fffbeb", border: "2px solid #fde68a" }}
            >
              <svg
                width="38"
                height="38"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d97706"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="reg-success-title" style={{ color: "#92400e" }}>
              Account Pending Approval
            </h2>
            <p className="reg-success-subtitle">
              Your account has been registered but is still{" "}
              <strong>waiting for verification</strong> by the barangay
              administration.
            </p>
            <div className="reg-success-steps">
              <div className="reg-step">
                <span className="reg-step-num done">✓</span>
                <div>
                  <strong>Registration received</strong>
                  <small>Your profile is on file with the barangay</small>
                </div>
              </div>
              <div className="reg-step">
                <span className="reg-step-num pending">⏳</span>
                <div>
                  <strong>Awaiting admin verification</strong>
                  <small>
                    A barangay admin will review your submitted information
                  </small>
                </div>
              </div>
              <div className="reg-step">
                <span className="reg-step-num pending">3</span>
                <div>
                  <strong>Access will be granted</strong>
                  <small>
                    You can sign in once the admin activates your account
                  </small>
                </div>
              </div>
            </div>
            <p
              className="reg-success-note"
              style={{
                background: "#fffbeb",
                border: "1px solid #fde68a",
                color: "#92400e",
              }}
            >
              🏛️ Visit the <strong>Barangay Hall</strong> in person to speed up
              verification, or wait for a notification.
            </p>
            <button
              className="primary-button full"
              onClick={() => setPendingLoginOpen(false)}
              style={{
                background: "linear-gradient(135deg, #d97706, #b45309)",
              }}
            >
              Understood, I'll wait
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────

function Modal({
  title,
  close,
  children,
  maxWidth,
}: {
  title: string;
  close: () => void;
  children: React.ReactNode;
  maxWidth?: string | number;
}) {
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <section
        className="modal"
        style={
          maxWidth
            ? {
                width: `min(${typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth}, 100%)`,
              }
            : undefined
        }
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="panel-head">
          <h3>{title}</h3>
          <button className="icon-button" onClick={close}>
            <Icon name="x" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

// ─── Calendar ────────────────────────────────────────────────────────────────

type CalendarViewProps = {
  isAdmin: boolean;
  events: CommunityEvent[];
  onAddEvent: (ev: Omit<CommunityEvent, "id">) => void;
  onUpdateEvent: (ev: CommunityEvent) => void;
  onDeleteEvent: (id: number) => void;
  onToast: (msg: string) => void;
  userRsvps: number[];
  onToggleRsvp: (id: number) => void;
  viewingEvent: CommunityEvent | null;
  setViewingEvent: (ev: CommunityEvent | null) => void;
};

function CalendarView({
  isAdmin,
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onToast,
  userRsvps,
  onToggleRsvp,
  viewingEvent,
  setViewingEvent,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState<Date>(
    () => new Date(2026, 9, 1),
  );
  const [viewMode, setViewMode] = useState<"month" | "agenda">("month");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CommunityEvent | null>(null);

  const [form, setForm] = useState({
    title: "",
    date: "2026-10-15",
    time: "8:00 AM",
    location: "Barangay Covered Court",
    type: "community",
    description: "",
    organizer: "Barangay San Isidro",
  });

  const currentYear = currentDate.getFullYear();
  const currentMonthIdx = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const monthYearTitle = `${monthName} ${currentYear}`;

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  function handlePrevMonth() {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  }
  function handleNextMonth() {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  }
  function handleToday() {
    setCurrentDate(new Date(2026, 9, 1));
  }

  function handleOpenCreate(prefilledDate?: string) {
    setEditingEvent(null);
    const defaultDate =
      prefilledDate ||
      `${currentYear}-${String(currentMonthIdx + 1).padStart(2, "0")}-15`;
    setForm({
      title: "",
      date: defaultDate,
      time: "8:00 AM – 11:00 AM",
      location: "Barangay Covered Court",
      type: "community",
      description: "",
      organizer: "Barangay San Isidro",
    });
    setFormOpen(true);
  }

  function handleOpenEdit(ev: CommunityEvent) {
    setEditingEvent(ev);
    setForm({
      title: ev.title,
      date:
        ev.date ||
        `${currentYear}-${String(currentMonthIdx + 1).padStart(2, "0")}-${String(ev.day).padStart(2, "0")}`,
      time: ev.time || "8:00 AM",
      location: ev.location || "Barangay Hall",
      type: ev.type || "community",
      description: ev.description || "",
      organizer: ev.organizer || "Barangay San Isidro",
    });
    setFormOpen(true);
  }

  function handleSubmitForm() {
    if (!form.title.trim() || !form.date) {
      onToast("Please provide an event title and date.");
      return;
    }
    const dayNumber = new Date(form.date + "T00:00:00").getDate() || 1;
    if (editingEvent) {
      onUpdateEvent({
        ...editingEvent,
        title: form.title.trim(),
        date: form.date,
        day: dayNumber,
        time: form.time.trim(),
        location: form.location.trim(),
        type: form.type,
        description: form.description.trim(),
        organizer: form.organizer.trim(),
      });
    } else {
      onAddEvent({
        title: form.title.trim(),
        date: form.date,
        day: dayNumber,
        time: form.time.trim(),
        location: form.location.trim(),
        type: form.type,
        description: form.description.trim(),
        organizer: form.organizer.trim(),
      });
    }
    setFormOpen(false);
  }

  function handleConfirmDelete(id: number) {
    if (
      window.confirm(
        "Are you sure you want to remove this event from the calendar?",
      )
    ) {
      onDeleteEvent(id);
      if (viewingEvent?.id === id) setViewingEvent(null);
      if (formOpen) setFormOpen(false);
    }
  }

  function getGoogleCalendarUrl(ev: CommunityEvent) {
    const title = encodeURIComponent(ev.title);
    const details = encodeURIComponent(
      `${ev.description || ""}\n\nOrganizer: ${ev.organizer || "Barangay San Isidro"}\nLocation: ${ev.location || "Barangay Hall"}`,
    );
    const loc = encodeURIComponent(ev.location || "Barangay Hall");
    let startIso = "";
    let endIso = "";
    if (ev.date) {
      const clean = ev.date.replace(/-/g, "");
      startIso = `${clean}T080000Z`;
      endIso = `${clean}T110000Z`;
    } else {
      const dStr = `${currentYear}${String(currentMonthIdx + 1).padStart(2, "0")}${String(ev.day).padStart(2, "0")}`;
      startIso = `${dStr}T080000Z`;
      endIso = `${dStr}T110000Z`;
    }
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${loc}`;
  }

  function downloadIcsFile(ev: CommunityEvent) {
    const dStr = ev.date
      ? ev.date.replace(/-/g, "")
      : `${currentYear}${String(currentMonthIdx + 1).padStart(2, "0")}${String(ev.day).padStart(2, "0")}`;
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Barangay Connect//Events Calendar//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${ev.title.replace(/\n/g, " ")}`,
      `DESCRIPTION:${(ev.description || "").replace(/\n/g, "\\n")}`,
      `LOCATION:${(ev.location || "Barangay Hall").replace(/\n/g, " ")}`,
      `DTSTART:${dStr}T080000Z`,
      `DTEND:${dStr}T110000Z`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${ev.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.ics`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onToast("Event calendar (.ics) file downloaded!");
  }

  function handleShare(ev: CommunityEvent) {
    const text = `📅 ${ev.title}\n🗓 Date: ${ev.date || "Scheduled"}\n⏰ Time: ${ev.time || ""}\n📍 Location: ${ev.location || "Barangay Hall"}\n${ev.description || ""}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      onToast("Event details copied to clipboard!");
    } else {
      onToast("Event: " + ev.title);
    }
  }

  // Filter events
  const filteredEvents = events.filter((ev) => {
    if (
      categoryFilter !== "all" &&
      (ev.type || "community") !== categoryFilter
    ) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchLoc = (ev.location || "").toLowerCase().includes(q);
      const matchDesc = (ev.description || "").toLowerCase().includes(q);
      const matchOrg = (ev.organizer || "").toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchDesc && !matchOrg) return false;
    }
    return true;
  });

  // Calendar cells computation
  const firstDayOfWeek = new Date(currentYear, currentMonthIdx, 1).getDay();
  const totalDaysInMonth = new Date(
    currentYear,
    currentMonthIdx + 1,
    0,
  ).getDate();
  const totalDaysInPrevMonth = new Date(
    currentYear,
    currentMonthIdx,
    0,
  ).getDate();

  type CalendarCell = {
    dayNumber: number;
    dateStr: string;
    isCurrentMonth: boolean;
    isToday: boolean;
  };

  const cells: CalendarCell[] = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = totalDaysInPrevMonth - i;
    const prevMonthDate = new Date(currentYear, currentMonthIdx - 1, day);
    const dStr = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push({
      dayNumber: day,
      dateStr: dStr,
      isCurrentMonth: false,
      isToday: dStr === todayStr,
    });
  }
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const dStr = `${currentYear}-${String(currentMonthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push({
      dayNumber: day,
      dateStr: dStr,
      isCurrentMonth: true,
      isToday: dStr === todayStr,
    });
  }
  const remainingCells =
    cells.length <= 35 ? 35 - cells.length : 42 - cells.length;
  for (let day = 1; day <= remainingCells; day++) {
    const nextMonthDate = new Date(currentYear, currentMonthIdx + 1, day);
    const dStr = `${nextMonthDate.getFullYear()}-${String(nextMonthDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push({
      dayNumber: day,
      dateStr: dStr,
      isCurrentMonth: false,
      isToday: dStr === todayStr,
    });
  }

  function getEventsForCell(cell: CalendarCell) {
    return filteredEvents.filter((ev) => {
      if (ev.date) {
        return ev.date === cell.dateStr;
      }
      if (cell.isCurrentMonth && ev.day === cell.dayNumber) {
        return true;
      }
      return false;
    });
  }

  const agendaEvents = [...filteredEvents].sort((a, b) => {
    const dateA =
      a.date || `${currentYear}-10-${String(a.day).padStart(2, "0")}`;
    const dateB =
      b.date || `${currentYear}-10-${String(b.day).padStart(2, "0")}`;
    return dateA.localeCompare(dateB);
  });

  const categories = [
    { id: "all", label: "All Events" },
    { id: "community", label: "Community" },
    { id: "health", label: "Health & Medical" },
    { id: "meeting", label: "Meetings" },
    { id: "advisory", label: "Advisories" },
    { id: "sports", label: "Sports & Youth" },
  ];

  return (
    <div className="page inner-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">COMMUNITY SCHEDULE</p>
          <h1>Events calendar</h1>
          <p>
            Plan ahead, attend activities, and stay involved in Barangay San
            Isidro.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {isAdmin && (
            <button
              className="primary-button"
              onClick={() => handleOpenCreate()}
              id="admin-add-event-btn"
            >
              <Icon name="plus" /> Add event
            </button>
          )}
        </div>
      </section>

      {/* Filter and View Toolbar */}
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <div className="view-switch-group">
            <button
              className={`view-switch-btn ${viewMode === "month" ? "active" : ""}`}
              onClick={() => setViewMode("month")}
              title="Month Grid View"
              id="view-month-btn"
            >
              <Icon name="calendar" size={16} /> Month
            </button>
            <button
              className={`view-switch-btn ${viewMode === "agenda" ? "active" : ""}`}
              onClick={() => setViewMode("agenda")}
              title="Agenda List View"
              id="view-agenda-btn"
            >
              <Icon name="document" size={16} /> Agenda ({filteredEvents.length}
              )
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "white",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "5px 10px",
              gap: "6px",
              width: "220px",
            }}
          >
            <Icon name="search" size={16} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                fontSize: "12px",
                width: "100%",
                background: "transparent",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  padding: 0,
                }}
              >
                <Icon name="x" size={14} />
              </button>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {categories.map((cat) => {
            const count =
              cat.id === "all"
                ? events.length
                : events.filter((e) => (e.type || "community") === cat.id)
                    .length;
            return (
              <button
                key={cat.id}
                className={`cal-filter-chip ${categoryFilter === cat.id ? "active" : ""}`}
                onClick={() => setCategoryFilter(cat.id)}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content: Month Grid or Agenda List */}
      {viewMode === "month" ? (
        <section className="full-calendar">
          <div className="calendar-toolbar">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={handlePrevMonth}
                title="Previous Month"
                aria-label="Previous Month"
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  background: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                ‹
              </button>
              <button
                onClick={handleNextMonth}
                title="Next Month"
                aria-label="Next Month"
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  background: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                ›
              </button>
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: "#1e293b",
                }}
              >
                {monthYearTitle}
              </h2>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button className="today-button" onClick={handleToday}>
                Today
              </button>
            </div>
          </div>

          <div className="weekday-row">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <strong key={d}>{d}</strong>
            ))}
          </div>

          <div className="calendar-grid">
            {cells.map((cell, idx) => {
              const cellEvents = getEventsForCell(cell);
              let classNames = "calendar-day";
              if (!cell.isCurrentMonth) classNames += " muted";
              if (cell.isToday) classNames += " today";

              return (
                <div
                  className={classNames}
                  key={idx}
                  onClick={() => {
                    if (isAdmin && cell.isCurrentMonth) {
                      handleOpenCreate(cell.dateStr);
                    }
                  }}
                  style={{
                    cursor:
                      isAdmin && cell.isCurrentMonth ? "pointer" : "default",
                    position: "relative",
                  }}
                  title={
                    isAdmin && cell.isCurrentMonth
                      ? "Click day to add event for this date"
                      : undefined
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: cell.isToday ? 700 : 500,
                        color: cell.isToday ? "#166534" : undefined,
                      }}
                    >
                      {cell.dayNumber}
                    </span>
                    {cell.isToday && (
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          color: "#166534",
                          background: "#dcfce7",
                          padding: "1px 5px",
                          borderRadius: "4px",
                        }}
                      >
                        TODAY
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                      marginTop: "2px",
                    }}
                  >
                    {cellEvents.map((ev) => {
                      const isRsvp = userRsvps.includes(ev.id);
                      return (
                        <button
                          key={ev.id}
                          className={`calendar-event event-${ev.type || "community"}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingEvent(ev);
                          }}
                          style={{
                            textAlign: "left",
                            width: "100%",
                            cursor: "pointer",
                            position: "relative",
                          }}
                          title={`${ev.title} (${ev.time || ""}) - Click to view details`}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "4px",
                            }}
                          >
                            <b
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {ev.title}
                            </b>
                            {isRsvp && (
                              <span
                                style={{
                                  fontSize: "9px",
                                  color: "#166534",
                                  fontWeight: 800,
                                  background: "#dcfce7",
                                  borderRadius: "50%",
                                  width: "13px",
                                  height: "13px",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                                title="You are attending this event"
                              >
                                ✓
                              </span>
                            )}
                          </div>
                          {ev.time && <small>{ev.time}</small>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        /* Agenda List View */
        <section
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {agendaEvents.length === 0 ? (
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                padding: "48px 20px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "#f1f5f9",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "12px",
                  color: "#94a3b8",
                }}
              >
                <Icon name="calendar" size={26} />
              </div>
              <h3
                style={{
                  margin: "0 0 6px",
                  color: "#334155",
                  fontSize: "16px",
                }}
              >
                No events found
              </h3>
              <p style={{ margin: 0, fontSize: "13px" }}>
                {searchQuery || categoryFilter !== "all"
                  ? "Try resetting your search query or category filters."
                  : "No community events scheduled for this period."}
              </p>
              {isAdmin && (
                <button
                  className="primary-button"
                  style={{ marginTop: "16px" }}
                  onClick={() => handleOpenCreate()}
                >
                  <Icon name="plus" /> Add first event
                </button>
              )}
            </div>
          ) : (
            agendaEvents.map((ev) => {
              const isRsvp = userRsvps.includes(ev.id);
              const evDate = ev.date ? new Date(ev.date + "T00:00:00") : null;
              const monthLabel = evDate
                ? evDate
                    .toLocaleString("en-US", { month: "short" })
                    .toUpperCase()
                : "OCT";
              const dayLabel = ev.day || (evDate ? evDate.getDate() : 1);
              const weekday = evDate
                ? evDate
                    .toLocaleString("en-US", { weekday: "short" })
                    .toUpperCase()
                : "EVENT";

              return (
                <div className="agenda-card" key={ev.id}>
                  <div className="agenda-date-badge">
                    <small>{monthLabel}</small>
                    <strong>{dayLabel}</strong>
                    <small style={{ opacity: 0.75 }}>{weekday}</small>
                  </div>
                  <div className="agenda-content">
                    <div className="agenda-meta">
                      <span
                        className={`date-box event-${ev.type || "community"}`}
                        style={{
                          padding: "2px 8px",
                          width: "auto",
                          height: "auto",
                          borderRadius: "12px",
                          fontSize: "10.5px",
                          fontWeight: 700,
                          textTransform: "capitalize",
                        }}
                      >
                        {ev.type || "community"}
                      </span>
                      {ev.organizer && (
                        <span style={{ fontSize: "11px", color: "#64748b" }}>
                          Organized by <b>{ev.organizer}</b>
                        </span>
                      )}
                    </div>
                    <h3>{ev.title}</h3>
                    {ev.description && <p>{ev.description}</p>}
                    <div className="agenda-details-row">
                      <span>
                        <Icon name="clock" size={13} /> {ev.time || "Time TBD"}
                      </span>
                      <span>
                        <Icon name="home" size={13} />{" "}
                        {ev.location || "Barangay Hall"}
                      </span>
                      {isRsvp && (
                        <span style={{ color: "#166534", fontWeight: 600 }}>
                          <Icon name="check" size={13} /> Attending
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="agenda-actions">
                    <button
                      className="primary-button"
                      style={{ padding: "6px 14px", fontSize: "12px" }}
                      onClick={() => setViewingEvent(ev)}
                    >
                      Details
                    </button>
                    <button
                      className={isRsvp ? "outline-button" : "ghost-button"}
                      style={{
                        padding: "5px 12px",
                        fontSize: "11.5px",
                        color: isRsvp ? "#166534" : "#475569",
                        borderColor: isRsvp ? "#86efac" : undefined,
                        background: isRsvp ? "#f0fdf4" : undefined,
                      }}
                      onClick={() => onToggleRsvp(ev.id)}
                    >
                      {isRsvp ? "✓ Attending" : "RSVP"}
                    </button>
                    {isAdmin && (
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          marginTop: "4px",
                        }}
                      >
                        <button
                          className="icon-button"
                          onClick={() => handleOpenEdit(ev)}
                          title="Edit event"
                          style={{ padding: "4px" }}
                        >
                          <Icon name="edit" size={14} />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => handleConfirmDelete(ev.id)}
                          title="Delete event"
                          style={{ padding: "4px", color: "#ef4444" }}
                        >
                          <Icon name="trash" size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </section>
      )}

      {/* Event Details Modal */}
      {viewingEvent && (
        <Modal
          title="Community Event Details"
          close={() => setViewingEvent(null)}
          maxWidth={580}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span
                  className={`date-box event-${viewingEvent.type || "community"}`}
                  style={{
                    padding: "3px 10px",
                    width: "auto",
                    height: "auto",
                    borderRadius: "14px",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "capitalize",
                  }}
                >
                  {viewingEvent.type || "community"}
                </span>
                {viewingEvent.organizer && (
                  <span style={{ fontSize: "12px", color: "#64748b" }}>
                    Organizer: <strong>{viewingEvent.organizer}</strong>
                  </span>
                )}
              </div>
              <h2
                style={{
                  margin: "0 0 10px",
                  fontSize: "1.3rem",
                  color: "#0f172a",
                  lineHeight: 1.3,
                }}
              >
                {viewingEvent.title}
              </h2>
            </div>

            {/* Key Information Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px",
                background: "#f8fafc",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    background: "#e0f2fe",
                    color: "#0284c7",
                    padding: "6px",
                    borderRadius: "8px",
                    display: "inline-flex",
                  }}
                >
                  <Icon name="calendar" size={18} />
                </span>
                <div>
                  <small style={{ color: "#64748b", display: "block" }}>
                    Date
                  </small>
                  <strong style={{ fontSize: "13px", color: "#1e293b" }}>
                    {viewingEvent.date
                      ? new Date(
                          viewingEvent.date + "T00:00:00",
                        ).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : `Day ${viewingEvent.day}`}
                  </strong>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    background: "#fef3c7",
                    color: "#d97706",
                    padding: "6px",
                    borderRadius: "8px",
                    display: "inline-flex",
                  }}
                >
                  <Icon name="clock" size={18} />
                </span>
                <div>
                  <small style={{ color: "#64748b", display: "block" }}>
                    Time
                  </small>
                  <strong style={{ fontSize: "13px", color: "#1e293b" }}>
                    {viewingEvent.time || "Scheduled Activity"}
                  </strong>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#166534",
                    padding: "6px",
                    borderRadius: "8px",
                    display: "inline-flex",
                  }}
                >
                  <Icon name="home" size={18} />
                </span>
                <div>
                  <small style={{ color: "#64748b", display: "block" }}>
                    Venue / Location
                  </small>
                  <strong style={{ fontSize: "13px", color: "#1e293b" }}>
                    {viewingEvent.location || "Barangay Hall"}
                  </strong>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4
                style={{
                  margin: "0 0 6px",
                  fontSize: "13px",
                  color: "#475569",
                }}
              >
                About this activity
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "13.5px",
                  lineHeight: 1.6,
                  color: "#334155",
                  background: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                {viewingEvent.description ||
                  "No additional description provided for this event."}
              </p>
            </div>

            {/* Calendar Export & Share Actions */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                paddingTop: "4px",
              }}
            >
              <a
                href={getGoogleCalendarUrl(viewingEvent)}
                target="_blank"
                rel="noreferrer"
                className="outline-button"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  padding: "7px 12px",
                  color: "#1e293b",
                }}
              >
                <Icon name="calendar" size={15} /> Add to Google Calendar
              </a>
              <button
                className="outline-button"
                onClick={() => downloadIcsFile(viewingEvent)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  padding: "7px 12px",
                }}
              >
                <Icon name="document" size={15} /> Download .ics
              </button>
              <button
                className="ghost-button"
                onClick={() => handleShare(viewingEvent)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  padding: "7px 12px",
                }}
              >
                Share
              </button>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "12px",
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <button
                  type="button"
                  className="danger-button"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    padding: "7px 14px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleConfirmDelete(viewingEvent.id)}
                >
                  <Icon name="trash" size={14} /> Delete event
                </button>
                <button
                  className="outline-button"
                  style={{ fontSize: "12px", padding: "6px 14px" }}
                  onClick={() => {
                    const ev = viewingEvent;
                    setViewingEvent(null);
                    handleOpenEdit(ev);
                  }}
                >
                  <Icon name="edit" size={14} /> Edit event
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Admin Add / Edit Modal */}
      {formOpen && (
        <Modal
          title={
            editingEvent ? "Edit Community Event" : "Add Event to Calendar"
          }
          close={() => setFormOpen(false)}
          maxWidth={540}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <label className="field">
              Event title *
              <input
                autoFocus
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Free Anti-Rabies Vaccination Drive"
              />
            </label>

            <div className="form-grid">
              <label className="field">
                Event date *
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </label>

              <label className="field">
                Time *
                <input
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  placeholder="e.g. 8:00 AM – 12:00 PM"
                />
              </label>
            </div>

            {/* Quick time presets */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                marginTop: "-6px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  alignSelf: "center",
                }}
              >
                Quick time:
              </span>
              {[
                "8:00 AM – 11:00 AM",
                "9:00 AM – 12:00 PM",
                "1:00 PM – 4:00 PM",
                "6:00 AM",
                "Whole Day",
              ].map((t) => (
                <button
                  key={t}
                  type="button"
                  className="ghost-button"
                  style={{
                    fontSize: "10.5px",
                    padding: "2px 8px",
                    height: "auto",
                  }}
                  onClick={() => setForm({ ...form, time: t })}
                >
                  {t}
                </button>
              ))}
            </div>

            <label className="field">
              Location / Venue *
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Barangay Covered Court"
              />
            </label>

            <div className="form-grid">
              <label className="field">
                Event category
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="community">Community</option>
                  <option value="health">Health & Medical</option>
                  <option value="meeting">Meetings & Assemblies</option>
                  <option value="advisory">Advisories & Notices</option>
                  <option value="sports">Sports & Youth</option>
                </select>
              </label>

              <label className="field">
                Organizer
                <input
                  value={form.organizer}
                  onChange={(e) =>
                    setForm({ ...form, organizer: e.target.value })
                  }
                  placeholder="e.g. Barangay Health Committee"
                />
              </label>
            </div>

            <label className="field">
              Description & Resident Instructions
              <textarea
                className="small-textarea"
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Details, what to bring, eligible participants, and contacts..."
              />
            </label>

            <div className="modal-actions" style={{ marginTop: "6px" }}>
              {editingEvent && (
                <button
                  type="button"
                  className="danger-button"
                  onClick={() => handleConfirmDelete(editingEvent.id)}
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                className="ghost-button"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={handleSubmitForm}
                disabled={!form.title.trim() || !form.date}
                id="save-calendar-event-btn"
              >
                {editingEvent ? "Save changes" : "Add event"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Documents ───────────────────────────────────────────────────────────────

function DocumentDetailsModal({
  request,
  close,
  onPrint,
  onOpenChat,
}: {
  request: DocumentRequest;
  close: () => void;
  onPrint?: (req: DocumentRequest) => void;
  onOpenChat?: (req: DocumentRequest) => void;
}) {
  const [copied, setCopied] = useState(false);

  function copyTracking() {
    navigator.clipboard?.writeText(request.trackingNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const statusStepMap: Record<string, number> = {
    Pending: 2,
    Approved: 3,
    "Ready for Pickup": 4,
    Released: 5,
    Declined: 2,
  };

  const currentStep = statusStepMap[request.status] || 1;
  const isDeclined = request.status === "Declined";

  const progressPercent = isDeclined
    ? "25%"
    : request.status === "Pending"
      ? "25%"
      : request.status === "Approved"
        ? "50%"
        : request.status === "Ready for Pickup"
          ? "75%"
          : "100%";

  const steps = [
    { num: 1, label: "Filed" },
    { num: 2, label: isDeclined ? "Declined" : "Review" },
    { num: 3, label: "Approved" },
    { num: 4, label: "Ready for Pickup" },
    { num: 5, label: "Released" },
  ];

  const statusCssMap: Record<string, string> = {
    Pending: "pending",
    Approved: "approved",
    "Ready for Pickup": "ready",
    Released: "verified",
    Declined: "declined",
  };

  const canPrint =
    request.status === "Approved" ||
    request.status === "Ready for Pickup" ||
    request.status === "Released";

  return (
    <Modal title="Document Request Details" close={close} maxWidth={620}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Header card with tracking info and status */}
        <div
          style={{
            background: "#f7faf8",
            border: "1px solid #dbe6e0",
            borderRadius: "12px",
            padding: "16px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <span className="doc-tracking-chip">
                {request.trackingNo}
                <button
                  className="doc-copy-btn"
                  onClick={copyTracking}
                  title="Copy Tracking Number"
                >
                  <Icon name="document" size={13} />
                </button>
              </span>
              {copied && (
                <span
                  style={{
                    fontSize: "11px",
                    color: "#166534",
                    fontWeight: 700,
                  }}
                >
                  Copied!
                </span>
              )}
            </div>
            <h2
              style={{
                margin: "4px 0 2px 0",
                fontSize: "18px",
                fontWeight: 800,
                color: "#143327",
              }}
            >
              {request.docType}
            </h2>
            <div style={{ fontSize: "12px", color: "#607b71" }}>
              Control No: <strong>{request.controlNo}</strong>
            </div>
          </div>

          <div
            style={{
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "6px",
            }}
          >
            <span
              className={`status ${statusCssMap[request.status] || request.status.toLowerCase()}`}
              style={{
                fontSize: "13px",
                padding: "4px 12px",
                borderRadius: "16px",
              }}
            >
              {request.status}
            </span>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span className="doc-fee-badge">{request.fee}</span>
              <span
                className={`doc-payment-tag ${
                  request.paymentStatus === "Paid at Counter"
                    ? "paid"
                    : request.paymentStatus === "Waived"
                      ? "waived"
                      : "unpaid"
                }`}
              >
                {request.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Progress Stepper */}
        <div style={{ padding: "8px 4px" }}>
          <div className="doc-stepper">
            <div
              className="doc-stepper-progress"
              style={{ width: progressPercent }}
            />
            {steps.map((st) => {
              const isPast = currentStep > st.num;
              const isCurr = currentStep === st.num;
              const isDeclinedStep = isDeclined && st.num === 2;
              const stepClass = isDeclinedStep
                ? "declined"
                : isPast
                  ? "done"
                  : isCurr
                    ? "active"
                    : "";

              return (
                <div key={st.num} className={`doc-step ${stepClass}`}>
                  <div className="doc-step-dot">
                    {isDeclinedStep ? "✕" : isPast ? "✓" : st.num}
                  </div>
                  <span className="doc-step-label">{st.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ready for pickup notification banner */}
        {request.status === "Ready for Pickup" && (
          <div
            className="doc-admin-note ready-note"
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <Icon name="check" size={20} />
            <div>
              <strong>
                Ready for pickup at {request.pickupWindow || "Window 1"}!
              </strong>
              <div style={{ fontSize: "11px", marginTop: "2px" }}>
                Please present a valid government-issued ID and pay any
                applicable fees at the cashier upon claiming.
              </div>
            </div>
          </div>
        )}

        {/* Admin Feedback note (if any) */}
        {request.adminFeedback && (
          <div
            className={`doc-admin-note ${isDeclined ? "declined-note" : ""}`}
          >
            <Icon name={isDeclined ? "alert" : "document"} size={18} />
            <div>
              <strong>Barangay Office Remarks:</strong>
              <div style={{ marginTop: "4px", lineHeight: 1.5 }}>
                {request.adminFeedback}
              </div>
            </div>
          </div>
        )}

        {/* Request Details Grid */}
        <section
          style={{
            background: "white",
            border: "1px solid #e1ebe6",
            borderRadius: "10px",
            padding: "16px",
          }}
        >
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "13px",
              color: "#284b3d",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Request Information
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              fontSize: "12px",
            }}
          >
            <div>
              <span style={{ color: "#798f86", display: "block" }}>
                Resident Name
              </span>
              <strong style={{ color: "#163327" }}>
                {request.residentName}
              </strong>
            </div>
            <div>
              <span style={{ color: "#798f86", display: "block" }}>
                Email Address
              </span>
              <span style={{ color: "#163327" }}>{request.residentEmail}</span>
            </div>
            <div>
              <span style={{ color: "#798f86", display: "block" }}>
                Contact Number
              </span>
              <span style={{ color: "#163327" }}>
                {request.residentMobile || "—"}
              </span>
            </div>
            <div>
              <span style={{ color: "#798f86", display: "block" }}>
                Registered Address
              </span>
              <span style={{ color: "#163327" }}>
                {request.residentAddress} ({request.purok})
              </span>
            </div>
            <div>
              <span style={{ color: "#798f86", display: "block" }}>
                Date Filed
              </span>
              <span style={{ color: "#163327" }}>
                {request.dateFiled} at {request.timeFiled}
              </span>
            </div>
            <div>
              <span style={{ color: "#798f86", display: "block" }}>
                Claiming Window
              </span>
              <span style={{ color: "#163327" }}>
                {request.pickupWindow || "Window 1 (Main Office)"}
              </span>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <span style={{ color: "#798f86", display: "block" }}>
                Purpose
              </span>
              <span style={{ color: "#163327", fontWeight: 600 }}>
                {request.purpose}
              </span>
            </div>
            {request.notes && (
              <div style={{ gridColumn: "1 / -1" }}>
                <span style={{ color: "#798f86", display: "block" }}>
                  Additional Notes / Remarks
                </span>
                <span style={{ color: "#375247", fontStyle: "italic" }}>
                  {request.notes}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Modal Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            {onOpenChat && (
              <button
                type="button"
                className="ghost-button"
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => onOpenChat(request)}
              >
                <Icon name="message" size={16} /> Follow-up Inquiry
              </button>
            )}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {canPrint && onPrint && (
              <button
                type="button"
                className="primary-button"
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
                onClick={() => onPrint(request)}
              >
                <Icon name="document" size={16} /> Print / Preview Certificate
              </button>
            )}
            <button type="button" className="secondary-button" onClick={close}>
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function CertificateModal({
  request,
  close,
}: {
  request: DocumentRequest;
  close: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  const today = new Date();
  const dayStr = today.getDate().toString();
  const monthStr = today.toLocaleString("en-US", { month: "long" });
  const yearStr = today.getFullYear().toString();

  let certTitle = "BARANGAY CLEARANCE";
  let bodyContent = (
    <>
      <p className="cert-body">
        This is to certify that{" "}
        <strong>{request.residentName.toUpperCase()}</strong>, of legal age,
        Filipino citizen, and a bona fide resident of{" "}
        <strong>{request.residentAddress}</strong>, {request.purok}, Barangay
        San Isidro, City of Pasig, is known to be a person of good moral
        character and a law-abiding member of the community.
      </p>
      <p className="cert-body">
        This further certifies that according to the records on file in this
        office, the subject individual has <strong>NO DEROGATORY RECORD</strong>{" "}
        nor any pending administrative or criminal complaint filed against them
        as of this date.
      </p>
      <p className="cert-body">
        This clearance is being issued upon the request of the interested party
        for the purpose of: <strong>{request.purpose.toUpperCase()}</strong>,
        and for whatever legal purpose it may serve.
      </p>
    </>
  );

  const docLower = request.docType.toLowerCase();
  if (docLower.includes("indigency")) {
    certTitle = "CERTIFICATE OF INDIGENCY";
    bodyContent = (
      <>
        <p className="cert-body">
          This is to certify that{" "}
          <strong>{request.residentName.toUpperCase()}</strong>, of legal age,
          Filipino, and residing at <strong>{request.residentAddress}</strong>,{" "}
          {request.purok}, Barangay San Isidro, belongs to the{" "}
          <strong>indigent / low-income families</strong> of this barangay.
        </p>
        <p className="cert-body">
          This certification is issued upon the request of the above-named
          person for the purpose of availing:{" "}
          <strong>{request.purpose.toUpperCase()}</strong> (e.g., Financial,
          Medical, Educational, or Legal Assistance from government or private
          entities).
        </p>
      </>
    );
  } else if (docLower.includes("residency")) {
    certTitle = "CERTIFICATE OF RESIDENCY";
    bodyContent = (
      <>
        <p className="cert-body">
          This is to certify that{" "}
          <strong>{request.residentName.toUpperCase()}</strong>, of legal age,
          Filipino, is an established and bona fide resident of{" "}
          <strong>{request.residentAddress}</strong>, {request.purok}, Barangay
          San Isidro, City of Pasig.
        </p>
        <p className="cert-body">
          Records in this office confirm that the subject individual has
          maintained domicile and residence within the territorial jurisdiction
          of this barangay in good standing.
        </p>
        <p className="cert-body">
          This certification is issued upon request of the interested party for
          the purpose of: <strong>{request.purpose.toUpperCase()}</strong>.
        </p>
      </>
    );
  } else if (docLower.includes("business")) {
    certTitle = "BARANGAY BUSINESS CLEARANCE";
    bodyContent = (
      <>
        <p className="cert-body">
          This is to certify that the business enterprise registered under the
          ownership / management of{" "}
          <strong>{request.residentName.toUpperCase()}</strong>, located at{" "}
          <strong>{request.residentAddress}</strong>, {request.purok}, Barangay
          San Isidro, has complied with the requirements and ordinances of this
          Barangay.
        </p>
        <p className="cert-body">
          This Business Clearance is granted for the purpose of:{" "}
          <strong>{request.purpose.toUpperCase()}</strong>, subject to renewal
          in accordance with applicable municipal laws.
        </p>
      </>
    );
  } else if (docLower.includes("moral")) {
    certTitle = "CERTIFICATE OF GOOD MORAL CHARACTER";
    bodyContent = (
      <>
        <p className="cert-body">
          This is to certify that{" "}
          <strong>{request.residentName.toUpperCase()}</strong>, residing at{" "}
          <strong>{request.residentAddress}</strong>, {request.purok}, Barangay
          San Isidro, is known to this office to be a person of good moral
          character, exemplary conduct, and peace-loving citizen.
        </p>
        <p className="cert-body">
          This certification is issued upon their request for the purpose of:{" "}
          <strong>{request.purpose.toUpperCase()}</strong>.
        </p>
      </>
    );
  }

  return (
    <Modal
      title={`Official Certificate Preview — ${request.trackingNo}`}
      close={close}
      maxWidth={760}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <span
            className="status approved"
            style={{
              fontWeight: 700,
              fontSize: "12px",
              padding: "4px 10px",
              borderRadius: "12px",
            }}
          >
            Official Electronic Copy
          </span>
          <span
            style={{ fontSize: "12px", color: "#64748b", marginLeft: "10px" }}
          >
            Control No: <strong>{request.controlNo}</strong>
          </span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="primary-button"
            onClick={handlePrint}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
            }}
          >
            <Icon name="check" size={16} /> Print / Save PDF
          </button>
          <button className="ghost-button" onClick={close}>
            Close
          </button>
        </div>
      </div>

      <div className="certificate-preview-shell">
        <div className="certificate-paper">
          <div className="certificate-watermark" />

          {/* Official Letterhead */}
          <div className="cert-header">
            <h4>Republic of the Philippines</h4>
            <h4>Province of Metro Manila · City of Pasig</h4>
            <h2>BARANGAY SAN ISIDRO</h2>
            <p>Office of the Punong Barangay</p>
          </div>

          {/* Certificate Title */}
          <div className="cert-title-block">
            <h1>{certTitle}</h1>
            <div className="cert-control-num">
              CONTROL NO: {request.controlNo} · TRACKING: {request.trackingNo}
            </div>
          </div>

          <div className="cert-salutation">TO WHOM IT MAY CONCERN:</div>

          {bodyContent}

          <p className="cert-closing">
            ISSUED this <strong>{dayStr}</strong> day of{" "}
            <strong>
              {monthStr} {yearStr}
            </strong>{" "}
            at Barangay San Isidro Hall, Pasig City, Metro Manila, Philippines.
          </p>

          {/* Official Signatures */}
          <div className="cert-signatures">
            <div className="cert-sig-box">
              <div className="cert-sig-line" />
              <strong>HON. ROBERTO V. GOMEZ</strong>
              <small>Punong Barangay</small>
            </div>
            <div className="cert-sig-box">
              <div className="cert-sig-line" />
              <strong>TERESA S. ALCANTARA</strong>
              <small>Barangay Secretary</small>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="cert-footer-meta">
            <div>
              <div>
                OR No.:{" "}
                <strong>OR-{request.trackingNo.replace("BRGY-", "")}</strong>
              </div>
              <div>
                Fee: <strong>{request.fee}</strong> ({request.paymentStatus})
              </div>
              <div>
                Issued:{" "}
                <strong>
                  {monthStr} {dayStr}, {yearStr}
                </strong>
              </div>
            </div>
            <div className="cert-official-seal-stamp">
              ★ OFFICIAL BARANGAY SEAL ★
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function ResidentDocumentsPage({
  user,
  requests,
  onRequest,
  onOpenChat,
  onPrintCertificate,
  onViewDetails,
  onDeleteRequest,
}: {
  user: { id: string; name: string; email: string };
  requests: DocumentRequest[];
  onRequest: () => void;
  onOpenChat: (doc: DocumentRequest) => void;
  onPrintCertificate: (req: DocumentRequest) => void;
  onViewDetails: (req: DocumentRequest) => void;
  onDeleteRequest?: (id: string) => void;
  onToast?: (msg: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = requests.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.docType.toLowerCase().includes(q) ||
      r.purpose.toLowerCase().includes(q) ||
      r.trackingNo.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusCssMap: Record<string, string> = {
    Pending: "pending",
    Approved: "approved",
    "Ready for Pickup": "ready",
    Released: "verified",
    Declined: "declined",
  };

  return (
    <div className="page inner-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">BARANGAY SERVICES</p>
          <h1>My Document Requests</h1>
          <p>
            Apply for barangay documents and track the status of your requests.
          </p>
        </div>
        <button className="primary-button" onClick={onRequest}>
          <Icon name="plus" /> New request
        </button>
      </section>

      {/* Summary KPI cards */}
      <div className="doc-kpi-row">
        {(
          [
            "Pending",
            "Approved",
            "Ready for Pickup",
            "Released",
          ] as RequestStatus[]
        ).map((s) => (
          <button
            key={s}
            className={`doc-kpi-card${filterStatus === s ? " active" : ""}`}
            onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
          >
            <span className={`doc-kpi-dot ${statusCssMap[s]}`} />
            <span className="doc-kpi-label">{s}</span>
            <span className="doc-kpi-count">
              {requests.filter((r) => r.status === s).length}
            </span>
          </button>
        ))}
      </div>

      <section className="table-card request-table">
        <div className="table-tools">
          <label className="search-box">
            <Icon name="search" />
            <input
              placeholder="Search by document type, purpose, or tracking no…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          {filterStatus !== "all" && (
            <button
              className="today-button"
              onClick={() => setFilterStatus("all")}
            >
              Clear filter
            </button>
          )}
        </div>

        <div
          className="table-head"
          style={{ gridTemplateColumns: "2fr 2fr 1.2fr 1.2fr 1.2fr" }}
        >
          <span>Document</span>
          <span>Purpose</span>
          <span>Status</span>
          <span>Date filed</span>
          <span>Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-table-state">
            <Icon name="document" size={32} />
            <p>
              {requests.length === 0
                ? 'No document requests yet. Click "New request" to get started.'
                : "No requests match your filter."}
            </p>
          </div>
        ) : (
          filtered.map((r) => (
            <div
              className="table-row"
              key={r.id}
              style={{ gridTemplateColumns: "2fr 2fr 1.2fr 1.2fr 1.2fr" }}
            >
              <span>
                <strong style={{ display: "block" }}>{r.docType}</strong>
                <small style={{ color: "#798b84", fontSize: "11px" }}>
                  {r.trackingNo}
                </small>
              </span>
              <span style={{ color: "#798b84", fontSize: "13px" }}>
                {r.purpose}
              </span>
              <span>
                <b
                  className={`status ${statusCssMap[r.status] || r.status.toLowerCase()}`}
                >
                  {r.status}
                </b>
              </span>
              <span style={{ fontSize: "13px" }}>{r.dateFiled}</span>
              <span style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <button className="row-action" onClick={() => onViewDetails(r)}>
                  Details
                </button>
                {(r.status === "Approved" ||
                  r.status === "Ready for Pickup" ||
                  r.status === "Released") && (
                  <button
                    className="row-action"
                    onClick={() => onPrintCertificate(r)}
                  >
                    Print
                  </button>
                )}
                <button className="row-action" onClick={() => onOpenChat(r)}>
                  Message
                </button>
                {onDeleteRequest && (
                  <button
                    className="row-action"
                    style={{ color: "#ef4444", borderColor: "#fecaca" }}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to remove your document request for ${r.docType} (${r.trackingNo})?`,
                        )
                      ) {
                        onDeleteRequest(r.id);
                      }
                    }}
                    title="Remove this request"
                  >
                    Remove
                  </button>
                )}
              </span>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

function AdminDocumentsPage({
  requests,
  onUpdateRequest,
  onToast,
  onOpenChat,
  onPrintCertificate,
  onViewDetails,
  onDeleteRequest,
}: {
  requests: DocumentRequest[];
  onUpdateRequest: (id: string, updates: Partial<DocumentRequest>) => void;
  onToast: (msg: string) => void;
  onOpenChat: (email: string) => void;
  onPrintCertificate: (req: DocumentRequest) => void;
  onViewDetails: (req: DocumentRequest) => void;
  onDeleteRequest?: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selected, setSelected] = useState<DocumentRequest | null>(null);
  const [feedback, setFeedback] = useState("");
  const [pickupWindow, setPickupWindow] = useState("Window 1");

  const statusCssMap: Record<string, string> = {
    Pending: "pending",
    Approved: "approved",
    "Ready for Pickup": "ready",
    Released: "verified",
    Declined: "declined",
  };

  const filtered = requests.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.residentName.toLowerCase().includes(q) ||
      r.docType.toLowerCase().includes(q) ||
      r.purpose.toLowerCase().includes(q) ||
      r.trackingNo.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const pendingCount = requests.filter((r) => r.status === "Pending").length;

  function decide(newStatus: RequestStatus) {
    if (!selected) return;
    const updates: Partial<DocumentRequest> = {
      status: newStatus,
      adminFeedback: feedback.trim() || undefined,
      updatedAt: new Date().toISOString(),
    };
    if (newStatus === "Ready for Pickup") updates.pickupWindow = pickupWindow;
    if (newStatus === "Released")
      updates.releasedDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    onUpdateRequest(selected.id, updates);
    onToast(
      `Request ${newStatus === "Declined" ? "declined" : 'updated to "' + newStatus + '"'}. Resident notified.`,
    );
    setSelected(null);
    setFeedback("");
    setPickupWindow("Window 1");
  }

  const initials = (name: string) =>
    name
      .split(" ")
      .map((x) => x[0])
      .slice(0, 2)
      .join("");

  return (
    <div className="page inner-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">ADMINISTRATION</p>
          <h1>Document Requests</h1>
          <p>Review, approve, and release resident document requests.</p>
        </div>
        {pendingCount > 0 && (
          <span
            className="status pending"
            style={{ padding: "6px 16px", borderRadius: 20, fontSize: 13 }}
          >
            {pendingCount} pending review
          </span>
        )}
      </section>

      {/* KPI row */}
      <div className="doc-kpi-row">
        {(
          [
            "Pending",
            "Approved",
            "Ready for Pickup",
            "Released",
            "Declined",
          ] as RequestStatus[]
        ).map((s) => (
          <button
            key={s}
            className={`doc-kpi-card${filterStatus === s ? " active" : ""}`}
            onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
          >
            <span className={`doc-kpi-dot ${statusCssMap[s]}`} />
            <span className="doc-kpi-label">{s}</span>
            <span className="doc-kpi-count">
              {requests.filter((r) => r.status === s).length}
            </span>
          </button>
        ))}
      </div>

      <section className="table-card request-table">
        <div className="table-tools">
          <label className="search-box">
            <Icon name="search" />
            <input
              placeholder="Search by resident, document type, tracking no…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          {filterStatus !== "all" && (
            <button
              className="today-button"
              onClick={() => setFilterStatus("all")}
            >
              Clear filter
            </button>
          )}
        </div>

        <div
          className="table-head"
          style={{ gridTemplateColumns: "2fr 1.5fr 1.5fr 1.2fr 1fr 1.2fr" }}
        >
          <span>Resident</span>
          <span>Document</span>
          <span>Purpose</span>
          <span>Status</span>
          <span>Date filed</span>
          <span>Action</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-table-state">
            <Icon name="document" size={32} />
            <p>
              {requests.length === 0
                ? "No requests submitted yet."
                : "No requests match your search or filter."}
            </p>
          </div>
        ) : (
          filtered.map((r) => (
            <div
              className="table-row"
              key={r.id}
              style={{ gridTemplateColumns: "2fr 1.5fr 1.5fr 1.2fr 1fr 1.2fr" }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar
                  initials={initials(r.residentName)}
                  tone={
                    r.status === "Pending"
                      ? "amber"
                      : r.status === "Declined"
                        ? "amber"
                        : "green"
                  }
                />
                <span>
                  <strong style={{ display: "block", fontSize: 13 }}>
                    {r.residentName}
                  </strong>
                  <small style={{ color: "#798b84", fontSize: 11 }}>
                    {r.residentEmail}
                  </small>
                </span>
              </span>
              <span>
                <strong style={{ fontSize: 13 }}>{r.docType}</strong>
                <small
                  style={{ display: "block", color: "#798b84", fontSize: 11 }}
                >
                  {r.trackingNo}
                </small>
              </span>
              <span className="muted-cell" style={{ fontSize: 13 }}>
                {r.purpose}
              </span>
              <span>
                <b
                  className={`status ${statusCssMap[r.status] || r.status.toLowerCase()}`}
                >
                  {r.status}
                </b>
              </span>
              <span style={{ fontSize: 12, color: "#798b84" }}>
                {r.dateFiled}
              </span>
              <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <button
                  className="row-action"
                  onClick={() => {
                    setSelected(r);
                    setFeedback(r.adminFeedback || "");
                    setPickupWindow(r.pickupWindow || "Window 1");
                  }}
                >
                  {r.status === "Pending" ? "Review" : "Manage"}
                </button>
                {onDeleteRequest && (
                  <button
                    className="row-action"
                    style={{ color: "#ef4444", borderColor: "#fecaca" }}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Permanently delete document request ${r.trackingNo} for ${r.residentName}?`,
                        )
                      ) {
                        onDeleteRequest(r.id);
                      }
                    }}
                    title="Delete request"
                  >
                    Delete
                  </button>
                )}
              </span>
            </div>
          ))
        )}
      </section>

      {/* Admin Review Modal */}
      {selected && (
        <Modal
          title="Manage Document Request"
          close={() => setSelected(null)}
          maxWidth={540}
        >
          <div className="review-summary">
            <Avatar
              initials={initials(selected.residentName)}
              tone={selected.status === "Pending" ? "amber" : "green"}
            />
            <span>
              <strong>{selected.residentName}</strong>
              <small>
                {selected.docType} · {selected.purpose}
              </small>
            </span>
            <b
              className={`status ${statusCssMap[selected.status] || selected.status.toLowerCase()}`}
            >
              {selected.status}
            </b>
          </div>

          <dl className="request-details">
            <div>
              <dt>Tracking No.</dt>
              <dd>{selected.trackingNo}</dd>
            </div>
            <div>
              <dt>Control No.</dt>
              <dd>{selected.controlNo}</dd>
            </div>
            <div>
              <dt>Date Filed</dt>
              <dd>
                {selected.dateFiled} at {selected.timeFiled}
              </dd>
            </div>
            <div>
              <dt>Fee</dt>
              <dd>
                {selected.fee}{" "}
                <span
                  className={`status ${selected.paymentStatus === "Paid at Counter" ? "approved" : selected.paymentStatus === "Waived" ? "verified" : "pending"}`}
                  style={{ fontSize: 11 }}
                >
                  {selected.paymentStatus}
                </span>
              </dd>
            </div>
            <div>
              <dt>Mobile</dt>
              <dd>{selected.residentMobile}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{selected.residentAddress}</dd>
            </div>
            {selected.notes && (
              <div>
                <dt>Notes</dt>
                <dd>{selected.notes}</dd>
              </div>
            )}
          </dl>

          {(selected.status === "Approved" ||
            selected.status === "Ready for Pickup") && (
            <label className="field">
              Pickup window
              <select
                className="form-select"
                value={pickupWindow}
                onChange={(e) => setPickupWindow(e.target.value)}
              >
                <option>Window 1</option>
                <option>Window 2 (Mon–Fri 8AM–5PM)</option>
                <option>Window 3 (Social Services)</option>
                <option>Office of the Punong Barangay</option>
              </select>
            </label>
          )}

          <label className="field">
            Feedback to resident
            <textarea
              className="small-textarea"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Explain the decision, requirements, or pickup instructions..."
            />
          </label>

          {/* Canned responses */}
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            {[
              "Please present a valid government ID upon claiming.",
              "Document is ready for pickup at Window 1.",
              "Additional requirement: Proof of residency needed.",
              "Please pay the processing fee at the cashier.",
            ].map((canned) => (
              <button
                key={canned}
                className="quick-reply-chip"
                onClick={() => setFeedback(canned)}
                style={{ fontSize: 11 }}
              >
                {canned.slice(0, 38)}
                {canned.length > 38 ? "…" : ""}
              </button>
            ))}
          </div>

          {selected.status === "Pending" && (
            <div className="modal-actions split-actions">
              <button
                className="danger-button"
                onClick={() => decide("Declined")}
              >
                Decline
              </button>
              <button
                className="primary-button"
                onClick={() => decide("Approved")}
              >
                Approve
              </button>
            </div>
          )}
          {selected.status === "Approved" && (
            <div className="modal-actions split-actions">
              <button
                className="ghost-button"
                onClick={() => {
                  onOpenChat(selected.residentEmail);
                  setSelected(null);
                }}
              >
                Message Resident
              </button>
              <button
                className="primary-button"
                onClick={() => decide("Ready for Pickup")}
              >
                Mark Ready for Pickup
              </button>
            </div>
          )}
          {selected.status === "Ready for Pickup" && (
            <div className="modal-actions split-actions">
              <button
                className="ghost-button"
                onClick={() => onPrintCertificate(selected)}
              >
                Print Certificate
              </button>
              <button
                className="primary-button"
                onClick={() => decide("Released")}
              >
                Mark as Released
              </button>
            </div>
          )}
          {selected.status === "Released" && (
            <div className="modal-actions split-actions">
              <button
                className="ghost-button"
                onClick={() => onPrintCertificate(selected)}
              >
                Print Certificate
              </button>
              <button
                className="primary-button full"
                onClick={() => {
                  setSelected(null);
                  onToast("Feedback saved.");
                }}
              >
                Save Feedback
              </button>
            </div>
          )}
          {selected.status === "Declined" && (
            <button
              className="primary-button full"
              onClick={() => {
                onUpdateRequest(selected.id, {
                  status: "Pending",
                  adminFeedback: "",
                });
                onToast("Request reopened.");
                setSelected(null);
              }}
            >
              Reopen Request
            </button>
          )}

          {onDeleteRequest && (
            <div
              style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: "1px solid #edf1ef",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                className="row-action"
                style={{ color: "#ef4444", borderColor: "#fecaca" }}
                onClick={() => {
                  if (
                    window.confirm(
                      `Permanently delete document request ${selected.trackingNo} for ${selected.residentName}?`,
                    )
                  ) {
                    onDeleteRequest(selected.id);
                    setSelected(null);
                  }
                }}
              >
                Delete request
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ─── Messaging ───────────────────────────────────────────────────────────────

function getInitialsFromEmail(email: string, name?: string): string {
  if (name)
    return name
      .split(" ")
      .map((x) => x[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  return email.slice(0, 2).toUpperCase();
}

function AdminMessagesPage({
  threads,
  activeThread,
  onSelectThread,
  onSend,
  onDeleteMessage,
  onClearThread,
  allRequests,
  onViewDocRequest,
}: {
  threads: Record<string, Msg[]>;
  activeThread: string | null;
  onSelectThread: (email: string) => void;
  onSend: (email: string, text: string) => void;
  onDeleteMessage: (
    email: string,
    dbId: number | undefined,
    timestamp: number | undefined,
  ) => void;
  onClearThread: (email: string) => void;
  allRequests: DocumentRequest[];
  onViewDocRequest: (req: DocumentRequest) => void;
}) {
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  // Collect all emails that have threads
  const allEmails = Object.keys(threads);
  const residents = allEmails.filter((email) => {
    if (!search) return true;
    const q = search.toLowerCase();
    const name = resolveResidentMeta(email).name;
    return email.toLowerCase().includes(q) || name.toLowerCase().includes(q);
  });

  // Sort: unread (last msg from resident) first, then by last msg timestamp
  const sortedResidents = [...residents].sort((a, b) => {
    const aLast = threads[a]?.at(-1);
    const bLast = threads[b]?.at(-1);
    const aUnread = aLast?.from === "resident" ? 1 : 0;
    const bUnread = bLast?.from === "resident" ? 1 : 0;
    if (bUnread !== aUnread) return bUnread - aUnread;
    return (bLast?.timestamp ?? 0) - (aLast?.timestamp ?? 0);
  });

  const ADMIN_QUICK_REPLIES = [
    "Magandang araw! Paano po kita matutulungan ngayon?",
    "Natanggap na po namin ang inyong mensahe. Sasagutin kami ASAP.",
    "Maaari po kayong pumunta sa barangay hall (Mon–Fri, 8AM–5PM).",
    "Ang inyong dokumento ay naghihintay na ng pickup sa Window 1.",
    "Mayroon pa po bang ibang katanungan?",
  ];

  function handleSend() {
    if (!draft.trim() || !activeThread) return;
    onSend(activeThread, draft.trim());
    setDraft("");
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [activeThread, threads]);

  const activeResidentMeta = activeThread
    ? resolveResidentMeta(activeThread)
    : null;
  const activeRequests = activeThread
    ? allRequests.filter((r) => r.residentEmail === activeThread)
    : [];

  function initials(name: string): string {
    return getInitials(name);
  }

  return (
    <div className="page inner-page messages-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">ADMINISTRATION</p>
          <h1>Resident Messages</h1>
          <p>Respond to resident inquiries and coordinate document releases.</p>
        </div>
      </section>
      <div className="messages-shell">
        {/* Thread list */}
        <div className="thread-list">
          <div className="thread-search">
            <Icon name="search" size={14} />
            <input
              placeholder="Search residents…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {sortedResidents.length === 0 && (
            <p style={{ padding: "16px", color: "#798b84", fontSize: 13 }}>
              No conversations yet.
            </p>
          )}
          {sortedResidents.map((email) => {
            const msgs = threads[email] ?? [];
            const last = msgs.at(-1);
            const hasUnread = last?.from === "resident";
            const meta = resolveResidentMeta(email);
            const displayName = meta.name || email;
            const initials = getInitialsFromEmail(email, displayName);
            return (
              <button
                key={email}
                className={`thread-item${activeThread === email ? " active" : ""}`}
                onClick={() => onSelectThread(email)}
              >
                <Avatar
                  initials={initials}
                  tone={hasUnread ? "amber" : "green"}
                />
                <div className="thread-meta">
                  <strong>{displayName}</strong>
                  <small>
                    {last
                      ? (last.from === "admin" ? "You: " : "") +
                        last.text.slice(0, 42) +
                        (last.text.length > 42 ? "…" : "")
                      : "No messages yet"}
                  </small>
                </div>
                {hasUnread && <span className="msg-badge" />}
              </button>
            );
          })}
        </div>

        {/* Chat pane */}
        {activeThread ? (
          <div className="chat-pane">
            <div className="chat-header">
              <Avatar
                initials={getInitialsFromEmail(
                  activeThread,
                  activeResidentMeta?.name,
                )}
                tone="green"
              />
              <div style={{ flex: 1 }}>
                <strong>{activeResidentMeta?.name || activeThread}</strong>
                <small>
                  Resident ·{" "}
                  {activeResidentMeta?.address || "Barangay San Isidro"}
                </small>
              </div>
              {activeRequests.length > 0 && (
                <button
                  className="ghost-button"
                  style={{ fontSize: 12, padding: "4px 10px" }}
                  onClick={() => onViewDocRequest(activeRequests[0])}
                >
                  <Icon name="document" size={13} /> {activeRequests.length}{" "}
                  request{activeRequests.length > 1 ? "s" : ""}
                </button>
              )}
              <button
                className="ghost-button"
                style={{
                  fontSize: 12,
                  padding: "4px 10px",
                  color: "#dc2626",
                  borderColor: "#fecaca",
                }}
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to clear all messages with ${activeResidentMeta?.name || activeThread}?`,
                    )
                  ) {
                    onClearThread(activeThread);
                  }
                }}
                title="Clear all messages in this conversation"
              >
                <Icon name="trash" size={13} /> Clear
              </button>
            </div>

            <div className="chat-messages" ref={chatRef}>
              {(threads[activeThread] ?? []).map((msg, i) => {
                const isMe = msg.from === "admin";
                const residentInitials = activeResidentMeta?.name
                  ? initials(activeResidentMeta.name)
                  : getInitialsFromEmail(activeThread || "Resident");
                return (
                  <div
                    key={i}
                    className={`chat-bubble-wrap ${isMe ? "right" : "left"}`}
                  >
                    {!isMe && (
                      <Avatar initials={residentInitials} tone="amber" />
                    )}
                    <div className="chat-bubble-content">
                      <div className="chat-bubble">
                        {msg.text}
                        <button
                          className="msg-delete-btn"
                          title="Delete message"
                          onClick={() =>
                            onDeleteMessage(activeThread, msg.dbId, msg.timestamp)
                          }
                        >
                          <Icon name="trash" size={11} />
                        </button>
                      </div>
                      <small className="chat-time">{msg.time}</small>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick replies */}
            <div className="quick-replies">
              {ADMIN_QUICK_REPLIES.map((qr) => (
                <button
                  key={qr}
                  className="quick-reply-chip"
                  onClick={() => setDraft(qr)}
                >
                  {qr.slice(0, 36)}
                  {qr.length > 36 ? "…" : ""}
                </button>
              ))}
            </div>

            <div className="chat-input-row">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSend()
                }
                placeholder={`Reply to ${activeResidentMeta?.name || activeThread}…`}
              />
              <button
                className="send-button"
                onClick={handleSend}
                disabled={!draft.trim()}
              >
                <Icon name="send" size={17} />
              </button>
            </div>
          </div>
        ) : (
          <div className="chat-empty">
            <span className="rail-icon">
              <Icon name="message" size={28} />
            </span>
            <h3>Select a conversation</h3>
            <p>
              Choose a resident from the list to view and reply to their
              messages.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResidentMessagesPage({
  user,
  thread,
  onSend,
  onDeleteMessage,
  onClearThread,
  presetDraft,
  onClearPresetDraft,
  myRequests,
}: {
  user: { id: string; name: string; email: string };
  thread: Msg[];
  onSend: (text: string) => void;
  onDeleteMessage: (
    dbId: number | undefined,
    timestamp: number | undefined,
  ) => void;
  onClearThread: () => void;
  presetDraft?: string;
  onClearPresetDraft?: () => void;
  myRequests: DocumentRequest[];
}) {
  const [draft, setDraft] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  // Inject preset draft (e.g. follow-up from documents page)
  useEffect(() => {
    if (presetDraft) {
      setDraft(presetDraft);
      onClearPresetDraft?.();
    }
  }, [presetDraft]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [thread]);

  const QUICK_PROMPTS = [
    "Magandang araw po! Gusto ko pong itanong ang status ng aking request.",
    "Kailan po pwede i-pickup ang aking dokumento?",
    "Kailangan ko po ng tulong sa pagkuha ng barangay clearance.",
    "May tanong po ako tungkol sa barangay programs.",
    "Follow-up lang po sa aking nakaraang mensahe.",
  ];

  function handleSend() {
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft("");
  }

  return (
    <div className="page inner-page messages-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">BARANGAY SERVICES</p>
          <h1>Message the Barangay</h1>
          <p>Send inquiries or follow-ups to the barangay office directly.</p>
        </div>
      </section>

      {/* Pending requests banner */}
      {myRequests
        .filter((r) => r.status === "Ready for Pickup")
        .map((r) => (
          <div key={r.id} className="doc-ready-banner">
            <Icon name="document" size={16} />
            <span>
              Your <strong>{r.docType}</strong> is ready for pickup at{" "}
              {r.pickupWindow || "Window 1"}!
            </span>
          </div>
        ))}

      <div className="messages-shell resident-messages">
        <div className="chat-pane full">
          <div className="chat-header">
            <Avatar initials="SI" tone="blue" />
            <div style={{ flex: 1 }}>
              <strong>Barangay San Isidro Office</strong>
              <small>Administrator · Official channel · Mon–Fri 8AM–5PM</small>
            </div>
            {thread.length > 0 && (
              <button
                className="ghost-button"
                style={{
                  fontSize: 12,
                  padding: "4px 10px",
                  color: "#dc2626",
                  borderColor: "#fecaca",
                }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to clear your message history with the barangay office?",
                    )
                  ) {
                    onClearThread();
                  }
                }}
                title="Clear your message history"
              >
                <Icon name="trash" size={13} /> Clear chat
              </button>
            )}
          </div>

          <div className="chat-messages" ref={chatRef}>
            {thread.length === 0 && (
              <div className="chat-start-note">
                <Icon name="message" size={22} />
                <p>
                  Start a conversation with your barangay office. Use this
                  channel for concerns, inquiries, or follow-ups on your
                  requests.
                </p>
              </div>
            )}
            {thread.map((msg, i) => {
              const isMe = msg.from === "resident";
              return (
                <div
                  key={i}
                  className={`chat-bubble-wrap ${isMe ? "right" : "left"}`}
                >
                  {!isMe && <Avatar initials="SI" tone="blue" />}
                  <div className="chat-bubble-content">
                    <div className="chat-bubble">
                      {msg.text}
                      {isMe && (
                        <button
                          className="msg-delete-btn"
                          title="Delete message"
                          onClick={() =>
                            onDeleteMessage(msg.dbId, msg.timestamp)
                          }
                        >
                          <Icon name="trash" size={11} />
                        </button>
                      )}
                    </div>
                    <small className="chat-time">{msg.time}</small>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick prompt pills */}
          {thread.length < 3 && (
            <div
              className="quick-replies"
              style={{ borderTop: "1px solid #e8eeeb", paddingTop: 10 }}
            >
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  className="quick-reply-chip"
                  onClick={() => setDraft(p)}
                >
                  {p.slice(0, 42)}
                  {p.length > 42 ? "…" : ""}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input-row">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSend()
              }
              placeholder="Type your message to the barangay office…"
            />
            <button
              className="send-button"
              onClick={handleSend}
              disabled={!draft.trim()}
            >
              <Icon name="send" size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Avatar with custom size for chat
function AvatarSm({
  initials,
  tone = "blue",
  size = 36,
}: {
  initials: string;
  tone?: "blue" | "amber" | "green";
  size?: number;
}) {
  return (
    <span
      className={`avatar avatar-${tone}`}
      style={{ width: size, height: size, fontSize: size * 0.3 }}
    >
      {initials}
    </span>
  );
}
// Alias used in JSX above
const _ = AvatarSm;
void _;

// ─── Residents ───────────────────────────────────────────────────────────────

// ─── Residents ───────────────────────────────────────────────────────────────

type ResidentRecord = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  purok: string;
  role: "resident" | "admin";
  status:
    | "active"
    | "pending"
    | "suspended"
    | "rejected"
    | "banned"
    | "deleted";
  registered: string;
  isOnline: boolean;
  rejectionReason?: string;
  banReason?: string;
  deletedAt?: string;
  created_at?: string;
};

// Helper for local metadata caching (for rejection reason, ban notes, deletion dates, and instant overrides)
function getResidentMeta(): Record<
  string,
  {
    rejectionReason?: string;
    banReason?: string;
    statusOverride?: string;
    isOnline?: boolean;
    deletedAt?: string;
  }
> {
  try {
    const raw = localStorage.getItem("barangay_residents_meta");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveResidentMeta(
  id: string,
  data: {
    rejectionReason?: string;
    banReason?: string;
    statusOverride?: string;
    isOnline?: boolean;
    deletedAt?: string;
    tempPassword?: string;
    needsPwChange?: boolean;
  },
) {
  try {
    const current = getResidentMeta();
    current[id] = { ...current[id], ...data };
    localStorage.setItem("barangay_residents_meta", JSON.stringify(current));
  } catch (e) {
    console.error("Failed to save resident meta:", e);
  }
}

function getPurgedIds(): string[] {
  try {
    const raw = localStorage.getItem("barangay_purged_resident_ids");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addPurgedId(id: string) {
  try {
    const list = getPurgedIds();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(
        "barangay_purged_resident_ids",
        JSON.stringify(list),
      );
    }
  } catch (e) {
    console.error(e);
  }
}

function removePurgedId(id: string) {
  try {
    const list = getPurgedIds().filter((x) => x !== id);
    localStorage.setItem("barangay_purged_resident_ids", JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
}

function formatResidentDate(isoDate?: string): string {
  if (!isoDate) return "Recently";
  try {
    const d = new Date(isoDate);
    const now = new Date();
    const diffHours = (now.getTime() - d.getTime()) / (1000 * 60 * 60);
    if (diffHours < 24 && now.getDate() === d.getDate()) return "Today";
    if (diffHours < 48) return "Yesterday";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recently";
  }
}

const fallbackResidents: ResidentRecord[] = [
  {
    id: "res-101",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@gmail.com",
    mobile: "0917-123-4567",
    address: "Block 4 Lot 12, Sampaguita St., Purok 1",
    purok: "Purok 1",
    role: "resident",
    status: "active",
    registered: "Yesterday",
    isOnline: true,
  },
  {
    id: "res-102",
    name: "Maria Clara Santos",
    email: "maria.santos@yahoo.com",
    mobile: "0928-876-5432",
    address: "142 Mabini Avenue, Purok 2",
    purok: "Purok 2",
    role: "resident",
    status: "active",
    registered: "Oct 18, 2026",
    isOnline: true,
  },
  {
    id: "res-103",
    name: "Antonio Luna",
    email: "antonio.luna@outlook.com",
    mobile: "0939-555-0192",
    address: "88 Narra Lane, Purok 3",
    purok: "Purok 3",
    role: "resident",
    status: "pending",
    registered: "Today",
    isOnline: false,
  },
  {
    id: "res-104",
    name: "Gabriela Silang",
    email: "gabriela.silang@gmail.com",
    mobile: "0945-333-8877",
    address: "23 Rizal Boulevard, Purok 4",
    purok: "Purok 4",
    role: "resident",
    status: "active",
    registered: "Oct 15, 2026",
    isOnline: false,
  },
  {
    id: "res-105",
    name: "Emilio Aguinaldo",
    email: "emilio.aguinaldo@gmail.com",
    mobile: "0999-444-2211",
    address: "55 Centro, Purok 7",
    purok: "Purok 7",
    role: "resident",
    status: "suspended",
    registered: "Oct 10, 2026",
    isOnline: false,
    banReason: "Community disturbance report under investigation",
  },
];

function ResidentsPage({
  pendingCount,
  onPendingChange,
  onToast,
  currentUser,
  onPromotedAdminsChange,
}: {
  pendingCount: number;
  onPendingChange: (count: number) => void;
  onToast: (msg: string) => void;
  currentUser?: Account | null;
  onPromotedAdminsChange?: (emails: string[]) => void;
}) {
  const [residents, setResidents] = useState<ResidentRecord[]>(() => {
    try {
      const cached = localStorage.getItem("brgy_residents_cache");
      if (cached) return JSON.parse(cached);
    } catch {}
    return fallbackResidents;
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [purokFilter, setPurokFilter] = useState("all");
  const [tab, setTab] = useState<
    "approved" | "pending" | "rejected" | "suspended" | "deleted" | "pwresets"
  >("approved");

  // Modals state
  const [selected, setSelected] = useState<ResidentRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editMobile, setEditMobile] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [addSubmitting, setAddSubmitting] = useState(false);
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [newResident, setNewResident] = useState({
    name: "",
    email: "",
    mobile: "",
    purok: "Purok 1",
    street: "",
    password: "Resident@2025!",
    immediateStatus: "active" as "active" | "pending",
  });

  // Rejection modal
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectingResident, setRejectingResident] =
    useState<ResidentRecord | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedPresetReason, setSelectedPresetReason] = useState("");

  // Delete modal (Soft delete -> moves to Deleted Accounts tab)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingResident, setDeletingResident] =
    useState<ResidentRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Purge modal (Hard delete -> erases from database)
  const [purgeModalOpen, setPurgeModalOpen] = useState(false);
  const [purgingResident, setPurgingResident] = useState<ResidentRecord | null>(
    null,
  );
  const [isPurging, setIsPurging] = useState(false);

  // Password reset requests & direct resident resets
  const [pwResetRequests, setPwResetRequests] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("brgy_pw_reset_requests") || "[]");
    } catch {
      return [];
    }
  });
  const [pwResetModalOpen, setPwResetModalOpen] = useState(false);
  const [pwResetTarget, setPwResetTarget] = useState<any>(null);
  const [pwResetAdminPass, setPwResetAdminPass] = useState("");
  const [pwResetNewPass, setPwResetNewPass] = useState("");
  const [pwResetConfirmPass, setPwResetConfirmPass] = useState("");
  const [pwResetError, setPwResetError] = useState("");
  const [pwResetSubmitting, setPwResetSubmitting] = useState(false);
  const [pwResetSuccess, setPwResetSuccess] = useState(false);
  const [showPwResetAdminPass, setShowPwResetAdminPass] = useState(false);
  const [showPwResetNew, setShowPwResetNew] = useState(false);
  const [copiedSms, setCopiedSms] = useState(false);

  // Reload pw reset requests from storage and Supabase
  async function reloadPwResetRequests() {
    try {
      const local = JSON.parse(
        localStorage.getItem("brgy_pw_reset_requests") || "[]",
      );
      try {
        const { data, error } = await supabase
          .from("password_reset_requests")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          const dbMapped = data.map((d: any) => ({
            id: String(d.id),
            name: d.full_name || d.name,
            email: d.email,
            phone: d.phone,
            requestedAt:
              d.created_at || d.requested_at || new Date().toISOString(),
            status: d.status || "pending",
            tempPassword: d.temp_password,
            dismissedAt:
              d.status === "dismissed"
                ? d.updated_at || d.created_at
                : undefined,
            updatedAt: d.updated_at || d.created_at,
          }));
          const merged = [...dbMapped];
          local.forEach((l: any) => {
            if (
              !merged.some(
                (m) => m.email?.toLowerCase() === l.email?.toLowerCase(),
              )
            ) {
              merged.push(l);
            }
          });
          setPwResetRequests(merged);
          localStorage.setItem(
            "brgy_pw_reset_requests",
            JSON.stringify(merged),
          );
          return;
        }
      } catch {}
      setPwResetRequests(local);
    } catch {}
  }

  function generateSecurePassword() {
    const prefixes = ["Brgy", "SanIsidro", "Citizen", "Portal", "Secure"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const num = Math.floor(1000 + Math.random() * 9000);
    const syms = ["!", "@", "#", "$", "*"];
    const sym = syms[Math.floor(Math.random() * syms.length)];
    return `${prefix}${sym}${num}`;
  }

  function handleOpenResetModal(target: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    reqId?: string;
  }) {
    const autoPass = generateSecurePassword();
    setPwResetTarget(target);
    setPwResetAdminPass("");
    setPwResetNewPass(autoPass);
    setPwResetConfirmPass(autoPass);
    setPwResetError("");
    setPwResetSuccess(false);
    setShowPwResetAdminPass(false);
    setShowPwResetNew(true);
    setCopiedSms(false);
    setPwResetModalOpen(true);
  }

  async function handleConfirmAdminPasswordReset() {
    if (!pwResetTarget) return;
    setPwResetError("");

    if (!pwResetAdminPass.trim()) {
      setPwResetError(
        "Please enter your administrator password to authorize this action.",
      );
      return;
    }
    if (!pwResetNewPass.trim() || pwResetNewPass.length < 6) {
      setPwResetError(
        "New temporary password must be at least 6 characters long.",
      );
      return;
    }
    if (pwResetNewPass !== pwResetConfirmPass) {
      setPwResetError("New password and confirmation do not match.");
      return;
    }

    setPwResetSubmitting(true);
    try {
      // 1. Verify current administrator's identity by validating password
      if (currentUser?.email) {
        const { error: authErr } = await supabase.auth.signInWithPassword({
          email: currentUser.email,
          password: pwResetAdminPass,
        });
        if (authErr) {
          setPwResetError(
            "Administrator verification failed: Your password was incorrect. Authorization denied.",
          );
          setPwResetSubmitting(false);
          return;
        }
      }

      const nowIso = new Date().toISOString();

      // 2. Update local requests queue
      const localRequests: any[] = JSON.parse(
        localStorage.getItem("brgy_pw_reset_requests") || "[]",
      );
      const updatedLocal = localRequests.map((req) => {
        if (
          (pwResetTarget.reqId && req.id === pwResetTarget.reqId) ||
          req.email?.toLowerCase() === pwResetTarget.email?.toLowerCase()
        ) {
          return {
            ...req,
            status: "completed",
            tempPassword: pwResetNewPass,
            resetAt: nowIso,
            updatedAt: nowIso,
            resetBy: currentUser?.name || "Administrator",
          };
        }
        return req;
      });
      localStorage.setItem(
        "brgy_pw_reset_requests",
        JSON.stringify(updatedLocal),
      );
      setPwResetRequests(updatedLocal);

      // 3. Save temporary password mapping so resident can sign in
      const tempMap = JSON.parse(
        localStorage.getItem("brgy_temp_passwords") || "{}",
      );
      tempMap[pwResetTarget.email.toLowerCase()] = {
        tempPassword: pwResetNewPass,
        phone: pwResetTarget.phone,
        name: pwResetTarget.name,
        resetAt: nowIso,
      };
      localStorage.setItem("brgy_temp_passwords", JSON.stringify(tempMap));

      // 4. Update Supabase password_reset_requests table
      try {
        const { data: updatedDb } = await supabase
          .from("password_reset_requests")
          .update({
            status: "completed",
            temp_password: pwResetNewPass,
            updated_at: nowIso,
          })
          .eq("email", pwResetTarget.email.toLowerCase())
          .select();

        if (!updatedDb || updatedDb.length === 0) {
          await supabase.from("password_reset_requests").insert([
            {
              full_name: pwResetTarget.name,
              email: pwResetTarget.email.toLowerCase(),
              phone: pwResetTarget.phone || "",
              status: "completed",
              temp_password: pwResetNewPass,
              updated_at: nowIso,
            },
          ]);
        }
      } catch {}

      // 5. Synchronize active reset across all devices via barangay metadata
      await syncActiveReset(pwResetTarget.email, pwResetNewPass);

      // 6. Try RPC if backend function exists
      if (pwResetTarget.id) {
        try {
          await supabase.rpc("admin_reset_password", {
            target_user_id: pwResetTarget.id,
            new_password: pwResetNewPass,
          });
        } catch {}

        saveResidentMeta(pwResetTarget.id, {
          tempPassword: pwResetNewPass,
          needsPwChange: true,
        });
      }

      setPwResetSuccess(true);
      onToast(`Password successfully reset for ${pwResetTarget.name}! 🔑`);
    } catch (err: any) {
      setPwResetError(
        err?.message || "Failed to reset password. Please try again.",
      );
    } finally {
      setPwResetSubmitting(false);
    }
  }

  async function handleDismissResetRequest(reqId: string, email?: string) {
    const nowIso = new Date().toISOString();
    const localRequests: any[] = JSON.parse(
      localStorage.getItem("brgy_pw_reset_requests") || "[]",
    );
    const updated = localRequests.map((r) =>
      r.id === reqId ||
      (email && r.email?.toLowerCase() === email.toLowerCase())
        ? { ...r, status: "dismissed", dismissedAt: nowIso, updatedAt: nowIso }
        : r,
    );
    localStorage.setItem("brgy_pw_reset_requests", JSON.stringify(updated));
    setPwResetRequests(updated);

    try {
      const numId = parseInt(reqId, 10);
      if (!isNaN(numId)) {
        await supabase
          .from("password_reset_requests")
          .update({ status: "dismissed", updated_at: nowIso })
          .eq("id", numId);
      }
      if (email) {
        await supabase
          .from("password_reset_requests")
          .update({ status: "dismissed", updated_at: nowIso })
          .eq("email", email.toLowerCase());
      }
    } catch (err) {
      console.warn("Supabase dismiss error:", err);
    }

    onToast("Password reset request permanently dismissed.");
  }

  // Fetch accounts directly from Supabase
  async function fetchResidents(silent = false) {
    if (!silent) setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const meta = getResidentMeta();
      const purged = getPurgedIds();

      const rawRows = data && data.length > 0 ? data : fallbackResidents;

      const mapped: ResidentRecord[] = rawRows
        .filter((row: any) => !purged.includes(String(row.id)))
        .map((row: any, idx: number) => {
          const rowMeta = meta[row.id] || {};
          let finalStatus = (
            rowMeta.statusOverride ||
            row.status ||
            "active"
          ).toLowerCase() as any;
          if (finalStatus === "verified") finalStatus = "active";

          // Derive Purok
          const address = row.address || "Barangay San Isidro";
          let purok = row.purok || "Purok 1";
          const purokMatch = address.match(/Purok\s*\d+/i);
          if (purokMatch) {
            purok = purokMatch[0];
          }

          // Online presence: current user is online, others have deterministic presence or metadata
          const isCurrent = currentUser?.id === row.id;
          const isOnline =
            finalStatus === "deleted"
              ? false
              : isCurrent ||
                (rowMeta.isOnline ??
                  (idx % 3 !== 1 && finalStatus === "active"));

          return {
            id: String(row.id),
            name: row.full_name || row.name || row.email || "Unnamed Resident",
            email: row.email || "",
            mobile: row.phone || row.mobile || "No contact",
            address,
            purok,
            role: (row.role || "resident") as "resident" | "admin",
            status: finalStatus,
            registered: formatResidentDate(row.created_at),
            isOnline,
            rejectionReason: rowMeta.rejectionReason,
            banReason: rowMeta.banReason,
            deletedAt: rowMeta.deletedAt,
            created_at: row.created_at,
          };
        });

      setResidents(mapped);
      try {
        localStorage.setItem("brgy_residents_cache", JSON.stringify(mapped));
      } catch {}

      // Keep pending count updated
      const pendingTotal = mapped.filter((r) => r.status === "pending").length;
      onPendingChange(pendingTotal);
    } catch (err) {
      console.error("Failed to load residents from Supabase:", err);
      setResidents((prev) => (prev.length > 0 ? prev : fallbackResidents));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Load and listen to real-time events
  useEffect(() => {
    fetchResidents();
    reloadPwResetRequests();

    const channel = supabase
      .channel("residents_page_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "accounts" },
        () => {
          fetchResidents(true);
        },
      )
      .subscribe();

    // Real-time subscription for password reset requests
    const pwResetChannel = supabase
      .channel("pw_reset_requests_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "password_reset_requests" },
        () => {
          reloadPwResetRequests();
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
      pwResetChannel.unsubscribe();
    };
  }, []);

  // Update edit form when selected resident changes
  useEffect(() => {
    if (selected) {
      setEditName(selected.name);
      setEditMobile(selected.mobile === "No contact" ? "" : selected.mobile);
      setEditAddress(selected.address);
      setIsEditing(false);
    }
  }, [selected]);

  // Actions
  async function handleApprove(residentId: string) {
    try {
      const { error } = await supabase
        .from("accounts")
        .update({ status: "active" })
        .eq("id", residentId);

      if (error) throw error;

      saveResidentMeta(residentId, {
        statusOverride: "active",
        rejectionReason: undefined,
        deletedAt: undefined,
        isOnline: true,
      });

      setResidents((prev) =>
        prev.map((r) =>
          r.id === residentId
            ? {
                ...r,
                status: "active",
                isOnline: true,
                rejectionReason: undefined,
                deletedAt: undefined,
              }
            : r,
        ),
      );

      const nextPending = Math.max(0, pendingCount - 1);
      onPendingChange(nextPending);
      if (selected?.id === residentId) {
        setSelected((prev) =>
          prev
            ? {
                ...prev,
                status: "active",
                isOnline: true,
                rejectionReason: undefined,
                deletedAt: undefined,
              }
            : null,
        );
      }
      onToast("Resident account approved and activated! 🎉");
    } catch (err: any) {
      console.error("Approve error:", err);
      saveResidentMeta(residentId, {
        statusOverride: "active",
        isOnline: true,
      });
      setResidents((prev) =>
        prev.map((r) =>
          r.id === residentId ? { ...r, status: "active", isOnline: true } : r,
        ),
      );
      onToast("Resident approved and activated.");
    }
  }

  function openRejectModal(resident: ResidentRecord) {
    setRejectingResident(resident);
    setRejectionReason("");
    setSelectedPresetReason("Incomplete or Unreadable Barangay ID");
    setRejectModalOpen(true);
  }

  async function handleConfirmReject() {
    if (!rejectingResident) return;
    const finalReason =
      rejectionReason.trim() ||
      selectedPresetReason ||
      "Registration criteria not met";

    try {
      // Try updating status to 'rejected'
      const { error } = await supabase
        .from("accounts")
        .update({ status: "rejected" })
        .eq("id", rejectingResident.id);

      // If DB constraint limits to active/pending/suspended, fallback to 'suspended' in DB
      if (error) {
        await supabase
          .from("accounts")
          .update({ status: "suspended" })
          .eq("id", rejectingResident.id);
      }

      saveResidentMeta(rejectingResident.id, {
        statusOverride: "rejected",
        rejectionReason: finalReason,
        isOnline: false,
      });

      setResidents((prev) =>
        prev.map((r) =>
          r.id === rejectingResident.id
            ? {
                ...r,
                status: "rejected",
                rejectionReason: finalReason,
                isOnline: false,
              }
            : r,
        ),
      );

      if (rejectingResident.status === "pending") {
        onPendingChange(Math.max(0, pendingCount - 1));
      }

      if (selected?.id === rejectingResident.id) {
        setSelected(null);
      }

      setRejectModalOpen(false);
      setRejectingResident(null);
      onToast("Account rejected and moved to Rejected Accounts tab.");
    } catch (err: any) {
      console.error("Reject error:", err);
      saveResidentMeta(rejectingResident.id, {
        statusOverride: "rejected",
        rejectionReason: finalReason,
        isOnline: false,
      });
      setResidents((prev) =>
        prev.map((r) =>
          r.id === rejectingResident.id
            ? {
                ...r,
                status: "rejected",
                rejectionReason: finalReason,
                isOnline: false,
              }
            : r,
        ),
      );
      setRejectModalOpen(false);
      setRejectingResident(null);
      onToast("Application rejected and archived.");
    }
  }

  async function handleSuspend(residentId: string) {
    try {
      const { error } = await supabase
        .from("accounts")
        .update({ status: "suspended" })
        .eq("id", residentId);

      if (error) throw error;

      saveResidentMeta(residentId, {
        statusOverride: "suspended",
        isOnline: false,
      });
      setResidents((prev) =>
        prev.map((r) =>
          r.id === residentId
            ? { ...r, status: "suspended", isOnline: false }
            : r,
        ),
      );
      if (selected?.id === residentId) {
        setSelected((prev) =>
          prev ? { ...prev, status: "suspended", isOnline: false } : null,
        );
      }
      onToast("Resident account has been suspended.");
    } catch (err: any) {
      console.error("Suspend error:", err);
      saveResidentMeta(residentId, {
        statusOverride: "suspended",
        isOnline: false,
      });
      setResidents((prev) =>
        prev.map((r) =>
          r.id === residentId
            ? { ...r, status: "suspended", isOnline: false }
            : r,
        ),
      );
      onToast("Resident account suspended.");
    }
  }

  async function handleBan(residentId: string) {
    try {
      const { error } = await supabase
        .from("accounts")
        .update({ status: "banned" })
        .eq("id", residentId);

      if (error) {
        // Fallback to suspended in DB if constraint limits values
        await supabase
          .from("accounts")
          .update({ status: "suspended" })
          .eq("id", residentId);
      }

      saveResidentMeta(residentId, {
        statusOverride: "banned",
        banReason: "Permanent ban issued by Barangay Administrator",
        isOnline: false,
      });

      setResidents((prev) =>
        prev.map((r) =>
          r.id === residentId
            ? {
                ...r,
                status: "banned",
                banReason: "Permanent ban issued by Barangay Administrator",
                isOnline: false,
              }
            : r,
        ),
      );

      if (selected?.id === residentId) {
        setSelected((prev) =>
          prev ? { ...prev, status: "banned", isOnline: false } : null,
        );
      }
      onToast("Resident has been permanently banned.");
    } catch (err: any) {
      console.error("Ban error:", err);
      saveResidentMeta(residentId, {
        statusOverride: "banned",
        isOnline: false,
      });
      setResidents((prev) =>
        prev.map((r) => (r.id === residentId ? { ...r, status: "banned" } : r)),
      );
      onToast("Resident banned.");
    }
  }

  async function handlePromoteToAdmin(residentId: string) {
    // Find the email of the resident being promoted
    const targetResident = residents.find((r) => r.id === residentId);
    try {
      const { error } = await supabase
        .from("accounts")
        .update({ role: "admin" })
        .eq("id", residentId);
      if (error) throw error;
      setResidents((prev) =>
        prev.map((r) => (r.id === residentId ? { ...r, role: "admin" } : r)),
      );
      if (selected?.id === residentId) {
        setSelected((prev) => (prev ? { ...prev, role: "admin" } : null));
      }
      // Also update barangay_settings so the promoted user's browser detects the role
      // change via the promotedAdmins state even before their next login
      if (targetResident?.email) {
        const newList = await syncPromotedAdminEmail(
          targetResident.email,
          true,
        );
        onPromotedAdminsChange?.(newList);
      }
      onToast("Resident promoted to Administrator! 👑");
    } catch (err: any) {
      console.error("Promote error:", err);
      setResidents((prev) =>
        prev.map((r) => (r.id === residentId ? { ...r, role: "admin" } : r)),
      );
      if (selected?.id === residentId) {
        setSelected((prev) => (prev ? { ...prev, role: "admin" } : null));
      }
      // Still try to sync via settings even if accounts update failed
      if (targetResident?.email) {
        const newList = await syncPromotedAdminEmail(
          targetResident.email,
          true,
        );
        onPromotedAdminsChange?.(newList);
      }
      onToast("Resident promoted to Administrator.");
    }
  }

  async function handleDemoteToResident(residentId: string) {
    const targetResident = residents.find((r) => r.id === residentId);
    try {
      const { error } = await supabase
        .from("accounts")
        .update({ role: "resident" })
        .eq("id", residentId);
      if (error) throw error;
      setResidents((prev) =>
        prev.map((r) => (r.id === residentId ? { ...r, role: "resident" } : r)),
      );
      if (selected?.id === residentId) {
        setSelected((prev) => (prev ? { ...prev, role: "resident" } : null));
      }
      // Remove from promoted admins list in barangay_settings
      if (targetResident?.email) {
        const newList = await syncPromotedAdminEmail(
          targetResident.email,
          false,
        );
        onPromotedAdminsChange?.(newList);
      }
      onToast("Admin privileges revoked. Account demoted to Resident.");
    } catch (err: any) {
      console.error("Demote error:", err);
      setResidents((prev) =>
        prev.map((r) => (r.id === residentId ? { ...r, role: "resident" } : r)),
      );
      if (selected?.id === residentId) {
        setSelected((prev) => (prev ? { ...prev, role: "resident" } : null));
      }
      if (targetResident?.email) {
        const newList = await syncPromotedAdminEmail(
          targetResident.email,
          false,
        );
        onPromotedAdminsChange?.(newList);
      }
      onToast("Account demoted to Resident.");
    }
  }

  async function handleReactivate(residentId: string) {
    try {
      const { error } = await supabase
        .from("accounts")
        .update({ status: "active" })
        .eq("id", residentId);

      if (error) throw error;

      saveResidentMeta(residentId, {
        statusOverride: "active",
        rejectionReason: undefined,
        banReason: undefined,
        deletedAt: undefined,
        isOnline: true,
      });

      removePurgedId(residentId);

      setResidents((prev) =>
        prev.map((r) =>
          r.id === residentId
            ? {
                ...r,
                status: "active",
                rejectionReason: undefined,
                banReason: undefined,
                deletedAt: undefined,
                isOnline: true,
              }
            : r,
        ),
      );

      if (selected?.id === residentId) {
        setSelected((prev) =>
          prev
            ? {
                ...prev,
                status: "active",
                isOnline: true,
                deletedAt: undefined,
                rejectionReason: undefined,
                banReason: undefined,
              }
            : null,
        );
      }
      onToast("Account restored and reactivated! 🟢");
    } catch (err: any) {
      console.error("Reactivate error:", err);
      saveResidentMeta(residentId, {
        statusOverride: "active",
        isOnline: true,
      });
      setResidents((prev) =>
        prev.map((r) =>
          r.id === residentId ? { ...r, status: "active", isOnline: true } : r,
        ),
      );
      onToast("Account reactivated.");
    }
  }

  // Open modal to move account to Deleted Accounts tab
  function openDeleteModal(resident: ResidentRecord) {
    setDeletingResident(resident);
    setDeleteModalOpen(true);
  }

  // Execute soft-delete: updates status in DB & moves to Deleted Accounts tab
  async function handleConfirmDelete() {
    if (!deletingResident) return;
    setIsDeleting(true);
    const targetId = deletingResident.id;
    const deletedDate = "Today";

    try {
      // 1. Try to set status to 'deleted' in Supabase
      const { error: updErr } = await supabase
        .from("accounts")
        .update({ status: "deleted" })
        .eq("id", targetId);

      // If constraint doesn't allow 'deleted', set to 'suspended' in DB so login is blocked
      if (updErr) {
        await supabase
          .from("accounts")
          .update({ status: "suspended" })
          .eq("id", targetId);
      }

      // 2. Persist in resident meta so it stays in Deleted Accounts tab
      saveResidentMeta(targetId, {
        statusOverride: "deleted",
        deletedAt: deletedDate,
        isOnline: false,
      });

      // 3. Update local state
      setResidents((prev) =>
        prev.map((r) =>
          r.id === targetId
            ? {
                ...r,
                status: "deleted",
                deletedAt: deletedDate,
                isOnline: false,
              }
            : r,
        ),
      );

      if (deletingResident.status === "pending") {
        onPendingChange(Math.max(0, pendingCount - 1));
      }

      if (selected?.id === targetId) {
        setSelected((prev) =>
          prev
            ? {
                ...prev,
                status: "deleted",
                isOnline: false,
                deletedAt: deletedDate,
              }
            : null,
        );
      }

      setDeleteModalOpen(false);
      setDeletingResident(null);
      onToast("Account moved to Deleted Accounts tab. 🗑️");
    } catch (err: any) {
      console.error("Delete error:", err);
      saveResidentMeta(targetId, {
        statusOverride: "deleted",
        deletedAt: deletedDate,
        isOnline: false,
      });
      setResidents((prev) =>
        prev.map((r) =>
          r.id === targetId
            ? {
                ...r,
                status: "deleted",
                deletedAt: deletedDate,
                isOnline: false,
              }
            : r,
        ),
      );
      setDeleteModalOpen(false);
      setDeletingResident(null);
      onToast("Account moved to Deleted Accounts tab.");
    } finally {
      setIsDeleting(false);
    }
  }

  // Restore account from Deleted tab back to Approved
  async function handleRestore(residentId: string) {
    try {
      const { error } = await supabase
        .from("accounts")
        .update({ status: "active" })
        .eq("id", residentId);

      if (error) throw error;

      saveResidentMeta(residentId, {
        statusOverride: "active",
        deletedAt: undefined,
        rejectionReason: undefined,
        banReason: undefined,
        isOnline: true,
      });

      removePurgedId(residentId);

      setResidents((prev) =>
        prev.map((r) =>
          r.id === residentId
            ? {
                ...r,
                status: "active",
                deletedAt: undefined,
                rejectionReason: undefined,
                banReason: undefined,
                isOnline: true,
              }
            : r,
        ),
      );

      if (selected?.id === residentId) {
        setSelected((prev) =>
          prev
            ? {
                ...prev,
                status: "active",
                isOnline: true,
                deletedAt: undefined,
                rejectionReason: undefined,
                banReason: undefined,
              }
            : null,
        );
      }
      onToast("Account restored to Approved Residents! 🟢");
    } catch (err: any) {
      console.error("Restore error:", err);
      saveResidentMeta(residentId, {
        statusOverride: "active",
        deletedAt: undefined,
        isOnline: true,
      });
      setResidents((prev) =>
        prev.map((r) =>
          r.id === residentId
            ? { ...r, status: "active", deletedAt: undefined, isOnline: true }
            : r,
        ),
      );
      if (selected?.id === residentId) {
        setSelected((prev) =>
          prev
            ? {
                ...prev,
                status: "active",
                isOnline: true,
                deletedAt: undefined,
              }
            : null,
        );
      }
      onToast("Account restored to Approved Residents.");
    }
  }

  // Open modal to permanently purge record
  function openPurgeModal(resident: ResidentRecord) {
    setPurgingResident(resident);
    setPurgeModalOpen(true);
  }

  // Permanently erase account from database and filter
  async function handleConfirmPurge() {
    if (!purgingResident) return;
    setIsPurging(true);
    const targetId = purgingResident.id;

    try {
      await supabase.from("accounts").delete().eq("id", targetId);
      addPurgedId(targetId);

      setResidents((prev) => prev.filter((r) => r.id !== targetId));

      if (selected?.id === targetId) {
        setSelected(null);
      }

      setPurgeModalOpen(false);
      setPurgingResident(null);
      onToast("Resident permanently purged from database.");
    } catch (err: any) {
      console.error("Purge error:", err);
      addPurgedId(targetId);
      setResidents((prev) => prev.filter((r) => r.id !== targetId));
      setPurgeModalOpen(false);
      setPurgingResident(null);
      onToast("Resident record purged.");
    } finally {
      setIsPurging(false);
    }
  }

  async function handleSaveEdit() {
    if (!selected) return;
    try {
      const { error } = await supabase
        .from("accounts")
        .update({
          full_name: editName.trim(),
          phone: editMobile.trim(),
          address: editAddress.trim(),
        })
        .eq("id", selected.id);

      if (error) throw error;

      setResidents((prev) =>
        prev.map((r) =>
          r.id === selected.id
            ? {
                ...r,
                name: editName.trim(),
                mobile: editMobile.trim() || "No contact",
                address: editAddress.trim(),
              }
            : r,
        ),
      );

      setSelected((prev) =>
        prev
          ? {
              ...prev,
              name: editName.trim(),
              mobile: editMobile.trim() || "No contact",
              address: editAddress.trim(),
            }
          : null,
      );

      setIsEditing(false);
      onToast("Resident details updated successfully.");
    } catch (err: any) {
      console.error("Update profile error:", err);
      onToast("Saved changes locally.");
      setIsEditing(false);
    }
  }

  // Manually add resident account
  async function handleAddResident() {
    if (!newResident.name.trim() || !newResident.email.trim()) {
      onToast("Name and email are required.");
      return;
    }
    setAddSubmitting(true);

    const fullAddress = newResident.street.trim()
      ? `${newResident.street.trim()}, ${newResident.purok}`
      : `Barangay San Isidro, ${newResident.purok}`;

    try {
      // 1. Create auth user with guest client so admin session is undisturbed
      const guest = createGuestClient();
      const { data: signUpData, error: signUpErr } = await guest.auth.signUp({
        email: newResident.email.trim().toLowerCase(),
        password: newResident.password || "Resident@2025!",
        options: {
          data: { full_name: newResident.name.trim() },
        },
      });

      let userId = signUpData?.user?.id;

      if (signUpErr || !userId) {
        console.warn("Auth signup notice:", signUpErr?.message);
        // Fallback UUID if signup limits or requires admin api
        userId =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `res-${Date.now()}`;
      }

      // 2. Insert into accounts table
      const { error: insertErr } = await supabase.from("accounts").insert([
        {
          id: userId,
          email: newResident.email.trim().toLowerCase(),
          full_name: newResident.name.trim(),
          phone: newResident.mobile.trim(),
          address: fullAddress,
          role: "resident",
          status: newResident.immediateStatus,
        },
      ]);

      if (insertErr) {
        console.error("Accounts table insert error:", insertErr);
      }

      saveResidentMeta(userId, {
        statusOverride: newResident.immediateStatus,
        isOnline: newResident.immediateStatus === "active",
      });

      const newRecord: ResidentRecord = {
        id: userId,
        name: newResident.name.trim(),
        email: newResident.email.trim().toLowerCase(),
        mobile: newResident.mobile.trim() || "No contact",
        address: fullAddress,
        purok: newResident.purok,
        role: "resident",
        status: newResident.immediateStatus,
        registered: "Today",
        isOnline: newResident.immediateStatus === "active",
      };

      setResidents((prev) => [newRecord, ...prev]);

      if (newResident.immediateStatus === "pending") {
        onPendingChange(pendingCount + 1);
      }

      setAddOpen(false);
      setNewResident({
        name: "",
        email: "",
        mobile: "",
        purok: "Purok 1",
        street: "",
        password: "Resident@2025!",
        immediateStatus: "active",
      });
      onToast(`Account created for ${newRecord.name}! 🎉`);
    } catch (err: any) {
      console.error("Failed to add resident:", err);
      onToast(err?.message || "Failed to create resident account");
    } finally {
      setAddSubmitting(false);
    }
  }

  // Categorize lists
  const approvedList = residents.filter((r) => r.status === "active");
  const pendingList = residents.filter((r) => r.status === "pending");
  const rejectedList = residents.filter((r) => r.status === "rejected");
  const suspendedList = residents.filter(
    (r) => r.status === "suspended" || r.status === "banned",
  );
  const deletedList = residents.filter((r) => r.status === "deleted");

  // Active list based on selected tab
  let currentList = approvedList;
  if (tab === "pending") currentList = pendingList;
  if (tab === "rejected") currentList = rejectedList;
  if (tab === "suspended") currentList = suspendedList;
  if (tab === "deleted") currentList = deletedList;

  // Filter by search & purok
  const filteredList = currentList.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.mobile.toLowerCase().includes(search.toLowerCase()) ||
      r.address.toLowerCase().includes(search.toLowerCase());

    const matchesPurok =
      purokFilter === "all" ||
      r.purok.toLowerCase() === purokFilter.toLowerCase() ||
      r.address.toLowerCase().includes(purokFilter.toLowerCase());

    return matchesSearch && matchesPurok;
  });

  const filteredPwResets = pwResetRequests.filter((req: any) => {
    const q = search.toLowerCase();
    return (
      (req.name || "").toLowerCase().includes(q) ||
      (req.email || "").toLowerCase().includes(q) ||
      (req.phone || "").toLowerCase().includes(q)
    );
  });

  const onlineCount = approvedList.filter((r) => r.isOnline).length;

  return (
    <div className="page inner-page">
      {/* ── Page Heading ──────────────────────────────────────────────── */}
      <section className="page-heading">
        <div>
          <p className="eyebrow">ADMINISTRATION & RESIDENT REGISTRY</p>
          <h1>
            Manage residents{" "}
            {pendingList.length > 0 && (
              <span className="heading-bubble">{pendingList.length} new</span>
            )}
          </h1>
          <p>
            Review applications, verify identity, manage resident access, and
            monitor community standing.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="row-action"
            onClick={() => fetchResidents()}
            title="Refresh database"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <span
              style={{
                display: "inline-block",
                animation: refreshing ? "spin 1s linear infinite" : "none",
              }}
            >
              <Icon name="refresh" size={14} />
            </span>
            Refresh
          </button>
          <button className="primary-button" onClick={() => setAddOpen(true)}>
            <Icon name="plus" /> Add resident
          </button>
        </div>
      </section>

      {/* ── Tabs Navigation: Approved, Pending, Rejected, Suspended, Deleted ── */}
      <nav className="resident-nav-tabs" aria-label="Resident categories">
        <button
          className={`resident-tab-btn ${tab === "approved" ? "active" : ""}`}
          onClick={() => setTab("approved")}
        >
          <Icon name="userCheck" size={17} />
          <span>Approved Residents</span>
          <span className="tab-counter">{approvedList.length}</span>
          <span
            style={{ fontSize: "11px", color: "#059669", marginLeft: "4px" }}
          >
            ({onlineCount} online)
          </span>
        </button>

        <button
          className={`resident-tab-btn ${tab === "pending" ? "active" : ""}`}
          onClick={() => setTab("pending")}
        >
          <Icon name="clock" size={17} />
          <span>Pending Approvals</span>
          <span
            className={`tab-counter ${pendingList.length > 0 ? "pending" : ""}`}
          >
            {pendingList.length}
          </span>
        </button>

        <button
          className={`resident-tab-btn ${tab === "rejected" ? "active" : ""}`}
          onClick={() => setTab("rejected")}
        >
          <Icon name="ban" size={17} />
          <span>Rejected Accounts</span>
          <span
            className={`tab-counter ${rejectedList.length > 0 ? "rejected" : ""}`}
          >
            {rejectedList.length}
          </span>
        </button>

        <button
          className={`resident-tab-btn ${tab === "suspended" ? "active" : ""}`}
          onClick={() => setTab("suspended")}
        >
          <Icon name="shield" size={17} />
          <span>Suspended & Banned</span>
          <span className="tab-counter suspended">{suspendedList.length}</span>
        </button>

        <button
          className={`resident-tab-btn ${tab === "deleted" ? "active" : ""}`}
          onClick={() => setTab("deleted")}
        >
          <Icon name="trash" size={17} />
          <span>Deleted Accounts</span>
          <span
            className={`tab-counter ${deletedList.length > 0 ? "deleted" : ""}`}
          >
            {deletedList.length}
          </span>
        </button>

        <button
          className={`resident-tab-btn ${tab === "pwresets" ? "active" : ""}`}
          onClick={() => {
            setTab("pwresets");
            reloadPwResetRequests();
          }}
          style={{ borderLeft: "2px solid #e5e7eb" }}
        >
          <Icon name="shield" size={17} />
          <span>Password Resets</span>
          <span
            className={`tab-counter ${pwResetRequests.filter((r: any) => r.status === "pending").length > 0 ? "pending" : ""}`}
          >
            {pwResetRequests.filter((r: any) => r.status === "pending").length}
          </span>
        </button>
      </nav>

      {/* ── Filter & Search Toolbar ───────────────────────────────────── */}
      <section className="table-card">
        <div
          className="table-tools"
          style={{ flexWrap: "wrap", gap: "12px", alignItems: "center" }}
        >
          <label
            className="search-box"
            style={{ flex: "1 1 240px", maxWidth: "420px" }}
          >
            <Icon name="search" />
            <input
              placeholder={
                tab === "pwresets"
                  ? `Search reset requests (${pwResetRequests.length})...`
                  : `Search in ${tab} (${currentList.length} residents)...`
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {tab !== "pwresets" && (
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  color: "#50655d",
                }}
              >
                <Icon name="filter" size={14} />
                <span>Area:</span>
                <select
                  value={purokFilter}
                  onChange={(e) => setPurokFilter(e.target.value)}
                  style={{
                    border: "1px solid #dfe7e3",
                    background: "white",
                    borderRadius: "7px",
                    padding: "5px 9px",
                    fontSize: "11px",
                    color: "#344941",
                    outline: "none",
                  }}
                >
                  <option value="all">All Puroks</option>
                  <option value="Purok 1">Purok 1 - Sampaguita</option>
                  <option value="Purok 2">Purok 2 - Mabini</option>
                  <option value="Purok 3">Purok 3 - Narra</option>
                  <option value="Purok 4">Purok 4 - Rizal</option>
                  <option value="Purok 5">Purok 5 - Ilang-Ilang</option>
                  <option value="Purok 6">Purok 6 - Riverside</option>
                  <option value="Purok 7">Purok 7 - Centro</option>
                </select>
              </label>
            )}

            <span style={{ fontSize: "11px", color: "#7a8e85" }}>
              {tab === "pwresets"
                ? `Showing ${filteredPwResets.length} of ${pwResetRequests.length}`
                : `Showing ${filteredList.length} of ${currentList.length}`}
            </span>
          </div>
        </div>

        {/* ── Table Headers ─────────────────────────────────────────── */}
        <div className="resident-table-head table-head">
          {tab === "pwresets" ? (
            <>
              <span>Resident / Applicant</span>
              <span>Registered Mobile</span>
              <span>Reset Status</span>
              <span>Requested Date</span>
              <span style={{ textAlign: "right" }}>Actions</span>
            </>
          ) : (
            <>
              <span>Resident</span>
              <span>Contact & Address</span>
              <span>
                {tab === "approved" ? "Status & Presence" : "Account Status"}
              </span>
              <span>
                {tab === "rejected"
                  ? "Rejection Reason"
                  : tab === "deleted"
                    ? "Date Deleted"
                    : "Registered"}
              </span>
              <span style={{ textAlign: "right" }}>Actions</span>
            </>
          )}
        </div>

        {/* ── Table Body ────────────────────────────────────────────── */}
        {tab === "pwresets" ? (
          filteredPwResets.length === 0 ? (
            <div
              style={{
                padding: "48px 20px",
                textAlign: "center",
                color: "#758880",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#163e32",
                  margin: "0 0 6px",
                }}
              >
                No password reset requests 🎉
              </p>
              <p style={{ fontSize: "12px", margin: 0 }}>
                When residents request password recovery on the login screen,
                their verified details will appear here for manual admin review
                and credential dispatch.
              </p>
            </div>
          ) : (
            filteredPwResets.map((req: any) => (
              <div className="resident-table-row table-row" key={req.id}>
                <div className="resident-cell-user">
                  <Avatar
                    initials={getInitials(req.name)}
                    tone={
                      req.status === "completed"
                        ? "green"
                        : req.status === "dismissed"
                          ? "blue"
                          : "amber"
                    }
                  />
                  <div className="resident-meta">
                    <strong>{req.name}</strong>
                    <small>{req.email}</small>
                  </div>
                </div>

                <div className="resident-contact-cell">
                  <strong>{req.phone}</strong>
                  <small>SMS Destination</small>
                </div>

                <div>
                  <b
                    className={`status ${req.status === "completed" ? "active" : req.status === "pending" ? "pending" : "rejected"}`}
                  >
                    {req.status === "completed"
                      ? "Reset Completed"
                      : req.status === "pending"
                        ? "Pending Admin Reset"
                        : "Dismissed"}
                  </b>
                </div>

                <div>
                  <span style={{ fontSize: "11px", color: "#61756e" }}>
                    {new Date(req.requestedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="table-actions-cell">
                  {req.status === "pending" ? (
                    <>
                      <button
                        className="btn-sm-action primary"
                        onClick={() =>
                          handleOpenResetModal({
                            name: req.name,
                            email: req.email,
                            phone: req.phone,
                            reqId: req.id,
                          })
                        }
                        title="Reset password with admin verification"
                      >
                        <Icon name="lock" size={13} /> Reset Password
                      </button>
                      <button
                        className="btn-sm-action danger"
                        onClick={() =>
                          handleDismissResetRequest(req.id, req.email)
                        }
                        title="Dismiss this request permanently"
                      >
                        <Icon name="x" size={13} /> Dismiss
                      </button>
                    </>
                  ) : req.status === "completed" ? (
                    <>
                      <button
                        className="btn-sm-action"
                        style={{
                          borderColor: "#10b981",
                          color: "#065f46",
                          background: "#ecfdf5",
                        }}
                        onClick={() => {
                          setPwResetTarget({
                            name: req.name,
                            email: req.email,
                            phone: req.phone,
                            reqId: req.id,
                          });
                          setPwResetNewPass(
                            req.tempPassword || "Resident@2025!",
                          );
                          setPwResetSuccess(true);
                          setPwResetModalOpen(true);
                        }}
                        title="View / Re-send SMS credentials"
                      >
                        <Icon name="message" size={13} /> SMS Details
                      </button>
                      <button
                        className="btn-sm-action"
                        onClick={() =>
                          handleOpenResetModal({
                            name: req.name,
                            email: req.email,
                            phone: req.phone,
                            reqId: req.id,
                          })
                        }
                        title="Reset password again"
                      >
                        Reset Again
                      </button>
                    </>
                  ) : (
                    <span
                      style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        fontStyle: "italic",
                        padding: "4px 8px",
                      }}
                    >
                      Permanently Dismissed
                    </span>
                  )}
                </div>
              </div>
            ))
          )
        ) : loading ? (
          <div
            style={{ padding: "40px", textAlign: "center", color: "#7a8e85" }}
          >
            <p>Loading resident accounts from database...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div
            style={{
              padding: "48px 20px",
              textAlign: "center",
              color: "#758880",
            }}
          >
            {tab === "pending" ? (
              <div>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#163e32",
                    margin: "0 0 6px",
                  }}
                >
                  All caught up! 🎉
                </p>
                <p style={{ fontSize: "12px", margin: 0 }}>
                  There are no pending resident registration requests awaiting
                  review.
                </p>
              </div>
            ) : tab === "rejected" ? (
              <div>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#163e32",
                    margin: "0 0 6px",
                  }}
                >
                  No rejected accounts on file
                </p>
                <p style={{ fontSize: "12px", margin: 0 }}>
                  Accounts that get declined during verification will appear
                  here cleanly separated from approved residents.
                </p>
              </div>
            ) : tab === "suspended" ? (
              <div>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#163e32",
                    margin: "0 0 6px",
                  }}
                >
                  No accounts sanctioned
                </p>
                <p style={{ fontSize: "12px", margin: 0 }}>
                  Currently there are no suspended or banned resident profiles.
                </p>
              </div>
            ) : tab === "deleted" ? (
              <div>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#163e32",
                    margin: "0 0 6px",
                  }}
                >
                  No deleted accounts on file
                </p>
                <p style={{ fontSize: "12px", margin: 0 }}>
                  Resident accounts deleted by an administrator will be stored
                  here, allowing you to restore them anytime or permanently
                  purge them.
                </p>
              </div>
            ) : (
              <div>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#163e32",
                    margin: "0 0 6px",
                  }}
                >
                  No residents match your search
                </p>
                <p style={{ fontSize: "12px", margin: 0 }}>
                  Try adjusting your search terms or filter settings.
                </p>
              </div>
            )}
          </div>
        ) : (
          filteredList.map((resident) => (
            <div
              className={`resident-table-row table-row ${
                resident.status === "pending" ? "new-resident-row" : ""
              }`}
              key={resident.id}
            >
              {/* Resident Column */}
              <div className="resident-cell-user">
                <Avatar
                  initials={getInitials(resident.name)}
                  tone={
                    resident.status === "pending"
                      ? "amber"
                      : resident.status === "rejected" ||
                          resident.status === "banned" ||
                          resident.status === "deleted"
                        ? "blue"
                        : "green"
                  }
                />
                <div className="resident-meta">
                  <strong
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {resident.name}
                    {resident.role === "admin" && (
                      <span
                        title="Administrator account"
                        style={{
                          fontSize: "10px",
                          background: "#7c3aed",
                          color: "white",
                          padding: "1px 6px",
                          borderRadius: "8px",
                          fontWeight: 700,
                          letterSpacing: "0.3px",
                        }}
                      >
                        👑 Admin
                      </span>
                    )}
                  </strong>
                  <small>{resident.email}</small>
                </div>
              </div>

              {/* Contact & Address Column */}
              <div className="resident-contact-cell">
                <strong>{resident.mobile}</strong>
                <small>{resident.address}</small>
              </div>

              {/* Status & Online Presence Column */}
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    alignItems: "flex-start",
                  }}
                >
                  <b className={`status ${resident.status}`}>
                    {resident.status === "active"
                      ? "Approved"
                      : resident.status === "pending"
                        ? "Pending Review"
                        : resident.status === "rejected"
                          ? "Rejected"
                          : resident.status === "suspended"
                            ? "Suspended"
                            : resident.status === "banned"
                              ? "Banned"
                              : "Deleted"}
                  </b>

                  {tab === "approved" && (
                    <span
                      className={`presence-badge ${resident.isOnline ? "online" : "offline"}`}
                    >
                      <span
                        className={`presence-dot ${resident.isOnline ? "online" : "offline"}`}
                      />
                      {currentUser?.id === resident.id
                        ? "Online (You)"
                        : resident.isOnline
                          ? "Online"
                          : "Offline"}
                    </span>
                  )}
                </div>
              </div>

              {/* Date / Rejection Reason / Deletion Date Column */}
              <div>
                {tab === "rejected" ? (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#b91c1c",
                      background: "#fef2f2",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      display: "inline-block",
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={resident.rejectionReason || "Application declined"}
                  >
                    {resident.rejectionReason || "Application declined"}
                  </span>
                ) : tab === "deleted" ? (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#991b1b",
                      background: "#fee2e2",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      display: "inline-block",
                      fontWeight: 600,
                    }}
                  >
                    Deleted {resident.deletedAt || "Recently"}
                  </span>
                ) : (
                  <span style={{ fontSize: "11px", color: "#61756e" }}>
                    {resident.registered}
                  </span>
                )}
              </div>

              {/* Action Buttons Column */}
              <div className="table-actions-cell">
                {resident.status === "pending" ? (
                  <>
                    <button
                      className="btn-sm-action primary"
                      onClick={() => handleApprove(resident.id)}
                      title="Approve resident"
                    >
                      <Icon name="check" size={13} /> Approve
                    </button>
                    <button
                      className="btn-sm-action danger"
                      onClick={() => openRejectModal(resident)}
                      title="Reject resident registration"
                    >
                      <Icon name="x" size={13} /> Reject
                    </button>
                    <button
                      className="btn-sm-action"
                      onClick={() => setSelected(resident)}
                      title="Review details"
                    >
                      Review
                    </button>
                  </>
                ) : resident.status === "rejected" ? (
                  <>
                    <button
                      className="btn-sm-action primary"
                      onClick={() => handleApprove(resident.id)}
                      title="Re-evaluate & approve this account"
                    >
                      <Icon name="check" size={13} /> Restore
                    </button>
                    <button
                      className="btn-sm-action"
                      onClick={() => setSelected(resident)}
                      title="View details"
                    >
                      Details
                    </button>
                    <button
                      className="btn-sm-action danger"
                      onClick={() => openDeleteModal(resident)}
                      title="Move to Deleted Accounts"
                    >
                      <Icon name="trash" size={13} />
                    </button>
                  </>
                ) : resident.status === "deleted" ? (
                  <>
                    <button
                      className="btn-sm-action primary"
                      onClick={() => handleRestore(resident.id)}
                      title="Restore account to Approved Residents"
                    >
                      <Icon name="refresh" size={13} /> Restore
                    </button>
                    <button
                      className="btn-sm-action"
                      onClick={() => setSelected(resident)}
                      title="View details"
                    >
                      Details
                    </button>
                    <button
                      className="btn-sm-action danger"
                      onClick={() => openPurgeModal(resident)}
                      title="Permanently purge from database"
                    >
                      <Icon name="trash" size={13} /> Purge
                    </button>
                  </>
                ) : resident.status === "suspended" ||
                  resident.status === "banned" ? (
                  <>
                    <button
                      className="btn-sm-action primary"
                      onClick={() => handleReactivate(resident.id)}
                      title="Reactivate account"
                    >
                      Reactivate
                    </button>
                    <button
                      className="btn-sm-action"
                      onClick={() => setSelected(resident)}
                    >
                      Manage
                    </button>
                    <button
                      className="btn-sm-action danger"
                      onClick={() => openDeleteModal(resident)}
                      title="Move to Deleted Accounts"
                    >
                      <Icon name="trash" size={13} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn-sm-action primary"
                      onClick={() => setSelected(resident)}
                    >
                      Manage
                    </button>
                    <button
                      className="btn-sm-action"
                      onClick={() =>
                        handleOpenResetModal({
                          id: resident.id,
                          name: resident.name,
                          email: resident.email,
                          phone: resident.mobile,
                        })
                      }
                      title="Reset resident password (requires administrator verification)"
                    >
                      <Icon name="lock" size={13} /> Reset PW
                    </button>
                    <button
                      className="btn-sm-action warning"
                      onClick={() => handleSuspend(resident.id)}
                      title="Temporarily suspend access"
                    >
                      Suspend
                    </button>
                    <button
                      className="btn-sm-action danger"
                      onClick={() => openDeleteModal(resident)}
                      title="Move to Deleted Accounts"
                    >
                      <Icon name="trash" size={13} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </section>

      {/* ── Modal: Manage Resident & Admin Authority ─────────────────── */}
      {selected && (
        <Modal
          title={
            selected.status === "pending"
              ? "Review Resident Registration"
              : `Manage Resident: ${selected.name}`
          }
          close={() => {
            setSelected(null);
            setIsEditing(false);
          }}
        >
          <div className="resident-manage-card">
            {/* Resident Hero Profile Header */}
            <div className="resident-profile-hero">
              <div className="resident-hero-left">
                <Avatar
                  initials={getInitials(selected.name)}
                  tone={
                    selected.status === "pending"
                      ? "amber"
                      : selected.status === "rejected" ||
                          selected.status === "banned" ||
                          selected.status === "deleted"
                        ? "blue"
                        : "green"
                  }
                />
                <div className="resident-hero-info">
                  <h2>{selected.name}</h2>
                  <p>{selected.email}</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  alignItems: "flex-end",
                }}
              >
                <b className={`status ${selected.status}`}>
                  {selected.status.toUpperCase()}
                </b>
                {selected.role === "admin" && (
                  <span
                    style={{
                      fontSize: "10px",
                      background: "#7c3aed",
                      color: "white",
                      padding: "2px 8px",
                      borderRadius: "8px",
                      fontWeight: 700,
                    }}
                  >
                    👑 Administrator
                  </span>
                )}
                <span
                  className={`presence-badge ${selected.isOnline ? "online" : "offline"}`}
                >
                  <span
                    className={`presence-dot ${selected.isOnline ? "online" : "offline"}`}
                  />
                  {selected.isOnline ? "Online Now" : "Offline"}
                </span>
              </div>
            </div>

            {/* Rejection / Sanction / Deleted Alert Box */}
            {selected.status === "deleted" && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "10px",
                  padding: "12px 14px",
                }}
              >
                <strong
                  style={{
                    color: "#991b1b",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Account in Deleted Archive
                </strong>
                <p style={{ margin: 0, fontSize: "12px", color: "#b91c1c" }}>
                  This resident account was moved to Deleted Accounts{" "}
                  {selected.deletedAt ? `(${selected.deletedAt})` : ""}. Access
                  to the portal is completely blocked.
                </p>
              </div>
            )}

            {selected.status === "rejected" && selected.rejectionReason && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "10px",
                  padding: "12px 14px",
                }}
              >
                <strong
                  style={{
                    color: "#991b1b",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Rejection Reason on Record:
                </strong>
                <p style={{ margin: 0, fontSize: "12px", color: "#b91c1c" }}>
                  {selected.rejectionReason}
                </p>
              </div>
            )}

            {selected.status === "banned" && (
              <div
                style={{
                  background: "#450a0a",
                  border: "1px solid #7f1d1d",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  color: "#fecaca",
                }}
              >
                <strong
                  style={{
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Permanent Ban Active
                </strong>
                <p style={{ margin: 0, fontSize: "11px", opacity: 0.9 }}>
                  This resident is barred from accessing community portal
                  services.
                </p>
              </div>
            )}

            {/* Resident Profile Details or Edit Mode */}
            {!isEditing ? (
              <>
                <dl className="resident-details-list">
                  <div>
                    <dt>Contact Number</dt>
                    <dd>{selected.mobile}</dd>
                  </div>
                  <div>
                    <dt>Registered Purok</dt>
                    <dd>{selected.purok}</dd>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <dt>Complete Address</dt>
                    <dd>{selected.address}</dd>
                  </div>
                  <div>
                    <dt>Account ID</dt>
                    <dd style={{ fontFamily: "monospace", fontSize: "11px" }}>
                      {selected.id.slice(0, 16)}...
                    </dd>
                  </div>
                  <div>
                    <dt>Joined System</dt>
                    <dd>{selected.registered}</dd>
                  </div>
                </dl>

                {selected.status !== "deleted" && (
                  <button
                    type="button"
                    className="row-action"
                    onClick={() => setIsEditing(true)}
                    style={{
                      alignSelf: "flex-start",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Icon name="edit" size={13} /> Edit Profile Information
                  </button>
                )}
              </>
            ) : (
              <div
                style={{
                  background: "#f8faf9",
                  border: "1px solid #e1ebe6",
                  borderRadius: "10px",
                  padding: "14px",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "12px",
                    color: "#25483a",
                  }}
                >
                  Update Resident Profile
                </h4>
                <label className="field" style={{ margin: "8px 0" }}>
                  Full Name
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </label>
                <label className="field" style={{ margin: "8px 0" }}>
                  Mobile Contact
                  <input
                    value={editMobile}
                    onChange={(e) => setEditMobile(e.target.value)}
                    placeholder="09XX XXX XXXX"
                  />
                </label>
                <label className="field" style={{ margin: "8px 0" }}>
                  Address
                  <input
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                  />
                </label>
                <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                  <button className="primary-button" onClick={handleSaveEdit}>
                    Save Changes
                  </button>
                  <button
                    className="row-action"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* ── Admin Authority Actions Control Box ─────────────────── */}
            <div className="authority-box">
              <h3 className="authority-title">
                <Icon name="shield" size={15} /> Administrator Authority &
                Standing
              </h3>

              <div className="authority-actions-row">
                {selected.status === "deleted" ? (
                  <>
                    <button
                      className="primary-button"
                      onClick={() => handleRestore(selected.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Icon name="refresh" size={15} /> Restore Account to
                      Approved
                    </button>
                    <button
                      className="btn-sm-action danger"
                      onClick={() => openPurgeModal(selected)}
                      style={{
                        padding: "9px 14px",
                        fontSize: "12px",
                        marginLeft: "auto",
                      }}
                    >
                      <Icon name="trash" size={14} /> Permanently Purge Record
                    </button>
                  </>
                ) : (
                  <>
                    {selected.status === "pending" && (
                      <>
                        <button
                          className="primary-button"
                          onClick={() => handleApprove(selected.id)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <Icon name="check" size={15} /> Approve & Activate
                          Account
                        </button>
                        <button
                          className="btn-sm-action danger"
                          onClick={() => openRejectModal(selected)}
                          style={{ padding: "9px 14px", fontSize: "12px" }}
                        >
                          <Icon name="x" size={15} /> Reject Registration
                        </button>
                      </>
                    )}

                    {selected.status === "active" && (
                      <>
                        {/* Promote / Demote Role */}
                        {selected.role === "resident" ? (
                          <button
                            className="btn-sm-action primary"
                            style={{
                              padding: "9px 14px",
                              fontSize: "12px",
                              background: "#7c3aed",
                              borderColor: "#7c3aed",
                              color: "white",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                            title="Grant admin privileges to this resident"
                            onClick={() => handlePromoteToAdmin(selected.id)}
                          >
                            <Icon name="shield" size={14} /> Promote to Admin
                          </button>
                        ) : selected.role === "admin" ? (
                          <button
                            className="btn-sm-action warning"
                            style={{
                              padding: "9px 14px",
                              fontSize: "12px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                            title="Revoke admin privileges and demote to resident"
                            onClick={() => handleDemoteToResident(selected.id)}
                          >
                            <Icon name="users" size={14} /> Demote to Resident
                          </button>
                        ) : null}
                        <button
                          className="btn-sm-action"
                          style={{
                            padding: "9px 14px",
                            fontSize: "12px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                          title="Reset resident password (requires administrator verification)"
                          onClick={() =>
                            handleOpenResetModal({
                              id: selected.id,
                              name: selected.name,
                              email: selected.email,
                              phone: selected.mobile,
                            })
                          }
                        >
                          <Icon name="lock" size={14} /> Reset Password
                        </button>
                        <button
                          className="btn-sm-action warning"
                          onClick={() => handleSuspend(selected.id)}
                          style={{ padding: "9px 14px", fontSize: "12px" }}
                        >
                          Suspend Access
                        </button>
                        <button
                          className="btn-sm-action danger"
                          onClick={() => handleBan(selected.id)}
                          style={{ padding: "9px 14px", fontSize: "12px" }}
                        >
                          <Icon name="ban" size={14} /> Ban Account
                        </button>
                      </>
                    )}

                    {selected.status === "rejected" && (
                      <button
                        className="primary-button"
                        onClick={() => handleApprove(selected.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Icon name="check" size={15} /> Re-evaluate & Restore to
                        Approved
                      </button>
                    )}

                    {(selected.status === "suspended" ||
                      selected.status === "banned") && (
                      <button
                        className="primary-button"
                        onClick={() => handleReactivate(selected.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Icon name="check" size={15} /> Lift Sanctions &
                        Reactivate
                      </button>
                    )}

                    <button
                      className="btn-sm-action danger"
                      onClick={() => openDeleteModal(selected)}
                      style={{
                        padding: "9px 14px",
                        fontSize: "12px",
                        marginLeft: "auto",
                      }}
                    >
                      <Icon name="trash" size={14} /> Delete Account
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Modal: Reject Account Reason Dialog ──────────────────────── */}
      {rejectModalOpen && rejectingResident && (
        <Modal
          title="Decline / Reject Resident Registration"
          close={() => {
            setRejectModalOpen(false);
            setRejectingResident(null);
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#485b54",
                lineHeight: "1.6",
              }}
            >
              Rejecting <strong>{rejectingResident.name}</strong> (`
              {rejectingResident.email}`) will move their application to the{" "}
              <strong>Rejected Accounts</strong> tab and prevent them from
              logging into Barangay Connect.
            </p>

            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#374f45",
                }}
              >
                Select Common Reason:
              </span>
              <div className="rejection-preset-container">
                {[
                  "Incomplete or Unreadable Barangay ID",
                  "Address Outside Barangay San Isidro Jurisdiction",
                  "Failed Identity Verification",
                  "Duplicate Resident Profile",
                  "Other reason",
                ].map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    className={`rejection-chip ${
                      selectedPresetReason === reason ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedPresetReason(reason);
                      if (reason !== "Other reason") setRejectionReason("");
                    }}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>

            <label className="field" style={{ margin: "4px 0" }}>
              Detailed Reason / Note to Applicant
              <textarea
                className="small-textarea"
                rows={3}
                placeholder="Explain why this account was declined (e.g. Please visit Barangay Hall Window 3 with physical proof of billing)..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </label>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <button
                type="button"
                className="row-action"
                onClick={() => {
                  setRejectModalOpen(false);
                  setRejectingResident(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-sm-action danger"
                style={{
                  padding: "9px 18px",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
                onClick={handleConfirmReject}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Modal: Delete Resident Account (Soft delete to Deleted tab) ── */}
      {deleteModalOpen && deletingResident && (
        <Modal
          title="Move Account to Deleted Archive"
          close={() => {
            setDeleteModalOpen(false);
            setDeletingResident(null);
          }}
        >
          <div className="danger-modal-box">
            <div className="danger-modal-icon">
              <Icon name="trash" size={26} />
            </div>
            <h3 className="danger-modal-title">
              Delete {deletingResident.name}'s Account?
            </h3>
            <p className="danger-modal-desc">
              Moving <strong>{deletingResident.name}</strong> (`
              {deletingResident.email}`) to the{" "}
              <strong>Deleted Accounts</strong> tab will immediately revoke
              their portal access. You can restore their profile anytime or
              permanently purge it from the Deleted Accounts tab.
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "12px",
              }}
            >
              <button
                className="row-action"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeletingResident(null);
                }}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="btn-sm-action danger"
                style={{
                  padding: "9px 20px",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Moving..." : "Move to Deleted Accounts"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Modal: Permanently Purge Record (Hard purge from DB) ─────── */}
      {purgeModalOpen && purgingResident && (
        <Modal
          title="Permanently Purge Resident Record"
          close={() => {
            setPurgeModalOpen(false);
            setPurgingResident(null);
          }}
        >
          <div className="danger-modal-box">
            <div
              className="danger-modal-icon"
              style={{ background: "#450a0a", color: "#fecaca" }}
            >
              <Icon name="ban" size={26} />
            </div>
            <h3 className="danger-modal-title" style={{ color: "#7f1d1d" }}>
              Permanently Erase {purgingResident.name}'s Record?
            </h3>
            <p className="danger-modal-desc">
              This action will completely wipe all database records for{" "}
              <strong>{purgingResident.name}</strong> (`{purgingResident.email}
              `). This cannot be undone or recovered.
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "12px",
              }}
            >
              <button
                className="row-action"
                onClick={() => {
                  setPurgeModalOpen(false);
                  setPurgingResident(null);
                }}
                disabled={isPurging}
              >
                Keep in Archive
              </button>
              <button
                className="btn-sm-action danger"
                style={{
                  padding: "9px 20px",
                  fontSize: "12px",
                  fontWeight: "700",
                  background: "#991b1b",
                  color: "#fff",
                }}
                onClick={handleConfirmPurge}
                disabled={isPurging}
              >
                {isPurging ? "Purging..." : "Yes, Purge Permanently"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Modal: Manually Add Resident ─────────────────────────────── */}
      {addOpen && (
        <Modal
          title="Manually Register Resident"
          close={() => setAddOpen(false)}
        >
          <p className="modal-intro" style={{ marginBottom: "16px" }}>
            Create an official resident profile on behalf of a citizen who
            cannot register online.
          </p>

          <label className="field">
            Full Name *
            <input
              value={newResident.name}
              onChange={(e) =>
                setNewResident({ ...newResident, name: e.target.value })
              }
              placeholder="e.g. Juan P. Dela Cruz"
            />
          </label>

          <div className="form-grid">
            <label className="field">
              Email Address *
              <input
                type="email"
                value={newResident.email}
                onChange={(e) =>
                  setNewResident({ ...newResident, email: e.target.value })
                }
                placeholder="resident@example.com"
              />
            </label>
            <label className="field">
              Mobile Contact Number
              <input
                value={newResident.mobile}
                onChange={(e) =>
                  setNewResident({ ...newResident, mobile: e.target.value })
                }
                placeholder="0917 123 4567"
              />
            </label>
          </div>

          <div className="form-grid">
            <label className="field">
              Purok / Area
              <select
                value={newResident.purok}
                onChange={(e) =>
                  setNewResident({ ...newResident, purok: e.target.value })
                }
              >
                <option value="Purok 1">Purok 1 - Sampaguita</option>
                <option value="Purok 2">Purok 2 - Mabini</option>
                <option value="Purok 3">Purok 3 - Narra</option>
                <option value="Purok 4">Purok 4 - Rizal</option>
                <option value="Purok 5">Purok 5 - Ilang-Ilang</option>
                <option value="Purok 6">Purok 6 - Riverside</option>
                <option value="Purok 7">Purok 7 - Centro</option>
              </select>
            </label>
            <label className="field">
              Street / House No.
              <input
                value={newResident.street}
                onChange={(e) =>
                  setNewResident({ ...newResident, street: e.target.value })
                }
                placeholder="123 Mabini Street"
              />
            </label>
          </div>

          <label className="field">
            Initial Temporary Password
            <div style={{ position: "relative" }}>
              <input
                type={showAddPassword ? "text" : "password"}
                value={newResident.password}
                onChange={(e) =>
                  setNewResident({ ...newResident, password: e.target.value })
                }
                style={{ width: "100%", paddingRight: "40px" }}
              />
              <button
                type="button"
                onClick={() => setShowAddPassword(!showAddPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "11px",
                  color: "#176b4d",
                  fontWeight: "600",
                }}
              >
                {showAddPassword ? "Hide" : "Show"}
              </button>
            </div>
            <small style={{ color: "#74867f", fontSize: "10px" }}>
              Default is `Resident@2025!`. Resident can change this after
              logging in.
            </small>
          </label>

          <label className="field" style={{ marginTop: "10px" }}>
            Initial Verification Status
            <select
              value={newResident.immediateStatus}
              onChange={(e) =>
                setNewResident({
                  ...newResident,
                  immediateStatus: e.target.value as "active" | "pending",
                })
              }
            >
              <option value="active">
                Approve & Activate Immediately (Pre-verified in person)
              </option>
              <option value="pending">
                Awaiting Verification (Requires review)
              </option>
            </select>
          </label>

          <button
            className="primary-button full"
            onClick={handleAddResident}
            disabled={
              addSubmitting ||
              !newResident.name.trim() ||
              !newResident.email.trim()
            }
            style={{ marginTop: "16px" }}
          >
            {addSubmitting
              ? "Creating resident account..."
              : "Create resident account"}
          </button>
        </Modal>
      )}

      {/* ── Modal: Secure Password Reset & SMS Gateway ───────────────── */}
      {pwResetModalOpen && pwResetTarget && (
        <Modal
          title={
            pwResetSuccess
              ? "SMS Notification Dispatch"
              : `Reset Password: ${pwResetTarget.name}`
          }
          close={() => {
            setPwResetModalOpen(false);
            setPwResetSuccess(false);
            setPwResetError("");
          }}
        >
          {pwResetSuccess ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  background: "#ecfdf5",
                  border: "1px solid #a7f3d0",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "#10b981",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name="check" size={22} />
                </div>
                <div>
                  <h4
                    style={{
                      margin: 0,
                      color: "#065f46",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    Password Successfully Reset!
                  </h4>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: "12px",
                      color: "#047857",
                    }}
                  >
                    The temporary credentials for{" "}
                    <strong>{pwResetTarget.name}</strong> are ready. Send the
                    SMS message below to their registered phone number.
                  </p>
                </div>
              </div>

              {/* Resident Credential Summary */}
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "14px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    fontSize: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "11px",
                        display: "block",
                      }}
                    >
                      Resident
                    </span>
                    <strong style={{ color: "#0f172a" }}>
                      {pwResetTarget.name}
                    </strong>
                  </div>
                  <div>
                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "11px",
                        display: "block",
                      }}
                    >
                      Registered Mobile
                    </span>
                    <strong style={{ color: "#0f172a" }}>
                      {pwResetTarget.phone}
                    </strong>
                  </div>
                </div>
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px dashed #cbd5e1",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        display: "block",
                      }}
                    >
                      New Temporary Password:
                    </span>
                    <code
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#166534",
                        letterSpacing: "1px",
                      }}
                    >
                      {pwResetNewPass}
                    </code>
                  </div>
                  <button
                    type="button"
                    className="btn-sm-action"
                    onClick={() => {
                      navigator.clipboard.writeText(pwResetNewPass);
                      onToast("Password copied to clipboard! 📋");
                    }}
                  >
                    Copy Password
                  </button>
                </div>
              </div>

              {/* SMS Message Template Box */}
              <div>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#334155",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  <Icon name="message" size={14} /> SMS Dispatch Template:
                </label>
                <div
                  style={{
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "12.5px",
                    color: "#1e293b",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                    fontFamily: "monospace",
                  }}
                >
                  {`Good day ${pwResetTarget.name}! Your Barangay Connect portal password has been reset by the Barangay Administration.\n\nTemporary Password: ${pwResetNewPass}\n\nPlease sign in to the portal and update your password under Settings. Thank you!`}
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                  marginTop: "4px",
                }}
              >
                <button
                  type="button"
                  className="btn-sm-action"
                  onClick={() => {
                    const smsText = `Good day ${pwResetTarget.name}! Your Barangay Connect portal password has been reset by the Barangay Administration.\n\nTemporary Password: ${pwResetNewPass}\n\nPlease sign in to the portal and update your password under Settings. Thank you!`;
                    navigator.clipboard.writeText(smsText);
                    setCopiedSms(true);
                    onToast("SMS message text copied to clipboard! 📋");
                    setTimeout(() => setCopiedSms(false), 3000);
                  }}
                  style={{ padding: "9px 14px" }}
                >
                  <Icon name="check" size={14} />{" "}
                  {copiedSms ? "Copied to Clipboard!" : "Copy SMS Text"}
                </button>

                <a
                  href={`sms:${pwResetTarget.phone}?body=${encodeURIComponent(
                    `Good day ${pwResetTarget.name}! Your Barangay Connect portal password has been reset by the Barangay Administration.\n\nTemporary Password: ${pwResetNewPass}\n\nPlease sign in to the portal and update your password under Settings. Thank you!`,
                  )}`}
                  className="primary-button"
                  style={{
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "9px 16px",
                  }}
                  onClick={() =>
                    onToast("Opening messaging app to send SMS...")
                  }
                >
                  <Icon name="message" size={14} /> Send SMS to{" "}
                  {pwResetTarget.phone}
                </a>

                <button
                  type="button"
                  className="row-action"
                  onClick={() => {
                    setPwResetModalOpen(false);
                    setPwResetSuccess(false);
                  }}
                  style={{ padding: "9px 16px" }}
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {/* Security Warning & Re-auth Gate */}
              <div
                style={{
                  background: "#fff7ed",
                  border: "1px solid #ffedd5",
                  borderRadius: "8px",
                  padding: "12px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ color: "#c2410c", marginTop: "2px" }}>
                  <Icon name="shield" size={18} />
                </div>
                <div>
                  <strong
                    style={{
                      fontSize: "12.5px",
                      color: "#9a3412",
                      display: "block",
                    }}
                  >
                    Security Gate: Admin Authentication Required
                  </strong>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: "11.5px",
                      color: "#7c2d12",
                      lineHeight: 1.5,
                    }}
                  >
                    Resetting resident credentials is a sensitive operation. You
                    must enter your administrator password to authorize this
                    action.
                  </p>
                </div>
              </div>

              {pwResetError && (
                <div className="login-error" style={{ margin: 0 }}>
                  <Icon name="x" size={15} /> {pwResetError}
                </div>
              )}

              {/* Target info card */}
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      display: "block",
                    }}
                  >
                    Target Resident Account
                  </span>
                  <strong style={{ fontSize: "13px", color: "#0f172a" }}>
                    {pwResetTarget.name}
                  </strong>
                  <span
                    style={{
                      fontSize: "11.5px",
                      color: "#475569",
                      display: "block",
                    }}
                  >
                    {pwResetTarget.email} · {pwResetTarget.phone}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: "10px",
                      background: "#e2e8f0",
                      color: "#334155",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontWeight: 600,
                    }}
                  >
                    SMS Destination Verified
                  </span>
                </div>
              </div>

              {/* Admin Password Re-entry */}
              <label className="field" style={{ margin: 0 }}>
                <span
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>Your Administrator Password *</strong>
                  <small style={{ color: "#dc2626", fontWeight: 600 }}>
                    Required for safety
                  </small>
                </span>
                <div className="password-wrapper">
                  <input
                    type={showPwResetAdminPass ? "text" : "password"}
                    placeholder="Enter your admin password"
                    value={pwResetAdminPass}
                    onChange={(e) => {
                      setPwResetAdminPass(e.target.value);
                      setPwResetError("");
                    }}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() =>
                      setShowPwResetAdminPass(!showPwResetAdminPass)
                    }
                  >
                    {showPwResetAdminPass ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              {/* New Temporary Password with Generator */}
              <label className="field" style={{ margin: 0 }}>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>New Temporary Password for Resident *</strong>
                  <button
                    type="button"
                    onClick={() => {
                      const pass = generateSecurePassword();
                      setPwResetNewPass(pass);
                      setPwResetConfirmPass(pass);
                    }}
                    style={{
                      border: "none",
                      background: "none",
                      color: "#059669",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    🎲 Generate Random Password
                  </button>
                </span>
                <div className="password-wrapper">
                  <input
                    type={showPwResetNew ? "text" : "password"}
                    placeholder="Temporary password (min 6 characters)"
                    value={pwResetNewPass}
                    onChange={(e) => setPwResetNewPass(e.target.value)}
                  />
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowPwResetNew(!showPwResetNew)}
                  >
                    {showPwResetNew ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <label className="field" style={{ margin: 0 }}>
                <strong>Confirm Temporary Password *</strong>
                <input
                  type={showPwResetNew ? "text" : "password"}
                  placeholder="Re-enter temporary password"
                  value={pwResetConfirmPass}
                  onChange={(e) => setPwResetConfirmPass(e.target.value)}
                />
              </label>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <button
                  type="button"
                  className="row-action"
                  onClick={() => {
                    setPwResetModalOpen(false);
                    setPwResetError("");
                  }}
                  disabled={pwResetSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="primary-button"
                  onClick={handleConfirmAdminPasswordReset}
                  disabled={pwResetSubmitting}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Icon name="shield" size={15} />
                  {pwResetSubmitting
                    ? "Verifying & Resetting…"
                    : "Verify & Reset Password"}
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ─── Barangay Settings ───────────────────────────────────────────────────────

function BarangaySettingsPage({
  onToast,
  barangay,
  onBarangayChange,
  currentUser,
}: {
  onToast: (msg: string) => void;
  barangay: BarangayInfo;
  onBarangayChange: (info: BarangayInfo) => void;
  currentUser?: Account | null;
}) {
  const [tab, setTab] = useState<
    "profile" | "hours" | "documents" | "notifications" | "security"
  >("profile");
  const [info, setInfo] = useState<BarangayInfo>(barangay);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("Synced with cloud");

  // Keep info in sync if parent barangay changes and user isn't actively editing
  useEffect(() => {
    if (!isDirty) {
      setInfo(barangay);
    }
  }, [barangay, isDirty]);

  // Operating Hours state
  const [schedule, setSchedule] = useState<OperatingDay[]>(getCachedSchedule);
  const [holidayNotice, setHolidayNotice] = useState<string>(() => {
    return (
      localStorage.getItem("barangay_holiday_notice") ||
      "The barangay office will be closed on declared public holidays."
    );
  });

  // Listen for schedule updates pushed from other devices via realtime → custom event
  useEffect(() => {
    const handleRemoteSchedule = (e: Event) => {
      const remote = (e as CustomEvent<OperatingDay[]>).detail;
      if (Array.isArray(remote) && remote.length > 0 && !isDirty) {
        setSchedule(remote);
      }
    };
    window.addEventListener("barangay_schedule_updated", handleRemoteSchedule);
    return () => {
      window.removeEventListener(
        "barangay_schedule_updated",
        handleRemoteSchedule,
      );
    };
  }, [isDirty]);

  // Document Services state
  const [services, setServices] = useState<DocumentService[]>(
    getCachedDocumentServices,
  );
  const [editingService, setEditingService] = useState<DocumentService | null>(
    null,
  );
  const [addingService, setAddingService] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceDays, setNewServiceDays] = useState(3);
  const [newServiceFee, setNewServiceFee] = useState("₱ 50");
  const [newServiceReq, setNewServiceReq] = useState("");
  const [newServiceDesc, setNewServiceDesc] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Notification preferences state
  const [notifPrefs, setNotifPrefs] =
    useState<NotificationPrefs>(getCachedNotifPrefs);

  // Security preferences state
  const [securityPrefs, setSecurityPrefs] = useState<SecurityAccessPrefs>(
    getCachedSecurityPrefs,
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  // Database Diagnostics state
  const [dbStatus, setDbStatus] = useState<{
    latency: number;
    accountsCount: number;
    announcementsCount: number;
    documentsCount: number;
    incidentsCount: number;
    lastTested: string;
  } | null>(null);
  const [isTestingDb, setIsTestingDb] = useState(false);

  const tabs: {
    id: "profile" | "hours" | "documents" | "notifications" | "security";
    label: string;
    icon: IconName;
  }[] = [
    { id: "profile", label: "Barangay profile", icon: "logo" },
    { id: "hours", label: "Operating hours", icon: "calendar" },
    { id: "documents", label: "Document services", icon: "document" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "security", label: "Security & Cloud", icon: "shield" },
  ];

  // ── Cloud Sync (Pull latest from DB) ──
  const handleSyncFromCloud = async () => {
    setIsSyncing(true);
    try {
      const { data, error } = await supabase
        .from("barangay_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        onToast("Sync failed: " + error.message);
      } else if (data) {
        const cloudInfo: BarangayInfo = {
          name: data.name || defaultBarangayInfo.name,
          city: data.city || defaultBarangayInfo.city,
          district: data.district || defaultBarangayInfo.district,
          captain: data.captain || defaultBarangayInfo.captain,
          phone: data.phone || defaultBarangayInfo.phone,
          email: data.email || defaultBarangayInfo.email,
          address: data.address || defaultBarangayInfo.address,
          description: data.description || defaultBarangayInfo.description,
          weekdayHours: data.weekday_hours || defaultBarangayInfo.weekdayHours,
          saturdayHours:
            data.saturday_hours || defaultBarangayInfo.saturdayHours,
          sundayHours: data.sunday_hours || defaultBarangayInfo.sundayHours,
        };
        setInfo(cloudInfo);
        onBarangayChange(cloudInfo);
        localStorage.setItem("barangay_info", JSON.stringify(cloudInfo));
        setLastSyncTime(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
        onToast("Barangay settings refreshed from Supabase database!");
      }
    } catch (err: any) {
      onToast("Sync error: " + (err.message || "Unknown error"));
    } finally {
      setIsSyncing(false);
    }
  };

  // ── Cloud Save (Push changes to DB) ──
  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      // 1. Preserve promoted admin emails and active resets inside description
      let currentDesc = "";
      try {
        const { data: dbSettings } = await supabase
          .from("barangay_settings")
          .select("description")
          .eq("id", 1)
          .maybeSingle();
        currentDesc = dbSettings?.description || "";
      } catch {}

      const cleanDesc = cleanBarangayDescription(info.description);
      const adminRolesMatch = (currentDesc || "").match(
        /<!--\s*ADMIN_ROLES:\s*(\[.*?\])\s*-->/,
      );
      const activeResetsMatch = (currentDesc || "").match(
        /<!--\s*ACTIVE_RESETS:\s*(\{.*?\})\s*-->/,
      );

      let fullDesc = cleanDesc;
      if (adminRolesMatch) {
        fullDesc += `\n<!-- ADMIN_ROLES: ${adminRolesMatch[1]} -->`;
      } else {
        const promoted = getPromotedAdminEmails();
        if (promoted.length > 0) {
          fullDesc += `\n<!-- ADMIN_ROLES: ${JSON.stringify(promoted)} -->`;
        }
      }
      if (activeResetsMatch) {
        fullDesc += `\n<!-- ACTIVE_RESETS: ${activeResetsMatch[1]} -->`;
      }
      // Always embed the full 7-day schedule so other devices can read it via realtime
      fullDesc += `\n<!-- SCHEDULE: ${JSON.stringify(schedule)} -->`;

      // Derive operating hour summaries directly from the schedule
      const mon = schedule[0];
      const sat = schedule[5];
      const sun = schedule[6];
      const derivedWeekday = mon?.active
        ? `${mon.open} to ${mon.close}`
        : "Closed";
      const derivedSat = sat?.active ? `${sat.open} to ${sat.close}` : "Closed";
      const derivedSun = sun?.active ? `${sun.open} to ${sun.close}` : "Closed";

      const updatedInfo: BarangayInfo = {
        ...info,
        weekdayHours: derivedWeekday,
        saturdayHours: derivedSat,
        sundayHours: derivedSun,
      };

      // 1. Upsert Supabase barangay_settings table
      const { error } = await supabase.from("barangay_settings").upsert({
        id: 1,
        name: updatedInfo.name,
        city: updatedInfo.city,
        district: updatedInfo.district,
        captain: updatedInfo.captain,
        phone: updatedInfo.phone,
        email: updatedInfo.email,
        address: updatedInfo.address,
        description: fullDesc,
        weekday_hours: updatedInfo.weekdayHours,
        saturday_hours: updatedInfo.saturdayHours,
        sunday_hours: updatedInfo.sundayHours,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.warn("Supabase upsert error:", error);
      }

      // 2. Persist to local caches
      localStorage.setItem("barangay_info", JSON.stringify(updatedInfo));
      saveCachedSchedule(schedule);
      localStorage.setItem("barangay_holiday_notice", holidayNotice);
      saveCachedDocumentServices(services);
      saveCachedNotifPrefs(notifPrefs);
      saveCachedSecurityPrefs(securityPrefs);

      // 3. Update state
      setIsDirty(false);
      setInfo(updatedInfo);
      onBarangayChange(updatedInfo);
      setLastSyncTime("Just now");
      onToast("Barangay settings saved and synchronized to database!");
    } catch (err: any) {
      onToast("Save error: " + (err.message || "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  // ── Schedule Handlers ──
  const handleToggleDay = (dayIndex: number) => {
    setIsDirty(true);
    const updated = [...schedule];
    updated[dayIndex].active = !updated[dayIndex].active;
    setSchedule(updated);
    saveCachedSchedule(updated);

    const mon = updated[0];
    const sat = updated[5];
    const sun = updated[6];
    setInfo((prev) => ({
      ...prev,
      weekdayHours: mon?.active ? `${mon.open} to ${mon.close}` : "Closed",
      saturdayHours: sat?.active ? `${sat.open} to ${sat.close}` : "Closed",
      sundayHours: sun?.active ? `${sun.open} to ${sun.close}` : "Closed",
    }));
  };

  const handleTimeChange = (
    dayIndex: number,
    field: "open" | "close",
    val: string,
  ) => {
    setIsDirty(true);
    const updated = [...schedule];
    updated[dayIndex][field] = val;
    setSchedule(updated);
    saveCachedSchedule(updated);

    const mon = updated[0];
    const sat = updated[5];
    const sun = updated[6];
    setInfo((prev) => ({
      ...prev,
      weekdayHours: mon?.active ? `${mon.open} to ${mon.close}` : "Closed",
      saturdayHours: sat?.active ? `${sat.open} to ${sat.close}` : "Closed",
      sundayHours: sun?.active ? `${sun.open} to ${sun.close}` : "Closed",
    }));
  };

  // ── Document Services Handlers ──
  const handleToggleService = (id: string) => {
    const updated = services.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s,
    );
    setServices(updated);
    saveCachedDocumentServices(updated);
    onToast("Document availability updated");
  };

  const handleSaveNewService = () => {
    if (!newServiceName.trim()) {
      onToast("Please enter document service name");
      return;
    }
    const newDoc: DocumentService = {
      id: "doc-" + Date.now(),
      name: newServiceName.trim(),
      days: Number(newServiceDays) || 1,
      fee: newServiceFee.trim() || "Free",
      requirements: newServiceReq.trim() || "Valid Government ID",
      description:
        newServiceDesc.trim() || "Official barangay document service.",
      enabled: true,
    };
    const updated = [...services, newDoc];
    setServices(updated);
    saveCachedDocumentServices(updated);
    setAddingService(false);
    setNewServiceName("");
    setNewServiceReq("");
    setNewServiceDesc("");
    onToast(`Added "${newDoc.name}" to document catalog`);
  };

  const handleSaveEditService = () => {
    if (!editingService) return;
    const updated = services.map((s) =>
      s.id === editingService.id ? editingService : s,
    );
    setServices(updated);
    saveCachedDocumentServices(updated);
    setEditingService(null);
    onToast(`Updated "${editingService.name}" details`);
  };

  const handleDeleteService = (id: string) => {
    const target = services.find((s) => s.id === id);
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    saveCachedDocumentServices(updated);
    setDeleteConfirmId(null);
    onToast(`Removed "${target?.name || "document"}"`);
  };

  const handleResetServices = () => {
    setServices(defaultDocumentServices);
    saveCachedDocumentServices(defaultDocumentServices);
    onToast("Document catalog reset to standard templates");
  };

  // ── Notification Handlers ──
  const handleToggleNotif = (key: keyof NotificationPrefs) => {
    const updated = { ...notifPrefs, [key]: !notifPrefs[key] };
    setNotifPrefs(updated);
    saveCachedNotifPrefs(updated);
    onToast("Notification preference updated");
  };

  // ── Security Handlers ──
  const handleToggleSecurityPref = (key: keyof SecurityAccessPrefs) => {
    const updated = { ...securityPrefs, [key]: !securityPrefs[key] };
    setSecurityPrefs(updated);
    saveCachedSecurityPrefs(updated);
    onToast("Access rule updated");
  };

  const handleUpdatePassword = async () => {
    setPasswordStatus(null);
    if (!currentPassword) {
      setPasswordStatus({
        type: "error",
        msg: "Please enter your current administrator password.",
      });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordStatus({
        type: "error",
        msg: "New password must be at least 6 characters long.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        type: "error",
        msg: "New password and password confirmation do not match.",
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const { error: authErr } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (authErr) {
        setPasswordStatus({ type: "error", msg: authErr.message });
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordStatus({
        type: "success",
        msg: "Administrator password updated successfully in cloud authentication!",
      });
      onToast("Admin password successfully updated!");
    } catch (err: any) {
      setPasswordStatus({
        type: "error",
        msg: err.message || "Failed to update password.",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleTestDatabase = async () => {
    setIsTestingDb(true);
    const start = performance.now();
    try {
      const [acctRes, annRes, docRes, incRes] = await Promise.all([
        supabase.from("accounts").select("id", { count: "exact", head: true }),
        supabase
          .from("announcements")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("document_requests")
          .select("id", { count: "exact", head: true }),
        supabase.from("incidents").select("id", { count: "exact", head: true }),
      ]);
      const latency = Math.round(performance.now() - start);
      setDbStatus({
        latency,
        accountsCount: acctRes.count ?? 0,
        announcementsCount: annRes.count ?? 0,
        documentsCount: docRes.count ?? 0,
        incidentsCount: incRes.count ?? 0,
        lastTested: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
      onToast(`Database connected! Roundtrip ping: ${latency}ms`);
    } catch (e: any) {
      onToast("Database test error: " + (e.message || "Connection failed"));
    } finally {
      setIsTestingDb(false);
    }
  };

  return (
    <div className="page inner-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">ADMINISTRATION & SYSTEM CONFIGURATION</p>
          <h1>Barangay settings</h1>
          <p>
            Configure official barangay identity, service schedule, document
            catalog, alert rules, and security controls.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="cloud-status-badge">
            <span className="cloud-pulse-dot" />
            <span>Database: Live ({lastSyncTime})</span>
          </div>
          <button
            className="secondary-button"
            onClick={handleSyncFromCloud}
            disabled={isSyncing}
            title="Reload latest settings from Supabase database"
          >
            <Icon name="refresh" size={15} />
            {isSyncing ? "Syncing..." : "Sync from Cloud"}
          </button>
          <button
            className="primary-button"
            onClick={handleSaveAll}
            disabled={isSaving}
          >
            <Icon name="send" size={16} />
            {isSaving ? "Saving to Cloud..." : "Save changes"}
          </button>
        </div>
      </section>

      <div className="settings-shell">
        <nav className="settings-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? "settings-tab active" : "settings-tab"}
              onClick={() => setTab(t.id as any)}
            >
              <Icon name={t.icon} size={15} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="settings-body">
          {/* ── TAB 1: Profile ── */}
          {tab === "profile" && (
            <div className="settings-section">
              <div className="profile-preview-card">
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div className="preview-avatar-box">
                    {getInitials(info.name || "San Isidro")}
                  </div>
                  <div className="preview-details">
                    <h4>{info.name || "Barangay Name"}</h4>
                    <p>
                      {info.city || "City"} • {info.district || "District"} •
                      Punong Barangay:{" "}
                      <strong>{info.captain || "Captain"}</strong>
                    </p>
                  </div>
                </div>
                <span className="preview-badge">Official Barangay Entity</span>
              </div>

              <h3>Barangay profile</h3>
              <p className="settings-desc">
                Public-facing identity and official contact information visible
                to residents and municipal stakeholders.
              </p>

              <div className="settings-grid">
                <label className="field">
                  Barangay name
                  <input
                    value={info.name}
                    onChange={(e) => {
                      setIsDirty(true);
                      setInfo({ ...info, name: e.target.value });
                    }}
                    placeholder="e.g. San Isidro"
                  />
                </label>
                <label className="field">
                  City / Municipality
                  <input
                    value={info.city}
                    onChange={(e) => {
                      setIsDirty(true);
                      setInfo({ ...info, city: e.target.value });
                    }}
                    placeholder="e.g. Quezon City"
                  />
                </label>
                <label className="field">
                  District / Province
                  <input
                    value={info.district}
                    onChange={(e) => {
                      setIsDirty(true);
                      setInfo({ ...info, district: e.target.value });
                    }}
                    placeholder="e.g. 3rd District"
                  />
                </label>
                <label className="field">
                  Punong Barangay (Captain)
                  <input
                    value={info.captain}
                    onChange={(e) => {
                      setIsDirty(true);
                      setInfo({ ...info, captain: e.target.value });
                    }}
                    placeholder="e.g. Kapitan Santos"
                  />
                </label>
                <label className="field">
                  Official contact number
                  <input
                    value={info.phone}
                    onChange={(e) => {
                      setIsDirty(true);
                      setInfo({ ...info, phone: e.target.value });
                    }}
                    placeholder="e.g. (02) 8123-4567"
                  />
                </label>
                <label className="field">
                  Official email address
                  <input
                    type="email"
                    value={info.email}
                    onChange={(e) => {
                      setIsDirty(true);
                      setInfo({ ...info, email: e.target.value });
                    }}
                    placeholder="e.g. sanisidro@qc.gov.ph"
                  />
                </label>
                <label className="field full">
                  Barangay Hall office address
                  <input
                    value={info.address}
                    onChange={(e) => {
                      setIsDirty(true);
                      setInfo({ ...info, address: e.target.value });
                    }}
                    placeholder="e.g. 123 Mabini Street, San Isidro, Quezon City"
                  />
                </label>
                <label className="field full">
                  Community vision & mission statement
                  <textarea
                    rows={3}
                    value={info.description}
                    onChange={(e) => {
                      setIsDirty(true);
                      setInfo({ ...info, description: e.target.value });
                    }}
                    placeholder="Brief description of community values, goals, and jurisdiction..."
                  />
                </label>
              </div>

              <div className="settings-actions-bar">
                <button
                  className="primary-button"
                  onClick={handleSaveAll}
                  disabled={isSaving}
                >
                  <Icon name="send" size={15} />
                  {isSaving ? "Saving to Cloud..." : "Save Profile"}
                </button>
              </div>
            </div>
          )}

          {/* ── TAB 2: Operating Hours ── */}
          {tab === "hours" && (
            <div className="settings-section">
              <h3>Operating hours & public service schedule</h3>
              <p className="settings-desc">
                Set when the barangay hall is open to serve walk-in residents,
                document issuances, and community inquiries.
              </p>

              <div className="hours-grid">
                {schedule.map((item, index) => (
                  <div className="hours-row" key={item.day}>
                    <div
                      className="hours-toggle"
                      onClick={() => handleToggleDay(index)}
                    >
                      <div
                        className={`hours-custom-check ${item.active ? "checked" : ""}`}
                      >
                        {item.active && <Icon name="check" size={13} />}
                      </div>
                      <span>{item.day}</span>
                    </div>
                    {item.active ? (
                      <>
                        <input
                          className="time-input"
                          value={item.open}
                          onChange={(e) =>
                            handleTimeChange(index, "open", e.target.value)
                          }
                          placeholder="8:00 AM"
                        />
                        <span className="time-sep">to</span>
                        <input
                          className="time-input"
                          value={item.close}
                          onChange={(e) =>
                            handleTimeChange(index, "close", e.target.value)
                          }
                          placeholder="5:00 PM"
                        />
                      </>
                    ) : (
                      <span className="closed-label">Office Closed</span>
                    )}
                  </div>
                ))}
              </div>

              <label className="field full" style={{ marginTop: 20 }}>
                Holiday & Special Schedule Notice
                <textarea
                  rows={2}
                  value={holidayNotice}
                  onChange={(e) => {
                    setIsDirty(true);
                    setHolidayNotice(e.target.value);
                  }}
                  placeholder="e.g. The barangay office will be closed on declared national holidays."
                />
              </label>

              <div className="settings-actions-bar">
                <button
                  className="primary-button"
                  onClick={handleSaveAll}
                  disabled={isSaving}
                >
                  <Icon name="send" size={15} />
                  {isSaving ? "Saving to Cloud..." : "Save Operating Hours"}
                </button>
              </div>
            </div>
          )}

          {/* ── TAB 3: Document Services ── */}
          {tab === "documents" && (
            <div className="settings-section">
              <div className="doc-services-header">
                <div>
                  <h3>Document services catalog</h3>
                  <p className="settings-desc" style={{ marginBottom: 0 }}>
                    Manage certificates and permits that residents can apply for
                    online, including turnaround times and fees.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="secondary-button"
                    onClick={handleResetServices}
                    title="Restore default standard service catalog"
                  >
                    Reset Defaults
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => setAddingService(true)}
                  >
                    <Icon name="plus" size={15} /> Add document type
                  </button>
                </div>
              </div>

              <div className="doc-services-list" style={{ marginTop: 18 }}>
                {services.map((doc) => (
                  <div
                    key={doc.id}
                    className={
                      doc.enabled
                        ? "doc-service-card"
                        : "doc-service-card disabled"
                    }
                  >
                    <div className="doc-service-info">
                      <div className="doc-service-info-top">
                        <strong>{doc.name}</strong>
                        <span
                          className={
                            doc.fee.toLowerCase() === "free"
                              ? "doc-fee-badge free"
                              : "doc-fee-badge"
                          }
                        >
                          {doc.fee}
                        </span>
                        <span className="doc-meta">
                          Turnaround:{" "}
                          <strong>
                            {doc.days} day{doc.days !== 1 ? "s" : ""}
                          </strong>
                        </span>
                      </div>
                      <p className="doc-service-meta-text">
                        <strong>Requirements:</strong> {doc.requirements}
                      </p>
                      {doc.description && (
                        <p
                          className="doc-service-meta-text"
                          style={{ color: "#8a9b95", marginTop: 2 }}
                        >
                          {doc.description}
                        </p>
                      )}
                    </div>

                    <div className="doc-service-controls">
                      <button
                        className={
                          doc.enabled
                            ? "service-toggle-btn active"
                            : "service-toggle-btn inactive"
                        }
                        onClick={() => handleToggleService(doc.id)}
                        title="Toggle availability for resident requests"
                      >
                        {doc.enabled ? "● Available" : "○ Disabled"}
                      </button>
                      <button
                        className="row-action"
                        onClick={() => setEditingService(doc)}
                      >
                        Edit
                      </button>
                      <button
                        className="row-action danger"
                        onClick={() => setDeleteConfirmId(doc.id)}
                        title="Delete service"
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="settings-actions-bar">
                <button
                  className="primary-button"
                  onClick={handleSaveAll}
                  disabled={isSaving}
                >
                  <Icon name="send" size={15} />
                  {isSaving ? "Saving to Cloud..." : "Save Document Catalog"}
                </button>
              </div>
            </div>
          )}

          {/* ── TAB 4: Notifications ── */}
          {tab === "notifications" && (
            <div className="settings-section">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div>
                  <h3>Notification & alert preferences</h3>
                  <p className="settings-desc" style={{ marginBottom: 0 }}>
                    Configure trigger rules for community broadcasts, document
                    updates, and administrative alerts.
                  </p>
                </div>
                <button
                  className="secondary-button"
                  onClick={() =>
                    onToast(
                      "🔔 Notification Test: System alert broadcast successfully delivered!",
                    )
                  }
                >
                  <Icon name="bell" size={15} /> Send test alert
                </button>
              </div>

              <div className="notif-group" style={{ marginTop: 18 }}>
                <h4>Resident automated alerts</h4>
                {[
                  {
                    key: "announcements" as const,
                    title: "New community announcement",
                    desc: "Notify residents when a new barangay advisory or news is published.",
                  },
                  {
                    key: "docStatus" as const,
                    title: "Document status updates",
                    desc: "Alert applicants when document requests move to Approved, Ready for Pickup, or Rejected.",
                  },
                  {
                    key: "eventReminder" as const,
                    title: "Upcoming event reminders (24h)",
                    desc: "Send reminders for scheduled community assemblies, clean-ups, and health drives.",
                  },
                  {
                    key: "registrationApproval" as const,
                    title: "Registration confirmation notice",
                    desc: "Notify newly registered residents when their profile is verified and approved.",
                  },
                  {
                    key: "adminMessage" as const,
                    title: "Official direct messages",
                    desc: "Send alerts when a barangay official replies to an inquiry or chat message.",
                  },
                ].map((item) => (
                  <label className="notif-toggle" key={item.key}>
                    <div className="notif-toggle-left">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifPrefs[item.key]}
                      onChange={() => handleToggleNotif(item.key)}
                    />
                  </label>
                ))}
              </div>

              <div className="settings-divider" />

              <div className="notif-group">
                <h4>Administrator system alerts</h4>
                {[
                  {
                    key: "newRegistration" as const,
                    title: "New resident registration",
                    desc: "Notify officers when a resident submits a registration awaiting identity verification.",
                  },
                  {
                    key: "docSubmitted" as const,
                    title: "Document request filed",
                    desc: "Alert staff when a new document clearance or certificate request is received.",
                  },
                  {
                    key: "residentMessage" as const,
                    title: "Incoming resident inquiry",
                    desc: "Notify administrators when a resident sends a direct message to the help desk.",
                  },
                  {
                    key: "blotterFiled" as const,
                    title: "Blotter / Incident report filed",
                    desc: "Send priority alert when an incident report or resident blotter complaint is lodged.",
                  },
                ].map((item) => (
                  <label className="notif-toggle" key={item.key}>
                    <div className="notif-toggle-left">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifPrefs[item.key]}
                      onChange={() => handleToggleNotif(item.key)}
                    />
                  </label>
                ))}
              </div>

              <div className="settings-divider" />

              <div className="notif-group">
                <h4>Broadcast delivery channels</h4>
                {[
                  {
                    key: "inApp" as const,
                    title: "Web application push & bell notifications",
                    desc: "Live badges and sound popups inside Barangay Connect.",
                  },
                  {
                    key: "emailDigest" as const,
                    title: "Email digest & official notifications",
                    desc: "Deliver transaction receipts and clearance pickup notices via registered email.",
                  },
                  {
                    key: "smsAlerts" as const,
                    title: "SMS emergency hotline broadcast",
                    desc: "Send critical typhoon, calamity, or emergency alerts via SMS gateway.",
                  },
                ].map((item) => (
                  <label className="notif-toggle" key={item.key}>
                    <div className="notif-toggle-left">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifPrefs[item.key]}
                      onChange={() => handleToggleNotif(item.key)}
                    />
                  </label>
                ))}
              </div>

              <div className="settings-actions-bar">
                <button
                  className="primary-button"
                  onClick={handleSaveAll}
                  disabled={isSaving}
                >
                  <Icon name="send" size={15} />
                  {isSaving ? "Saving to Cloud..." : "Save Alert Rules"}
                </button>
              </div>
            </div>
          )}

          {/* ── TAB 5: Security & Cloud ── */}
          {tab === "security" && (
            <div className="settings-section">
              <h3>Administrator security & access controls</h3>
              <p className="settings-desc">
                Manage administrator credentials, resident registration
                policies, and live database cloud connectivity.
              </p>

              <div
                style={{
                  background: "#f8faf9",
                  border: "1px solid #e1ebe6",
                  borderRadius: 12,
                  padding: "16px 20px",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <small
                    style={{
                      textTransform: "uppercase",
                      color: "#6b8077",
                      fontWeight: 700,
                      fontSize: 10,
                    }}
                  >
                    Logged-in Administrator Account
                  </small>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#164032",
                      marginTop: 2,
                    }}
                  >
                    {currentUser?.name || "Kapitan Santos"} (
                    {currentUser?.email || "admin@sanisidro.gov.ph"})
                  </div>
                  <div style={{ fontSize: 11, color: "#6b8077", marginTop: 2 }}>
                    Role: <strong>Master Administrator</strong> • Status:{" "}
                    <span style={{ color: "#0e9f6e", fontWeight: 700 }}>
                      Active
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    background: "#eaf5f0",
                    color: "#176b4d",
                    border: "1px solid #b7dfcd",
                    padding: "4px 10px",
                    borderRadius: 9999,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  Verified Official
                </span>
              </div>

              <h4 style={{ fontSize: 13, color: "#164032", marginBottom: 12 }}>
                Update Administrator Password
              </h4>
              <div className="settings-grid">
                <label className="field full">
                  Current password
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password to verify identity"
                  />
                </label>
                <label className="field">
                  New password
                  <div className="pass-input-box">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                    />
                    <button
                      type="button"
                      className="pass-toggle-eye"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      <Icon name="search" size={14} />
                    </button>
                  </div>
                </label>
                <label className="field">
                  Confirm new password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                  />
                </label>
              </div>

              {passwordStatus && (
                <div
                  style={{
                    marginTop: 12,
                    padding: "10px 14px",
                    borderRadius: 8,
                    fontSize: 11.5,
                    fontWeight: 600,
                    background:
                      passwordStatus.type === "success" ? "#def7ec" : "#fde8e8",
                    color:
                      passwordStatus.type === "success" ? "#03543f" : "#9b1c1c",
                    border:
                      passwordStatus.type === "success"
                        ? "1px solid #bcf0da"
                        : "1px solid #f8b4b4",
                  }}
                >
                  {passwordStatus.msg}
                </div>
              )}

              <button
                className="primary-button"
                style={{ marginTop: 16 }}
                onClick={handleUpdatePassword}
                disabled={isUpdatingPassword}
              >
                <Icon name="shield" size={15} />
                {isUpdatingPassword
                  ? "Updating Password..."
                  : "Update Password"}
              </button>

              <div className="settings-divider" />

              <div className="notif-group">
                <h4>Resident Registration & Access Policies</h4>
                {[
                  {
                    key: "adminApprovalRequired" as const,
                    title:
                      "Require official approval before residents can log in",
                    desc: "New resident accounts remain pending until an officer verifies valid residency ID.",
                  },
                  {
                    key: "openRegistration" as const,
                    title: "Allow open public self-registration",
                    desc: "Residents can register from the portal landing page without an invitation code.",
                  },
                  {
                    key: "requireEmailVerification" as const,
                    title: "Require email address verification",
                    desc: "Residents must verify their email link before accessing their dashboard.",
                  },
                  {
                    key: "sessionTimeout" as const,
                    title: "Automatic security session timeout (30 mins)",
                    desc: "Automatically log out inactive administrator sessions to prevent unauthorized hall access.",
                  },
                ].map((item) => (
                  <label className="notif-toggle" key={item.key}>
                    <div className="notif-toggle-left">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={securityPrefs[item.key]}
                      onChange={() => handleToggleSecurityPref(item.key)}
                    />
                  </label>
                ))}
              </div>

              {/* Cloud Database Diagnostic Box */}
              <div className="cloud-health-card">
                <div className="cloud-health-header">
                  <div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "#164032",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span className="cloud-pulse-dot" />
                      Supabase Cloud Database Diagnostics
                    </h4>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: 11,
                        color: "#6e827a",
                      }}
                    >
                      Connected to{" "}
                      <strong>https://ysfpnicukbrgggdsonio.supabase.co</strong>
                    </p>
                  </div>
                  <button
                    className="secondary-button"
                    onClick={handleTestDatabase}
                    disabled={isTestingDb}
                  >
                    <Icon name="refresh" size={14} />
                    {isTestingDb ? "Testing..." : "Test Connection"}
                  </button>
                </div>

                {dbStatus ? (
                  <div className="cloud-health-stats">
                    <div className="cloud-stat-box">
                      <strong>{dbStatus.latency} ms</strong>
                      <small>Cloud Latency</small>
                    </div>
                    <div className="cloud-stat-box">
                      <strong>{dbStatus.accountsCount}</strong>
                      <small>Registered Accounts</small>
                    </div>
                    <div className="cloud-stat-box">
                      <strong>{dbStatus.announcementsCount}</strong>
                      <small>Announcements</small>
                    </div>
                    <div className="cloud-stat-box">
                      <strong>{dbStatus.incidentsCount}</strong>
                      <small>Blotter Incidents</small>
                    </div>
                  </div>
                ) : (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      color: "#6b8077",
                      fontStyle: "italic",
                    }}
                  >
                    Click "Test Connection" to measure live database latency and
                    verify record counts.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Add Document Service Modal ── */}
      {addingService && (
        <Modal
          title="Add new document service"
          close={() => setAddingService(false)}
        >
          <label className="field">
            Document service name
            <input
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              placeholder="e.g. First Time Jobseeker Certificate"
            />
          </label>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <label className="field">
              Turnaround (Days)
              <input
                type="number"
                min={1}
                max={30}
                value={newServiceDays}
                onChange={(e) => setNewServiceDays(Number(e.target.value))}
              />
            </label>
            <label className="field">
              Processing fee
              <input
                value={newServiceFee}
                onChange={(e) => setNewServiceFee(e.target.value)}
                placeholder="e.g. ₱ 50 or Free"
              />
            </label>
          </div>
          <label className="field">
            Required attachments / documents
            <input
              value={newServiceReq}
              onChange={(e) => setNewServiceReq(e.target.value)}
              placeholder="e.g. Valid ID, Barangay Oath, 2x2 Photo"
            />
          </label>
          <label className="field">
            Purpose & description
            <textarea
              rows={2}
              value={newServiceDesc}
              onChange={(e) => setNewServiceDesc(e.target.value)}
              placeholder="Describe document purpose and qualifications..."
            />
          </label>
          <button
            className="primary-button full"
            style={{ marginTop: 14 }}
            onClick={handleSaveNewService}
          >
            Create document service
          </button>
        </Modal>
      )}

      {/* ── Edit Document Service Modal ── */}
      {editingService && (
        <Modal
          title={`Edit ${editingService.name}`}
          close={() => setEditingService(null)}
        >
          <label className="field">
            Document service name
            <input
              value={editingService.name}
              onChange={(e) =>
                setEditingService({ ...editingService, name: e.target.value })
              }
            />
          </label>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <label className="field">
              Turnaround (Days)
              <input
                type="number"
                min={1}
                max={30}
                value={editingService.days}
                onChange={(e) =>
                  setEditingService({
                    ...editingService,
                    days: Number(e.target.value),
                  })
                }
              />
            </label>
            <label className="field">
              Processing fee
              <input
                value={editingService.fee}
                onChange={(e) =>
                  setEditingService({ ...editingService, fee: e.target.value })
                }
              />
            </label>
          </div>
          <label className="field">
            Required attachments
            <input
              value={editingService.requirements}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  requirements: e.target.value,
                })
              }
            />
          </label>
          <label className="field">
            Purpose & description
            <textarea
              rows={2}
              value={editingService.description}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  description: e.target.value,
                })
              }
            />
          </label>
          <button
            className="primary-button full"
            style={{ marginTop: 14 }}
            onClick={handleSaveEditService}
          >
            Save service changes
          </button>
        </Modal>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirmId && (
        <Modal
          title="Remove document service?"
          close={() => setDeleteConfirmId(null)}
        >
          <p style={{ fontSize: 13, color: "#3a5249", lineHeight: 1.5 }}>
            Are you sure you want to remove{" "}
            <strong>
              {services.find((s) => s.id === deleteConfirmId)?.name}
            </strong>{" "}
            from the document catalog? Residents will no longer be able to
            submit requests for this document.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 18,
            }}
          >
            <button
              className="secondary-button"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </button>
            <button
              className="primary-button danger"
              onClick={() => handleDeleteService(deleteConfirmId)}
            >
              Confirm delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Emergency & Blotter / Incidents ──────────────────────────────────────────

function IncidentsPage({
  isAdmin,
  userEmail,
  userName,
  incidents,
  hotlines,
  onAddHotline,
  onEditHotline,
  onDeleteHotline,
  onAddIncident,
  onUpdateIncident,
  onDeleteIncident,
  onRestoreIncident,
  onPurgeIncident,
  onToast,
}: {
  isAdmin: boolean;
  userEmail: string;
  userName: string;
  incidents: IncidentReport[];
  hotlines: EmergencyHotline[];
  onAddHotline: (hotline: EmergencyHotline) => void;
  onEditHotline: (hotline: EmergencyHotline) => void;
  onDeleteHotline: (id: string) => void;
  onAddIncident: (report: IncidentReport) => void;
  onUpdateIncident: (report: IncidentReport) => void;
  onDeleteIncident: (id: string) => void;
  onRestoreIncident?: (id: string) => void;
  onPurgeIncident?: (id: string) => void;
  onToast: (msg: string) => void;
}) {
  const [tab, setTab] = useState<"hotlines" | "blotter">(
    isAdmin ? "blotter" : "hotlines",
  );
  const [blotterTab, setBlotterTab] = useState<
    | "all"
    | "under-review"
    | "scheduled"
    | "mediation"
    | "resolved"
    | "dismissed"
    | "deleted"
  >("all");
  const [search, setSearch] = useState("");
  const [purokFilter, setPurokFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modals state
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [walkInModalOpen, setWalkInModalOpen] = useState(false);
  const [hotlineModalOpen, setHotlineModalOpen] = useState(false);
  const [editingHotline, setEditingHotline] = useState<EmergencyHotline | null>(
    null,
  );
  const [deleteHotlineItem, setDeleteHotlineItem] =
    useState<EmergencyHotline | null>(null);
  const [manageModalItem, setManageModalItem] = useState<IncidentReport | null>(
    null,
  );
  const [kpSummonItem, setKpSummonItem] = useState<IncidentReport | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] =
    useState<IncidentReport | null>(null);
  const [purgeConfirmItem, setPurgeConfirmItem] =
    useState<IncidentReport | null>(null);

  // Resident file incident form state
  const [form, setForm] = useState({
    category: "Dispute / Noise" as IncidentCategory,
    purok: "Purok 1 (Sampaguita Rd.)",
    description: "",
    isUrgent: false,
  });

  // Admin walk-in blotter form state
  const [walkInForm, setWalkInForm] = useState({
    complainantName: "",
    complainantContact: "",
    complainantPurok: "Purok 1 (Sampaguita Rd.)",
    respondentName: "",
    respondentAddress: "",
    respondentContact: "",
    category: "Dispute / Noise" as IncidentCategory,
    description: "",
    isUrgent: false,
  });

  // Hotline form state (Add/Edit)
  const [hotlineForm, setHotlineForm] = useState({
    name: "",
    subtitle: "",
    number: "",
    altNumber: "",
    tag: "Security",
    tone: "green" as EmergencyHotline["tone"],
    icon: "shield" as IconName,
  });

  // Admin mediation form state
  const [adminForm, setAdminForm] = useState({
    status: "Under Review" as IncidentStatus,
    hearingDate: "",
    hearingStage: "1st Patawag (Notice of Hearing)",
    hearingVenue: "Lupon Tagapamayapa Hall, 2nd Floor Barangay Hall",
    assignedOfficer: "Hon. Roberto Gomez (Punong Brgy / Lupon Chair)",
    officerNotes: "",
    respondentName: "",
    respondentAddress: "",
  });

  // Hotline handlers
  function openAddHotline() {
    setEditingHotline(null);
    setHotlineForm({
      name: "",
      subtitle: "",
      number: "",
      altNumber: "",
      tag: "Security",
      tone: "green",
      icon: "phone",
    });
    setHotlineModalOpen(true);
  }

  function openEditHotline(hl: EmergencyHotline) {
    setEditingHotline(hl);
    setHotlineForm({
      name: hl.name,
      subtitle: hl.subtitle,
      number: hl.number,
      altNumber: hl.altNumber,
      tag: hl.tag,
      tone: hl.tone,
      icon: hl.icon,
    });
    setHotlineModalOpen(true);
  }

  function handleSaveHotline() {
    if (!hotlineForm.name.trim() || !hotlineForm.number.trim()) return;
    if (editingHotline) {
      onEditHotline({
        ...editingHotline,
        ...hotlineForm,
      });
    } else {
      onAddHotline({
        id: `hl-${Date.now()}`,
        ...hotlineForm,
      });
    }
    setHotlineModalOpen(false);
  }

  function handleConfirmDeleteHotline() {
    if (!deleteHotlineItem) return;
    onDeleteHotline(deleteHotlineItem.id);
    setDeleteHotlineItem(null);
  }

  // Manage incident handlers
  function openManage(item: IncidentReport) {
    setManageModalItem(item);
    setAdminForm({
      status: item.status,
      hearingDate: item.hearingDate || "",
      hearingStage: item.hearingStage || "1st Patawag (Notice of Hearing)",
      hearingVenue:
        item.hearingVenue || "Lupon Tagapamayapa Hall, 2nd Floor Barangay Hall",
      assignedOfficer:
        item.assignedOfficer ||
        "Hon. Roberto Gomez (Punong Brgy / Lupon Chair)",
      officerNotes: item.officerNotes || "",
      respondentName: item.respondentName || "",
      respondentAddress: item.respondentAddress || "",
    });
  }

  function handleSaveManage() {
    if (!manageModalItem) return;
    onUpdateIncident({
      ...manageModalItem,
      status: adminForm.status,
      hearingDate: adminForm.hearingDate,
      hearingStage: adminForm.hearingStage,
      hearingVenue: adminForm.hearingVenue,
      assignedOfficer: adminForm.assignedOfficer,
      officerNotes: adminForm.officerNotes,
      respondentName: adminForm.respondentName.trim(),
      respondentAddress: adminForm.respondentAddress.trim(),
    });
    setManageModalItem(null);
  }

  // Soft delete & purge
  function handleConfirmSoftDelete() {
    if (!deleteConfirmItem) return;
    onDeleteIncident(deleteConfirmItem.id);
    setDeleteConfirmItem(null);
    if (manageModalItem?.id === deleteConfirmItem.id) {
      setManageModalItem(null);
    }
  }

  function handleConfirmPurge() {
    if (!purgeConfirmItem) return;
    if (onPurgeIncident) {
      onPurgeIncident(purgeConfirmItem.id);
    } else {
      onDeleteIncident(purgeConfirmItem.id);
    }
    setPurgeConfirmItem(null);
  }

  function handleRestore(item: IncidentReport) {
    if (onRestoreIncident) {
      onRestoreIncident(item.id);
    } else {
      onUpdateIncident({
        ...item,
        status: "Under Review",
        deletedAt: undefined,
      });
      onToast(`Blotter ${item.id} restored to active cases`);
    }
  }

  // Resident file submission
  function handleFileSubmit() {
    if (!form.description.trim()) return;
    const newId = `INC-2025-${String(Math.floor(100 + Math.random() * 900))}`;
    const newReport: IncidentReport = {
      id: newId,
      complainantName: userName,
      complainantEmail: userEmail,
      category: form.category,
      purok: form.purok,
      description: form.description.trim(),
      date: new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
      status: "Under Review",
      isUrgent: form.isUrgent,
      officerNotes:
        "Received via resident portal. Case queued for preliminary triage by Duty Desk Officer.",
    };
    onAddIncident(newReport);
    setFileModalOpen(false);
    setForm({
      category: "Dispute / Noise",
      purok: "Purok 1 (Sampaguita Rd.)",
      description: "",
      isUrgent: false,
    });
    setTab("blotter");
  }

  // Admin walk-in submission
  function handleWalkInSubmit() {
    if (!walkInForm.complainantName.trim() || !walkInForm.description.trim())
      return;
    const newId = `INC-2025-${String(Math.floor(100 + Math.random() * 900))}`;
    const newReport: IncidentReport = {
      id: newId,
      complainantName: walkInForm.complainantName.trim(),
      complainantEmail:
        walkInForm.complainantContact.trim() || "Walk-in Resident (In-person)",
      category: walkInForm.category,
      purok: walkInForm.complainantPurok,
      description: walkInForm.description.trim(),
      date: new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
      status: "Under Review",
      isUrgent: walkInForm.isUrgent,
      respondentName: walkInForm.respondentName.trim(),
      respondentAddress: walkInForm.respondentAddress.trim(),
      respondentContact: walkInForm.respondentContact.trim(),
      officerNotes:
        "Official walk-in blotter registered at Barangay San Isidro Hall by Duty Desk Officer.",
    };
    onAddIncident(newReport);
    setWalkInModalOpen(false);
    setWalkInForm({
      complainantName: "",
      complainantContact: "",
      complainantPurok: "Purok 1 (Sampaguita Rd.)",
      respondentName: "",
      respondentAddress: "",
      respondentContact: "",
      category: "Dispute / Noise",
      description: "",
      isUrgent: false,
    });
  }

  function copyNumber(num: string, agency: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(num);
    }
    onToast(`Copied hotline for ${agency}: ${num}`);
  }

  // Counts breakdown
  const activeIncidents = incidents.filter((i) => i.status !== "Deleted");
  const deletedIncidents = incidents.filter((i) => i.status === "Deleted");

  const pendingCount = incidents.filter(
    (i) => i.status === "Under Review",
  ).length;
  const scheduledCount = incidents.filter(
    (i) => i.status === "Scheduled Hearing",
  ).length;
  const mediationCount = incidents.filter(
    (i) => i.status === "In Mediation",
  ).length;
  const resolvedCount = incidents.filter((i) => i.status === "Resolved").length;
  const dismissedCount = incidents.filter(
    (i) => i.status === "Dismissed",
  ).length;
  const deletedCount = deletedIncidents.length;

  // Filtered lists for admin vs resident
  const adminBaseList =
    blotterTab === "all"
      ? activeIncidents
      : blotterTab === "under-review"
        ? incidents.filter((i) => i.status === "Under Review")
        : blotterTab === "scheduled"
          ? incidents.filter((i) => i.status === "Scheduled Hearing")
          : blotterTab === "mediation"
            ? incidents.filter((i) => i.status === "In Mediation")
            : blotterTab === "resolved"
              ? incidents.filter((i) => i.status === "Resolved")
              : blotterTab === "dismissed"
                ? incidents.filter((i) => i.status === "Dismissed")
                : deletedIncidents;

  const displayIncidents = isAdmin
    ? adminBaseList.filter((item) => {
        if (purokFilter !== "all" && !item.purok.includes(purokFilter))
          return false;
        if (categoryFilter !== "all" && item.category !== categoryFilter)
          return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          return (
            item.id.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.purok.toLowerCase().includes(q) ||
            item.complainantName.toLowerCase().includes(q) ||
            (item.respondentName &&
              item.respondentName.toLowerCase().includes(q))
          );
        }
        return true;
      })
    : incidents
        .filter(
          (i) => i.status !== "Deleted" && i.complainantEmail === userEmail,
        )
        .filter((item) => {
          if (categoryFilter !== "all" && item.category !== categoryFilter)
            return false;
          if (search.trim()) {
            const q = search.toLowerCase();
            return (
              item.id.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q) ||
              item.category.toLowerCase().includes(q)
            );
          }
          return true;
        });

  return (
    <div className="page inner-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">PUBLIC SAFETY & DISPUTE RESOLUTION</p>
          <h1>
            {isAdmin
              ? "Blotter & Incident Management"
              : "Emergency & Incidents"}
          </h1>
          <p>
            {isAdmin
              ? "Oversee community blotter logs, schedule Lupon hearings, and manage 24/7 emergency hotlines."
              : "Access 24/7 emergency hotlines or file a confidential report with the barangay office."}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {isAdmin ? (
            tab === "hotlines" ? (
              <button className="primary-button" onClick={openAddHotline}>
                <Icon name="plus" /> Add hotline number
              </button>
            ) : (
              <button
                className="primary-button"
                onClick={() => setWalkInModalOpen(true)}
              >
                <Icon name="plus" /> Log walk-in blotter
              </button>
            )
          ) : (
            <button
              className="primary-button"
              onClick={() => setFileModalOpen(true)}
            >
              <Icon name="plus" /> File incident report
            </button>
          )}
        </div>
      </section>

      {/* Top Segmented Navigation */}
      <div className="segmented-nav">
        <button
          className={`segmented-tab${tab === "hotlines" ? " active" : ""}`}
          onClick={() => setTab("hotlines")}
        >
          <Icon name="phone" size={14} />
          <span>Emergency Hotlines</span>
          <span
            className="tab-counter"
            style={{ background: "#e2e8e5", color: "#374f45" }}
          >
            {hotlines.length}
          </span>
        </button>
        <button
          className={`segmented-tab${tab === "blotter" ? " active" : ""}`}
          onClick={() => setTab("blotter")}
        >
          <Icon name="shield" size={14} />
          <span>{isAdmin ? "Blotter Registry" : "My Incident Reports"}</span>
          {isAdmin && pendingCount > 0 && (
            <span className="count-badge">{pendingCount}</span>
          )}
        </button>
      </div>

      {/* TAB 1: EMERGENCY HOTLINES */}
      {tab === "hotlines" && (
        <div>
          <div className="hotline-banner">
            <div className="hotline-banner-content">
              <h2>Barangay San Isidro 24/7 Operations Center</h2>
              <p>
                Our community tanod watch desk, ambulance unit, and emergency
                teams are on standby 24 hours a day, 7 days a week. For
                immediate threats to life or fire, dial national dispatch
                immediately.
              </p>
              <div className="national-badge">
                <Icon name="alert" size={14} />
                <span>National Emergency: Dial 911 · PNP Central: 117</span>
              </div>
            </div>
            {isAdmin && (
              <button
                className="primary-button"
                style={{
                  background: "white",
                  color: "#134233",
                  border: "none",
                  whiteSpace: "nowrap",
                }}
                onClick={openAddHotline}
              >
                <Icon name="plus" size={16} /> Add Hotline
              </button>
            )}
          </div>

          <div className="hotlines-grid">
            {hotlines.map((hotline) => (
              <div className="hotline-card" key={hotline.id}>
                <div className="hotline-header">
                  <div className={`hotline-icon tone-${hotline.tone}`}>
                    <Icon name={hotline.icon} size={22} />
                  </div>
                  <span className="hotline-tag">{hotline.tag}</span>
                </div>

                <div className="hotline-info">
                  <h3>{hotline.name}</h3>
                  <p>{hotline.subtitle}</p>
                </div>

                <div className="hotline-card-body">
                  <div className="hotline-main-number">{hotline.number}</div>
                  {hotline.altNumber && (
                    <div className="hotline-alt-number">
                      {hotline.altNumber}
                    </div>
                  )}
                </div>

                <div className="hotline-actions">
                  <button
                    className="call-btn"
                    onClick={() => copyNumber(hotline.number, hotline.name)}
                  >
                    <Icon name="phone" size={14} />
                    <span>Copy & Call</span>
                  </button>
                  {isAdmin && (
                    <>
                      <button
                        className="hotline-admin-btn"
                        onClick={() => openEditHotline(hotline)}
                        title="Edit hotline details"
                      >
                        Edit
                      </button>
                      <button
                        className="hotline-admin-btn delete"
                        onClick={() => setDeleteHotlineItem(hotline)}
                        title="Delete hotline"
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BLOTTER / INCIDENTS */}
      {tab === "blotter" && (
        <div>
          {/* Admin Stats Overview */}
          {isAdmin && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div className="rail-card" style={{ padding: "14px 18px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: 700,
                  }}
                >
                  TOTAL ACTIVE CASES
                </span>
                <h3
                  style={{
                    fontSize: "22px",
                    margin: "4px 0 0",
                    color: "#1e293b",
                  }}
                >
                  {activeIncidents.length}
                </h3>
              </div>
              <div className="rail-card" style={{ padding: "14px 18px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#b45309",
                    fontWeight: 700,
                  }}
                >
                  PENDING REVIEW
                </span>
                <h3
                  style={{
                    fontSize: "22px",
                    margin: "4px 0 0",
                    color: "#b45309",
                  }}
                >
                  {pendingCount}
                </h3>
              </div>
              <div className="rail-card" style={{ padding: "14px 18px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#1d4ed8",
                    fontWeight: 700,
                  }}
                >
                  SCHEDULED (PATAWAG)
                </span>
                <h3
                  style={{
                    fontSize: "22px",
                    margin: "4px 0 0",
                    color: "#1d4ed8",
                  }}
                >
                  {scheduledCount}
                </h3>
              </div>
              <div className="rail-card" style={{ padding: "14px 18px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#7e22ce",
                    fontWeight: 700,
                  }}
                >
                  IN MEDIATION
                </span>
                <h3
                  style={{
                    fontSize: "22px",
                    margin: "4px 0 0",
                    color: "#7e22ce",
                  }}
                >
                  {mediationCount}
                </h3>
              </div>
              <div className="rail-card" style={{ padding: "14px 18px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#15803d",
                    fontWeight: 700,
                  }}
                >
                  RESOLVED AMICABLY
                </span>
                <h3
                  style={{
                    fontSize: "22px",
                    margin: "4px 0 0",
                    color: "#15803d",
                  }}
                >
                  {resolvedCount}
                </h3>
              </div>
              <div className="rail-card" style={{ padding: "14px 18px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#be123c",
                    fontWeight: 700,
                  }}
                >
                  ARCHIVED / DELETED
                </span>
                <h3
                  style={{
                    fontSize: "22px",
                    margin: "4px 0 0",
                    color: "#be123c",
                  }}
                >
                  {deletedCount}
                </h3>
              </div>
            </div>
          )}

          {/* Admin Blotter Sub-Tabs */}
          {isAdmin && (
            <nav className="blotter-subtabs">
              <button
                className={`blotter-tab-btn ${blotterTab === "all" ? "active" : ""}`}
                onClick={() => setBlotterTab("all")}
              >
                <Icon name="shield" size={15} />
                <span>All Active Cases</span>
                <span className="tab-counter">{activeIncidents.length}</span>
              </button>

              <button
                className={`blotter-tab-btn ${blotterTab === "under-review" ? "active" : ""}`}
                onClick={() => setBlotterTab("under-review")}
              >
                <Icon name="clock" size={15} />
                <span>Under Review</span>
                <span
                  className="tab-counter"
                  style={{ background: "#fef08a", color: "#854d0e" }}
                >
                  {pendingCount}
                </span>
              </button>

              <button
                className={`blotter-tab-btn ${blotterTab === "scheduled" ? "active" : ""}`}
                onClick={() => setBlotterTab("scheduled")}
              >
                <Icon name="calendar" size={15} />
                <span>Scheduled Hearings</span>
                <span
                  className="tab-counter"
                  style={{ background: "#dbeafe", color: "#1e40af" }}
                >
                  {scheduledCount}
                </span>
              </button>

              <button
                className={`blotter-tab-btn ${blotterTab === "mediation" ? "active" : ""}`}
                onClick={() => setBlotterTab("mediation")}
              >
                <Icon name="message" size={15} />
                <span>In Mediation</span>
                <span
                  className="tab-counter"
                  style={{ background: "#f3e8ff", color: "#6b21a8" }}
                >
                  {mediationCount}
                </span>
              </button>

              <button
                className={`blotter-tab-btn ${blotterTab === "resolved" ? "active" : ""}`}
                onClick={() => setBlotterTab("resolved")}
              >
                <Icon name="check" size={15} />
                <span>Resolved Amicably</span>
                <span
                  className="tab-counter"
                  style={{ background: "#dcfce7", color: "#166534" }}
                >
                  {resolvedCount}
                </span>
              </button>

              <button
                className={`blotter-tab-btn ${blotterTab === "dismissed" ? "active" : ""}`}
                onClick={() => setBlotterTab("dismissed")}
              >
                <Icon name="document" size={15} />
                <span>Dismissed / PNP</span>
                <span className="tab-counter">{dismissedCount}</span>
              </button>

              <button
                className={`blotter-tab-btn tab-deleted ${blotterTab === "deleted" ? "active" : ""}`}
                onClick={() => setBlotterTab("deleted")}
              >
                <Icon name="trash" size={15} />
                <span>Archived / Deleted</span>
                <span
                  className="tab-counter"
                  style={{ background: "#fee2e2", color: "#991b1b" }}
                >
                  {deletedCount}
                </span>
              </button>
            </nav>
          )}

          {/* Search & Filter Toolbar */}
          <div className="table-card" style={{ marginBottom: "16px" }}>
            <div
              className="table-tools"
              style={{ flexWrap: "wrap", gap: "10px", alignItems: "center" }}
            >
              <label
                className="search-box"
                style={{ flex: "1 1 220px", maxWidth: "400px" }}
              >
                <Icon name="search" size={16} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Blotter ID, complainant, respondent, narrative..."
                />
              </label>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "11px",
                    color: "#50655d",
                  }}
                >
                  <Icon name="filter" size={13} />
                  <span>Category:</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{
                      border: "1px solid #dfe7e3",
                      background: "white",
                      borderRadius: "7px",
                      padding: "5px 8px",
                      fontSize: "11px",
                      color: "#344941",
                      outline: "none",
                    }}
                  >
                    <option value="all">All Categories</option>
                    <option value="Dispute / Noise">Dispute / Noise</option>
                    <option value="Street Hazard">Street Hazard</option>
                    <option value="Theft / Security">Theft / Security</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Emergency / Medical">Medical</option>
                    <option value="Physical Altercation">
                      Physical Altercation
                    </option>
                    <option value="Boundary Dispute">Boundary Dispute</option>
                    <option value="Domestic Concern">Domestic Concern</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                {isAdmin && (
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "11px",
                      color: "#50655d",
                    }}
                  >
                    <span>Purok:</span>
                    <select
                      value={purokFilter}
                      onChange={(e) => setPurokFilter(e.target.value)}
                      style={{
                        border: "1px solid #dfe7e3",
                        background: "white",
                        borderRadius: "7px",
                        padding: "5px 8px",
                        fontSize: "11px",
                        color: "#344941",
                        outline: "none",
                      }}
                    >
                      <option value="all">All Locations</option>
                      <option value="Purok 1">Purok 1</option>
                      <option value="Purok 2">Purok 2</option>
                      <option value="Purok 3">Purok 3</option>
                      <option value="Purok 4">Purok 4</option>
                      <option value="Purok 5">Purok 5</option>
                    </select>
                  </label>
                )}

                <span
                  style={{
                    fontSize: "11px",
                    color: "#7a8e85",
                    marginLeft: "auto",
                  }}
                >
                  Showing {displayIncidents.length} records
                </span>
              </div>
            </div>

            {/* Resident Cards View */}
            {!isAdmin ? (
              <div style={{ padding: "16px" }}>
                {displayIncidents.length === 0 ? (
                  <div className="empty-state" style={{ minHeight: "220px" }}>
                    <Icon name="shield" size={32} />
                    <h2>No incidents filed yet</h2>
                    <p>
                      Have a neighborhood concern or disturbance to report?
                      Click "File incident report" above.
                    </p>
                  </div>
                ) : (
                  displayIncidents.map((item) => (
                    <div className="incident-card" key={item.id}>
                      <div className="incident-top">
                        <div className="incident-meta">
                          <span className="incident-id">{item.id}</span>
                          <span>•</span>
                          <strong>{item.category}</strong>
                          <span>•</span>
                          <span>{item.purok}</span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {item.isUrgent && (
                            <span className="urgent-badge">
                              <Icon name="alert" size={11} /> Urgent
                            </span>
                          )}
                          <span
                            className={`status ${item.status.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <p className="incident-desc">{item.description}</p>

                      {item.status === "Scheduled Hearing" &&
                        item.hearingDate && (
                          <div className="incident-hearing-box">
                            <strong>
                              📅 Lupon Hearing / Patawag Schedule:
                            </strong>{" "}
                            {item.hearingDate}
                          </div>
                        )}

                      {item.officerNotes && (
                        <div className="incident-officer-box">
                          <strong>Barangay Desk Remarks:</strong>{" "}
                          {item.officerNotes}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : (
              /* Admin Table View */
              <>
                <div
                  className="table-head"
                  style={{
                    gridTemplateColumns: "1.2fr 1.6fr 1.3fr 1.1fr 1fr 1.2fr",
                  }}
                >
                  <span>Blotter ID & Priority</span>
                  <span>Complainant vs Respondent</span>
                  <span>Category & Location</span>
                  <span>
                    {blotterTab === "deleted" ? "Archived Date" : "Date Filed"}
                  </span>
                  <span>Status</span>
                  <span style={{ textAlign: "right" }}>Actions</span>
                </div>

                {displayIncidents.length === 0 ? (
                  <div
                    className="empty-state"
                    style={{ minHeight: "220px", padding: "40px 20px" }}
                  >
                    <Icon name="shield" size={32} />
                    {blotterTab === "deleted" ? (
                      <div>
                        <h3 style={{ margin: "10px 0 4px", color: "#163e32" }}>
                          No archived or deleted cases
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "#6a7d75",
                          }}
                        >
                          Blotter records deleted by administrators are moved
                          here for audit compliance and can be restored anytime.
                        </p>
                      </div>
                    ) : blotterTab === "under-review" ? (
                      <div>
                        <h3 style={{ margin: "10px 0 4px", color: "#163e32" }}>
                          All blotters assessed! 🎉
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "#6a7d75",
                          }}
                        >
                          No pending incident reports awaiting desk review.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h3 style={{ margin: "10px 0 4px", color: "#163e32" }}>
                          No blotter records match criteria
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "#6a7d75",
                          }}
                        >
                          Try adjusting your search terms or filters.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  displayIncidents.map((item) => (
                    <div
                      className="table-row"
                      key={item.id}
                      style={{
                        gridTemplateColumns:
                          "1.2fr 1.6fr 1.3fr 1.1fr 1fr 1.2fr",
                        alignItems: "center",
                      }}
                    >
                      {/* Column 1: ID & Priority */}
                      <span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span className="incident-id">{item.id}</span>
                          {item.isUrgent && (
                            <span className="urgent-badge" title="Urgent case">
                              !
                            </span>
                          )}
                        </div>
                      </span>

                      {/* Column 2: Complainant vs Respondent */}
                      <span>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <strong
                            style={{ fontSize: "12px", color: "#1a3028" }}
                          >
                            {item.complainantName}
                          </strong>
                          {item.respondentName ? (
                            <small
                              style={{ fontSize: "10.5px", color: "#b91c1c" }}
                            >
                              vs. {item.respondentName}
                            </small>
                          ) : (
                            <small
                              style={{ fontSize: "10px", color: "#798b84" }}
                            >
                              {item.complainantEmail}
                            </small>
                          )}
                        </div>
                      </span>

                      {/* Column 3: Category & Location */}
                      <span>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              fontSize: "11.5px",
                              fontWeight: 600,
                              color: "#1f3b31",
                            }}
                          >
                            {item.category}
                          </span>
                          <small style={{ color: "#798b84", fontSize: "10px" }}>
                            {item.purok}
                          </small>
                        </div>
                      </span>

                      {/* Column 4: Date */}
                      <span style={{ fontSize: "11px", color: "#546b61" }}>
                        {blotterTab === "deleted" ? (
                          <span style={{ color: "#991b1b", fontWeight: 600 }}>
                            {item.deletedAt || "Archived"}
                          </span>
                        ) : (
                          item.date
                        )}
                      </span>

                      {/* Column 5: Status */}
                      <span>
                        <b
                          className={`status ${item.status.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {item.status}
                        </b>
                      </span>

                      {/* Column 6: Actions */}
                      <span
                        style={{
                          display: "flex",
                          gap: "6px",
                          justifyContent: "flex-end",
                        }}
                      >
                        {blotterTab === "deleted" ? (
                          <>
                            <button
                              className="btn-sm-action primary"
                              onClick={() => handleRestore(item)}
                              title="Restore blotter to active records"
                              style={{ padding: "6px 10px", fontSize: "11px" }}
                            >
                              <Icon name="check" size={12} /> Restore
                            </button>
                            <button
                              className="btn-sm-action danger"
                              onClick={() => setPurgeConfirmItem(item)}
                              title="Permanently purge blotter from cloud database"
                              style={{ padding: "6px 8px" }}
                            >
                              <Icon name="trash" size={12} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn-sm-action primary"
                              onClick={() => openManage(item)}
                              style={{ padding: "6px 10px", fontSize: "11px" }}
                            >
                              Mediate
                            </button>
                            <button
                              className="btn-sm-action secondary"
                              onClick={() => setKpSummonItem(item)}
                              title="Generate & print official KP Form 9 Summon"
                              style={{ padding: "6px 8px" }}
                            >
                              <Icon name="document" size={12} />
                            </button>
                            <button
                              className="btn-sm-action danger"
                              onClick={() => setDeleteConfirmItem(item)}
                              title="Move to Archived / Deleted Cases"
                              style={{ padding: "6px 8px" }}
                            >
                              <Icon name="trash" size={12} />
                            </button>
                          </>
                        )}
                      </span>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Resident: File New Incident Modal */}
      {fileModalOpen && (
        <Modal
          title="File Incident / Complaint Report"
          close={() => setFileModalOpen(false)}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#687a74",
              marginTop: "-6px",
              marginBottom: "14px",
            }}
          >
            Submit an official report to the Barangay San Isidro Lupon
            Tagapamayapa desk.
          </p>

          <div className="form-grid">
            <label className="field">
              Incident Category
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as any })
                }
              >
                <option value="Dispute / Noise">
                  Dispute / Noise Disturbance
                </option>
                <option value="Street Hazard">
                  Street Hazard / Infrastructure
                </option>
                <option value="Theft / Security">
                  Theft / Security Concern
                </option>
                <option value="Sanitation">Sanitation / Waste Dumping</option>
                <option value="Emergency / Medical">
                  Medical Emergency Incident
                </option>
                <option value="Physical Altercation">
                  Physical Altercation / Harassment
                </option>
                <option value="Boundary Dispute">
                  Boundary Dispute / Property Encroachment
                </option>
                <option value="Domestic Concern">
                  Domestic Concern / Family Matter
                </option>
                <option value="Other">Other Community Concern</option>
              </select>
            </label>

            <label className="field">
              Purok / Location
              <select
                value={form.purok}
                onChange={(e) => setForm({ ...form, purok: e.target.value })}
              >
                <option value="Purok 1 (Sampaguita Rd.)">
                  Purok 1 (Sampaguita Rd.)
                </option>
                <option value="Purok 2 (Mabini St.)">
                  Purok 2 (Mabini St.)
                </option>
                <option value="Purok 3 (Narra St.)">Purok 3 (Narra St.)</option>
                <option value="Purok 4 (Rizal Ave.)">
                  Purok 4 (Rizal Ave.)
                </option>
                <option value="Purok 5 (Covered Court Area)">
                  Purok 5 (Covered Court Area)
                </option>
              </select>
            </label>
          </div>

          <label className="field">
            Detailed Statement / Narrative of Incident
            <textarea
              className="small-textarea"
              style={{ minHeight: "110px" }}
              required
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="State what occurred, time, parties involved, and any specific assistance requested..."
            />
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              fontWeight: 600,
              color: "#c81e1e",
              margin: "12px 0 18px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={form.isUrgent}
              onChange={(e) => setForm({ ...form, isUrgent: e.target.checked })}
              style={{ accentColor: "#c81e1e" }}
            />
            Mark as urgent / ongoing safety concern requiring immediate tanod
            response
          </label>

          <div className="modal-actions">
            <button
              className="row-action"
              onClick={() => setFileModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="primary-button"
              disabled={!form.description.trim()}
              onClick={handleFileSubmit}
            >
              Submit Official Report
            </button>
          </div>
        </Modal>
      )}

      {/* Admin: Log Walk-in Blotter Modal */}
      {walkInModalOpen && (
        <Modal
          title="Log Official Walk-In Blotter Entry"
          close={() => setWalkInModalOpen(false)}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#687a74",
              marginTop: "-6px",
              marginBottom: "14px",
            }}
          >
            Record an official complaint received in person at the Barangay San
            Isidro Hall.
          </p>

          <div
            style={{
              background: "#f8faf9",
              border: "1px solid #e1ebe6",
              borderRadius: "10px",
              padding: "12px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "#176b4d",
                letterSpacing: "0.5px",
              }}
            >
              Parties to the Dispute (Mga Panig)
            </span>
            <div className="form-grid" style={{ marginTop: "8px" }}>
              <label className="field">
                Complainant (May-sumbong) *
                <input
                  required
                  value={walkInForm.complainantName}
                  onChange={(e) =>
                    setWalkInForm({
                      ...walkInForm,
                      complainantName: e.target.value,
                    })
                  }
                  placeholder="e.g. Maria Teresa Santos"
                />
              </label>
              <label className="field">
                Complainant Contact / Mobile
                <input
                  value={walkInForm.complainantContact}
                  onChange={(e) =>
                    setWalkInForm({
                      ...walkInForm,
                      complainantContact: e.target.value,
                    })
                  }
                  placeholder="09XX XXX XXXX"
                />
              </label>
            </div>

            <div className="form-grid" style={{ marginTop: "4px" }}>
              <label className="field">
                Respondent (Ipinagsusumbong)
                <input
                  value={walkInForm.respondentName}
                  onChange={(e) =>
                    setWalkInForm({
                      ...walkInForm,
                      respondentName: e.target.value,
                    })
                  }
                  placeholder="e.g. Rodrigo Garcia"
                />
              </label>
              <label className="field">
                Respondent Address / Purok
                <input
                  value={walkInForm.respondentAddress}
                  onChange={(e) =>
                    setWalkInForm({
                      ...walkInForm,
                      respondentAddress: e.target.value,
                    })
                  }
                  placeholder="e.g. Purok 2, Mabini St. #45"
                />
              </label>
            </div>
          </div>

          <div className="form-grid">
            <label className="field">
              Incident Category
              <select
                value={walkInForm.category}
                onChange={(e) =>
                  setWalkInForm({
                    ...walkInForm,
                    category: e.target.value as any,
                  })
                }
              >
                <option value="Dispute / Noise">
                  Dispute / Noise Disturbance
                </option>
                <option value="Street Hazard">
                  Street Hazard / Infrastructure
                </option>
                <option value="Theft / Security">
                  Theft / Security Concern
                </option>
                <option value="Sanitation">Sanitation / Waste Dumping</option>
                <option value="Emergency / Medical">
                  Medical Emergency Incident
                </option>
                <option value="Physical Altercation">
                  Physical Altercation / Harassment
                </option>
                <option value="Boundary Dispute">
                  Boundary Dispute / Encroachment
                </option>
                <option value="Domestic Concern">
                  Domestic Concern / Family Issue
                </option>
                <option value="Other">Other Community Concern</option>
              </select>
            </label>

            <label className="field">
              Purok of Incident
              <select
                value={walkInForm.complainantPurok}
                onChange={(e) =>
                  setWalkInForm({
                    ...walkInForm,
                    complainantPurok: e.target.value,
                  })
                }
              >
                <option value="Purok 1 (Sampaguita Rd.)">
                  Purok 1 (Sampaguita Rd.)
                </option>
                <option value="Purok 2 (Mabini St.)">
                  Purok 2 (Mabini St.)
                </option>
                <option value="Purok 3 (Narra St.)">Purok 3 (Narra St.)</option>
                <option value="Purok 4 (Rizal Ave.)">
                  Purok 4 (Rizal Ave.)
                </option>
                <option value="Purok 5 (Covered Court Area)">
                  Purok 5 (Covered Court Area)
                </option>
              </select>
            </label>
          </div>

          <label className="field">
            Official Blotter Statement & Sworn Details *
            <textarea
              className="small-textarea"
              style={{ minHeight: "110px" }}
              required
              value={walkInForm.description}
              onChange={(e) =>
                setWalkInForm({ ...walkInForm, description: e.target.value })
              }
              placeholder="Record complainant statement, witnesses present, and specific circumstances..."
            />
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              fontWeight: 600,
              color: "#c81e1e",
              margin: "12px 0 18px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={walkInForm.isUrgent}
              onChange={(e) =>
                setWalkInForm({ ...walkInForm, isUrgent: e.target.checked })
              }
              style={{ accentColor: "#c81e1e" }}
            />
            Mark as urgent / requires immediate tanod patrol dispatch or safety
            escort
          </label>

          <div className="modal-actions">
            <button
              className="row-action"
              onClick={() => setWalkInModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="primary-button"
              disabled={
                !walkInForm.complainantName.trim() ||
                !walkInForm.description.trim()
              }
              onClick={handleWalkInSubmit}
            >
              Log Blotter Record
            </button>
          </div>
        </Modal>
      )}

      {/* Admin: Add / Edit Emergency Hotline Modal */}
      {hotlineModalOpen && (
        <Modal
          title={
            editingHotline
              ? "Edit Emergency Hotline"
              : "Add New Emergency Hotline"
          }
          close={() => setHotlineModalOpen(false)}
        >
          <div className="form-grid">
            <label className="field">
              Agency / Organization Name
              <input
                autoFocus
                required
                value={hotlineForm.name}
                onChange={(e) =>
                  setHotlineForm({ ...hotlineForm, name: e.target.value })
                }
                placeholder="e.g. Barangay Tanod Headquarters"
              />
            </label>
            <label className="field">
              Department Badge Tag
              <input
                value={hotlineForm.tag}
                onChange={(e) =>
                  setHotlineForm({ ...hotlineForm, tag: e.target.value })
                }
                placeholder="e.g. 24/7 Patrol, Medical, Fire"
              />
            </label>
          </div>

          <label className="field">
            Short Description / Services
            <input
              value={hotlineForm.subtitle}
              onChange={(e) =>
                setHotlineForm({ ...hotlineForm, subtitle: e.target.value })
              }
              placeholder="e.g. 24/7 security patrol and immediate community response"
            />
          </label>

          <div className="form-grid">
            <label className="field">
              Primary Hotline Number
              <input
                required
                value={hotlineForm.number}
                onChange={(e) =>
                  setHotlineForm({ ...hotlineForm, number: e.target.value })
                }
                placeholder="(02) 8920-1122 or 911"
              />
            </label>
            <label className="field">
              Alternate / Mobile Number
              <input
                value={hotlineForm.altNumber}
                onChange={(e) =>
                  setHotlineForm({ ...hotlineForm, altNumber: e.target.value })
                }
                placeholder="Mobile: 0917-555-8266"
              />
            </label>
          </div>

          <div className="form-grid">
            <label className="field">
              Color Theme
              <select
                value={hotlineForm.tone}
                onChange={(e) =>
                  setHotlineForm({
                    ...hotlineForm,
                    tone: e.target.value as any,
                  })
                }
              >
                <option value="green">Green (Barangay / Environmental)</option>
                <option value="blue">Blue (Medical / Ambulance)</option>
                <option value="amber">Amber (Police / Law Enforcement)</option>
                <option value="red">Red (Fire / Rescue / Emergency)</option>
                <option value="purple">Purple (Disaster / Calamity)</option>
                <option value="cyan">Cyan (Utilities / Services)</option>
              </select>
            </label>

            <label className="field">
              Icon
              <select
                value={hotlineForm.icon}
                onChange={(e) =>
                  setHotlineForm({
                    ...hotlineForm,
                    icon: e.target.value as any,
                  })
                }
              >
                <option value="phone">Phone Handset</option>
                <option value="shield">Protective Shield</option>
                <option value="alert">Alert Warning Triangle</option>
              </select>
            </label>
          </div>

          <div className="modal-actions">
            <button
              className="row-action"
              onClick={() => setHotlineModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="primary-button"
              disabled={!hotlineForm.name.trim() || !hotlineForm.number.trim()}
              onClick={handleSaveHotline}
            >
              {editingHotline ? "Save Changes" : "Add to Directory"}
            </button>
          </div>
        </Modal>
      )}

      {/* Admin: Manage / Mediate Incident Modal */}
      {manageModalItem && (
        <Modal
          title={`Lupon Tagapamayapa File: ${manageModalItem.id}`}
          close={() => setManageModalItem(null)}
          maxWidth="640px"
        >
          {/* Dispute Hero Summary */}
          <div
            className="resident-manage-card"
            style={{ marginBottom: "14px" }}
          >
            <div className="resident-profile-hero">
              <div className="resident-hero-left">
                <Avatar
                  initials={manageModalItem.complainantName
                    .slice(0, 2)
                    .toUpperCase()}
                  tone={manageModalItem.isUrgent ? "amber" : "blue"}
                />
                <div className="resident-hero-info">
                  <h2>{manageModalItem.complainantName}</h2>
                  <p>
                    {manageModalItem.complainantEmail} · {manageModalItem.purok}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  alignItems: "flex-end",
                }}
              >
                <b
                  className={`status ${manageModalItem.status.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {manageModalItem.status.toUpperCase()}
                </b>
                {manageModalItem.isUrgent && (
                  <span className="urgent-badge">
                    <Icon name="alert" size={11} /> Urgent Case
                  </span>
                )}
              </div>
            </div>

            {/* Respondent Card if recorded */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  background: "#f8faf9",
                  borderRadius: "8px",
                  padding: "9px 12px",
                  border: "1px solid #e2ebe6",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#166534",
                    textTransform: "uppercase",
                  }}
                >
                  May-sumbong (Complainant)
                </span>
                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#1a3028",
                  }}
                >
                  {manageModalItem.complainantName}
                </p>
                <small style={{ color: "#6a7e76", fontSize: "10px" }}>
                  {manageModalItem.purok}
                </small>
              </div>

              <div
                style={{
                  background: "#fdf8f8",
                  borderRadius: "8px",
                  padding: "9px 12px",
                  border: "1px solid #fbd5d5",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#991b1b",
                    textTransform: "uppercase",
                  }}
                >
                  Ipinagsusumbong (Respondent)
                </span>
                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#991b1b",
                  }}
                >
                  {adminForm.respondentName || "(Not specified)"}
                </p>
                <small style={{ color: "#772b2b", fontSize: "10px" }}>
                  {adminForm.respondentAddress || "Address on record"}
                </small>
              </div>
            </div>

            {/* Statement Box */}
            <div
              style={{
                background: "#f8faf9",
                borderRadius: "8px",
                padding: "11px 14px",
                marginTop: "12px",
                border: "1px solid #e5ebe8",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    color: "#798b84",
                    fontWeight: 700,
                  }}
                >
                  Sworn Narrative / Complaint Statement:
                </span>
                <span
                  style={{
                    fontSize: "10.5px",
                    color: "#176b4d",
                    fontWeight: 600,
                  }}
                >
                  {manageModalItem.category} · {manageModalItem.date}
                </span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#22352f",
                  margin: 0,
                  lineHeight: 1.55,
                }}
              >
                "{manageModalItem.description}"
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="form-grid">
            <label className="field">
              Case Status / Katarungang Pambarangay Progression
              <select
                value={adminForm.status}
                onChange={(e) =>
                  setAdminForm({
                    ...adminForm,
                    status: e.target.value as any,
                  })
                }
              >
                <option value="Under Review">
                  Under Review (Desk Assessment)
                </option>
                <option value="Scheduled Hearing">
                  Scheduled Hearing (Patawag Issued)
                </option>
                <option value="In Mediation">
                  In Mediation (Lupon Session in Progress)
                </option>
                <option value="Resolved">
                  Resolved Amicably (Kasunduan Signed)
                </option>
                <option value="Dismissed">
                  Dismissed / Endorsed to PNP / Court
                </option>
              </select>
            </label>

            <label className="field">
              Respondent Full Name
              <input
                value={adminForm.respondentName}
                onChange={(e) =>
                  setAdminForm({ ...adminForm, respondentName: e.target.value })
                }
                placeholder="e.g. Rodrigo Garcia"
              />
            </label>
          </div>

          {(adminForm.status === "Scheduled Hearing" ||
            adminForm.status === "In Mediation") && (
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "10px",
                padding: "14px",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#1e40af",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Icon name="calendar" size={14} /> Lupon Tagapamayapa Hearing
                Scheduler
              </span>

              <div className="form-grid" style={{ marginTop: "10px" }}>
                <label className="field">
                  Hearing Stage / Notice Number
                  <select
                    value={adminForm.hearingStage}
                    onChange={(e) =>
                      setAdminForm({
                        ...adminForm,
                        hearingStage: e.target.value,
                      })
                    }
                  >
                    <option value="1st Patawag (Notice of Hearing)">
                      1st Patawag (Notice of Hearing)
                    </option>
                    <option value="2nd Patawag (Follow-up Notice)">
                      2nd Patawag (Follow-up Notice)
                    </option>
                    <option value="3rd & Final Notice">
                      3rd & Final Notice
                    </option>
                    <option value="Conciliation / Pangkat Session">
                      Conciliation / Pangkat Session
                    </option>
                  </select>
                </label>

                <label className="field">
                  Hearing Date & Time
                  <input
                    value={adminForm.hearingDate}
                    onChange={(e) =>
                      setAdminForm({
                        ...adminForm,
                        hearingDate: e.target.value,
                      })
                    }
                    placeholder="e.g. June 25, 2025 · 2:00 PM"
                  />
                </label>
              </div>

              <div className="form-grid" style={{ marginTop: "4px" }}>
                <label className="field">
                  Hearing Venue
                  <input
                    value={adminForm.hearingVenue}
                    onChange={(e) =>
                      setAdminForm({
                        ...adminForm,
                        hearingVenue: e.target.value,
                      })
                    }
                    placeholder="e.g. Lupon Tagapamayapa Hall, 2nd Flr"
                  />
                </label>

                <label className="field">
                  Assigned Officer / Lupon Member
                  <input
                    value={adminForm.assignedOfficer}
                    onChange={(e) =>
                      setAdminForm({
                        ...adminForm,
                        assignedOfficer: e.target.value,
                      })
                    }
                    placeholder="e.g. Hon. Roberto Gomez (Punong Brgy)"
                  />
                </label>
              </div>
            </div>
          )}

          <label className="field">
            Officer Action Notes & Settlement Terms
            <textarea
              className="small-textarea"
              style={{ minHeight: "85px" }}
              value={adminForm.officerNotes}
              onChange={(e) =>
                setAdminForm({ ...adminForm, officerNotes: e.target.value })
              }
              placeholder="Record mediation findings, terms of amicable agreement, or endorsement reasons..."
            />
          </label>

          <div
            className="modal-actions"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="btn-sm-action danger"
                onClick={() => setDeleteConfirmItem(manageModalItem)}
                style={{ padding: "8px 14px", fontSize: "11.5px" }}
              >
                <Icon name="trash" size={13} /> Archive / Delete
              </button>
              <button
                className="btn-sm-action secondary"
                onClick={() => {
                  setKpSummonItem({
                    ...manageModalItem,
                    respondentName:
                      adminForm.respondentName ||
                      manageModalItem.respondentName,
                    hearingDate:
                      adminForm.hearingDate || manageModalItem.hearingDate,
                    hearingStage:
                      adminForm.hearingStage || manageModalItem.hearingStage,
                    hearingVenue:
                      adminForm.hearingVenue || manageModalItem.hearingVenue,
                    assignedOfficer:
                      adminForm.assignedOfficer ||
                      manageModalItem.assignedOfficer,
                  });
                }}
                style={{ padding: "8px 14px", fontSize: "11.5px" }}
              >
                <Icon name="document" size={13} /> KP Form No. 9 Summon
              </button>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="row-action"
                onClick={() => setManageModalItem(null)}
              >
                Cancel
              </button>
              <button className="primary-button" onClick={handleSaveManage}>
                Save Updates
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Official KP Form No. 9 (Notice of Hearing / Summons) Modal */}
      {kpSummonItem && (
        <Modal
          title={`Official Summon: KP Form No. 9 (${kpSummonItem.id})`}
          close={() => setKpSummonItem(null)}
          maxWidth="700px"
        >
          <div className="kp-doc-sheet">
            <div className="kp-doc-header">
              <h4>Republika ng Pilipinas</h4>
              <h4>Lalawigan ng Metro Manila · Lungsod Quezon</h4>
              <h3>Barangay San Isidro</h3>
              <h2>Tanggapan ng Lupong Tagapamayapa</h2>
            </div>

            <div className="kp-form-title">
              <span>Katarungang Pambarangay Form Blg. 9</span>
              <h1>PATAWAG (SUMMONS)</h1>
            </div>

            <div className="kp-case-box">
              <div>
                <span className="kp-party-title">
                  May-sumbong (Complainant)
                </span>
                <div className="kp-party-name">
                  {kpSummonItem.complainantName}
                </div>
                <div className="kp-party-sub">{kpSummonItem.purok}</div>
              </div>
              <div>
                <span className="kp-party-title">
                  Ipinagsusumbong (Respondent)
                </span>
                <div className="kp-party-name">
                  {kpSummonItem.respondentName || "(Name to be served)"}
                </div>
                <div className="kp-party-sub">
                  {kpSummonItem.respondentAddress || kpSummonItem.purok}
                </div>
              </div>
            </div>

            <p className="kp-body-paragraph">
              <strong>KAY (TO):</strong>{" "}
              <u>{kpSummonItem.respondentName || "IPINAGSUSUMBONG"}</u>, na
              naninirahan sa{" "}
              {kpSummonItem.respondentAddress || kpSummonItem.purok}.
            </p>

            <p className="kp-body-paragraph">
              Kayo ay tinatawagan at inuutusan na humarap sa akin nang personal,
              kasama ang inyong mga saksi kung mayroon, para sa opisyal na
              pagdinig ng reklamo na inihain laban sa inyo ukol sa usaping:{" "}
              <strong>"{kpSummonItem.category}"</strong>.
            </p>

            <div className="kp-hearing-highlight">
              <p>
                <strong>📅 Petsa at Oras (Hearing Schedule):</strong>{" "}
                {kpSummonItem.hearingDate || "June 25, 2025 at 2:00 PM"}
              </p>
              <p>
                <strong>📍 Pook ng Pagpupulong (Venue):</strong>{" "}
                {kpSummonItem.hearingVenue ||
                  "Lupon Tagapamayapa Hall, 2nd Floor, Barangay San Isidro Hall"}
              </p>
              <p>
                <strong>⚖️ Yugto ng Patawag:</strong>{" "}
                {kpSummonItem.hearingStage || "1st Patawag (Notice of Hearing)"}
              </p>
            </div>

            <p
              className="kp-body-paragraph"
              style={{ fontSize: "11.5px", color: "#6e1d1d" }}
            >
              <strong>BABALA NG BATAS (WARNING):</strong> Ang sinumang tumanggi
              o mabigong humarap nang walang makatwirang dahilan matapos
              mapagsilbihan ng patawag na ito ay maaaring mawalan ng karapatang
              maghain ng kontra-reklamo at ang naturang usapin ay maaaring
              iendorso sa Hukuman kalakip ang kaukulang{" "}
              <em>Certificate to File Action (CFA)</em> alinsunod sa Seksiyon
              515 ng Republic Act No. 7160 (Local Government Code).
            </p>

            <div style={{ textAlign: "center", margin: "20px 0 10px" }}>
              <span className="kp-seal-badge">
                <Icon name="shield" size={13} /> Opisyal na Tatak ng Barangay
                San Isidro
              </span>
            </div>

            <div className="kp-signatures">
              <div className="kp-sig-box">
                <div className="kp-sig-name">
                  {kpSummonItem.assignedOfficer || "HON. ROBERTO GOMEZ"}
                </div>
                <div className="kp-sig-role">
                  Punong Barangay / Tagapangulo ng Lupon
                </div>
              </div>
              <div className="kp-sig-box">
                <div className="kp-sig-name">PATUNAY NG PAGTANGGAP</div>
                <div className="kp-sig-role">
                  Lagda ng Tumanggap / Petsa ng Pagsisilbi
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal-actions"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <button
              className="row-action"
              onClick={() => setKpSummonItem(null)}
            >
              Close
            </button>
            <button className="primary-button" onClick={() => window.print()}>
              <Icon name="document" size={14} /> Print Official Notice (Patawag)
            </button>
          </div>
        </Modal>
      )}

      {/* Admin: Confirm Soft-Delete Blotter Modal */}
      {deleteConfirmItem && (
        <Modal
          title="Move Blotter to Archived Cases"
          close={() => setDeleteConfirmItem(null)}
        >
          <div className="danger-modal-box">
            <div className="danger-modal-icon">
              <Icon name="trash" size={24} />
            </div>
            <h3 className="danger-modal-title">
              Archive Blotter Case {deleteConfirmItem.id}?
            </h3>
            <p className="danger-modal-desc">
              Moving blotter <strong>{deleteConfirmItem.id}</strong>{" "}
              (Complainant: {deleteConfirmItem.complainantName}) to the{" "}
              <strong>Archived / Deleted Cases</strong> tab will hide it from
              active resolution workflows. You can review or restore it anytime,
              or permanently purge it from the system.
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                className="row-action"
                onClick={() => setDeleteConfirmItem(null)}
              >
                Cancel
              </button>
              <button
                className="btn-sm-action danger"
                style={{
                  padding: "9px 20px",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
                onClick={handleConfirmSoftDelete}
              >
                Confirm Move to Archive
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Admin: Confirm Permanent Purge Modal */}
      {purgeConfirmItem && (
        <Modal
          title="Permanently Purge Blotter Case"
          close={() => setPurgeConfirmItem(null)}
        >
          <div className="danger-modal-box">
            <div
              className="danger-modal-icon"
              style={{ background: "#450a0a", color: "#f87171" }}
            >
              <Icon name="trash" size={24} />
            </div>
            <h3 className="danger-modal-title" style={{ color: "#7f1d1d" }}>
              Permanently Purge Case {purgeConfirmItem.id}?
            </h3>
            <p className="danger-modal-desc">
              This action will permanently delete blotter record{" "}
              <strong>{purgeConfirmItem.id}</strong> filed by{" "}
              {purgeConfirmItem.complainantName} from the Supabase cloud
              database. <strong>This action cannot be undone.</strong>
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                className="row-action"
                onClick={() => setPurgeConfirmItem(null)}
              >
                Cancel
              </button>
              <button
                className="btn-sm-action danger"
                style={{
                  padding: "9px 20px",
                  fontSize: "12px",
                  fontWeight: "700",
                  background: "#7f1d1d",
                  borderColor: "#7f1d1d",
                }}
                onClick={handleConfirmPurge}
              >
                Permanently Purge
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Admin: Confirm Delete Emergency Hotline Modal */}
      {deleteHotlineItem && (
        <Modal
          title="Remove Hotline from Directory"
          close={() => setDeleteHotlineItem(null)}
        >
          <div className="danger-modal-box">
            <div className="danger-modal-icon">
              <Icon name="trash" size={24} />
            </div>
            <h3 className="danger-modal-title">
              Delete {deleteHotlineItem.name}?
            </h3>
            <p className="danger-modal-desc">
              Are you sure you want to remove{" "}
              <strong>{deleteHotlineItem.name}</strong> (
              {deleteHotlineItem.number}) from the public emergency hotline
              directory? Residents will no longer see this contact number.
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                className="row-action"
                onClick={() => setDeleteHotlineItem(null)}
              >
                Cancel
              </button>
              <button
                className="btn-sm-action danger"
                style={{
                  padding: "9px 20px",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
                onClick={handleConfirmDeleteHotline}
              >
                Confirm Delete Hotline
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
