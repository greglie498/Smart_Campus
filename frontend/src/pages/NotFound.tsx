import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface NotFoundProps {
  /**
   * Optional contextual message, e.g. "We couldn't find that school."
   * Falls back to a generic message for genuinely unmatched routes.
   */
  message?: string;
}

const NotFound = ({ message }: NotFoundProps) => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404: attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-black"
      style={{ fontFamily: '"Times New Roman", serif' }}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-black/60">
        Error 404
      </p>
      <h1 className="mt-4 text-5xl font-normal sm:text-6xl">
        {message ?? "We couldn't find that page."}
      </h1>
      <p className="mt-4 max-w-md text-xl leading-relaxed text-black/70">
        The location you're looking for may have moved, or the link might be
        out of date. Head back to the campus map to keep exploring.
      </p>
      <Link
        to="/"
        className="group mt-10 inline-flex items-center gap-4 text-xl font-semibold"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
          <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
        </span>
        <span className="relative">
          Back to campus map
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
        </span>
      </Link>
    </main>
  );
};

export default NotFound;