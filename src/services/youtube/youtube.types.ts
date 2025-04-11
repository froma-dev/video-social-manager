// youtube.types.ts
export interface SearchVideosParams {
    query: string;
}

export type YoutubeSearchType = "video" | "channel" | "playlist";
export type YoutubeSearchPart = "snippet" | "contentDetails" | "statistics";

export interface GetContentDetailsParams {
    videoId: string;
    accessToken: string;
}

export interface SearchVideosParams {
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

export interface ContentDetails extends VideoAsset {
    statistics: Statistics;
}

export interface YoutubeVideo {
    kind: string
    etag: string
    id: Id
    snippet: Snippet
    statistics?: Statistics
}

export interface YoutubeComment {
    kind: string
    etag: string
    id: string
    snippet: YoutubeCommentSnippet
}

export interface YoutubeCommentThread {
    kind: string
    etag: string
    id: string
    snippet: YoutubeCommentThreadSnippet
    replies?: {
        comments: YoutubeComment[]
    }
}

export interface YoutubeCommentThreadSnippet {
    channelId: string
    videoId: string
    topLevelComment: YoutubeComment
    canReply: boolean
    totalReplyCount: number
    isPublic: boolean
}

export interface Id {
    kind: string
    videoId: string
}

/* --> PARTS */
export interface Snippet {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: Thumbnails
    channelTitle: string
    liveBroadcastContent: string
    publishTime: string
}

export interface YoutubeCommentSnippet {
    authorDisplayName: string
    authorProfileImageUrl: string
    authorChannelUrl: string
    authorChannelId: AuthorChannelId
    channelId: string
    textDisplay: string
    textOriginal: string
    parentId: string
    canRate: string
    viewerRating: string
    likeCount: number
    moderationStatus: string
    publishedAt: string
    updatedAt: string
}

export interface AuthorChannelId {
    value: string
}

export interface Statistics {
    viewCount: string
    likeCount: number
    favoriteCount: string
    commentCount: string
}

/* <-- PARTS */

export interface Thumbnails {
    default: DefaultThumbnail
    medium: MediumThumbnail
    high: HighThumbnail
}

export interface DefaultThumbnail {
    url: string
    width: number
    height: number
}

export interface MediumThumbnail {
    url: string
    width: number
    height: number
}

export interface HighThumbnail {
    url: string
    width: number
    height: number
}