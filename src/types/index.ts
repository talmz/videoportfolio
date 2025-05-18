export interface Video {
  id: string;
  title: string;
  description: string;
  vimeoId: string;
  thumbnailUrl: string;
  date: string;
  topics: string[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  topics: Topic[];
  videos: Video[];
}