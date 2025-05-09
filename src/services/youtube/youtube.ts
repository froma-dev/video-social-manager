import {
  YOUTUBE_DATA_API_KEY,
  YOUTUBE_DATA_API_SEARCH_BASE_URL,
  YOUTUBE_DATA_API_DETAILS,
  YOUTUBE_DATA_API_COMMENTS,
  YOUTUBE_DATA_API_COMMENT_THREADS,
  YOUTUBE_DATA_API_RATE_VIDEO,
  YOUTUBE_DATA_API_GET_RATING,
  YOUTUBE_DATA_API_GET_CHANNEL,
} from "@/config";

import {
  type VideoAsset,
  type YoutubeVideo,
  type YoutubeSearchResult,
  type YoutubeSearchType,
  type YoutubeSearchPart,
  type GetContentDetailsParams,
  type SearchYoutubeParams,
  type GetCommentParams,
  type CommentData,
  type GetCommentThreadsParams,
  type YoutubeCommentThread,
  type YoutubeComment,
  RateVideoParams,
  GetVideoRatingParams,
  GetChannelParams,
  YoutubeChannel,
  YoutubeContentDetails,
} from "./youtube.types";

const YOUTUBE_SEARCH_MAX_RESULTS = "25";
const YOUTUBE_SEARCH_TYPE: YoutubeSearchType = "video";
const defaultSearchParts: YoutubeSearchPart[] = ["snippet"];
const defaultVideoDetailsParts: YoutubeSearchPart[] = [
  "snippet",
  "contentDetails",
  "statistics",
];
const defaultVideoCommentsParts: YoutubeSearchPart[] = ["snippet"];

export const buildRequestUrl = (baseUrl: string) => {
  const url = new URL(baseUrl);
  url.searchParams.append("key", YOUTUBE_DATA_API_KEY);
  return url;
};

type SearchYoutubeResponse = {
  items: YoutubeSearchResult[];
};
type YoutubeContentDetailsResponse = {
  items: YoutubeContentDetails[];
};
type YoutubeCommentThreadResponse = {
  items: YoutubeCommentThread[];
};
/*type YoutubeRatingResponse = {
  items: YoutubeRating[];
};*/
type YoutubeChannelResponse = {
  items: YoutubeChannel[];
};
export const searchYoutube = async ({
  query,
  accessToken,
}: SearchYoutubeParams) => {
  if (!query) {
    throw new Error("Query is required");
  }

  const url = buildRequestUrl(YOUTUBE_DATA_API_SEARCH_BASE_URL);
  url.searchParams.append("part", defaultSearchParts.join(","));
  url.searchParams.append("q", query);
  url.searchParams.append("type", YOUTUBE_SEARCH_TYPE);
  url.searchParams.append("maxResults", YOUTUBE_SEARCH_MAX_RESULTS);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to search videos");
  }

  const data = await response.json();
  const transformedData = transformSearchYoutube(data);

  return transformedData;
};

const transformSearchYoutube = (data: SearchYoutubeResponse): VideoAsset[] => {
  const videos = data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    description: item.snippet.description,
    thumbnails: item.snippet.thumbnails,
  }));

  return videos;
};

export const getContentDetails = async ({
  videoIds,
}: GetContentDetailsParams) => {
  if (!videoIds) throw new Error("Video ID is required");

  const url = buildRequestUrl(YOUTUBE_DATA_API_DETAILS);
  url.searchParams.append("part", defaultVideoDetailsParts.join(","));
  url.searchParams.append("id", videoIds.join(","));

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to get video details");

  const data = await response.json();
  const transformedData = transformContentDetails(data);

  return transformedData;
};

const transformContentDetails = (data: YoutubeContentDetailsResponse) => {
  const contentDetails = data.items.map(
    (item) =>
      ({
        id: item.id,
        channelTitle: item.snippet?.channelTitle,
        title: item.snippet?.title,
        description: item.snippet?.description,
        thumbnails: item.snippet?.thumbnails,
        statistics: item.statistics,
        snippet: item.snippet,
        contentDetails: item.contentDetails,
        duration: item.contentDetails?.duration,
      } as YoutubeContentDetails)
  );

  return contentDetails;
};

export const getComment = async ({ parentId }: GetCommentParams) => {
  if (!parentId) throw new Error("Comment parent ID is required");

  const url = buildRequestUrl(YOUTUBE_DATA_API_COMMENTS);
  url.searchParams.append("part", defaultVideoCommentsParts.join(","));
  url.searchParams.append("parentId", parentId);

  const data = await fetch(url);
  if (!data.ok) throw new Error("Failed to get comments");

  const comments = await data.json();
  const transformedData = transformComment(comments);

  return transformedData;
};

const transformComment = ({ snippet, id }: YoutubeComment): CommentData => {
  return {
    id: id,
    author: snippet.authorDisplayName,
    authorImageUrl: snippet.authorProfileImageUrl,
    publishedAt: snippet.publishedAt,
    comment: snippet.textDisplay,
    likes: snippet.likeCount,
  } as CommentData;
};

export const getCommentThreads = async ({
  videoId,
}: GetCommentThreadsParams) => {
  if (!videoId) throw new Error("videoId ID is required");

  const url = buildRequestUrl(YOUTUBE_DATA_API_COMMENT_THREADS);
  url.searchParams.append("part", "snippet");
  url.searchParams.append("videoId", videoId);

  const data = await fetch(url);
  if (!data.ok) throw new Error("Failed to get comments");

  const commentsData = await data.json();
  const transformedData = transformCommentThreads(commentsData);

  return transformedData;
};

const transformCommentThreads = (
  data: YoutubeCommentThreadResponse
): CommentData[] => {
  const comments = data.items.map((item: YoutubeCommentThread) => {
    const topLevelComment = item.snippet.topLevelComment;
    const transformedTopLevelComment = transformComment(topLevelComment);

    return transformedTopLevelComment;
  });

  return comments;
};

export const rateComment = async ({ parentId }: GetCommentParams) => {
  if (!parentId) throw new Error("Comment parent ID is required");

  const url = buildRequestUrl(YOUTUBE_DATA_API_COMMENTS);
  url.searchParams.append("parentId", parentId);

  const data = await fetch(url);
  if (!data.ok) throw new Error("Failed to get comments");

  const comments = await data.json();
  const transformedData = transformComment(comments);

  return transformedData;
};

export const rateVideo = async ({ videoId, rating }: RateVideoParams) => {
  if (!videoId) throw new Error("Video ID is required");

  const url = buildRequestUrl(YOUTUBE_DATA_API_RATE_VIDEO);
  url.searchParams.append("id", videoId);
  url.searchParams.append("rating", rating);

  const data = await fetch(url, {
    method: "POST",
  });

  return data.ok;
};

export const getVideoRating = async ({ videoId }: GetVideoRatingParams) => {
  if (!videoId) throw new Error("Video ID is required");

  const url = buildRequestUrl(YOUTUBE_DATA_API_GET_RATING);
  url.searchParams.append("id", videoId);

  const data = await fetch(url);
  if (!data.ok) throw new Error("Failed to get video rating");

  const ratingData = await data.json();
  //const transformedData = transformVideoRating(ratingData);

  return ratingData;
};

/*const transformVideoRating = (data: YoutubeRatingResponse): YoutubeRating => {
  const rating = data.items[0].rating;
  return rating as YoutubeRating;
};*/

export const getChannel = async ({ channelId }: GetChannelParams) => {
  if (!channelId) throw new Error("Channel ID is required");

  const url = buildRequestUrl(YOUTUBE_DATA_API_GET_CHANNEL);
  url.searchParams.append("part", ["snippet", "statistics"].join(","));
  url.searchParams.append("id", channelId);

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to get channel");

  const channelData = await response.json();
  const transformedData = transformChannel(channelData);

  return transformedData;
};

const transformChannel = (data: YoutubeChannelResponse): YoutubeChannel => {
  const channel = data.items[0];

  return channel;
};

export const editComment = () => {};

export { type YoutubeVideo, type VideoAsset };
