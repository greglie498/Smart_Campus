import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

const cafeteriaHeroImage =
  "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2F5fe5f33bd7324150b37ef1c428613784?format=webp&width=800&height=1200";

const cafeterias = {
  "usiu-main-cafeteria": {
    name: "USIU Cafeteria (Main Cafeteria)",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Fa6b4d3b8d20348d7a2bcfab222b5bfc6?format=webp&width=800&height=1200",
    description:
      "A central campus dining destination serving students, faculty, staff, and visitors throughout the academic day.",
    location: "Main Cafeteria, USIU-Africa campus",
    hours: "Monday-Friday, 7:30 AM-6:00 PM",
    facilities: ["Main campus courtyard", "Student centre", "Campus convenience services"],
  },
  sironi: {
    name: "Sironi",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Fd3c2d2cd4db944dbb11344ddf9ec6a84?format=webp&width=800&height=1200",
    description:
      "A welcoming dining space for relaxed meals, coffee breaks, and informal conversations between classes.",
    location: "Sironi, USIU-Africa campus",
    hours: "Monday-Friday, 8:00 AM-5:00 PM",
    facilities: ["Library", "Student study areas", "Outdoor campus paths"],
  },
  "pauls-caffe": {
    name: "Paul's Caffe",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Ff351240502a44440b291f69cfbc8e753?format=webp&width=800&height=1200",
    description:
      "A convenient café stop for refreshments, quick meals, and casual meetings on campus.",
    location: "Paul's Caffe, USIU-Africa campus",
    hours: "Monday-Friday, 8:00 AM-5:00 PM",
    facilities: ["Academic buildings", "Collaborative spaces", "Campus shuttle access"],
  },
  "caffe-latta": {
    name: "Caffe Latta",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Fa4217872839a435c86435d61186531ea?format=webp&width=800&height=1200",
    description:
      "A relaxed café setting for coffee, light meals, and a quiet pause during the university day.",
    location: "Caffe Latta, USIU-Africa campus",
    hours: "Monday-Friday, 8:00 AM-5:00 PM",
    facilities: ["Lecture halls", "Campus gardens", "Student services"],
  },
} as const;

export default function CafeteriaDetails() {
  const { slug } = useParams<{ slug: keyof typeof cafeterias }>();
  const cafeteria = slug ? cafeterias[slug] : undefined;

  if (!cafeteria) {
    return <Navigate to="/" replace />;
  }

  return (
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
          src={"image" in cafeteria ? cafeteria.image : cafeteriaHeroImage}
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
            <Link
              to="/"
              className="group mt-10 inline-flex items-center gap-4 text-xl font-semibold"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="relative">
                Navigate Here
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>
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
  );
}
