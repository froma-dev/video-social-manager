const DurationTag = ({
  duration,
}: {
  duration: { hours: string; minutes: string; seconds: string };
}) => {
  return (
    <span className="text-sm rounded-md px-2 py-1 bg-gray-900/50">
      {duration.hours !== "00" && `${duration.hours}:`}
      {duration.minutes}:{duration.seconds}
    </span>
  );
};

export default DurationTag;
