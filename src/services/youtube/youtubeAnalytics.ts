import { YOUTUBE_ANALYTICS_REPORTS } from "@/config";
import { getPastDate, getTodayDate } from "@utils/dateTime";
import { AnalyticsApiResponse } from "./youtubeAnalytics.types";

export const getReports = async ({ accessToken, days }: { accessToken: string, days: number }) => {
  const url = new URL(YOUTUBE_ANALYTICS_REPORTS);
  url.searchParams.append("ids", "channel==MINE");
  url.searchParams.append("dimensions", "video");
  url.searchParams.append("maxResults", "10");
  url.searchParams.append(
    "metrics",
    "estimatedMinutesWatched,views,likes,subscribersGained"
  );
  url.searchParams.append("sort", "-estimatedMinutesWatched");
  url.searchParams.append("startDate", getPastDate(days));
  url.searchParams.append("endDate", getTodayDate());

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error("Failed to get reports");
  const data = await response.json();
  const transformedData = transformReports(data);

  console.log("Reports = ", transformedData);
  return transformedData;
};

const transformReports = (data: any) => {
  const {
    rows,
    columnHeaders,
    kind,
  }: { rows: any[]; columnHeaders: any[]; kind: AnalyticsApiResponse } = data;
  if (kind !== "youtubeAnalytics#resultTable") throw new Error("Invalid data");

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
