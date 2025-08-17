import { Event, Location, EventCategory, LocationType, AgeRange } from '../types';

export const sampleLocations: Location[] = [
  {
    id: '1',
    name: 'Centro Comercial Plaza Mayor',
    address: 'Av. Principal 123, Centro',
    city: 'Mi Ciudad',
    coordinates: {
      latitude: -12.0464,
      longitude: -77.0428
    },
    type: LocationType.MALL,
    phone: '+1234567890',
    website: 'https://plazamayor.com',
    openingHours: {
      monday: '10:00 - 22:00',
      tuesday: '10:00 - 22:00',
      wednesday: '10:00 - 22:00',
      thursday: '10:00 - 22:00',
      friday: '10:00 - 23:00',
      saturday: '10:00 - 23:00',
      sunday: '11:00 - 21:00'
    },
    amenities: ['Estacionamiento', 'Área de juegos', 'Patio de comidas', 'Baños familiares'],
    rating: 4.3,
    imageUrl: 'https://example.com/plaza-mayor.jpg'
  },
  {
    id: '2',
    name: 'Parque Central',
    address: 'Calle Verde 456, Zona Norte',
    city: 'Mi Ciudad',
    coordinates: {
      latitude: -12.0564,
      longitude: -77.0528
    },
    type: LocationType.PARK,
    openingHours: {
      monday: '06:00 - 18:00',
      tuesday: '06:00 - 18:00',
      wednesday: '06:00 - 18:00',
      thursday: '06:00 - 18:00',
      friday: '06:00 - 18:00',
      saturday: '06:00 - 19:00',
      sunday: '06:00 - 19:00'
    },
    amenities: ['Juegos infantiles', 'Canchas deportivas', 'Área de picnic', 'Senderos'],
    rating: 4.7,
    imageUrl: 'https://example.com/parque-central.jpg'
  },
  {
    id: '3',
    name: 'Museo de Ciencias para Niños',
    address: 'Av. Educación 789, Zona Cultural',
    city: 'Mi Ciudad',
    coordinates: {
      latitude: -12.0364,
      longitude: -77.0328
    },
    type: LocationType.MUSEUM,
    phone: '+1234567891',
    website: 'https://museociencias.com',
    openingHours: {
      tuesday: '09:00 - 17:00',
      wednesday: '09:00 - 17:00',
      thursday: '09:00 - 17:00',
      friday: '09:00 - 17:00',
      saturday: '10:00 - 18:00',
      sunday: '10:00 - 18:00'
    },
    amenities: ['Exhibiciones interactivas', 'Talleres', 'Cafetería', 'Tienda de regalos'],
    rating: 4.8,
    imageUrl: 'https://example.com/museo-ciencias.jpg'
  },
  {
    id: '4',
    name: 'Teatro Infantil Luna',
    address: 'Calle Arte 321, Centro Histórico',
    city: 'Mi Ciudad',
    coordinates: {
      latitude: -12.0264,
      longitude: -77.0228
    },
    type: LocationType.THEATER,
    phone: '+1234567892',
    website: 'https://teatroluna.com',
    amenities: ['Aire acondicionado', 'Butacas especiales para niños', 'Cafetería'],
    rating: 4.5,
    imageUrl: 'https://example.com/teatro-luna.jpg'
  }
];

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Show de Payasos Divertidos',
    description: 'Un espectáculo lleno de risas, malabares y trucos de magia que encantará a toda la familia. Los payasos interactúan con el público y crean un ambiente mágico.',
    category: EventCategory.SHOWS,
    location: sampleLocations[0],
    startDate: new Date('2024-01-15T16:00:00'),
    endDate: new Date('2024-01-15T17:30:00'),
    price: 25,
    isFree: false,
    ageRange: { min: 3, max: 12 },
    imageUrl: 'https://example.com/payasos.jpg',
    website: 'https://plazamayor.com/eventos',
    phone: '+1234567890',
    rating: 4.2,
    tags: ['diversión', 'entretenimiento', 'familiar', 'interior']
  },
  {
    id: '2',
    title: 'Taller de Ciencias: Volcanes Caseros',
    description: 'Los niños aprenderán sobre volcanes y reacciones químicas mientras crean sus propios volcanes que realmente erupcionan. Incluye materiales y certificado.',
    category: EventCategory.EDUCATIONAL,
    location: sampleLocations[2],
    startDate: new Date('2024-01-20T10:00:00'),
    endDate: new Date('2024-01-20T12:00:00'),
    price: 0,
    isFree: true,
    ageRange: { min: 6, max: 14 },
    imageUrl: 'https://example.com/volcanes.jpg',
    website: 'https://museociencias.com/talleres',
    phone: '+1234567891',
    rating: 4.9,
    tags: ['educativo', 'ciencia', 'experimentos', 'gratis']
  },
  {
    id: '3',
    title: 'Festival de Cometas en el Parque',
    description: 'Evento familiar donde podrás volar cometas, participar en concursos y disfrutar de actividades al aire libre. Habrá venta de cometas y refrigerios.',
    category: EventCategory.OUTDOOR,
    location: sampleLocations[1],
    startDate: new Date('2024-01-25T09:00:00'),
    endDate: new Date('2024-01-25T17:00:00'),
    price: 0,
    isFree: true,
    ageRange: { min: 4, max: 16 },
    imageUrl: 'https://example.com/cometas.jpg',
    rating: 4.6,
    tags: ['aire libre', 'deporte', 'familia', 'gratis', 'parque']
  },
  {
    id: '4',
    title: 'Obra de Teatro: El Principito',
    description: 'Una adaptación musical del clásico cuento de Antoine de Saint-Exupéry. Una experiencia emotiva y educativa para toda la familia.',
    category: EventCategory.CULTURAL,
    location: sampleLocations[3],
    startDate: new Date('2024-01-28T15:00:00'),
    endDate: new Date('2024-01-28T16:30:00'),
    price: 35,
    isFree: false,
    ageRange: { min: 5, max: 15 },
    imageUrl: 'https://example.com/principito.jpg',
    website: 'https://teatroluna.com/obras',
    phone: '+1234567892',
    rating: 4.7,
    tags: ['teatro', 'musical', 'cultura', 'literatura']
  },
  {
    id: '5',
    title: 'Competencia de Natación Infantil',
    description: 'Competencia amistosa de natación para niños de diferentes edades. Incluye medallas para todos los participantes y refrigerios.',
    category: EventCategory.SPORTS,
    location: {
      id: '5',
      name: 'Centro Acuático Municipal',
      address: 'Av. Deportes 555, Zona Sur',
      city: 'Mi Ciudad',
      coordinates: { latitude: -12.0664, longitude: -77.0628 },
      type: LocationType.SPORTS_CENTER,
      phone: '+1234567893',
      amenities: ['Piscina olímpica', 'Vestidores', 'Cafetería', 'Estacionamiento'],
      rating: 4.4
    },
    startDate: new Date('2024-02-03T09:00:00'),
    endDate: new Date('2024-02-03T12:00:00'),
    price: 15,
    isFree: false,
    ageRange: { min: 6, max: 16 },
    imageUrl: 'https://example.com/natacion.jpg',
    rating: 4.3,
    tags: ['deporte', 'natación', 'competencia', 'medallas']
  },
  {
    id: '6',
    title: 'Taller de Repostería: Cupcakes Decorados',
    description: 'Los niños aprenderán a hacer y decorar cupcakes deliciosos. Se llevan sus creaciones a casa. Incluye delantal y todos los ingredientes.',
    category: EventCategory.WORKSHOPS,
    location: sampleLocations[0],
    startDate: new Date('2024-02-10T14:00:00'),
    endDate: new Date('2024-02-10T16:00:00'),
    price: 30,
    isFree: false,
    ageRange: { min: 5, max: 12 },
    imageUrl: 'https://example.com/cupcakes.jpg',
    rating: 4.5,
    tags: ['cocina', 'repostería', 'creatividad', 'taller']
  }
];

export const categoryColors = {
  [EventCategory.SHOWS]: '#FF6B6B',
  [EventCategory.WORKSHOPS]: '#4ECDC4',
  [EventCategory.SPORTS]: '#45B7D1',
  [EventCategory.OUTDOOR]: '#96CEB4',
  [EventCategory.EDUCATIONAL]: '#FECA57',
  [EventCategory.ENTERTAINMENT]: '#FF9FF3',
  [EventCategory.CULTURAL]: '#54A0FF',
  [EventCategory.SEASONAL]: '#FFA502'
};

export const categoryIcons = {
  [EventCategory.SHOWS]: 'theater-masks',
  [EventCategory.WORKSHOPS]: 'hammer',
  [EventCategory.SPORTS]: 'football',
  [EventCategory.OUTDOOR]: 'tree',
  [EventCategory.EDUCATIONAL]: 'school',
  [EventCategory.ENTERTAINMENT]: 'gamepad-variant',
  [EventCategory.CULTURAL]: 'palette',
  [EventCategory.SEASONAL]: 'calendar-star'
};
