import { lazy, Suspense, useEffect, useRef, useState } from "react";
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
import {
  useSchools,
  useCafeterias,
  useLocations,
  useCampusSearch,
} from "@/hooks/use-campus-data";
import { toast } from "sonner";
import { useFavourites } from "@/hooks/use-favourites";
import { Skeleton } from "@/components/ui/skeleton";
import ThemeToggle from "@/components/ThemeToggle";

const CampusMap = lazy(() => import("@/components/CampusMap"));
const campusImageUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2F5fe5f33bd7324150b37ef1c428613784?format=webp&width=800&height=1200";
const logoImageUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2F7385c695e0ca40a39a683298c88da4e7?format=webp&width=800&height=1200";
const footerLogoImageUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2F6994e90a1ac44094ae1897be254c0ae0?format=webp&width=800&height=1200";

export default function Index() {
  const [schoolsOpen, setSchoolsOpen] = useState(false);
  const [cafeteriasOpen, setCafeteriasOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [favouritesOpen, setFavouritesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const favouritesButtonRef = useRef<HTMLButtonElement>(null);

  const { favourites, toggleFavourite } = useFavourites();

  const closeSearch = () => {
    setSearchOpen(false);
    searchButtonRef.current?.focus();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const closeFavourites = () => {
    setFavouritesOpen(false);
    favouritesButtonRef.current?.focus();
  };

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (searchOpen) closeSearch();
      if (menuOpen) closeMenu();
      if (favouritesOpen) closeFavourites();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [searchOpen, menuOpen, favouritesOpen]);

  // Data fetching from custom hooks with loading and error states
  const {
    data: schools = [],
    isLoading: schoolsLoading,
    isError: schoolsError,
  } = useSchools();
  const {
    data: cafeterias = [],
    isLoading: cafeteriasLoading,
    isError: cafeteriasError,
  } = useCafeterias();
  const {
    data: locations = [],
    isLoading: locationsLoading,
    isError: locationsError,
  } = useLocations();

  // Toast notifications for data fetch errors
  useEffect(() => {
    if (schoolsError) {
      toast.error("Couldn't load schools. Check your connection and try again.");
    }
  }, [schoolsError]);

  useEffect(() => {
    if (cafeteriasError) {
      toast.error("Couldn't load cafeterias. Check your connection and try again.");
    }
  }, [cafeteriasError]);

  useEffect(() => {
    if (locationsError) {
      toast.error("Couldn't load campus locations. Check your connection and try again.");
    }
  }, [locationsError]);

  // Debounced search query
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(searchQuery), 250);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const { data: searchResults = [], isFetching: isSearching } =
    useCampusSearch(debouncedQuery);

  const mapPins = [
    ...schools.map((school) => ({
      slug: school.slug,
      name: school.name,
      category: "school" as const,
      path: `/schools/${school.slug}`,
    })),
    ...cafeterias.map((cafeteria) => ({
      slug: cafeteria.slug,
      name: cafeteria.name,
      category: "cafeteria" as const,
      path: `/cafeterias/${cafeteria.slug}`,
    })),
    ...locations.map((location) => ({
      slug: location.slug,
      name: location.name,
      category: "location" as const,
      path: `/locations/${location.slug}`,
    })),
  ];

  // Menu-drawer groups built from live data and loading flags
  const menuGroups = [
    {
      heading: "Schools",
      loading: schoolsLoading,
      items: schools.map((school) => ({
        name: school.name,
        path: `/schools/${school.slug}`,
      })),
    },
    {
      heading: "Cafeterias",
      loading: cafeteriasLoading,
      items: cafeterias.map((cafeteria) => ({
        name: cafeteria.name,
        path: `/cafeterias/${cafeteria.slug}`,
      })),
    },
    {
      heading: "Facilities",
      loading: locationsLoading,
      items: locations.map((location) => ({
        name: location.name,
        path: `/locations/${location.slug}`,
      })),
    },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white text-black dark:bg-black dark:text-white">
      {/* Hero Section */}
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

        {/* Updated Top Actions Bar */}
        <div className="absolute right-0 top-0 z-10 flex h-16 items-center text-white">
          <div className="mr-3">
            <ThemeToggle variant="on-dark" />
          </div>
          <button
            ref={searchButtonRef}
            type="button"
            onClick={() => {
              setSearchOpen(true);
              setMenuOpen(false);
              setFavouritesOpen(false);
              setSearchQuery("");
            }}
            className="flex h-20 w-36 items-center justify-center gap-4 border border-white/15 bg-black/85 px-6 text-base font-normal whitespace-nowrap"
          >
            <Search className="h-6 w-6 stroke-[2.5]" aria-hidden="true" />
            <span>Search</span>
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="campus-navigation-menu"
            onClick={() => {
              setMenuOpen(true);
              setSearchOpen(false);
              setFavouritesOpen(false);
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

        {/* Search Modal */}
        {searchOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-search-heading"
            className="absolute inset-0 z-30 flex items-start justify-center bg-black/75 px-5 pt-24 sm:px-10 sm:pt-32"
            onClick={closeSearch}
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
                  <h2
                    id="location-search-heading"
                    className="mt-2 text-3xl font-normal sm:text-4xl"
                  >
                    Find a location
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={closeSearch}
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
              <div className="mt-6 max-h-[45vh] overflow-y-auto" aria-live="polite">
                {searchQuery.trim() === "" ? null : isSearching ? (
                  <p className="py-4 text-xl">Searching…</p>
                ) : searchResults.length > 0 ? (
                  <ul className="divide-y divide-black/20">
                    {searchResults.map((result) => (
                      <li key={result.path}>
                        <Link
                          to={result.path}
                          onClick={closeSearch}
                          className="flex items-center justify-between gap-5 py-4 transition-opacity duration-300 hover:opacity-60"
                        >
                          <span className="text-xl">{result.name}</span>
                          <span className="shrink-0 text-sm uppercase tracking-[0.15em] text-black/55">
                            {result.category}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-4 text-xl">
                    No location found. Try another search.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Favourites Modal */}
        {favouritesOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="favourites-heading"
            className="absolute inset-0 z-30 flex items-start justify-center bg-black/75 px-5 pt-24 sm:px-10 sm:pt-32"
            onClick={closeFavourites}
          >
            <div
              className="w-full max-w-2xl bg-white p-6 text-black shadow-2xl dark:bg-neutral-950 dark:text-white sm:p-10"
              onClick={(event) => event.stopPropagation()}
              style={{ fontFamily: '"Times New Roman", serif' }}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-black/60 dark:text-white/60">
                    Saved on this device
                  </p>
                  <h2
                    id="favourites-heading"
                    className="mt-2 text-3xl font-normal sm:text-4xl"
                  >
                    Favourites
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Close favourites"
                  onClick={closeFavourites}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black transition-colors duration-300 hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-8 max-h-[50vh] overflow-y-auto" aria-live="polite">
                {favourites.length === 0 ? (
                  <p className="py-4 text-xl">
                    Nothing saved yet. Open a school, cafeteria, or location and tap the star to save it here.
                  </p>
                ) : (
                  <ul className="divide-y divide-black/20 dark:divide-white/20">
                    {favourites.map((item) => (
                      <li key={item.path} className="flex items-center justify-between gap-5 py-4">
                        <Link
                          to={item.path}
                          onClick={closeFavourites}
                          className="flex-1 text-xl transition-opacity duration-300 hover:opacity-60"
                        >
                          {item.name}
                          <span className="ml-3 text-sm uppercase tracking-[0.15em] text-black/55 dark:text-white/55">
                            {item.category}
                          </span>
                        </Link>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name} from favourites`}
                          onClick={() => toggleFavourite(item)}
                          className="shrink-0 text-sm underline decoration-black/40 underline-offset-4 hover:decoration-black dark:decoration-white/40 dark:hover:decoration-white"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu Drawer Overlay & Aside */}
        <div
          aria-hidden={!menuOpen}
          className={`absolute inset-0 z-30 bg-black/65 transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={closeMenu}
        />
        <aside
          id="campus-navigation-menu"
          aria-label="Campus navigation menu"
          className={`absolute right-0 top-0 z-40 h-full w-full max-w-[560px] overflow-y-auto bg-white px-6 pb-12 pt-8 text-black shadow-2xl transition-transform duration-500 ease-out sm:px-10 sm:pt-10 ${
            menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
          }`}
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          <div className="flex items-start justify-between gap-6 border-b border-black pb-7">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-black/60">
                Campus navigation
              </p>
              <h2 className="mt-2 text-4xl font-normal sm:text-5xl">
                Explore USIU
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close campus navigation menu"
              onClick={closeMenu}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black transition-colors duration-300 hover:bg-black hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-8 space-y-10">
            {menuGroups.map((group) => (
              <section
                key={group.heading}
                aria-labelledby={`${group.heading}-menu-heading`}
              >
                <h3
                  id={`${group.heading}-menu-heading`}
                  className="text-sm uppercase tracking-[0.2em] text-black/60"
                >
                  {group.heading}
                </h3>
                <ul className="mt-3 divide-y divide-black/20">
                  {group.loading ? (
                    <li className="py-4 text-lg text-black/60">Loading…</li>
                  ) : group.items.length === 0 ? (
                    <li className="py-4 text-lg text-black/60">
                      Nothing to show here yet.
                    </li>
                  ) : (
                    group.items.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={closeMenu}
                          className="group flex items-center justify-between gap-5 py-4 text-xl transition-opacity duration-300 hover:opacity-60"
                        >
                          <span>{item.name}</span>
                          <ArrowRight
                            className="h-5 w-5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </section>
            ))}
          </div>
        </aside>
      </main>

      {/* Primary Navigation */}
      <nav
        aria-label="Primary navigation"
        className="flex min-h-24 w-full items-center justify-center overflow-x-auto bg-white px-6 dark:bg-neutral-900"
        style={{ fontFamily: '"Times New Roman", serif' }}
      >
        <ul className="flex min-w-max items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {[
            { label: "Home", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
            {
              label: "Maps and directions",
              onClick: () => document.getElementById("campus-map")?.scrollIntoView({ behavior: "smooth" }),
            },
            {
              label: "Navigate",
              onClick: () => { setSearchOpen(true); setMenuOpen(false); setSearchQuery(""); },
            },
            {
              label: "Favourites",
              ref: favouritesButtonRef,
              onClick: () => { setFavouritesOpen(true); setMenuOpen(false); setSearchOpen(false); },
            },
          ].map((item) => (
            <li key={item.label}>
              <button
                ref={item.ref}
                type="button"
                onClick={item.onClick}
                className="group relative whitespace-nowrap px-1 py-2 text-lg font-normal text-black dark:text-white sm:text-xl"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Building Directory Section */}
      <section
        aria-labelledby="building-addresses-heading"
        className="bg-white px-6 py-16 text-left dark:bg-black"
        style={{ fontFamily: '"Times New Roman", serif' }}
      >
        <h2
          id="building-addresses-heading"
          className="text-[60px] font-normal leading-tight text-black dark:text-white"
        >
          USIU building
          <br />
          addresses
        </h2>
        <div aria-hidden="true" className="mt-8 h-px w-full bg-black dark:bg-white" />
        <ul aria-label="Building directory" className="text-left text-black dark:text-white">
          <li className="group border-b border-black py-6 text-[40px] font-normal leading-relaxed dark:border-white">
            <div className="flex items-center justify-between">
              <span>Schools</span>
              <button
                type="button"
                aria-label={`${schoolsOpen ? "Collapse" : "Expand"} Schools`}
                aria-expanded={schoolsOpen}
                aria-controls="schools-dropdown"
                onClick={() => setSchoolsOpen((open) => !open)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black bg-white text-black transition-colors duration-300 group-hover:bg-black group-hover:text-white dark:border-white dark:bg-black dark:text-white dark:group-hover:bg-white dark:group-hover:text-black"
              >
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    schoolsOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>
            <ul
              id="schools-dropdown"
              className={`ml-8 list-disc overflow-hidden text-[1.375rem] font-bold leading-[2.25rem] transition-all duration-300 ${
                schoolsOpen ? "mt-8 max-h-[800px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {schoolsLoading ? (
                <li className="list-none py-2 pl-3 font-normal">Loading schools…</li>
              ) : (
                schools.map((school) => (
                  <li key={school.slug} className="py-2 pl-3">
                    <Link
                      to={`/schools/${school.slug}`}
                      className="block transition-opacity duration-300 hover:opacity-60"
                    >
                      {school.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </li>
          <li className="group border-b border-black py-6 text-[40px] font-normal leading-relaxed dark:border-white">
            <div className="flex items-center justify-between">
              <span>Cafeterias</span>
              <button
                type="button"
                aria-label={`${
                  cafeteriasOpen ? "Collapse" : "Expand"
                } Cafeterias`}
                aria-expanded={cafeteriasOpen}
                aria-controls="cafeterias-dropdown"
                onClick={() => setCafeteriasOpen((open) => !open)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black bg-white text-black transition-colors duration-300 group-hover:bg-black group-hover:text-white dark:border-white dark:bg-black dark:text-white dark:group-hover:bg-white dark:group-hover:text-black"
              >
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    cafeteriasOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>
            <ul
              id="cafeterias-dropdown"
              className={`ml-8 list-disc overflow-hidden text-[1.375rem] font-bold leading-[2.25rem] transition-all duration-300 ${
                cafeteriasOpen ? "mt-8 max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {cafeteriasLoading ? (
                <li className="list-none py-2 pl-3 font-normal">
                  Loading cafeterias…
                </li>
              ) : (
                cafeterias.map((cafeteria) => (
                  <li key={cafeteria.slug} className="py-2 pl-3">
                    <Link
                      to={`/cafeterias/${cafeteria.slug}`}
                      className="block transition-opacity duration-300 hover:opacity-60"
                    >
                      {cafeteria.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </li>
          {locationsLoading ? (
            <li className="border-b border-black py-6 text-[2.5rem] font-normal leading-relaxed text-black/60 dark:border-white dark:text-white/60">
              Loading…
            </li>
          ) : (
            locations.map((location) => (
              <li
                key={location.slug}
                className="group border-b border-black py-6 text-[2.5rem] font-normal leading-relaxed dark:border-white"
              >
                <div className="flex items-center justify-between">
                  <Link
                    to={`/locations/${location.slug}`}
                    className="transition-opacity duration-300 hover:opacity-60"
                  >
                    {location.name}
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>

        {/* Campus Map Grid Section */}
        <div
          id="campus-map"
          aria-labelledby="campus-map-heading"
          className="mt-20 grid grid-cols-1 items-center gap-12 pb-16 lg:grid-cols-2"
        >
          {/* Map Wrapper */}
          <div className="w-full overflow-hidden rounded-2xl shadow-sm">
            <Suspense fallback={<Skeleton className="h-[360px] w-full sm:h-[420px]" />}>
              <CampusMap pins={mapPins} />
            </Suspense>
          </div>

          {/* Text Content Block */}
          <div className="flex flex-col text-left text-black dark:text-white">
            <h3 id="campus-map-heading" className="text-[2.25rem] font-[550] leading-tight">
              Campus Map
            </h3>
            <p className="mt-4 text-[1.375rem] font-normal leading-relaxed">
              Use our official map to navigate USIU&apos;s campus and find auditoriums,
              libraries, and other important buildings.
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=-1.218056,36.879167"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex w-fit items-center gap-4 text-left text-[1.375rem] font-semibold text-black dark:text-white"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="relative whitespace-nowrap">
                Get directions in Google Maps
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"
                />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              {[
                "Report Copyright Infringement",
                "Report Security Issue",
                "Trademark Notice",
              ].map((item) => (
                <li key={item}>
                  <button type="button" className="text-center text-white">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center lg:justify-self-center">
            <h2 className="text-[24px] font-semibold leading-tight text-white">
              Website
            </h2>
            <ul className="mt-4 space-y-2 text-[18px] font-normal leading-relaxed text-white">
              {[
                "Accessibility",
                "Digital Accessibility",
                "Privacy Statement",
              ].map((item) => (
                <li key={item}>
                  <button type="button" className="text-center text-white">
                    {item}
                  </button>
                </li>
              ))}
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
          <div
            className="flex items-center gap-6 text-white sm:-translate-x-6"
            aria-label="Social media links"
          >
            <button
              type="button"
              aria-label="Instagram"
              className="transition-opacity duration-300 hover:opacity-60"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="TikTok"
              className="transition-opacity duration-300 hover:opacity-60"
            >
              <Music2 className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="LinkedIn"
              className="transition-opacity duration-300 hover:opacity-60"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Facebook"
              className="transition-opacity duration-300 hover:opacity-60"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="YouTube"
              className="transition-opacity duration-300 hover:opacity-60"
            >
              <Youtube className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}