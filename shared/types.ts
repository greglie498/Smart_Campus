export interface DemoResponse {
  message: string;
}

export interface CampusEntity {
  slug: string;
  name: string;
  image: string;
  location: string;
}

export interface School extends CampusEntity {
  intro: string;
  departments: string[];
  facilities: string[];
}

export interface Cafeteria extends CampusEntity {
  description: string;
  hours: string;
  facilities: string[];
}

export interface Location extends CampusEntity {
  tagline: string;
  intro: string;
  hours: string;
  accessibility: string;
  details: string;
  features: string[];
  nearby: string[];

  latitude:number;
  longitude:number;

}

/** The category a search result belongs to — used to route to the right detail page. */
export type SearchResultCategory = "school" | "cafeteria" | "location";

export interface SearchResult {
  slug: string;
  name: string;
  category: SearchResultCategory;
  path: string;
}