import { YOUTUBE_ANALYTICS_REPORTS } from "@/config";
import { getPastDate, getTodayDate } from "@utils/dateTime";
import { ReportsData } from "./youtubeAnalytics.types";

type REPORTS_ID = "channel==MINE";
type REPORTS_DIMENSIONS = "video" | "day";
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
interface ErrorReportData {
  error: {
    message: string;
  };
}
const REPORTS_IDS: Record<string, REPORTS_ID> = {
  channel: "channel==MINE",
};
const REPORTS_DIMENSIONS: Record<string, REPORTS_DIMENSIONS> = {
  video: "video",
  day: "day",
};
const REPORTS_SORT: Record<string, REPORTS_SORT> = {
  estimatedMinutesWatched: "-estimatedMinutesWatched",
  day: "day",
};
const parseGoogleErrorMessage = (errorData: ErrorReportData) => {
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
    const transformedData = transformReports(
      data,
      dimensions && REPORTS_DIMENSIONS[dimensions]
        ? REPORTS_DIMENSIONS[dimensions]
        : REPORTS_DIMENSIONS.video
    );

    return transformedData;
  } catch (err) {
    return new Error(`Failed to get reports: ${err}`);
  }
};

interface ReportData {
  views: number;
  likes: number;
  estimatedMinutesWatched: number;
  subscribersGained: number;
}

export interface ReportsVideoData extends ReportData {
  videoId: string;
}

export interface ReportsDayData extends ReportData {
  day: string;
}

export const transformReports = (
  data: ReportsData,
  dimension: REPORTS_DIMENSIONS
) => {
  const { rows, kind }: ReportsData = data;
  if (kind !== "youtubeAnalytics#resultTable") return new Error("Invalid data");

  return rows.map((row) => {
    const [id, views, likes, estimatedMinutesWatched, subscribersGained] = row;
    const commonReportData = {
      views: Number(views),
      likes: Number(likes),
      estimatedMinutesWatched: Number(estimatedMinutesWatched),
      subscribersGained: Number(subscribersGained),
    };
    const report: ReportsVideoData | ReportsDayData =
      dimension === REPORTS_DIMENSIONS.video
        ? { videoId: id, ...commonReportData }
        : { day: id, ...commonReportData };

    return report;
  });
};
