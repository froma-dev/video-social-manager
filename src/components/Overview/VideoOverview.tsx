import { VideoReport } from "@components/Overview/types";
import { StatTagProps } from "@components/StatTag/StatTag";
import { IconInfoCircle, IconMessage } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Button from "@components/Button/Button";
import { shortNumber } from "@utils/utils";
import CommentList from "@components/Comment/CommentList";
import { useMemo, useState } from "react";
import { CommentData } from "@services/youtube/youtube.types";
import StatTagList from "../StatTag/StatTagList";
import { getCommentThreads } from "@/services/youtube/youtube";

interface VideoOverviewProps {
  video: VideoReport;
  accessToken: string;
}
const VideoOverview = ({ video, accessToken }: VideoOverviewProps) => {
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
          accessToken: accessToken,
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
    <section className="bg-zinc-950 hover:bg-zinc-800 p-2 transition-colors rounded-xl mx-auto w-full max-w-screen-2xl group">
      <Link to={`/details/${video.id}`}>
        <div className="flex flex-col sm:items-center md:flex-row h-full gap-4">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="object-cover aspect-[16/9] transition-transform rounded-xl max-w-120 max-h-80 group-hover:scale-105"
          />
          <div className="h-full flex flex-col gap-2 justify-center p-2">
            <h2 className="mb-4 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              {video.title}
            </h2>
            {/*video.description && (
            <div className="description-box overflow-hidden border border-zinc-700 rounded-xl">
              <p className="font-light text-gray-500 px-5 py-4 md:text-lg overflow-y-scroll dark:text-gray-400 max-h-30">
                {video.description}
              </p>
            </div>
          )*/}
            <StatTagList statTagListData={statTagListData} />
          </div>
        </div>
      </Link>
    </section>
  );
};

export default VideoOverview;
export type { VideoReport };
