export type Listing = {
  id: number;
  title: string;
  location: string;
  rooms: string;
  type: string;
  posted: string;
  price: string;
  amount: number;
  image: string;
  images?: string[];
  description: string;
  size: string;
  bathrooms: string;
  furnished: string;
  deposit: string;
  availability: string;
  contact: string;
};

export const listingImages = [
  "https://images.unsplash.com/photo-1484154218962-a1b7a2f0e6f3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
];

export const heroImages = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
];

export const loginBackgroundImages = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1000&q=80",
];

export const listings: Listing[] = Array.from({ length: 24 }, (_, index) => {
  const id = index + 1;
  const images = [
    `/images/listings/${id}/img1.svg`,
    `/images/listings/${id}/img2.svg`,
    `/images/listings/${id}/img3.svg`,
    `/images/listings/${id}/img4.svg`,
  ];

  return ({
  id: index + 1,
  title: ["Cozy Single Room", "Bright Double Room", "Self Contained Studio"][index % 3],
  location: ["Kampala", "Entebbe", "Jinja", "Gulu"][index % 4],
  rooms: ["1 room", "2 rooms", "3 rooms"][index % 3],
  type: ["Single Room", "Double Room", "Self Contained"][index % 3],
  posted: ["2 hours ago", "Today", "1 day ago", "3 days ago"][index % 4],
  price: ["UGX 200,000", "UGX 350,000", "UGX 450,000", "UGX 600,000"][index % 4],
  amount: [200000, 350000, 450000, 600000][index % 4],
  image: images[0],
  images,
  description:
    "Bright, well-kept space with secure access, reliable internet, and a calm neighborhood that makes it easy to relax after work.",
  size: ["20 sqm", "30 sqm", "45 sqm"][index % 3],
  bathrooms: ["1 bathroom", "2 bathrooms", "1 ensuite bathroom"][index % 3],
  furnished: ["Semi-furnished", "Fully furnished", "Furnished with kitchenware"][index % 3],
  deposit: ["1 month", "2 months", "1.5 months"][index % 3],
  availability: ["Available now", "Available this week", "Available next month"][index % 3],
  contact: "+256 700 000 000",
  });
});
