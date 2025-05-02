import { IconMoodWrrr } from "@tabler/icons-react";

interface GenericErrorProps {
  title?: string;
  message?: string;
}

const GenericError = ({ title, message }: GenericErrorProps) => {
  return (
    <div className="generic-error grid place-items-center h-dvh">
      <section className="flex flex-col items-center gap-4">
        <IconMoodWrrr size={80} className="text-zinc-300" />
        {title ? (
          <h1 className="text-4xl font-bold text-center text-zinc-50">
            {title}
          </h1>
        ) : null}
        {message ? (
          <p className="text-zinc-400 text-center">{message}</p>
        ) : null}
      </section>
    </div>
  );
};

export default GenericError;
