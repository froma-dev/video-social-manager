import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { IconEye } from "@tabler/icons-react";
import { IconThumbUp } from "@tabler/icons-react";
import { IconMessage } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Pill from "@components/Pill/Pill";
import {
  YoutubeRating,
  type ContentDetails,
} from "@services/youtube/youtube.types";
import { formatStringNumber } from "@utils/utils";
import { getContentDetails, rateVideo } from "@services/youtube/youtube";
import { useState } from "react";
import { shortNumber } from "@utils/utils";

interface VideoStatisticsInlineProps {
  contentDetails: ContentDetails;
  setContentDetails: (contentDetails: ContentDetails | null) => void;
  accessToken: string;
}

type Ratings = YoutubeRating;

const VideoStatisticsInline = ({
  contentDetails,
  setContentDetails,
  accessToken,
}: VideoStatisticsInlineProps) => {
  const { id, title, statistics } = contentDetails;
  const { viewCount, likeCount, commentCount, favoriteCount } = statistics;
  const formattedViewCount = formatStringNumber(viewCount);
  const formattedLikeCount = shortNumber(likeCount);
  const formattedCommentCount = shortNumber(Number(commentCount));
  const formattedFavoriteCount = shortNumber(Number(favoriteCount));
  const [rating, setRating] = useState<Ratings>("none");

  const handleRateClick = async (rating: Ratings) => {
    try {
      const isVideoRated = await rateVideo({
        videoId: id,
        accessToken,
        rating,
      });
      if (!isVideoRated) {
        return;
      }
      setRating(rating);
      const updatedContentDetails = await getContentDetails({
        videoId: id,
        accessToken,
      });
      setContentDetails(updatedContentDetails);
    } catch (error) {
      console.error("Failed to rate video:", error);
    }
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <LiteYouTubeEmbed id={id} title={title} />
      <div className="statistics flex flex-row justify-center gap-2 m-4">
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
    </div>
  );
};

export default VideoStatisticsInline;
