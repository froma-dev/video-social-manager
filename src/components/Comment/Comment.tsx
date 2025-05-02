import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import DOMPurify from "dompurify";
import { formatLongDate } from "@utils/dateTime";
import RateButton from "./RateButton";
import ProfilePicture from "@components/ProfilePicture/ProfilePicture";

const { sanitize } = DOMPurify;
interface CommentProps {
  author: string;
  authorImageUrl: string;
  publishedAt: string;
  comment: string;
  likes: number;
}

const Comment = ({
  author,
  authorImageUrl,
  publishedAt,
  comment,
  likes,
}: CommentProps) => {
  const sanitizedHtmlComment = sanitize(comment);

  const handleLike = (type: "like" | "dislike") => {
    /*     if (type === 'like') {
      
    } else if (type === 'dislike') {
      
    } */
  };

  return (
    <section className="flex gap-[10px] items-start p-6 rounded-2xl bg-zinc-900">
      <ProfilePicture
        imageUrl={authorImageUrl}
        alt={author}
        className="w-[52px] h-[52px] shrink-0"
      />
      <div className="comment flex flex-col px-[10px] gap-1.5">
        <div className="comment__header flex text-sm flex-col sm:flex-row sm:gap-2">
          <h3 className="font-bold text-zinc-300">{author}</h3>
          <p className="text-zinc-400 italic">
            {formatLongDate(publishedAt).formattedDate}
          </p>
        </div>
        <p
          className="comment__text text-left text-lg"
          dangerouslySetInnerHTML={{ __html: sanitizedHtmlComment }}
        ></p>
        <div className="comment__footer flex gap-2 mt-1">
          <span className="flex gap-1 items-center text-zinc-200">
            <RateButton onClick={() => handleLike("like")}>
              <IconThumbUp size={28} stroke={1} />
            </RateButton>
            <span className="text-sm">{likes}</span>
          </span>
          <span className="flex gap-1 items-center text-zinc-200">
            <RateButton onClick={() => handleLike("dislike")}>
              <IconThumbDown size={28} stroke={1} />
            </RateButton>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Comment;
export type { CommentProps };
