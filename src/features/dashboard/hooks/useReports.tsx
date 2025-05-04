import useOAuth2Context from "@features/auth/hooks/useOAuth2Context";
import { getReports } from "@services/youtube/youtubeAnalytics";
import { getContentDetails } from "@services/youtube/youtube";
import { OverviewCardData, VideoReport } from "@components/Overview/types";
import { useCallback, useEffect, useState } from "react";
import { shortNumber } from "@utils/utils";
import { ContentDetails } from "@services/youtube/youtube.types";

const reportsDescriptionMap: Record<string, string> = {
  views: "Views",
  likes: "Likes",
  estimatedMinutesWatched: "Minutes Watched",
  subscribersGained: "Subscribers Gained",
};
const DEFAULT_DAYS = 7;
const useReports = () => {
  const { accessToken } = useOAuth2Context();
  const [videoReports, setVideoReports] = useState<VideoReport[] | null>(null);
  const [channelDayReports, setChannelDayReports] = useState<
    OverviewCardData[] | null
  >(null);
  const [channelReportError, setChannelReportError] = useState<Error | null>(
    null
  );
  const [reportError, setReportError] = useState<Error | null>(null);
  const fetchReports = useCallback(async () => {
    if (!accessToken) return;

    try {
      const [channelVideoReports, channelDayReports] = await Promise.all([
        getReports({
          accessToken,
          days: DEFAULT_DAYS,
          ids: "channel",
          dimensions: "video",
          metrics: [
            "estimatedMinutesWatched",
            "views",
            "likes",
            "subscribersGained",
          ],
          sort: "estimatedMinutesWatched",
          maxResults: 15,
        }),
        getReports({
          accessToken,
          days: DEFAULT_DAYS * 2, // Double the days to compare and make a trend from the previous days
          ids: "channel",
          dimensions: "day",
          metrics: [
            "views",
            "likes",
            "estimatedMinutesWatched",
            "averageViewDuration",
            "averageViewPercentage",
            "subscribersGained",
          ],
          sort: "day",
          maxResults: DEFAULT_DAYS * 2,
        }),
      ]);

      console.log("channelDayReports -->> ", channelDayReports);

      const reducedChannelDayReports = channelDayReports
        .slice(0, DEFAULT_DAYS)
        .reduce(
          (acc, report) => {
            const { views, likes, estimatedMinutesWatched, subscribersGained } =
              report;

            const newAccValue = {
              views: Number(acc.views) + Number(views),
              likes: Number(acc.likes) + Number(likes),
              estimatedMinutesWatched:
                Number(acc.estimatedMinutesWatched) +
                Number(estimatedMinutesWatched),
              subscribersGained:
                Number(acc.subscribersGained) + Number(subscribersGained),
            };

            return { ...acc, ...newAccValue };
          },
          {
            id: "",
            views: 0,
            likes: 0,
            estimatedMinutesWatched: 0,
            subscribersGained: 0,
          } as Record<string, number | string>
        );

      console.log("reducedChannelDayReports -->> ", reducedChannelDayReports);

      const analyticsCardsData: OverviewCardData[] = [];
      for (const key in reducedChannelDayReports) {
        if (key === "id") continue;
        analyticsCardsData.push({
          id: key,
          title: shortNumber(reducedChannelDayReports[key]),
          description: reportsDescriptionMap[key],
          trend: 100,
          icon: key,
        });
      }
      setChannelDayReports(analyticsCardsData);

      const videoIds = channelVideoReports.map((r) => r.videoId.toString());
      let contentDetails: ContentDetails[] = [];
      try {
        contentDetails = await getContentDetails({
          videoIds,
        });
        console.log(contentDetails);
      } catch (error) {
        console.error("Error fetching content details: ", error);
        throw new Error("Error fetching content details");
      }

      const combined = contentDetails.map((contentDetail) => ({
        id: contentDetail.id,
        title: contentDetail.title,
        description: contentDetail.description,
        viewCount:
          channelVideoReports.find((r) => r.videoId === contentDetail.id)
            ?.views ?? 0,
        likeCount:
          channelVideoReports.find((r) => r.videoId === contentDetail.id)
            ?.likes ?? 0,
        commentCount: Number(contentDetail.statistics.commentCount),
        thumbnail: contentDetail.thumbnails.high.url,
      })) as VideoReport[];

      setVideoReports(combined);
    } catch (error) {
      console.error("Error fetching reports: ", error);
      setChannelReportError(error as Error);
      setReportError(error as Error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    videoReports,
    reportError,
    channelDayReports,
    channelReportError,
  };
};

export default useReports;
