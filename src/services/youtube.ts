import { YOUTUBE_DATA_API_KEY } from "../config";



interface SearchVideosParams {
    query: string;
}
type YoutubeSearchType = "video" | "channel" | "playlist";
type YoutubeSearchPart = "snippet" | "contentDetails" | "statistics";

const YOUTUBE_SEARCH_MAX_RESULTS = "25";
const YOUTUBE_SEARCH_TYPE: YoutubeSearchType = "video";
const YOUTUBE_SEARCH_PART: YoutubeSearchPart = "snippet"

export const searchVideos = async ({ query }: SearchVideosParams) => {
    if (!query) {
        throw new Error("Query is required");
    }

    const url = new URL("https://www.googleapis.com/youtube/v3/search");

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

    console.log(data)
    return data;
}

export const getVideoDetails = () => {

}

export const getComments = () => {

}

export const editComment = () => {

}