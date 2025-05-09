// youtube.types.ts
export interface SearchVideosParams {
  query: string;
}

export type YoutubeSearchType = "video" | "channel" | "playlist";
export type YoutubeSearchPart = "snippet" | "contentDetails" | "statistics";
export type YoutubeRating = "like" | "dislike" | "none" | "unspecified";
export type YoutubeResponseKind =
  | "youtube#videoListResponse"
  | "youtube#commentThreadListResponse"
  | "youtube#video"
  | "youtube#commentThread"
  | "youtube#comment"
  | "youtube#channel"
  | "youtube#searchResult"
  | "youtube#searchListResponse";
export type YoutubeVideoUploadStatus =
  | "deleted"
  | "failed"
  | "processed"
  | "rejected"
  | "uploaded";
export type YoutubeVideoFailureReason =
  | "codec"
  | "conversion"
  | "emptyFile"
  | "invalidFile"
  | "tooSmall"
  | "uploadAborted";
export type YoutubeVideoRejectionReason =
  | "claim"
  | "copyright"
  | "duplicate"
  | "inappropriate"
  | "legal"
  | "length"
  | "termsOfUse"
  | "trademark"
  | "uploaderAccountClosed"
  | "uploaderAccountSuspended";

export type YoutubePrivacyStatus = "public" | "private" | "unlisted";
export interface GetContentDetailsParams {
  videoIds: string[];
}

export interface RateVideoParams {
  videoId: string;
  rating: string;
}

export interface GetVideoRatingParams {
  videoId: string;
}

export interface SearchYoutubeParams {
  query: string;
  accessToken: string;
}

export interface GetCommentParams {
  parentId: string;
}

export interface GetCommentThreadsParams {
  videoId: string;
}

export interface GetChannelParams {
  channelId: string;
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
  snippet: Snippet;
}

export interface YoutubeContentDetails {
  id: string;
  title: string;
  channelTitle: string;
  description: string;
  thumbnails: Thumbnails;
  statistics?: Statistics;
  snippet?: Snippet;
  contentDetails?: ContentDetails;
}

export interface ContentDetails {
  duration: string;
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
  kind: YoutubeResponseKind;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: YoutubeContentDetails;
  statistics?: Statistics;
}

export interface YoutubeSearchResult {
  kind: YoutubeResponseKind;
  etag: string;
  id: YoutubeSearchResultId;
  snippet: Snippet;
}

export interface YoutubeComment {
  kind: YoutubeResponseKind;
  etag: string;
  id: string;
  snippet: YoutubeCommentSnippet;
}

export interface YoutubeCommentThread {
  kind: YoutubeResponseKind;
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

export interface YoutubeSearchResultId {
  kind: YoutubeResponseKind;
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
