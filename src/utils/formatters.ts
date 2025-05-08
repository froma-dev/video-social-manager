import { type OverviewCardData } from "@components/Overview/types";
import { calculateTrend, shortNumber } from "./utils";
import { VideoAsset } from "@services/youtube/youtube.types";
import { type AssetProps } from "@components/Asset/Asset";

const reportsDescriptionMap: Record<string, string> = {
  views: "Views",
  likes: "Likes",
  estimatedMinutesWatched: "Minutes Watched",
  subscribersGained: "Subscribers Gained",
};

export const reportToOverviewCardData = (
  report: Record<string, number>,
  compareReport: Record<string, number>
) => {
  const analyticsCardsData: OverviewCardData[] = [];

  for (const key in report) {
    const trend = calculateTrend(report[key], compareReport[key]);
    analyticsCardsData.push({
      id: key,
      title: shortNumber(report[key]),
      description: reportsDescriptionMap[key],
      trend: trend,
      icon: key,
    });
  }

  return analyticsCardsData;
};

export const searchResultToAsset = (result: VideoAsset) => {
  return {
    id: result.id,
    title: result.title,
    subtitle: result.channelTitle,
    image: result.thumbnails.high.url,
  } as AssetProps;
};
