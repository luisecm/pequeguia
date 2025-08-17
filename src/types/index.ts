export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: Location;
  startDate: Date;
  endDate: Date;
  price: number;
  isFree: boolean;
  ageRange: AgeRange;
  imageUrl?: string;
  website?: string;
  phone?: string;
  rating?: number;
  reviews?: Review[];
  tags: string[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: LocationType;
  phone?: string;
  website?: string;
  openingHours?: OpeningHours;
  amenities: string[];
  rating?: number;
  imageUrl?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface AgeRange {
  min: number;
  max: number;
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export enum EventCategory {
  SHOWS = 'shows',
  WORKSHOPS = 'workshops',
  SPORTS = 'sports',
  OUTDOOR = 'outdoor',
  EDUCATIONAL = 'educational',
  ENTERTAINMENT = 'entertainment',
  CULTURAL = 'cultural',
  SEASONAL = 'seasonal'
}

export enum LocationType {
  MALL = 'mall',
  PARK = 'park',
  MUSEUM = 'museum',
  THEATER = 'theater',
  RESTAURANT = 'restaurant',
  PLAYGROUND = 'playground',
  LIBRARY = 'library',
  SPORTS_CENTER = 'sports_center',
  ENTERTAINMENT_CENTER = 'entertainment_center'
}

export interface FilterOptions {
  categories: EventCategory[];
  ageRange?: AgeRange;
  priceRange?: {
    min: number;
    max: number;
  };
  isFree?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  distance?: number;
  locationTypes?: LocationType[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  children: Child[];
  favoriteEvents: string[];
  favoriteLocations: string[];
}

export interface Child {
  id: string;
  name: string;
  age: number;
  interests: string[];
}
