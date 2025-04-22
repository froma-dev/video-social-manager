import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { getChannel, getContentDetails } from "@services/youtube/youtube";
import {
  ContentDetails,
  YoutubeChannel,
} from "@services/youtube/youtube.types";
import VideoStatisticsInline from "@components/VideoStatistics/VideoStatisticsInline";
import CommentsSection from "./CommentsSection";
import Channel from "@components/Channel/Channel";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

const ContentDetailsPage = ({ accessToken }: { accessToken: string }) => {
  const { videoId = "" } = useParams();
  const [contentDetails, setContentDetails] = useState<ContentDetails | null>(
    null
  );
  const [channelDetails, setChannelDetails] = useState<YoutubeChannel | null>(
    null
  );
  //const [rate, setRate] = useState<YoutubeRating>("none");

  useEffect(() => {
    const fetchContentDetails = async () => {
      const fetchedContentDetails = await getContentDetails({
        videoIds: [videoId],
        accessToken,
      });
      setContentDetails(fetchedContentDetails);

      console.log(fetchedContentDetails);
      const fetchedChannelDetails = await getChannel({
        channelId: fetchedContentDetails.snippet.channelId,
        accessToken,
      });
      setChannelDetails(fetchedChannelDetails);
    };

    fetchContentDetails();
  }, [accessToken, videoId]);

  return contentDetails !== null ? (
    <section className="flex flex-col gap-4">
      <div className="video-content flex flex-col gap-4">
        <div className="video-player w-full grid">
          <LiteYouTubeEmbed
            id={contentDetails.id}
            title={contentDetails.title}
          />
        </div>
        <section className="video-info flex flex-col gap-4 p-8">
          <h1 className="text-2xl font-bold text-left">
            {contentDetails?.title}
          </h1>
          <Channel
            author={contentDetails?.channelTitle || ""}
            imageUrl={channelDetails?.snippet?.thumbnails?.high?.url || ""}
            subscriberCount={channelDetails?.statistics?.subscriberCount || 0}
            description={channelDetails?.snippet?.description || ""}
          />
          <VideoStatisticsInline
            contentDetails={contentDetails}
            setContentDetails={setContentDetails}
            accessToken={accessToken}
          />
        </section>
      </div>
      <CommentsSection
        id={videoId}
        accessToken={accessToken}
        commentCount={contentDetails?.statistics.commentCount || "0"}
      />
    </section>
  ) : (
    <p>Loading...</p>
  );
};

export default ContentDetailsPage;
