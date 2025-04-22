// youtube.types.ts
export interface SearchVideosParams {
  query: string;
}

export type YoutubeSearchType = "video" | "channel" | "playlist";
export type YoutubeSearchPart = "snippet" | "contentDetails" | "statistics";
export type YoutubeRating = "like" | "dislike" | "none" | "unspecified";

export interface GetContentDetailsParams {
  videoIds: string[];
  accessToken: string;
}

export interface RateVideoParams {
  videoId: string;
  accessToken: string;
  rating: string;
}

export interface GetVideoRatingParams {
  videoId: string;
  accessToken: string;
}

export interface SearchYoutubeParams {
  query: string;
  accessToken: string;
}

export interface GetCommentParams {
  parentId: string;
  accessToken: string;
}

export interface GetCommentThreadsParams {
  videoId: string;
  accessToken: string;
}

export interface GetChannelParams {
  channelId: string;
  accessToken: string;
}

export interface CommentProps {
  id: string;
  author: string;
  authorImageUrl: string;
  publishedAt: string;
  comment: string;
  likes: number;
}

export interface CommentData {
  id: string;
  author: string;
  authorImageUrl: string;
  publishedAt: string;
  comment: string;
  likes: number;
}

export interface VideoAsset {
  id: string;
  title: string;
  channelTitle: string;
  description: string;
  thumbnails: Thumbnails;
}

export interface ContentDetails {
  id: string;
  title: string;
  channelTitle: string;
  description: string;
  thumbnails: Thumbnails;
  statistics: Statistics;
  snippet: YoutubeContentDetailsSnippet;
}

export interface YoutubeContentDetailsSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage: string;
  localized: Localized;
  defaultAudioLanguage: string;
}

export interface YoutubeVideo {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
  statistics?: Statistics;
}

export interface YoutubeComment {
  kind: string;
  etag: string;
  id: string;
  snippet: YoutubeCommentSnippet;
}

export interface YoutubeCommentThread {
  kind: string;
  etag: string;
  id: string;
  snippet: YoutubeCommentThreadSnippet;
  replies?: {
    comments: YoutubeComment[];
  };
}

export interface YoutubeCommentThreadSnippet {
  channelId: string;
  videoId: string;
  topLevelComment: YoutubeComment;
  canReply: boolean;
  totalReplyCount: number;
  isPublic: boolean;
}

export interface Id {
  kind: string;
  videoId: string;
}

/* --> PARTS */
export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface YoutubeCommentSnippet {
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: AuthorChannelId;
  channelId: string;
  textDisplay: string;
  textOriginal: string;
  parentId: string;
  canRate: string;
  viewerRating: string;
  likeCount: number;
  moderationStatus: string;
  publishedAt: string;
  updatedAt: string;
}

export interface AuthorChannelId {
  value: string;
}

export interface Statistics {
  viewCount: string;
  likeCount: number;
  favoriteCount: string;
  commentCount: string;
}

/* <-- PARTS */

export interface Thumbnails {
  default: DefaultThumbnail;
  medium: MediumThumbnail;
  high: HighThumbnail;
}

export interface DefaultThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface MediumThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface HighThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeChannel {
  kind: string;
  etag: string;
  id: string;
  snippet: YoutubeChannelSnippet;
  contentDetails: YoutubeChannelContentDetails;
  statistics: YoutubeChannelStatistics;
  topicDetails: TopicDetails;
  status: YoutubeChannelStatus;
  brandingSettings: BrandingSettings;
  auditDetails: YoutubeChannelAuditDetails;
  contentOwnerDetails: ContentOwnerDetails;
}

export interface YoutubeChannelSnippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  defaultLanguage: string;
  localized: Localized;
  country: string;
}

export interface Localized {
  title: string;
  description: string;
}

export interface YoutubeChannelContentDetails {
  relatedPlaylists: RelatedPlaylists;
}

export interface RelatedPlaylists {
  likes: string;
  favorites: string;
  uploads: string;
}

export interface YoutubeChannelStatistics {
  viewCount: number;
  subscriberCount: number;
  hiddenSubscriberCount: boolean;
  videoCount: number;
}

export interface TopicDetails {
  topicIds: string[];
  topicCategories: string[];
}

export interface YoutubeChannelStatus {
  privacyStatus: string;
  isLinked: boolean;
  longUploadsStatus: string;
  madeForKids: boolean;
  selfDeclaredMadeForKids: boolean;
}

export interface BrandingSettings {
  channel: Channel;
  watch: Watch;
}

export interface Channel {
  title: string;
  description: string;
  keywords: string;
  trackingAnalyticsAccountId: string;
  unsubscribedTrailer: string;
  defaultLanguage: string;
  country: string;
}

export interface Watch {
  textColor: string;
  backgroundColor: string;
  featuredPlaylistId: string;
}

export interface YoutubeChannelAuditDetails {
  overallGoodStanding: boolean;
  communityGuidelinesGoodStanding: boolean;
  copyrightStrikesGoodStanding: boolean;
  contentIdClaimsGoodStanding: boolean;
}

export interface ContentOwnerDetails {
  contentOwner: string;
  timeLinked: string;
}
