import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useCafeteria } from "@/hooks/use-campus-data";
import { Skeleton } from "@/components/ui/skeleton";
import NotFound from "./NotFound";
import DirectionsPanel from "@/components/DirectionsPanel";
import FavouriteButton from "@/components/FavouriteButton";

export default function CafeteriaDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data: cafeteria, isLoading, isError } = useCafeteria(slug);

  if (isLoading) {
  return (
    <main className="min-h-screen bg-white" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading cafeteria details…</span>
      <div className="h-6 bg-black" />
      <Skeleton className="h-[420px] w-full rounded-none sm:h-[560px]" />
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="mt-4 h-6 w-1/2" />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </main>
  );
}

  if (isError || !cafeteria) {
    return <NotFound message="We couldn't find that cafeteria." />;
  }

  return (
  <>
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
    <main
      className="min-h-screen bg-white text-black"
      style={{ fontFamily: '"Times New Roman", serif' }}
    >
      <header className="bg-black px-6 py-6 text-white sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <Link to="/" className="text-xl whitespace-nowrap">
            USIU-Africa
          </Link>
          <Link
            to="/"
            className="text-base transition-opacity duration-300 hover:opacity-60"
          >
            Back to campus map
          </Link>
        </div>
      </header>

      <section className="relative isolate min-h-[560px] overflow-hidden bg-black text-white">
        <img
          src={cafeteria.image}
          alt={`${cafeteria.name} campus location`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex min-h-[560px] max-w-6xl items-end px-6 py-16 sm:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm uppercase tracking-[0.2em] text-white/75">
              Cafeteria directory
            </p>
            <h1 className="text-5xl font-normal leading-tight sm:text-7xl">
              {cafeteria.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="max-w-3xl text-3xl leading-tight">
              {cafeteria.description}
            </p>
            <div>
              <div className="mt-10 flex items-start gap-4">
                <DirectionsPanel category="cafeteria" slug={cafeteria.slug} />
                <FavouriteButton
                  item={{ slug: cafeteria.slug, name: cafeteria.name, category: "cafeteria", path: `/cafeteria/${cafeteria.slug}` }}
              />
            </div>
          </div>
        </div>
          <div className="border-t border-black pt-8">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-black/60">
              Location and hours
            </p>
            <p className="flex items-start gap-3 text-2xl leading-relaxed">
              <MapPin className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
              <span>{cafeteria.location}</span>
            </p>
            <p className="mt-6 flex items-start gap-3 text-xl leading-relaxed">
              <Clock3 className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
              <span>{cafeteria.hours}</span>
            </p>
          </div>
        </div>

        <section
          aria-labelledby="facilities-heading"
          className="mt-24 border-t border-black pt-12"
        >
          <h2 id="facilities-heading" className="text-3xl font-semibold">
            Nearby facilities and landmarks
          </h2>
          <ul className="mt-8 grid gap-4 text-xl leading-relaxed md:grid-cols-3">
            {cafeteria.facilities.map((facility) => (
              <li key={facility} className="border-b border-black/20 pb-4">
                {facility}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="contact-heading"
          className="mt-24 border-t border-black pt-12"
        >
          <h2 id="contact-heading" className="text-3xl font-semibold">
            Contact information
          </h2>
          <div className="mt-8 grid gap-6 text-xl leading-relaxed sm:grid-cols-3">
            <p className="flex items-start gap-3">
              <MapPin className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
              <span>USIU-Africa campus reception</span>
            </p>
            <p className="flex items-start gap-3">
              <Phone className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
              <span>Campus information desk</span>
            </p>
            <p className="flex items-start gap-3">
              <Mail className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
              <span>Cafeteria enquiries</span>
            </p>
          </div>
        </section>
      </section>
    </main>
  </>
  );
}