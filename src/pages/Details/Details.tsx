import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./Details.css";
import { getVideoDetails } from "../../services/youtube/youtube";

const Details = ({ accessToken }: { accessToken: string }) => {
  const { videoId = "" } = useParams();
  const [contentDetails, setContentDetails] = useState(null);
  const [loading, setLoading] = useState(false)
  console.log("videoID", videoId);

  useEffect(() => {
    const fetchContentDetails = async () => {
      const videoContentDetails = await getVideoDetails({
        videoId,
        accessToken,
      });

      console.log("videoContentDetails", videoContentDetails);
      setContentDetails(videoContentDetails);
    };

    fetchContentDetails();
  }, [accessToken, videoId]);

  return (
    <section className="details">
     <img src={contentDetails?.image} alt={contentDetails?.title}></img>
      <h1>contentDetails.title</h1>
      <p>contentDetails.description</p>
      <a href={"url"}>Watch on YouTube</a>
    </section>
  );
};

export default Details;
