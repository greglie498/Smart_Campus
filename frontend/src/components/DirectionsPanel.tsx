import { lazy, Suspense, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { useDirections } from "@/hooks/use-campus-data";
import SpeakButton from "@/components/SpeakButton";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchResultCategory } from "@shared/types";

const RouteMap = lazy(() => import("@/components/RouteMap"));

interface DirectionsPanelProps {
  category: SearchResultCategory;
  slug: string;
}

export default function DirectionsPanel({ category, slug }: DirectionsPanelProps) {
  const [open, setOpen] = useState(false);
  const { data: directions, isLoading, isError } = useDirections(category, slug, open);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`directions-panel-${slug}`}
        onClick={() => setOpen((value) => !value)}
        className="group inline-flex items-center gap-4 text-xl font-semibold"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
          <MapPin className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="relative">
          {open ? "Hide directions" : "Get Directions"}
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
        </span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={`directions-panel-${slug}`}
        aria-live="polite"
        className={`overflow-hidden transition-all duration-300 ${open ? "mt-6 max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        {open && isLoading && <p className="text-lg text-black/60 dark:text-white/60">Loading directions…</p>}
        {open && isError && (
          <p className="text-lg text-black/60 dark:text-white/60">
            Couldn't load directions right now. Please try again.
          </p>
        )}
        {open && directions && (
          <div className="space-y-6">
            <Suspense fallback={<Skeleton className="h-[280px] w-full sm:h-[320px]" />}>
              <RouteMap
                destinationSlug={slug}
                destinationName={directions.destinationName}
                category={category}
              />
            </Suspense>

            <div className="border-l-2 border-black dark:border-white pl-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm uppercase tracking-[0.15em] text-black/60 dark:text-white/60">
                  Approx. {directions.estimatedMinutes} minute walk
                </p>
                <SpeakButton
                  text={`Directions to ${directions.destinationName}. ${directions.steps.join(". ")}`}
                  label="directions"
                />
              </div>
              <ol className="mt-4 space-y-3">
                {directions.steps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-lg leading-relaxed">
                    <span className="shrink-0 font-semibold">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-black/50 dark:text-white/50">
                These are general walking directions, not live GPS turn-by-turn
                navigation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}