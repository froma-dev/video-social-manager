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
    <div key={video.id} className="flex gap-2 max-h-52 overflow-hidden">
      <div className="thumbnail flex-1/12 flex justify-center grow-1 h-full w-full">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="object-cover h-full aspect-[4/3]"
        />
      </div>
      <div className="metadata flex flex-1/3 flex-col gap-2">
        <h2 className="text-lg font-bold text-white">{video.title}</h2>
        <StatTagList statTagListData={statTagListData}></StatTagList>

        <Link to={`/details/${video.id}`}>
          <Button>
            <IconInfoCircle />
            <span>More info</span>
          </Button>
        </Link>

        <div className="comments-section flex flex-col gap-2 flex-1/3 overflow-scroll">
          <Button onClick={handleShowComments}>
            <IconMessage />
            <span>{showComments ? "Hide comments" : "Show comments"}</span>
          </Button>
          {showCommentsList && (
            <CommentList
              id={video.id}
              accessToken={accessToken}
              commentCount={video.commentCount.toString()}
              comments={comments}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoOverview;
export type { VideoReport };
