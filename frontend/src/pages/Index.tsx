import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Music2,
  Search,
  X,
  Youtube,
} from "lucide-react";

const campusImageUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2F5fe5f33bd7324150b37ef1c428613784?format=webp&width=800&height=1200";
const logoImageUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2F7385c695e0ca40a39a683298c88da4e7?format=webp&width=800&height=1200";
const campusMapImageUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Fa555f77512cc4877a979c8e52fe27a37?format=webp&width=800&height=1200";
const footerLogoImageUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2F6994e90a1ac44094ae1897be254c0ae0?format=webp&width=800&height=1200";
const cafeteriaSlugs: Record<string, string> = {
  "USIU Cafeteria (Main Cafeteria)": "usiu-main-cafeteria",
  Sironi: "sironi",
  "Paul's Caffe": "pauls-caffe",
  "Caffe Latta": "caffe-latta",
};
const schoolSlugs: Record<string, string> = {
  "Chandaria School of Business": "chandaria-business",
  "School of Science and Technology": "science-technology",
  "School of Humanities and Social Sciences": "humanities-social-sciences",
  "School of Communication, Cinematic and Creative Arts":
    "communication-cinematic-creative-arts",
  "School of Pharmacy and Health Sciences": "pharmacy-health-sciences",
  "School of Graduate Studies": "graduate-studies",
};
const locationSlugs: Record<string, string> = {
  Library: "library",
  Auditorium: "auditorium",
  "Freida Brown": "freida-brown",
  "Athletic Facilities": "athletic-facilities",
};
const searchableLocations = [
  { name: "Chandaria School of Business", category: "School", path: "/schools/chandaria-business" },
  { name: "School of Science and Technology", category: "School", path: "/schools/science-technology" },
  { name: "School of Humanities and Social Sciences", category: "School", path: "/schools/humanities-social-sciences" },
  { name: "School of Communication, Cinematic and Creative Arts", category: "School", path: "/schools/communication-cinematic-creative-arts" },
  { name: "School of Pharmacy and Health Sciences", category: "School", path: "/schools/pharmacy-health-sciences" },
  { name: "School of Graduate Studies", category: "School", path: "/schools/graduate-studies" },
  { name: "Main Cafeteria", category: "Cafeteria", path: "/cafeterias/usiu-main-cafeteria" },
  { name: "Sironi", category: "Cafeteria", path: "/cafeterias/sironi" },
  { name: "Paul's Caffe", category: "Cafeteria", path: "/cafeterias/pauls-caffe" },
  { name: "Caffe Latta", category: "Cafeteria", path: "/cafeterias/caffe-latta" },
  { name: "Library", category: "Facility", path: "/library" },
  { name: "Auditorium", category: "Facility", path: "/auditorium" },
  { name: "Freida Brown", category: "Facility", path: "/freida-brown" },
  { name: "Athletic Facilities", category: "Facility", path: "/athletic-facilities" },
];
const menuGroups = [
  { heading: "Schools", category: "School" },
  { heading: "Cafeterias", category: "Cafeteria" },
  { heading: "Facilities", category: "Facility" },
];

export default function Index() {
  const [schoolsOpen, setSchoolsOpen] = useState(false);
  const [cafeteriasOpen, setCafeteriasOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchResults = searchableLocations.filter((location) =>
    location.name.toLowerCase().includes(normalizedQuery),
  );

  return (
    <>
      <main
      aria-label="Smart campus navigation system"
      className="relative h-screen min-h-[100svh] w-full bg-cover bg-center bg-no-repeat"
      role="img"
      style={{ backgroundImage: `url(${campusImageUrl})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black/55" />
      <img
        src={logoImageUrl}
        alt="USIU-Africa"
        className="absolute left-5 top-5 z-10 h-auto w-[140px] opacity-[0.88] mix-blend-multiply sm:left-8 sm:top-8 sm:w-[150px] lg:left-10 lg:top-7 lg:w-[165px]"
      />
      <h1
        className="absolute left-5 top-[238px] z-10 whitespace-nowrap text-[70px] font-normal leading-[55px] tracking-wide text-white sm:left-8 sm:top-[269px] lg:left-10 lg:top-[294px]"
        style={{ fontFamily: '"Times New Roman", serif' }}
      >
        Maps and
        <br />
        directions
      </h1>
      <div className="absolute right-0 top-0 z-10 flex h-16 text-white">
        <button
          type="button"
          onClick={() => {
            setSearchOpen(true);
            setMenuOpen(false);
            setSearchQuery("");
          }}
          className="flex h-20 w-36 items-center justify-center gap-4 border border-white/15 bg-black/85 px-6 text-base font-normal whitespace-nowrap"
        >
          <Search className="h-6 w-6 stroke-[2.5]" aria-hidden="true" />
          <span>Search</span>
        </button>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="campus-navigation-menu"
          onClick={() => {
            setMenuOpen(true);
            setSearchOpen(false);
          }}
          className="flex h-20 w-36 items-center justify-center gap-4 border-y border-r border-white/15 bg-black/85 px-6 text-base font-normal whitespace-nowrap"
        >
          <Menu className="h-6 w-6 stroke-[2.5]" aria-hidden="true" />
          <span>Menu</span>
        </button>
      </div>
      <p
        className="absolute right-0 top-[321px] z-10 w-[540px] max-w-[calc(100vw-2rem)] text-left text-[39px] font-normal leading-tight text-white sm:top-[337px] lg:top-[353px]"
        style={{ fontFamily: '"Times New Roman", serif' }}
      >
        Find addresses, directions and
        <br />
        parking information for your
        <br />
        next visit to USIU
      </p>
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-search-heading"
          className="absolute inset-0 z-30 flex items-start justify-center bg-black/75 px-5 pt-24 sm:px-10 sm:pt-32"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white p-6 text-black shadow-2xl sm:p-10"
            onClick={(event) => event.stopPropagation()}
            style={{ fontFamily: '"Times New Roman", serif' }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-black/60">
                  Campus search
                </p>
                <h2 id="location-search-heading" className="mt-2 text-3xl font-normal sm:text-4xl">
                  Find a location
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black transition-colors duration-300 hover:bg-black hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <label htmlFor="location-search" className="sr-only">
              Search for a location
            </label>
            <input
              id="location-search"
              type="search"
              autoFocus
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search for a location..."
              className="mt-8 w-full border-b border-black bg-transparent px-0 py-3 text-2xl font-normal outline-none placeholder:text-black/45"
            />
            <div className="mt-6 max-h-[45vh] overflow-y-auto">
              {searchResults.length > 0 ? (
                <ul className="divide-y divide-black/20">
                  {searchResults.map((location) => (
                    <li key={location.path}>
                      <Link
                        to={location.path}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between gap-5 py-4 transition-opacity duration-300 hover:opacity-60"
                      >
                        <span className="text-xl">{location.name}</span>
                        <span className="shrink-0 text-sm uppercase tracking-[0.15em] text-black/55">
                          {location.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-4 text-xl">No location found. Try another search.</p>
              )}
            </div>
          </div>
        </div>
      )}
      <div
        aria-hidden={!menuOpen}
        className={`absolute inset-0 z-30 bg-black/65 transition-opacity duration-500 ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        id="campus-navigation-menu"
        aria-label="Campus navigation menu"
        className={`absolute right-0 top-0 z-40 h-full w-full max-w-[560px] overflow-y-auto bg-white px-6 pb-12 pt-8 text-black shadow-2xl transition-transform duration-500 ease-out sm:px-10 sm:pt-10 ${menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"}`}
        style={{ fontFamily: '"Times New Roman", serif' }}
      >
        <div className="flex items-start justify-between gap-6 border-b border-black pb-7">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-black/60">
              Campus navigation
            </p>
            <h2 className="mt-2 text-4xl font-normal sm:text-5xl">Explore USIU</h2>
          </div>
          <button
            type="button"
            aria-label="Close campus navigation menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-8 space-y-10">
          {menuGroups.map((group) => (
            <section key={group.category} aria-labelledby={`${group.category}-menu-heading`}>
              <h3
                id={`${group.category}-menu-heading`}
                className="text-sm uppercase tracking-[0.2em] text-black/60"
              >
                {group.heading}
              </h3>
              <ul className="mt-3 divide-y divide-black/20">
                {searchableLocations
                  .filter((location) => location.category === group.category)
                  .map((location) => (
                    <li key={location.path}>
                      <Link
                        to={location.path}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between gap-5 py-4 text-xl transition-opacity duration-300 hover:opacity-60"
                      >
                        <span>{location.name}</span>
                        <ArrowRight
                          className="h-5 w-5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </aside>
      </main>
      <nav
        aria-label="Primary navigation"
        className="flex min-h-24 w-full items-center justify-center overflow-x-auto bg-white px-6"
        style={{ fontFamily: '"Times New Roman", serif' }}
      >
        <ul className="flex min-w-max items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {["Home", "Maps and directions", "Navigate", "Favourites"].map(
            (item) => (
              <li key={item}>
                <button
                  type="button"
                  className="group relative whitespace-nowrap px-1 py-2 text-lg font-normal text-black sm:text-xl"
                >
                  {item}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100"
                  />
                </button>
              </li>
            ),
          )}
        </ul>
      </nav>
      <section
        aria-labelledby="building-addresses-heading"
        className="bg-white px-6 py-16 text-left"
        style={{ fontFamily: '"Times New Roman", serif' }}
      >
        <h2
          id="building-addresses-heading"
          className="text-[60px] font-normal leading-tight text-black"
        >
          USIU building
          <br />
          addresses
        </h2>
        <div aria-hidden="true" className="mt-8 h-px w-full bg-black" />
        <ul aria-label="Building directory" className="text-left text-black">
          {[
            "Schools",
            "Cafeterias",
            "Library",
            "Auditorium",
            "Freida Brown",
            "Athletic Facilities",
          ].map((item) => {
            const isSchools = item === "Schools";
            const isCafeterias = item === "Cafeterias";
            const isOpen = isSchools ? schoolsOpen : cafeteriasOpen;

            return (
              <li
                key={item}
                className="group border-b border-black py-6 text-[40px] font-normal leading-relaxed"
              >
                <div className="flex items-center justify-between">
                  {locationSlugs[item] ? (
                    <Link
                      to={`/${locationSlugs[item]}`}
                      className="transition-opacity duration-300 hover:opacity-60"
                    >
                      {item}
                    </Link>
                  ) : (
                    <span>{item}</span>
                  )}
                  <button
                    type="button"
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${item}`}
                    aria-expanded={isOpen}
                    aria-controls={isSchools ? "schools-dropdown" : isCafeterias ? "cafeterias-dropdown" : undefined}
                    onClick={
                      isSchools
                        ? () => setSchoolsOpen((open) => !open)
                        : isCafeterias
                          ? () => setCafeteriasOpen((open) => !open)
                          : undefined
                    }
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black bg-white text-black transition-colors duration-300 group-hover:bg-black group-hover:text-white"
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {isSchools && (
                  <ul
                    id="schools-dropdown"
                    className={`ml-8 list-disc overflow-hidden text-[22px] font-bold leading-[36px] transition-all duration-300 ${schoolsOpen ? "mt-8 max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {[
                      "Chandaria School of Business",
                      "School of Science and Technology",
                      "School of Humanities and Social Sciences",
                      "School of Communication, Cinematic and Creative Arts",
                      "School of Pharmacy and Health Sciences",
                      "School of Graduate Studies",
                    ].map((school) => (
                      <li key={school} className="py-2 pl-3">
                        <Link
                          to={`/schools/${schoolSlugs[school]}`}
                          className="block transition-opacity duration-300 hover:opacity-60"
                        >
                          {school}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {isCafeterias && (
                  <ul
                    id="cafeterias-dropdown"
                    className={`ml-8 list-disc overflow-hidden text-[22px] font-bold leading-[36px] transition-all duration-300 ${cafeteriasOpen ? "mt-8 max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {["USIU Cafeteria (Main Cafeteria)", "Sironi", "Paul's Caffe", "Caffe Latta"].map(
                      (cafeteria) => (
                        <li key={cafeteria} className="py-2 pl-3">
                          <Link
                            to={`/cafeterias/${cafeteriaSlugs[cafeteria]}`}
                            className="block transition-opacity duration-300 hover:opacity-60"
                          >
                            {cafeteria}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        <section
          aria-labelledby="campus-map-heading"
          className="mt-20 grid grid-cols-1 items-center gap-12 pb-16 lg:grid-cols-2"
        >
          <img
            src={campusMapImageUrl}
            alt="Campus map information"
            className="h-auto w-3/4 translate-x-[64px] justify-self-start"
          />
          <div className="flex flex-col justify-center text-left text-black lg:-translate-x-[52px]">
            <h3
              id="campus-map-heading"
              className="text-[36px] font-[550] leading-tight"
            >
              Campus Map
            </h3>
            <p className="mt-4 text-[22px] font-normal leading-relaxed">
              Use our official map to navigate USIU&apos;s campus and find auditoriums,
              libraries, churches and other important buildings.
            </p>
            <button
              type="button"
              className="group mt-6 flex w-fit items-center gap-4 text-left text-[22px] font-semibold text-black"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="relative whitespace-nowrap">
                Explore USIU&apos;s official map
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100"
                />
              </span>
            </button>
          </div>
        </section>
      </section>
      <footer
        aria-labelledby="security-brand-heading"
        className="mt-24 bg-black px-6 pb-12 pt-12 text-center text-white"
        style={{ fontFamily: '"Times New Roman", serif' }}
      >
        <div className="grid grid-cols-1 gap-10 pt-12 lg:grid-cols-3">
          <div className="mx-auto max-w-3xl">
          <h2
            id="security-brand-heading"
            className="text-[24px] font-semibold leading-tight text-white"
          >
            Security &amp; Brand
          </h2>
          <ul className="mt-4 space-y-2 text-[18px] font-normal leading-relaxed text-white">
            {["Report Copyright Infringement", "Report Security Issue", "Trademark Notice"].map(
              (item) => (
                <li key={item}>
                  <button type="button" className="text-center text-white">
                    {item}
                  </button>
                </li>
              ),
            )}
          </ul>
          </div>
          <div className="text-center lg:justify-self-center">
            <h2 className="text-[24px] font-semibold leading-tight text-white">
              Website
            </h2>
            <ul className="mt-4 space-y-2 text-[18px] font-normal leading-relaxed text-white">
              {["Accessibility", "Digital Accessibility", "Privacy Statement"].map(
                (item) => (
                  <li key={item}>
                    <button type="button" className="text-center text-white">
                      {item}
                    </button>
                  </li>
                ),
              )}
            </ul>
            <img
              src={footerLogoImageUrl}
              alt="USIU-Africa logo"
              className="mx-auto mt-28 h-auto w-[180px]"
            />
          </div>
          <div className="text-center text-white">
            <h2 className="text-[24px] font-semibold leading-tight text-white">
              Get In Touch
            </h2>
            <ul className="mt-4 space-y-2 text-[18px] font-normal leading-relaxed text-white">
              {["Contact USIU", "Maps and Directions", "Jobs"].map((item) => (
                <li key={item}>
                  <button type="button" className="text-center text-white">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-32 flex flex-col gap-6 text-left sm:flex-row sm:items-center sm:justify-between">
          <p className="pb-2 text-[14px] font-normal leading-relaxed text-white sm:text-[16px]">
            Copyright © 2026 The President and Fellows of United
            <br />
            States International University - Africa
          </p>
          <div className="flex items-center gap-6 text-white sm:-translate-x-6" aria-label="Social media links">
            <button type="button" aria-label="Instagram" className="transition-opacity duration-300 hover:opacity-60">
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" aria-label="TikTok" className="transition-opacity duration-300 hover:opacity-60">
              <Music2 className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" aria-label="LinkedIn" className="transition-opacity duration-300 hover:opacity-60">
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" aria-label="Facebook" className="transition-opacity duration-300 hover:opacity-60">
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" aria-label="YouTube" className="transition-opacity duration-300 hover:opacity-60">
              <Youtube className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
