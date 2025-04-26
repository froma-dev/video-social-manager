import { CommentData } from "@services/youtube/youtube.types";
import Comment from "@components/Comment/Comment";
import { formatStringNumber } from "@utils/utils";

interface CommentListProps {
  commentCount: string;
  comments: CommentData[];
}

const CommentList = ({ commentCount, comments }: CommentListProps) => {
  const formattedCommentCount = formatStringNumber(commentCount.toString());

  return (
    <section className="comments-section flex flex-col gap-[10px]">
      {comments.length > 0 ? (
        <div className={`flex flex-col gap-[10px] px-[24px]`}>
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
