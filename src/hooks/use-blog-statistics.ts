import { useState, useEffect } from "react";
import statisticsData from "@/data/statistics.json";

export interface BlogStatistics {
  totalPosts: number;
  totalWords: number;
  daysOnline: number;
  lastUpdate: string;
  totalContributions: number;
  heatmap: { date: string; count: number; level: number }[];
}

export function useBlogStatistics() {
  const [statistics, setStatistics] = useState<BlogStatistics>({
    totalPosts: 0,
    totalWords: 0,
    daysOnline: 0,
    lastUpdate: "-",
    totalContributions: 0,
    heatmap: [],
  });

  useEffect(() => {
    // 博客创建的实际硬编码日期，假设为 2024-01-01
    const getDaysOnline = () => {
      const startDate = new Date("2024-01-01");
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    setStatistics({
      totalPosts: statisticsData.totalPosts,
      totalWords: statisticsData.totalWords,
      daysOnline: getDaysOnline(),
      lastUpdate: statisticsData.lastUpdate,
      totalContributions: statisticsData.totalContributions,
      heatmap: statisticsData.heatmap,
    });
  }, []);

  return statistics;
}