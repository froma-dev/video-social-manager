import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "./Details.css";
import { getContentDetails } from "../../services/youtube/youtube";
import { ContentDetails } from "../../services/youtube/youtube.types";
import VideoStatisticsInline from "../../components/VideoStatistics/VideoStatisticsInline";
import Card from "../../components/Card/Card";
import Comments from "./Comments";
import { YoutubeRating } from "../../services/youtube/youtube.types";

const Details = ({ accessToken }: { accessToken: string }) => {
  const { videoId = "" } = useParams();
  const [contentDetails, setContentDetails] = useState<ContentDetails | null>(
    null
  );
  const [rate, setRate] = useState<YoutubeRating>("none");

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
    <section>
      <VideoStatisticsInline
        contentDetails={contentDetails}
        setContentDetails={setContentDetails}
        accessToken={accessToken}
      />
      <Card
        id={videoId}
        title={contentDetails?.title}
        subtitle={contentDetails?.channelTitle}
        description={""}
      >
        <Comments
          id={videoId}
          accessToken={accessToken}
          commentCount={contentDetails?.statistics.commentCount || "0"}
        />
      </Card>
      {/*       <div className="header flex flex-col gap-0">
        <h1 className="text-2xl text-left font-extrabold">
          {contentDetails?.title}
        </h1>
        <h2 className="text-xl text-left font-bold">
          {contentDetails?.channelTitle}
        </h2>
      </div> */}
    </section>
  ) : (
    <p>Loading...</p>
  );
};

export default Details;
