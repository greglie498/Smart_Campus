import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

const schools = {
  "chandaria-business": {
    name: "Chandaria School of Business",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2F85bb8bbd123d4f5ba87b5acc71ed92bc?format=webp&width=800&height=1200",
    intro:
      "Explore business education, entrepreneurship, leadership, and innovation in a community built for ambitious thinkers and responsible leaders.",
    location: "Chandaria School of Business, USIU-Africa campus",
    departments: [
      "Accounting, Finance and Economics",
      "Business Administration",
      "Entrepreneurship and Innovation",
      "Leadership and Management",
    ],
    facilities: ["Business simulation spaces", "Collaborative study areas", "Library and research support"],
  },
  "science-technology": {
    name: "School of Science and Technology",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2F940cafc04dc94d948ac2ee8e006dc827?format=webp&width=800&height=1200",
    intro:
      "Discover programs and spaces dedicated to scientific inquiry, technology, computing, and future-focused problem solving.",
    location: "School of Science and Technology, USIU-Africa campus",
    departments: [
      "Computer Science",
      "Information Systems and Technology",
      "Data Science and Analytics",
      "Applied Sciences",
    ],
    facilities: ["Technology laboratories", "Innovation and maker spaces", "Digital research resources"],
  },
  "humanities-social-sciences": {
    name: "School of Humanities and Social Sciences",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2F4e14603c6e7b436ebd814476c1e3c882?format=webp&width=800&height=1200",
    intro:
      "Engage with the ideas, cultures, and social systems that shape communities through a broad humanities and social sciences education.",
    location: "School of Humanities and Social Sciences, USIU-Africa campus",
    departments: [
      "International Relations",
      "Psychology",
      "Development Studies",
      "Languages and Communication",
    ],
    facilities: ["Lecture theatres", "Student discussion lounges", "Library and archive access"],
  },
  "communication-cinematic-creative-arts": {
    name: "School of Communication, Cinematic and Creative Arts",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Fdea4a74a6c38465f832f39e3e097996f?format=webp&width=800&height=1200",
    intro:
      "Find creative spaces for communication, storytelling, film, design, and the visual and performing arts.",
    location: "School of Communication, Cinematic and Creative Arts, USIU-Africa campus",
    departments: [
      "Film and Theatre Arts",
      "Journalism and Media Studies",
      "Advertising and Public Relations",
      "Creative Arts and Design",
    ],
    facilities: ["Production studios", "Editing and recording suites", "Creative collaboration spaces"],
  },
  "pharmacy-health-sciences": {
    name: "School of Pharmacy and Health Sciences",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Fdf8409d54a4f4d17bbd91cbe18f979b3?format=webp&width=800&height=1200",
    intro:
      "Learn about health-focused education, pharmacy, research, and the facilities supporting tomorrow's healthcare professionals.",
    location: "School of Pharmacy and Health Sciences, USIU-Africa campus",
    departments: [
      "Pharmacy",
      "Public Health",
      "Health Systems and Management",
      "Biomedical and Health Sciences",
    ],
    facilities: ["Teaching laboratories", "Health sciences resource centre", "Student wellness services"],
  },
  "graduate-studies": {
    name: "School of Graduate Studies",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Feeb25739568c4d19a6f6b57cdd5ddc72?format=webp&width=800&height=1200",
    intro:
      "Explore advanced study, research opportunities, and postgraduate pathways across the university.",
    location: "School of Graduate Studies, USIU-Africa campus",
    departments: [
      "Graduate Business Programs",
      "Graduate Computing Programs",
      "Graduate Social Sciences",
      "Research and Doctoral Studies",
    ],
    facilities: ["Graduate study rooms", "Research consultation spaces", "Postgraduate student services"],
  },
} as const;

export default function SchoolDetails() {
  const { slug } = useParams<{ slug: keyof typeof schools }>();
  const school = slug ? schools[slug] : undefined;

  if (!school) {
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
          src={school.image}
          alt={`${school.name} campus building`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex min-h-[560px] max-w-6xl items-end px-6 py-16 sm:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm uppercase tracking-[0.2em] text-white/75">
              School directory
            </p>
            <h1 className="text-5xl font-normal leading-tight sm:text-7xl">
              {school.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="max-w-3xl text-3xl leading-tight">{school.intro}</p>
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
              Building location
            </p>
            <p className="flex items-start gap-3 text-2xl leading-relaxed">
              <MapPin className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
              <span>{school.location}</span>
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-16 border-t border-black pt-12 md:grid-cols-2">
          <section aria-labelledby="programmes-heading">
            <h2 id="programmes-heading" className="text-3xl font-semibold">
              Departments &amp; programmes
            </h2>
            <ul className="mt-8 space-y-4 text-xl leading-relaxed">
              {school.departments.map((department) => (
                <li key={department} className="border-b border-black/20 pb-4">
                  {department}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="facilities-heading">
            <h2 id="facilities-heading" className="text-3xl font-semibold">
              Nearby facilities
            </h2>
            <ul className="mt-8 space-y-4 text-xl leading-relaxed">
              {school.facilities.map((facility) => (
                <li key={facility} className="border-b border-black/20 pb-4">
                  {facility}
                </li>
              ))}
            </ul>
          </section>
        </div>

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
              <span>School enquiries</span>
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
