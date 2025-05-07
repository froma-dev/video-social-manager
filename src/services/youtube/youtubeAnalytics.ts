import { YOUTUBE_ANALYTICS_REPORTS } from "@/config";
import { getPastDate, getTodayDate } from "@utils/dateTime";
import { AnalyticsApiResponse } from "./youtubeAnalytics.types";

type REPORTS_ID = "channel==MINE";
type REPORTS_DIMENSIONS = "video" | "day";
type REPORTS_METRICS =
  | "estimatedMinutesWatched"
  | "views"
  | "likes"
  | "subscribersGained"
  | "averageViewDuration"
  | "averageViewPercentage";
type REPORTS_SORT = "-estimatedMinutesWatched" | "day";
interface GetReportsProps {
  accessToken: string;
  days: number;
  ids?: keyof typeof REPORTS_IDS;
  dimensions?: keyof typeof REPORTS_DIMENSIONS;
  metrics?: string[];
  sort?: keyof typeof REPORTS_SORT;
  maxResults?: number;
}
const REPORTS_IDS: Record<string, REPORTS_ID> = {
  channel: "channel==MINE",
};
const REPORTS_DIMENSIONS: Record<string, REPORTS_DIMENSIONS> = {
  video: "video",
  day: "day",
};
const REPORTS_METRICS: Record<string, REPORTS_METRICS> = {
  estimatedMinutesWatched: "estimatedMinutesWatched",
  views: "views",
  likes: "likes",
  subscribersGained: "subscribersGained",
  averageViewDuration: "averageViewDuration",
  averageViewPercentage: "averageViewPercentage",
};
const REPORTS_SORT: Record<string, REPORTS_SORT> = {
  estimatedMinutesWatched: "-estimatedMinutesWatched",
  day: "day",
};
const parseGoogleErrorMessage = (errorData: any) => {
  const { message } = errorData.error;
  return { message };
};
export const getReports = async ({
  accessToken,
  days,
  ids,
  dimensions,
  metrics,
  sort,
  maxResults,
}: GetReportsProps) => {
  const url = new URL(YOUTUBE_ANALYTICS_REPORTS);
  url.searchParams.append(
    "ids",
    (ids && REPORTS_IDS[ids]) ?? REPORTS_IDS.channel
  );
  url.searchParams.append(
    "dimensions",
    (dimensions && REPORTS_DIMENSIONS[dimensions]) ?? REPORTS_DIMENSIONS.video
  );
  url.searchParams.append(
    "maxResults",
    maxResults && maxResults >= 1 ? maxResults.toString() : "10"
  );
  url.searchParams.append(
    "metrics",
    metrics?.join(",") ??
      "estimatedMinutesWatched,views,likes,subscribersGained"
  );
  url.searchParams.append(
    "sort",
    (sort && REPORTS_SORT[sort]) ?? REPORTS_SORT.estimatedMinutesWatched
  );
  url.searchParams.append("startDate", getPastDate(days));
  url.searchParams.append("endDate", getTodayDate());

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const { message } = parseGoogleErrorMessage(await response.json());
      throw new Error(message);
    }
    const data = await response.json();
    const transformedData = transformReports(data, ids ?? "video");

    return transformedData;
  } catch (err) {
    throw new Error(`Failed to get reports: ${err}`);
  }
};

const transformReports = (data: any, keyId: string) => {
  const {
    rows,
    columnHeaders,
    kind,
  }: { rows: any[]; columnHeaders: any[]; kind: AnalyticsApiResponse } = data;
  if (kind !== "youtubeAnalytics#resultTable") return new Error("Invalid data");

  return rows.map((row: any) => {
    const report: Record<string, number | string> = {};

    columnHeaders.forEach((header, index) => {
      let key: string = header.name;
      if (key === "video") key = "videoId";
      const value: number | string = row[index];
      report[key] = value;
    });

    return report;
  });
};
