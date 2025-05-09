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
import useOAuth2Context from "@features/auth/hooks/useOAuth2Context";
import Spinner from "@/components/Spinner/Spinner";

const ContentDetailsPage = () => {
  const { accessToken } = useOAuth2Context();
  const { videoId = "" } = useParams();
  const [contentDetails, setContentDetails] = useState<ContentDetails | null>(
    null
  );
  const [channelDetails, setChannelDetails] = useState<YoutubeChannel | null>(
    null
  );
  //const [rate, setRate] = useState<YoutubeRating>("none");

  useEffect(() => {
    if (!accessToken) return;

    const fetchContentDetails = async () => {
      const fetchedContentDetails = await getContentDetails({
        videoIds: [videoId],
      });
      const contentDetails = fetchedContentDetails[0];
      setContentDetails(contentDetails);
      const fetchedChannelDetails = await getChannel({
        channelId: contentDetails.snippet.channelId,
      });
      setChannelDetails(fetchedChannelDetails);
    };

    fetchContentDetails();
  }, [accessToken, videoId]);

  return contentDetails !== null ? (
    <section className="flex flex-col gap-4">
      <div className="video-content flex flex-col gap-4">
        <div className="video-player-container bg-neutral-950">
          <div className="video-player rounded-xl mx-auto overflow-hidden max-w-screen-2xl">
            <LiteYouTubeEmbed
              id={contentDetails.id}
              title={contentDetails.title}
            />
          </div>
        </div>
        <section className="video-info flex flex-col gap-4 p-8 mx-auto max-w-screen-2xl w-full px-4 2xl:px-0">
          <h1 className="text-2xl font-bold text-left">
            {contentDetails?.title}
          </h1>
          <Channel
            author={contentDetails?.channelTitle || ""}
            imageUrl={channelDetails?.snippet?.thumbnails?.high?.url || ""}
            subscriberCount={channelDetails?.statistics?.subscriberCount || 0}
            description={contentDetails?.description || ""}
          />
          <VideoStatisticsInline
            contentDetails={contentDetails}
            setContentDetails={setContentDetails}
          />
        </section>
      </div>
      <CommentsSection
        id={videoId}
        commentCount={contentDetails?.statistics.commentCount || "0"}
      />
    </section>
  ) : (
    <Spinner title="Loading content..." />
  );
};

export default ContentDetailsPage;
