import { IconMessage } from "@tabler/icons-react";
import Button from "@components/Button/Button";
import { useState, useEffect } from "react";
import { CommentData } from "@services/youtube/youtube.types";
import { getCommentThreads } from "@services/youtube/youtube";
import Comment from "@components/Comment/Comment";
import { formatStringNumber } from "@utils/utils";

interface CommentsSectionProps {
  id: string;
  accessToken: string;
  commentCount: string;
}

const CommentsSection = ({
  id,
  accessToken,
  commentCount,
}: CommentsSectionProps) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [showComments, setShowComments] = useState(true);
  const formattedCommentCount = formatStringNumber(commentCount.toString());

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
    <section className="comments-section flex flex-col gap-[10px]">
      <Button
        className="self-start font-medium text-zinc-900 hover:bg-zinc-200 hover:scale-102 transition-transform"
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
    </section>
  );
};

export default CommentsSection;
