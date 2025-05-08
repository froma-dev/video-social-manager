import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import ProfilePicture from "@components/ProfilePicture/ProfilePicture";
import { shortNumber } from "@/utils/utils";
import Button from "../Button/Button";
import { useMemo, useState } from "react";

interface ChannelProps {
  author: string;
  imageUrl: string;
  subscriberCount: number;
  description: string;
}

const MAX_DESCRIPTION_CHARACTERS = 300;
const Channel = ({
  author,
  imageUrl,
  subscriberCount,
  description = "",
}: ChannelProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isDescriptionTruncated = useMemo(
    () => description.length > MAX_DESCRIPTION_CHARACTERS,
    [description]
  );
  const truncatedDescription = isDescriptionTruncated
    ? `${description.substring(0, MAX_DESCRIPTION_CHARACTERS)}...`
    : description;

  return (
    <div className="channel-info flex gap-4 flex-col md:flex-row">
      <ProfilePicture
        imageUrl={imageUrl}
        alt={author}
        className="w-[64px] h-[64px] shrink-0"
      />
      <section className="channel-info__details flex flex-col justify-start text-left">
        <h2 className="channel-info__title text-xl font-bold">{author}</h2>
        <span className="channel-info__subscribers text-zinc-400">
          {shortNumber(subscriberCount)} subscribers
        </span>
      </section>
      <div className="channel-info__description flex-1 flex flex-col gap-2">
        <p className="text-zinc-400 text-left">
          {showFullDescription ? description : truncatedDescription}
        </p>
        {isDescriptionTruncated && (
          <Button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-gray-100"
            styled="transparent"
          >
            {showFullDescription ? <IconChevronUp /> : <IconChevronDown />}
            {showFullDescription ? "Read Less" : "Read More"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Channel;
