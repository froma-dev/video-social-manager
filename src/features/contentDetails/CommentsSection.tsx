import { IconMessage } from "@tabler/icons-react";
import Button from "@components/Button/Button";
import { useState, useEffect } from "react";
import { CommentData } from "@services/youtube/youtube.types";
import { getCommentThreads } from "@services/youtube/youtube";
import Comment from "@components/Comment/Comment";
import { formatStringNumber } from "@utils/utils";
import CommentList from "@/components/Comment/CommentList";

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

  return <CommentList commentCount={commentCount} comments={comments} />;
};

export default CommentsSection;
