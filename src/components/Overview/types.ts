export interface VideoReport {
  id: string;
  title: string;
  description: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnail: string;
  duration?: {
    hours: string;
    minutes: string;
    seconds: string;
  };
}

export interface VideoReportsData {
  id: string;
  title: string;
  description: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnail: string;
  duration?: {
    hours: string;
    minutes: string;
    seconds: string;
  };
}

export interface OverviewCardData {
  id: string;
  title: string;
  description: string;
  trend: number;
  icon: string;
}
