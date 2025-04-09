// youtube.types.ts
export interface SearchVideosParams {
    query: string;
}

export type YoutubeSearchType = "video" | "channel" | "playlist";
export type YoutubeSearchPart = "snippet" | "contentDetails" | "statistics";

export interface GetVideoDetailsParams {
    videoId: string;
    accessToken: string;
} 

export interface SearchVideosParams {
    query: string;
    accessToken: string;
} 

export interface VideoAsset {
    id: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
}


export interface YoutubeVideo {
    kind: string
    etag: string
    id: Id
    snippet: Snippet
}

export interface Id {
    kind: string
    videoId: string
}

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