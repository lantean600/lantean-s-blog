export const CATEGORIES = ["research", "technical", "daily", "journal"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, { zh: string; en: string }> = {
  research: { zh: "学术研究", en: "Research" },
  technical: { zh: "技术分享", en: "Technical" },
  daily: { zh: "日常随笔", en: "Daily" },
  journal: { zh: "阶段总结", en: "Journal" },
};
