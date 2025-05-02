import { shortNumber } from "@utils/utils";
import { useCallback, useEffect, useState } from "react";
import { getReports } from "@services/youtube/youtubeAnalytics";
import { getContentDetails } from "@/services/youtube/youtube";
import VideoOverviewSection, {
  type VideoReport,
} from "./sections/VideoOverviewSection";
import CardOverviewSection from "./sections/CardOverviewSection";
import { OverviewCardData } from "@components/Overview/types";
import useOAuth2Context from "@features/auth/hooks/useOAuth2Context";
import Spinner from "@/components/Spinner/Spinner";
import GenericError from "@/components/Error/GenericError";

const dashboardTitle = "Dashboard";
const overviewCardsData: OverviewCardData[] = [
  {
    id: 1,
    title: shortNumber(15000),
    description: "Subscribers",
    trend: 150,
    icon: "subscribers",
  },
  {
    id: 2,
    title: shortNumber(10000),
    description: "Views",
    trend: -5.5,
    icon: "views",
  },
  {
    id: 3,
    title: shortNumber(100000),
    description: "Likes",
    trend: 100,
    icon: "likes",
  },
];

const recentVideosTitle = "Recent Videos";
const mainOverviewTitle = "Channel Analytics";
const DashboardPage = () => {
  const { accessToken } = useOAuth2Context();
  const [videoReports, setVideoReports] = useState<VideoReport[] | null>(null);
  const [reportError, setReportError] = useState<Error | null>(null);
  const fetchReports = useCallback(async () => {
    if (!accessToken) return;

    try {
      const reports = await getReports({ accessToken, days: 7 });
      const videoIds = reports.map((r) => r.videoId.toString());
      const contentDetails = await getContentDetails({
        accessToken,
        videoIds,
      });

      const combined = contentDetails.map((contentDetail) => ({
        id: contentDetail.id,
        title: contentDetail.title,
        description: contentDetail.description,
        viewCount:
          reports.find((r) => r.videoId === contentDetail.id)?.views ?? 0,
        likeCount:
          reports.find((r) => r.videoId === contentDetail.id)?.likes ?? 0,
        commentCount: Number(contentDetail.statistics.commentCount),
        thumbnail: contentDetail.thumbnails.high.url,
      })) as VideoReport[];

      setVideoReports(combined);
    } catch (error) {
      console.error("Error fetching reports: ", error);
      setReportError(error as Error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <section className="flex flex-col gap-4">
      <CardOverviewSection
        overviewCardsData={overviewCardsData}
        title={mainOverviewTitle}
      />
      {accessToken && videoReports ? (
        <VideoOverviewSection
          videoReports={videoReports}
          accessToken={accessToken}
          title={recentVideosTitle}
        />
      ) : reportError ? (
        <GenericError
          title="Error loading reports"
          message={reportError.message}
        />
      ) : (
        <Spinner title="Loading Reports" message="Please wait..." />
      )}
    </section>
  );
};

export default DashboardPage;
