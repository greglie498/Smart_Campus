import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const locations = {
  library: {
    name: "Library",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2F4f9db425b2174e0b85596862d95169fa?format=webp&width=800&height=1200",
    tagline: "A welcoming space for study, discovery, and research.",
    intro:
      "The USIU-Africa Library supports learning, teaching, and research with quiet study environments, expert guidance, and resources for the university community.",
    location: "USIU-Africa Library, main campus",
    hours: "Monday-Friday, 8:00 AM-10:00 PM; Saturday, 9:00 AM-5:00 PM",
    accessibility: "Step-free access, accessible study spaces, and assistance available at the service desk.",
    details: "Borrowing, reference, research support, and group study services are available.",
    features: ["Individual study spaces", "Digital resources and databases", "Research support and reference services", "Group study areas"],
    nearby: ["Student centre", "Main Cafeteria", "Academic buildings"],
  },
  auditorium: {
    name: "Auditorium",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Fc4e9bfdd014847f48e74e145044e2e2a?format=webp&width=800&height=1200",
    tagline: "A central venue for ideas, performances, and campus gatherings.",
    intro:
      "The USIU-Africa Auditorium brings the community together for lectures, conferences, performances, ceremonies, and other major university events.",
    location: "Auditorium, USIU-Africa main campus",
    hours: "Open during scheduled events and university programmes",
    accessibility: "Accessible entrances, seating, and circulation routes are available for guests and event attendees.",
    details: "Event coordination, presentation facilities, and audience seating support a range of campus programmes.",
    features: ["Event and conference space", "Performance and presentation facilities", "Audience seating", "Ceremony and assembly venue"],
    nearby: ["Administration offices", "Academic buildings", "Campus gardens"],
  },
  "freida-brown": {
    name: "Freida Brown",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Ffc574ddad6a54b26a09124349e608506?format=webp&width=800&height=1200",
    tagline: "A versatile campus facility for connection, collaboration, and community.",
    intro:
      "Freida Brown provides flexible spaces for university activities, meetings, services, and gatherings that support student life and the wider campus community.",
    location: "Freida Brown building, USIU-Africa campus",
    hours: "Monday-Friday, 8:00 AM-5:00 PM, with scheduled event access",
    accessibility: "Accessible routes and support are available for visitors who need assistance navigating the facility.",
    details: "The building hosts multipurpose spaces, organised programmes, and services for students, staff, and visitors.",
    features: ["Multipurpose rooms", "Student and community services", "Meeting and collaboration spaces", "Scheduled programme facilities"],
    nearby: ["Student services", "Campus dining", "Main campus courtyard"],
  },
  "athletic-facilities": {
    name: "Athletic Facilities",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Ffdc1be59479a44288f933a2a9b03cdfc?format=webp&width=800&height=1200",
    tagline: "Spaces to train, compete, and stay active on campus.",
    intro:
      "USIU-Africa’s athletic facilities support fitness, recreation, team sports, and wellness activities for students and the university community.",
    location: "Athletic Facilities, USIU-Africa campus",
    hours: "Monday-Friday, 6:00 AM-8:00 PM; hours vary by activity and programme",
    accessibility: "Accessible routes and facilities are available, with assistance provided through the campus information desk.",
    details: "Use of courts, fitness areas, and organised activities may require scheduling or programme registration.",
    features: ["Sports courts and fields", "Fitness and training areas", "Organised team activities", "Recreation and wellness programmes"],
    nearby: ["Student centre", "Campus residences", "Outdoor campus paths"],
  },
} as const;

type LocationSlug = keyof typeof locations;

type LocationDetailsProps = {
  fixedSlug?: LocationSlug;
};

export default function LocationDetails({ fixedSlug }: LocationDetailsProps) {
  const { slug } = useParams<{ slug: LocationSlug }>();
  const location = fixedSlug ? locations[fixedSlug] : slug ? locations[slug] : undefined;

  if (!location) {
    return <NotFound />;
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
        {"image" in location ? (
          <img
            src={location.image}
            alt={`${location.name} campus location`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_30%),linear-gradient(135deg,#4b5563_0%,#111827_52%,#000000_100%)]"
          />
        )}
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex min-h-[560px] max-w-6xl items-end px-6 py-16 sm:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm uppercase tracking-[0.2em] text-white/75">
              Campus directory
            </p>
            <h1 className="text-5xl font-normal leading-tight sm:text-7xl">
              {location.name}
            </h1>
            <p className="mt-6 max-w-2xl text-2xl leading-relaxed text-white/85 sm:text-3xl">
              {location.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="max-w-3xl text-3xl leading-tight">{location.intro}</p>
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
              Location information
            </p>
            <p className="flex items-start gap-3 text-2xl leading-relaxed">
              <MapPin className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
              <span>{location.location}</span>
            </p>
            <p className="mt-6 flex items-start gap-3 text-xl leading-relaxed">
              <Clock3 className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
              <span>{location.hours}</span>
            </p>
            <p className="mt-6 text-xl leading-relaxed">{location.accessibility}</p>
          </div>
        </div>

        <section
          aria-labelledby="features-heading"
          className="mt-24 border-t border-black pt-12"
        >
          <h2 id="features-heading" className="text-3xl font-semibold">
            Facilities and features
          </h2>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed">{location.details}</p>
          <ul className="mt-8 grid gap-4 text-xl leading-relaxed md:grid-cols-2">
            {location.features.map((feature) => (
              <li key={feature} className="border-b border-black/20 pb-4">
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="nearby-heading"
          className="mt-24 border-t border-black pt-12"
        >
          <h2 id="nearby-heading" className="text-3xl font-semibold">
            Nearby facilities and landmarks
          </h2>
          <ul className="mt-8 grid gap-4 text-xl leading-relaxed md:grid-cols-3">
            {location.nearby.map((facility) => (
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
              <span>{location.location}</span>
            </p>
            <p className="flex items-start gap-3">
              <Phone className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
              <span>USIU-Africa campus information desk</span>
            </p>
            <p className="flex items-start gap-3">
              <Mail className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
              <span>Campus facilities enquiries</span>
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export function LibraryPage() {
  return <LocationDetails fixedSlug="library" />;
}

export function AuditoriumPage() {
  return <LocationDetails fixedSlug="auditorium" />;
}

export function FreidaBrownPage() {
  return <LocationDetails fixedSlug="freida-brown" />;
}

export function AthleticFacilitiesPage() {
  return <LocationDetails fixedSlug="athletic-facilities" />;
}
