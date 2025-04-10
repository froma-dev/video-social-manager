import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "./Details.css";
import { getContentDetails } from "../../services/youtube/youtube";
import { ContentDetails } from "../../services/youtube/youtube.types";
import VideoStatisticsInline from "../../components/VideoStatistics/VideoStatisticsInline";
import Card from "../../components/Card/Card";

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

  return contentDetails !== null ? (
    <Card
      id={videoId}
      title={contentDetails?.title}
      subtitle={contentDetails?.channelTitle}
      description={""}
    >
      <VideoStatisticsInline contentDetails={contentDetails} />
    </Card>
  ) : (
    <p>Loading...</p>
  );
};

export default Details;
