import { shortNumber } from "@utils/utils";
import { useEffect, useState } from "react";
import { getReports } from "@services/youtube/youtubeAnalytics";
import { getContentDetails } from "@/services/youtube/youtube";
import VideoOverviewSection, {
  type VideoReport,
} from "./sections/VideoOverviewSection";
import CardOverviewSection from "./sections/CardOverviewSection";
import { OverviewCardData } from "@components/Overview/types";
import useOAuth2Context from "@features/auth/hooks/useOAuth2Context";

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
  useEffect(() => {
    if (!accessToken) return;

    getReports({ accessToken, days: 7 }).then((reports) => {
      const videoIds = reports.map((r) => r.videoId.toString());

      getContentDetails({
        accessToken,
        videoIds,
      }).then((contentDetails) => {
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
      });
    });
  }, [accessToken]);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-white">{dashboardTitle}</h1>
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
      ) : (
        <div>Loading Reports...</div>
      )}
    </section>
  );
};

export default DashboardPage;
