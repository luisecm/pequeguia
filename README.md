# PequeGuía 🧸

Una aplicación móvil desarrollada en React Native que funciona como guía práctica para padres, ayudándoles a encontrar eventos, actividades y lugares perfectos para sus hijos.

## 🚀 Características Principales

### 🏠 **Pantalla de Inicio**
- Vista general de eventos próximos
- Búsqueda rápida de eventos y lugares
- Filtrado por categorías con chips interactivos
- Estadísticas rápidas (eventos totales, lugares, eventos gratuitos)
- Tarjetas de eventos con información detallada

### 📅 **Eventos**
- Lista completa de eventos con filtros avanzados
- Búsqueda por título, descripción o ubicación
- Filtrado por categorías y precio (gratis/pago)
- Información detallada: fecha, ubicación, edad recomendada, precio
- Sistema de favoritos y calificaciones

### 📍 **Lugares**
- Directorio de ubicaciones kid-friendly
- Filtrado por tipo (centros comerciales, parques, museos, etc.)
- Información de contacto y horarios
- Servicios y amenidades disponibles
- Integración con mapas para direcciones
- Enlaces directos para llamar o visitar sitios web

### 👤 **Perfil**
- Gestión de información personal
- Registro de hijos con edades e intereses
- Recomendaciones personalizadas basadas en las edades
- Configuración de preferencias
- Gestión de favoritos

## 🎯 **Categorías de Eventos**

- **Shows**: Espectáculos, obras de teatro, presentaciones
- **Talleres**: Actividades educativas y creativas
- **Deportes**: Competencias y actividades físicas
- **Aire Libre**: Actividades en parques y espacios abiertos
- **Educativos**: Talleres de ciencias, museos interactivos
- **Entretenimiento**: Juegos, diversión general
- **Culturales**: Arte, música, literatura
- **Estacionales**: Eventos especiales por temporada

## 🏢 **Tipos de Lugares**

- **Centros Comerciales**: Malls con áreas de juego y entretenimiento
- **Parques**: Espacios verdes y áreas de recreación
- **Museos**: Centros educativos y culturales
- **Teatros**: Espacios para espectáculos
- **Restaurantes**: Lugares kid-friendly para comer
- **Parques Infantiles**: Áreas de juego especializadas
- **Bibliotecas**: Espacios de lectura y actividades educativas
- **Centros Deportivos**: Instalaciones para actividades físicas
- **Centros de Entretenimiento**: Lugares de diversión familiar

## 🛠 **Tecnologías Utilizadas**

- **React Native 0.72.6**: Framework principal
- **TypeScript**: Tipado estático
- **React Navigation 6**: Navegación entre pantallas
- **React Native Vector Icons**: Iconografía
- **React Native Maps**: Integración con mapas (preparado)
- **AsyncStorage**: Almacenamiento local (preparado)

## 📱 **Estructura del Proyecto**

```
src/
├── components/          # Componentes reutilizables
├── screens/            # Pantallas principales
│   ├── HomeScreen.tsx
│   ├── EventsScreen.tsx
│   ├── LocationsScreen.tsx
│   └── ProfileScreen.tsx
├── types/              # Definiciones TypeScript
├── data/               # Datos de ejemplo
├── utils/              # Utilidades
└── App.tsx            # Componente principal
```

## 🎨 **Diseño y UX**

- **Colores por categoría**: Cada tipo de evento tiene un color distintivo
- **Iconografía consistente**: Íconos Material Design para mejor usabilidad
- **Navegación intuitiva**: Tab navigation con íconos claros
- **Filtros avanzados**: Modales dedicados para refinamiento de búsquedas
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Accesibilidad**: Textos legibles y contrastes apropiados

## 🚀 **Instalación y Configuración**

1. **Instalar dependencias**:
   ```bash
   npm install
   # o
   yarn install
   ```

2. **Configurar iOS** (solo para iOS):
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   ```

## 📈 **Roadmap Futuro**

### 🔜 **Próximas Características**
- [ ] Integración con API real
- [ ] Sistema de autenticación
- [ ] Notificaciones push para eventos
- [ ] Reservas y compra de tickets
- [ ] Sistema de reseñas y comentarios
- [ ] Integración con calendario
- [ ] Modo offline
- [ ] Geolocalización en tiempo real

### 🌟 **Expansión**
- [ ] Soporte para múltiples ciudades
- [ ] Recomendaciones con IA
- [ ] Red social de padres
- [ ] Sistema de puntos y gamificación
- [ ] Chat comunitario
- [ ] Eventos privados organizados por usuarios

## 🎯 **Público Objetivo**

- **Padres de familia** buscando actividades para sus hijos
- **Cuidadores** que necesitan opciones de entretenimiento
- **Familias nuevas en la ciudad** que quieren explorar opciones locales
- **Organizadores de eventos** que quieren promocionar actividades familiares

## 💡 **Valor Diferencial**

- **Curado especialmente para padres**: Toda la información relevante en un solo lugar
- **Filtros inteligentes**: Búsqueda por edad, precio, ubicación y preferencias
- **Información práctica**: Horarios, precios, contactos, todo lo que un padre necesita saber
- **Comunidad local**: Focus en eventos y lugares de la ciudad específica
- **Experiencia móvil optimizada**: Diseñado para consulta rápida sobre la marcha

- ## 💡 **Screenshots**

<img width="461" height="899" alt="image" src="https://github.com/user-attachments/assets/1c9dc86e-25b6-4afc-aaba-1cb03ea6f4f0" />

<img width="480" height="946" alt="image" src="https://github.com/user-attachments/assets/6abfaff4-865a-4c4a-afc2-98932eedea29" />

<img width="433" height="890" alt="image" src="https://github.com/user-attachments/assets/02e5edee-9c29-49df-b5bc-3f6af64bdb68" />

<img width="446" height="891" alt="image" src="https://github.com/user-attachments/assets/f361a980-9ef4-4048-a257-0ce0928eb6fa" />


---
