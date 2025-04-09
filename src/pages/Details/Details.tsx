import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "./Details.css";
import { getContentDetails } from "../../services/youtube/youtube";
import { ContentDetails } from "../../services/youtube/youtube.types";
import { formatStringNumber } from "../../utils/utils";

const Details = ({ accessToken }: { accessToken: string }) => {
  const { videoId = "" } = useParams();
  const [contentDetails, setContentDetails] = useState<ContentDetails | null>(
    null
  );

  useEffect(() => {
    const fetchContentDetails = async () => {
      const fetchedContentDetails = await getContentDetails({
        videoId,
        accessToken,
      });

      setContentDetails(fetchedContentDetails);
    };

    fetchContentDetails();
  }, [accessToken, videoId]);

  return (
    <section className="details">
      {contentDetails !== null ? (
        <LiteYouTubeEmbed
          id={contentDetails?.id}
          title={contentDetails?.title}
        />
      ) : null}
      <h1>{contentDetails?.title ?? "none"}</h1>
      <p>{contentDetails?.description ?? "none"}</p>
      <div className="statistics">
        <h2>{contentDetails?.channelTitle ?? "none"}</h2>
        <p>
          <span>Views: </span>
          {formatStringNumber(contentDetails?.statistics?.viewCount ?? "") ??
            "none"}
        </p>
        <p>
          <span>Likes: </span>
          {contentDetails?.statistics?.likeCount ?? "none"}
        </p>
        <p>
          <span>Favorite: </span>
          {contentDetails?.statistics?.favoriteCount ?? "none"}
        </p>
        <p>
          <span>Comments: </span>
          {contentDetails?.statistics?.commentCount ?? "none"}
        </p>
      </div>
    </section>
  );
};

export default Details;
