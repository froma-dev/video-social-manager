import { YOUTUBE_DATA_API_KEY, VITE_YOUTUBE_DATA_API_SEARCH_BASE_URL } from "../../config";
import { type VideoAsset, type YoutubeVideo, type YoutubeSearchType, type YoutubeSearchPart } from "./youtube.types";

type SearchQuery = string

const YOUTUBE_SEARCH_MAX_RESULTS = "25";
const YOUTUBE_SEARCH_TYPE: YoutubeSearchType = "video";
const YOUTUBE_SEARCH_PART: YoutubeSearchPart = "snippet"

export const searchVideos = async (query: SearchQuery) => {
    if (!query) {
        throw new Error("Query is required");
    }

    const url = new URL(VITE_YOUTUBE_DATA_API_SEARCH_BASE_URL);
    url.searchParams.append("part", YOUTUBE_SEARCH_PART);
    url.searchParams.append("q", query)
    url.searchParams.append("type", YOUTUBE_SEARCH_TYPE)
    url.searchParams.append("key", YOUTUBE_DATA_API_KEY)
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

export const getVideoDetails = () => {

}

export const getComments = () => {

}

export const editComment = () => {

}

export { type YoutubeVideo, type VideoAsset }