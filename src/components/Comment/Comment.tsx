import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import DOMPurify from "dompurify";
import { formatLongDate } from "../../utils/dateTime";
import Button from "../Button/Button";

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

  return (
    <section className="flex gap-[10px] items-start p-6 rounded-2xl bg-gray-900">
      <div className="user w-[52px] h-[52px] border-2 border-gray-300 color rounded-full overflow-hidden shrink-0">
        <img
          className="w-full h-full object-cover"
          src={authorImageUrl}
          alt={author}
          onError={(e) => (e.currentTarget.src = "/mood-smile.svg")}
        />
      </div>
      <div className="comment flex flex-col px-[10px] gap-1.5">
        <div className="comment__header flex gap-2 text-sm">
          <h3 className="font-bold text-gray-300">{author}</h3>
          <p className="text-gray-400 italic">
            {formatLongDate(publishedAt).formattedDate}
          </p>
        </div>
        <p
          className="comment__text text-left text-lg"
          dangerouslySetInnerHTML={{ __html: sanitizedHtmlComment }}
        ></p>
        <div className="comment__footer flex gap-2 mt-1">
          <span className="flex gap-1 items-center text-gray-200">
            <Button type="rate">
              <IconThumbUp size={28} stroke={1} />
            </Button>
            <span className="text-sm">{likes}</span>
          </span>
          <span className="flex gap-1 items-center text-gray-200">
            <Button type="rate">
              <IconThumbDown size={28} stroke={1} />
            </Button>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Comment;
export type { CommentProps };
