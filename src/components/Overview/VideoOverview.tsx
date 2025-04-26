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
  /*   return (
    <div key={video.id} className="flex gap-2 max-h-52 overflow-hidden">
      <div className="metadata flex flex-1/3 flex-col gap-2">

        <div className="comments-section flex flex-col gap-2 flex-1/3 overflow-scroll">
          <Button onClick={handleShowComments}>
            <IconMessage />
            <span>{showComments ? "Hide comments" : "Show comments"}</span>
          </Button>
          {showCommentsList && (
            <CommentList
              commentCount={video.commentCount.toString()}
              comments={comments}
            />
          )}
        </div>
      </div>
    </div>
  ); */

  return (
    <section className="bg-zinc-950 border-zinc-700 border rounded-xl">
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="object-cover w-full aspect-[4/3] rounded-xl"
        />

        <div className="mt-4 md:mt-0 flex flex-col gap-2">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {video.title}
          </h2>
          {video.description && (
            <div className="description-box overflow-hidden border border-zinc-700 rounded-xl">
              <p className="font-light text-gray-500 md:text-lg p-4 overflow-y-scroll dark:text-gray-400 max-h-30">
                {video.description}
              </p>
            </div>
          )}
          <StatTagList statTagListData={statTagListData}></StatTagList>
          <Link to={`/details/${video.id}`}>
            <Button>
              <IconInfoCircle />
              <span>More info</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoOverview;
export type { VideoReport };
