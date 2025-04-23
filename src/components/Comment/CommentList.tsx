import { IconMessage } from "@tabler/icons-react";
import Button from "@components/Button/Button";
import { useState, useEffect } from "react";
import { CommentData } from "@services/youtube/youtube.types";
import { getCommentThreads } from "@services/youtube/youtube";
import Comment from "@components/Comment/Comment";
import { formatStringNumber } from "@utils/utils";

interface CommentListProps {
  id: string;
  accessToken: string;
  commentCount: string;
  comments: CommentData[];
}

const CommentList = ({
  id,
  accessToken,
  commentCount,
  comments,
}: CommentListProps) => {
  const formattedCommentCount = formatStringNumber(commentCount.toString());

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentThreads({
          videoId: id,
          accessToken: accessToken,
        });
        setComments(fetchedComments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, [id, accessToken]);

  return (
    <section className="comments-section flex flex-col gap-[10px]">
      {comments.length > 0 ? (
        <div
          className={`flex flex-col gap-[10px] px-[24px]`}
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

export default CommentList;
