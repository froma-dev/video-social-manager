interface ProfilePictureProps {
  imageUrl: string;
  alt: string;
  fallbackUrl?: string;
  className?: string;
}

const ProfilePicture = ({
  imageUrl,
  alt,
  fallbackUrl = "/mood-smile.svg",
  className = "",
}: ProfilePictureProps) => {
  return (
    <div
      className={`${className} profile-picture border-2 border-zinc-300 color rounded-full overflow-hidden`}
    >
      <img
        className="w-full h-full object-cover"
        src={imageUrl || fallbackUrl}
        alt={alt}
        onError={(e) => (e.currentTarget.src = fallbackUrl)}
      />
    </div>
  );
};

export default ProfilePicture;
