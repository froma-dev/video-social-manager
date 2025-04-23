import VideoOverview, {
  type VideoReport,
} from "@components/Overview/VideoOverview";

const VideoOverviewList = ({
  videoReports,
  accessToken,
}: {
  videoReports: VideoReport[];
  accessToken: string;
}) => {
  return (
    <div className="flex gap-4 flex-col">
      {videoReports.map((video) => (
        <VideoOverview key={video.id} video={video} accessToken={accessToken} />
      ))}
    </div>
  );
};

export default VideoOverviewList;
export type { VideoReport };
