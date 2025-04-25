export const YOUTUBE_DATA_API_KEY: string = import.meta.env
  .VITE_YOUTUBE_DATA_API_KEY;
export const YOUTUBE_DATA_API_CLIENT_ID: string = import.meta.env
  .VITE_YOUTUBE_DATA_API_CLIENT_ID;
export const YOUTUBE_DATA_API_CLIENT_SECRET: string = import.meta.env
  .VITE_YOUTUBE_DATA_API_CLIENT_SECRET;
export const YOUTUBE_DATA_API_REDIRECT_URI: string = import.meta.env
  .VITE_YOUTUBE_DATA_API_REDIRECT_URI;

export const GOOGLE_OAUTH2_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_OAUTH2_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
export const YOUTUBE_DATA_API_BASE_URL =
  "https://www.googleapis.com/youtube/v3";
export const YOUTUBE_ANALYTICS_BASE_URL =
  "https://youtubeanalytics.googleapis.com/v2";
export const YOUTUBE_DATA_API_SEARCH_BASE_URL = `${YOUTUBE_DATA_API_BASE_URL}/search`;
export const YOUTUBE_DATA_API_DETAILS = `${YOUTUBE_DATA_API_BASE_URL}/videos`;
export const YOUTUBE_DATA_API_COMMENTS = `${YOUTUBE_DATA_API_BASE_URL}/comments`;
export const YOUTUBE_DATA_API_COMMENT_THREADS = `${YOUTUBE_DATA_API_BASE_URL}/commentThreads`;
export const YOUTUBE_DATA_API_RATE_VIDEO = `${YOUTUBE_DATA_API_BASE_URL}/videos/rate`;
export const YOUTUBE_DATA_API_GET_RATING = `${YOUTUBE_DATA_API_BASE_URL}/videos/getRating`;
export const YOUTUBE_DATA_API_GET_CHANNEL = `${YOUTUBE_DATA_API_BASE_URL}/channels`;
export const YOUTUBE_ANALYTICS_REPORTS = `${YOUTUBE_ANALYTICS_BASE_URL}/reports`;
