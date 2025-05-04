import VideoOverviewSection from "./sections/VideoOverviewSection";
import CardOverviewSection from "./sections/CardOverviewSection";
import Spinner from "@/components/Spinner/Spinner";
import GenericError from "@/components/Error/GenericError";
import useReports from "./hooks/useReports";

const recentVideosTitle = "Recent Videos";
const mainOverviewTitle = "Channel Analytics";
const DashboardPage = () => {
  const { videoReports, channelDayReports, reportError, channelReportError } =
    useReports();

  return (
    <section className="flex flex-col gap-4">
      {channelDayReports ? (
        <CardOverviewSection
          overviewCardsData={channelDayReports}
          title={mainOverviewTitle}
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
