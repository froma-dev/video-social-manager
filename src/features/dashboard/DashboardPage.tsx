import {
  IconEye,
  IconHeart,
  IconMessage,
  IconInfoCircle,
} from "@tabler/icons-react";
import OverviewCard from "./OverviewCard";
import { shortNumber } from "@/utils/utils";
import StatTag from "@/components/StatTag/StatTag";
import Button from "@/components/Button/Button";
import CommentsSection from "../contentDetails/CommentsSection";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReports } from "@/services/youtube/youtubeAnalytics";
import { getContentDetails } from "@/services/youtube/youtube";
import { ContentDetails } from "@/services/youtube/youtube.types";

interface OverviewCardData {
  id: number;
  title: string;
  description: string;
  trend: number;
}
const dashboardTitle = "Channel Overview";
const overviewCardsData: OverviewCardData[] = [
  {
    id: 1,
    title: shortNumber(15000),
    description: "Subscribers",
    trend: 150,
  },
  {
    id: 2,
    title: shortNumber(10000),
    description: "Total views",
    trend: -5.5,
  },
  {
    id: 3,
    title: shortNumber(100000),
    description: "Total likes",
    trend: 100,
  },
];

interface VideoReport {
  id: string;
  title: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnail: string;
}

const recentVideosTitle = "Recent Videos";
const DashboardPage = ({ accessToken }: { accessToken: string }) => {
  const [contentDetails, setContentDetails] = useState<VideoReport[]>([]);
  useEffect(() => {
    getReports({ accessToken, days: 7 }).then((reports) => {
      console.log("Final Reports = ", reports);
      getContentDetails({
        accessToken,
        videoIds: reports.map((r) => r.videoId.toString()),
      }).then((contentDetails) => {
        console.log("Final Content Details = ", contentDetails);
        const combined = contentDetails.map((contentDetail) => ({
          id: contentDetail.id,
          title: contentDetail.title,
          viewCount:
            reports.find((r) => r.videoId === contentDetail.id)?.viewCount ?? 0,
          likeCount:
            reports.find((r) => r.videoId === contentDetail.id)?.likeCount ?? 0,
          commentCount:
            reports.find((r) => r.videoId === contentDetail.id)?.commentCount ??
            0,
          thumbnail: contentDetail.thumbnails.high.url,
        })) as VideoReport[];

        setContentDetails(combined);

        /* const details = {
            id: contentDetail.id,
            title: contentDetail.title,
            views: reports[0].viewCount,
            likes: reports[0].likeCount,
            comments: reports[0].commentCount,
            thumbnail: contentDetails.thumbnails.high.url,
          } */
      });
    });
  }, [accessToken]);

  return (
    <section className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-white">{dashboardTitle}</h1>
        <div className="flex gap-4">
          {overviewCardsData.map((card) => (
            <OverviewCard
              key={card.id}
              title={card.title}
              description={card.description}
              trend={card.trend}
              className={`basis-1/${overviewCardsData.length}`}
            />
          ))}
        </div>
      </section>
      <section className="flex gap-4 flex-col">
        <h1 className="text-2xl font-bold text-white">{recentVideosTitle}</h1>
        <div className="flex gap-4 flex-col">
          {contentDetails.length > 0 &&
            contentDetails.map((video) => (
              <div
                key={video.id}
                className="flex gap-2 max-h-52 overflow-hidden"
              >
                <div className="thumbnail flex-1/12 flex justify-center grow-1 h-full w-full">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="object-cover h-full aspect-[4/3]"
                  />
                </div>
                <div className="metadata flex flex-1/3 flex-col gap-2">
                  <h2 className="text-lg font-bold text-white">
                    {video.title}
                  </h2>
                  <div className="statistics flex gap-2">
                    <StatTag
                      label={{
                        text: shortNumber(Number(video.viewCount)),
                        className: "text-zinc-300 text-md",
                      }}
                      icon={{
                        className: "text-zinc-500",
                        IconComponent: IconEye,
                      }}
                    />
                    <StatTag
                      label={{
                        text: shortNumber(Number(video.likeCount)),
                        className: "text-zinc-300 text-md",
                      }}
                      icon={{
                        className: "text-zinc-500",
                        IconComponent: IconHeart,
                      }}
                    />
                    <StatTag
                      label={{
                        text: shortNumber(Number(video.commentCount)),
                        className: "text-zinc-300 text-md",
                      }}
                      icon={{
                        className: "text-zinc-500",
                        IconComponent: IconMessage,
                      }}
                    />
                  </div>
                  <Link to={`/details/${video.id}`}>
                    <Button>
                      <IconInfoCircle className="" />
                      <span>Watch</span>
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-col gap-2 flex-1/3 overflow-scroll">
                  <CommentsSection
                    id={video.id}
                    accessToken={accessToken}
                    commentCount={video.commentCount.toString()}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>
    </section>
  );
};

export default DashboardPage;
