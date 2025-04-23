import VideoOverviewList, {
  type VideoReport,
} from "@components/Overview/VideoOverviewList";

const VideoOverviewSection = ({
  videoReports,
  accessToken,
  title,
}: {
  videoReports: VideoReport[];
  accessToken: string;
  title: string;
}) => {
  return (
    <section className="flex gap-4 flex-col">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {videoReports &&
        (videoReports.length > 0 ? (
          <VideoOverviewList
            videoReports={videoReports}
            accessToken={accessToken}
          />
        ) : (
          <p className="text-zinc-300">No recent videos</p>
        ))}
    </section>
  );
};

export default VideoOverviewSection;
export type { VideoReport };
