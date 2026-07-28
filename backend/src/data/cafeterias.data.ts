import { Cafeteria } from "@shared/types";

export const cafeterias: Cafeteria[] = [
  {
    slug: "usiu-main-cafeteria",
    name: "USIU Cafeteria (Main Cafeteria)",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Fa6b4d3b8d20348d7a2bcfab222b5bfc6?format=webp&width=800&height=1200",
    description:
      "A central campus dining destination serving students, faculty, staff, and visitors throughout the academic day.",
    location: "Main Cafeteria, USIU-Africa campus",
    hours: "Monday-Friday, 7:30 AM-6:00 PM",
    facilities: ["Main campus courtyard", "Student centre", "Campus convenience services"],
  },
  {
    slug: "sironi",
    name: "Sironi",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Fd3c2d2cd4db944dbb11344ddf9ec6a84?format=webp&width=800&height=1200",
    description:
      "A welcoming dining space for relaxed meals, coffee breaks, and informal conversations between classes.",
    location: "Sironi, USIU-Africa campus",
    hours: "Monday-Friday, 8:00 AM-5:00 PM",
    facilities: ["Library", "Student study areas", "Outdoor campus paths"],
  },
  {
    slug: "pauls-caffe",
    name: "Paul's Caffe",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Ff351240502a44440b291f69cfbc8e753?format=webp&width=800&height=1200",
    description:
      "A convenient café stop for refreshments, quick meals, and casual meetings on campus.",
    location: "Paul's Caffe, USIU-Africa campus",
    hours: "Monday-Friday, 8:00 AM-5:00 PM",
    facilities: ["Academic buildings", "Collaborative spaces", "Campus shuttle access"],
  },
  {
    slug: "caffe-latta",
    name: "Caffe Latta",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F49c1ce22bccc4c7cac44f44971fa35f8%2Fa4217872839a435c86435d61186531ea?format=webp&width=800&height=1200",
    description:
      "A relaxed café setting for coffee, light meals, and a quiet pause during the university day.",
    location: "Caffe Latta, USIU-Africa campus",
    hours: "Monday-Friday, 8:00 AM-5:00 PM",
    facilities: ["Lecture halls", "Campus gardens", "Student services"],
  },
];