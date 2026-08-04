export type ListingStatus = "Active" | "Pending" | "Rented" | "Draft";

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
  createdAt?: string;
  status?: ListingStatus;
};

export const LISTINGS_STORAGE_KEY = "4rent_room_listings";

export const SITE_CONTACT = {
  whatsapp: "+256 700 000 000",
  call: "+256 700 111 111",
  email: "support@4rent.co.ug",
} as const;

export function formatPhoneForLink(phone: string) {
  return phone.replace(/\s+/g, "").replace(/\+/g, "");
}

export function formatListingTimestamp(dateInput?: string | number | Date) {
  if (!dateInput) {
    return "today";
  }

  const target = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(target.getTime())) {
    return "today";
  }

  const now = new Date();
  const diffMs = now.getTime() - target.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return "1 month ago";
  return `${Math.floor(diffDays / 30)} months ago`;
}

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

export const listings: Listing[] = Array.from({ length: 24 }, (_, index) => {
  const id = index + 1;
  const images = [
    `/images/listings/${id}/img1.svg`,
    `/images/listings/${id}/img2.svg`,
    `/images/listings/${id}/img3.svg`,
    `/images/listings/${id}/img4.svg`,
  ];

  const dateOffsets = [0, 1, 6, 14, 21, 45];
  const createdAt = new Date(Date.now() - dateOffsets[index % dateOffsets.length] * 24 * 60 * 60 * 1000).toISOString();

  return ({
  id: index + 1,
  title: ["Cozy Single Room", "Bright Double Room", "Self Contained Studio"][index % 3],
  location: ["Kampala", "Entebbe", "Jinja", "Gulu"][index % 4],
  rooms: ["1 room", "2 rooms", "3 rooms"][index % 3],
  type: ["Single Room", "Double Room", "Self Contained"][index % 3],
  posted: formatListingTimestamp(createdAt),
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
  contact: SITE_CONTACT.whatsapp,
  createdAt,
  status: "Active",
  });
});

export function getStoredListings(): Listing[] {
  if (typeof window === "undefined") return listings;

  try {
    const raw = window.localStorage.getItem(LISTINGS_STORAGE_KEY);
    if (raw === null) {
      window.localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(listings));
      return listings;
    }

    const parsed = JSON.parse(raw) as Listing[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : listings;
  } catch {
    return listings;
  }
}

export function saveStoredListings(data: Listing[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("4rent:rooms-updated", { detail: data }));
  }
}

export function getWebListings(): Listing[] {
  return getStoredListings();
}
