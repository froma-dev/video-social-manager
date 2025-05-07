import VideoOverviewSection from "./sections/VideoOverviewSection";
import CardOverviewSection from "./sections/CardOverviewSection";
import Spinner from "@/components/Spinner/Spinner";
import GenericError from "@/components/Error/GenericError";
import useReports from "./hooks/useReports";
import { type FilterData } from "@components/Filter/FilterList";

const recentVideosTitle = "Recent Videos";
const mainOverviewTitle = "Channel Analytics";
const DashboardPage = () => {
  const {
    videoReports,
    channelDayReports,
    reportError,
    channelReportError,
    setChannelDayDays,
    channelDayDays,
  } = useReports();
  const filters: FilterData[] = [
    { text: "7 days", filter: 7 },
    { text: "14 days", filter: 14 },
    { text: "30 days", filter: 30 },
  ];
  const onFilterChange = (filter: string | number) => {
    setChannelDayDays(Number(filter));
  };

  return (
    <section className="flex flex-col gap-4">
      {channelDayReports ? (
        <CardOverviewSection
          onFilterChange={onFilterChange}
          overviewCardsData={channelDayReports}
          title={mainOverviewTitle}
          filterList={filters}
          selectedFilter={channelDayDays}
        />
      ) : channelReportError ? (
        <GenericError
          title="Error loading reports"
          message={channelReportError.message}
        />
      ) : (
        <Spinner title="Loading Reports" message="Please wait..." />
      )}
      {videoReports ? (
        <VideoOverviewSection
          videoReports={videoReports}
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
