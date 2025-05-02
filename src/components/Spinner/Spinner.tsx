import { Squircle } from "ldrs/react";
import "ldrs/react/Squircle.css";

interface SpinnerProps {
  title?: string;
  message?: string;
}

const Spinner = ({ title, message }: SpinnerProps) => (
  <div className="spinner grid place-items-center h-dvh">
    <section className="flex flex-col items-center gap-4">
      <Squircle
        size="54"
        stroke="5"
        strokeLength="0.15"
        bgOpacity="0.1"
        speed="0.9"
        color="white"
      />
      {title ? (
        <h1 className="text-4xl font-bold text-center text-zinc-50">{title}</h1>
      ) : null}
      {message ? <p className="text-zinc-400 text-center">{message}</p> : null}
    </section>
  </div>
);

export default Spinner;
