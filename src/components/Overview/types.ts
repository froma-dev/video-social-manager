export interface VideoReport {
  id: string;
  title: string;
  description: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnail: string;
}

export interface OverviewCardData {
  id: number;
  title: string;
  description: string;
  trend: number;
}