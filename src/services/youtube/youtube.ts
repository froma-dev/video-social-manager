import { YOUTUBE_DATA_API_KEY, YOUTUBE_DATA_API_SEARCH_BASE_URL, YOUTUBE_DATA_API_DETAILS } from "../../config";
import { type VideoAsset, type YoutubeVideo, type YoutubeSearchType, type YoutubeSearchPart, type GetVideoDetailsParams, type SearchVideosParams } from "./youtube.types";

const YOUTUBE_SEARCH_MAX_RESULTS = "25";
const YOUTUBE_SEARCH_TYPE: YoutubeSearchType = "video";
const defaultSearchParts: YoutubeSearchPart[] = ["snippet"];
const defaultVideoDetailsParts: YoutubeSearchPart[] = ["snippet", "contentDetails", "statistics"];

const buildRequestUrl = (baseUrl: string, accessToken: string) => {
    const url = new URL(baseUrl);
    url.searchParams.append("key", YOUTUBE_DATA_API_KEY);
    return url;
}

export const searchVideos = async ({ query, accessToken }: SearchVideosParams) => {
    if (!query) {
        throw new Error("Query is required");
    }

    const url = buildRequestUrl(YOUTUBE_DATA_API_SEARCH_BASE_URL, accessToken);
    url.searchParams.append("part", defaultSearchParts.join(","));
    url.searchParams.append("q", query)
    url.searchParams.append("type", YOUTUBE_SEARCH_TYPE)
    url.searchParams.append("maxResults", YOUTUBE_SEARCH_MAX_RESULTS)

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Failed to search videos");
    }

    const data = await response.json();
    const transformedData = transformSearchVideos(data);

    return transformedData;
}

const transformSearchVideos = (data: any) => {
    const videos = data.items.map((item: YoutubeVideo) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails
    }));

    return videos as VideoAsset[];
}

export const getVideoDetails = async ({ videoId, accessToken }: GetVideoDetailsParams) => {
    if (!videoId) throw new Error("Video ID is required");

    const url = buildRequestUrl(YOUTUBE_DATA_API_DETAILS, accessToken)
    url.searchParams.append("part", defaultVideoDetailsParts.join(","))
    url.searchParams.append("id", videoId)

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to get video details");

    const data = await response.json();
    const transformedData = transformSearchVideos(data);

    return transformedData;
}

const transformVideos = (data: any) => {
    console.log('------->', data)



    return data;
}

export const getComments = () => {

}

export const editComment = () => {

}

export { type YoutubeVideo, type VideoAsset }