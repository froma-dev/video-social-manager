import VideoOverviewList, {
  type VideoReport,
} from "@components/Overview/VideoOverviewList";

const VideoOverviewSection = ({
  videoReports,
  title,
}: {
  videoReports: VideoReport[];
  title: string;
}) => {
  return (
    <section className="flex gap-4 flex-col">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {videoReports &&
        (videoReports.length > 0 ? (
          <VideoOverviewList videoReports={videoReports} />
        ) : (
          <p className="text-zinc-300">No recent videos</p>
        ))}
    </section>
  );
};

export default VideoOverviewSection;
export type { VideoReport };
