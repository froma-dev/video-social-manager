import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { IconEye } from "@tabler/icons-react";
import { IconThumbUp } from "@tabler/icons-react";
import { IconMessage } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Pill from "../Pill/Pill";
import Button from "../Button/Button";
import {
  type ContentDetails,
  type CommentData,
} from "../../services/youtube/youtube.types";
import { formatStringNumber } from "../../utils/utils";
import { useState, useEffect } from "react";
import { getCommentThreads } from "../../services/youtube/youtube";
import Comment from "../Comment/Comment";

const VideoStatisticsInline = ({
  contentDetails,
}: {
  contentDetails: ContentDetails;
}) => {
  const { id, title, statistics } = contentDetails;
  const { viewCount, likeCount, commentCount, favoriteCount } = statistics;
  const [comments, setComments] = useState<CommentData[]>([]);
  const [showComments, setShowComments] = useState(true);
  const formattedViewCount = formatStringNumber(viewCount);
  const formattedLikeCount = formatStringNumber(likeCount.toString());
  const formattedCommentCount = formatStringNumber(commentCount);
  const formattedFavoriteCount = formatStringNumber(favoriteCount);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentThreads({
          videoId: id,
          accessToken: "",
        });
        setComments(fetchedComments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, [id]);

  return (
    <div className="flex flex-col gap-[10px]">
      <LiteYouTubeEmbed id={id} title={title} />
      <div className="flex flex-row justify-center gap-2">
        <Pill>
          <IconEye />
          <span>Views </span>
          <span>{formattedViewCount}</span>
        </Pill>
        <Pill>
          <IconThumbUp />
          <span>Likes </span>
          <span>{formattedLikeCount}</span>
        </Pill>
        <Pill>
          <IconMessage />
          <span>Comments </span>
          <span>{formattedCommentCount}</span>
        </Pill>
        <Pill>
          <IconHeart />
          <span>Favorites </span>
          <span>{formattedFavoriteCount}</span>
        </Pill>
      </div>
      <Button
        className="self-start font-medium text-gray-900 hover:bg-gray-200 hover:scale-102 transition-transform"
        onClick={() => setShowComments(!showComments)}
      >
        <IconMessage />
        {showComments ? "Hide comments" : "Show comments"}
      </Button>
      {comments.length > 0 ? (
        <div
          className={`flex flex-col gap-[10px] px-[24px] ${
            showComments ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold text-left">
            {`${formattedCommentCount} comments`}
          </h2>
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default VideoStatisticsInline;
