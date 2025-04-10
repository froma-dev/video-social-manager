import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";

interface CommentProps {
  author: string;
  authorImageUrl: string;
  publishedAt: string;
  comment: string;
  likes: number;
  replies: number;
}

const Comment = ({
  author,
  authorImageUrl,
  publishedAt,
  comment,
  likes,
  replies,
}: CommentProps) => {
  return (
    <section>
      <div className="user border border-gray-300 rounded-full">
        <img src={authorImageUrl} alt={author} />
      </div>
      <div className="comment flex flex-col">
        <div className="comment__header flex">
          <h3>{author}</h3>
          <p>{publishedAt}</p>
        </div>
        <p>{comment}</p>
        <div className="comment__footer flex">
          <span>
            <IconThumbUp /> {likes}
          </span>
          <span>
            <IconThumbDown />
          </span>
          <span>{replies}</span>
        </div>
      </div>
    </section>
  );
};

export default Comment;
