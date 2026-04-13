export type Page = 'home' | 'post' | 'about' | 'academic' | 'projects' | 'links' | 'search';
export type BlogCategory = '全部' | 'Research' | 'Technical' | 'Daily Life' | 'Month Journal';
export type Lang = 'zh' | 'en';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
}

export interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: number;
  abstract: string;
  tags: string[];
  link?: string;
}

export interface Project {
  name: string;
  desc: string;
  tech: string[];
  stars: number;
  link: string;
  emoji: string;
}

export interface FriendLink {
  name: string;
  url: string;
  desc: string;
  avatar: string;
}
