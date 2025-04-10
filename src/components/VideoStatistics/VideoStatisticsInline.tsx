import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { IconEye } from "@tabler/icons-react";
import { IconThumbUp } from "@tabler/icons-react";
import { IconMessage } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Pill from "../Pill/Pill";
import Button from "../Button/Button";
import { type ContentDetails } from "../../services/youtube/youtube.types";
import { formatStringNumber } from "../../utils/utils";

const VideoStatisticsInline = ({
  contentDetails,
}: {
  contentDetails: ContentDetails;
}) => {
  const { id, title, statistics } = contentDetails;
  const { viewCount, likeCount, commentCount, favoriteCount } = statistics;
  const formattedViewCount = formatStringNumber(viewCount);
  const formattedLikeCount = formatStringNumber(likeCount);
  const formattedCommentCount = formatStringNumber(commentCount);
  const formattedFavoriteCount = formatStringNumber(favoriteCount);

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
      <Button className="self-start font-medium text-gray-900 hover:bg-gray-200 hover:scale-102 transition-transform">
        <IconMessage />
        Load comments
      </Button>
    </div>
  );
};

export default VideoStatisticsInline;
