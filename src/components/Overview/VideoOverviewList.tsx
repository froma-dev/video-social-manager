import VideoOverview, {
  type VideoReport,
} from "@components/Overview/VideoOverview";

const VideoOverviewList = ({
  videoReports,
}: {
  videoReports: VideoReport[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videoReports.map((video) => (
        <VideoOverview key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoOverviewList;
export type { VideoReport };
