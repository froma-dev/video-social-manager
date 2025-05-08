import { useState, useEffect } from "react";
import { CommentData } from "@services/youtube/youtube.types";
import { getCommentThreads } from "@services/youtube/youtube";
import CommentList from "@/components/Comment/CommentList";

interface CommentsSectionProps {
  id: string;
  commentCount: string;
}

const CommentsSection = ({ id, commentCount }: CommentsSectionProps) => {
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentThreads({
          videoId: id,
        });
        setComments(fetchedComments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, [id]);

  return <CommentList commentCount={commentCount} comments={comments} />;
};

export default CommentsSection;
