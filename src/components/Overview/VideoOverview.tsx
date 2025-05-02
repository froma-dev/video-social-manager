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
    <section className="hover:bg-zinc-800 p-2 transition-colors rounded-xl max-w-screen-2xl group">
      <Link to={`/details/${video.id}`}>
        <div className="flex flex-col items-center h-full gap-4">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="object-cover h-full w-full aspect-video transition-transform rounded-xl"
          />
          <StatTagList statTagListData={statTagListData} />
          <div className="flex flex-col gap-2 justify-center">
            <h2 className="mb-4 h-20 text-xl sm:text-md md:text-lg lg:text-md sm:text-center md:text-left lg:text-left tracking-tight font-extrabold text-gray-900 dark:text-white overflow-hidden text-ellipsis line-clamp-3">
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
