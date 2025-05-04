import { VideoReport } from "@components/Overview/types";
import { StatTagProps } from "@components/StatTag/StatTag";
import { IconPacman } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { shortNumber } from "@utils/utils";
import { useMemo, useState } from "react";
import { CommentData } from "@services/youtube/youtube.types";
import StatTagList from "../StatTag/StatTagList";
import { getCommentThreads } from "@/services/youtube/youtube";

interface VideoOverviewProps {
  video: VideoReport;
}
const VideoOverview = ({ video }: VideoOverviewProps) => {
  const [comments, setComments] = useState<CommentData[] | null>(null);
  const [showComments, setShowComments] = useState(false);

  const showCommentsList = showComments && comments;
  const statTagListData: StatTagProps[] = useMemo(
    () => [
      {
        id: "viewCount",
        icon: "viewCount",
        labelText: shortNumber(Number(video.viewCount)),
      },
      {
        id: "likeCount",
        icon: "likeCount",
        labelText: shortNumber(Number(video.likeCount)),
      },
      {
        id: "commentCount",
        icon: "commentCount",
        labelText: shortNumber(Number(video.commentCount)),
      },
    ],
    [video]
  );
  const handleShowComments = () => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentThreads({
          videoId: video.id,
        });
        setComments(fetchedComments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    if (!comments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  return (
    <section className="hover:bg-zinc-900 hover:scale-101 p-2 transition-all duration-400 rounded-xl max-w-screen-2xl group">
      <Link to={`/details/${video.id}`}>
        <div className="flex flex-col items-center h-full gap-4">
          <div className="relative overflow-hidden w-full">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="object-cover h-full w-full aspect-video transition-transform rounded-xl"
            />
            <div className="absolute inset-0 transition-all duration-500 group-hover:bg-gray-950/20 bg-[linear-gradient(to_right_top,rgba(0,0,0,0.8),rgba(0,0,0,0.3),transparent)] flex items-end p-4 rounded-xl">
              <div className="">
                <StatTagList statTagListData={statTagListData} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center p-4">
            <h2 className="flex flex-col h-20 text-xl sm:text-md md:text-lg lg:text-md sm:text-center md:text-left lg:text-left tracking-tight font-extrabold text-gray-900 dark:text-white overflow-hidden text-ellipsis line-clamp-3">
              {video.title}
            </h2>
            {/*video.description && (
            <div className="description-box overflow-hidden border border-zinc-700 rounded-xl">
              <p className="font-light text-gray-500 px-5 py-4 md:text-lg overflow-y-scroll dark:text-gray-400 max-h-30">
                {video.description}
              </p>
            </div>
          )*/}
          </div>
        </div>
      </Link>
    </section>
  );
};

export default VideoOverview;
export type { VideoReport };
