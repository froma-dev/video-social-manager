import useOAuth2Context from "@features/auth/hooks/useOAuth2Context";
import {
  getReports,
  ReportsDayData,
  ReportsVideoData,
} from "@services/youtube/youtubeAnalytics";
import { getContentDetails } from "@services/youtube/youtube";
import { OverviewCardData, VideoReport } from "@components/Overview/types";
import { useCallback, useEffect, useState } from "react";
import { reportToOverviewCardData } from "@utils/formatters";
import { buildErrorMessage, formatIso8601Duration } from "@/utils/utils";
import { YoutubeContentDetails } from "@/services/youtube/youtube.types";

const DEFAULT_DAYS = 7;
const DEFAULT_ADD_START_DAYS = 2;
type ChannelDayReportsData = OverviewCardData[];

const useReports = () => {
  const { accessToken } = useOAuth2Context();
  const [videoReports, setVideoReports] = useState<VideoReport[]>([]);
  const [channelDayReports, setChannelDayReports] =
    useState<ChannelDayReportsData>([]);
  const [channelReportError, setChannelReportError] = useState<Error | null>(
    null
  );
  const [reportError, setReportError] = useState<Error | null>(null);
  const [channelDayDays, setChannelDayDays] = useState(DEFAULT_DAYS);
  const fetchReports = useCallback(async () => {
    if (!accessToken) return;

    try {
      const [channelVideoReports, channelDayReports] = (await Promise.all([
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
          days: channelDayDays * 2 + DEFAULT_ADD_START_DAYS, // Double the days to compare and add more days as data might not be complete up to the current day
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
          maxResults: channelDayDays * 2,
        }),
      ])) as [ReportsVideoData[], ReportsDayData[]];

      const reduceToChannelReports = (
        reports: (ReportsVideoData | ReportsDayData)[]
      ) => {
        return reports.reduce(
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
            views: 0,
            likes: 0,
            estimatedMinutesWatched: 0,
            subscribersGained: 0,
          } as Record<string, number>
        );
      };
      const reducedChannelDayReports = reduceToChannelReports(
        channelDayReports.slice(DEFAULT_DAYS)
      );
      const reducedTrendChannelDayReports = reduceToChannelReports(
        channelDayReports.slice(0, DEFAULT_DAYS)
      );
      const analyticsCardsData = reportToOverviewCardData(
        reducedChannelDayReports,
        reducedTrendChannelDayReports
      );

      setChannelDayReports(analyticsCardsData);

      const videoIds = channelVideoReports.map((r) => r.videoId.toString());
      let contentDetails: YoutubeContentDetails[] = [];
      try {
        contentDetails = await getContentDetails({
          videoIds,
        });
      } catch (error) {
        const message = buildErrorMessage(
          "Error fetching content details",
          error
        );
        throw new Error(message);
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
        commentCount: Number(contentDetail.statistics?.commentCount ?? 0),
        thumbnail: contentDetail.thumbnails.high.url,
        duration: formatIso8601Duration(
          contentDetail.contentDetails?.duration ?? "PT0S"
        ),
      })) as VideoReport[];

      setVideoReports(combined);
    } catch (error) {
      console.error("Error fetching reports: ", error);
      setChannelReportError(error as Error);
      setReportError(error as Error);
    }
  }, [accessToken, channelDayDays]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    videoReports,
    reportError,
    channelDayReports,
    channelReportError,
    setChannelDayDays,
    channelDayDays,
  };
};

export default useReports;
