import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Event, EventCategory } from "../types";
import {
  sampleEvents,
  categoryColors,
  categoryIcons,
} from "../data/sampleData";

const { width } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<EventCategory | null>(null);

  const upcomingEvents = sampleEvents
    .filter((event) => new Date(event.startDate) > new Date())
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    .slice(0, 5);

  const categories = Object.values(EventCategory);

  const filteredEvents = upcomingEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const formatPrice = (price: number, isFree: boolean) => {
    if (isFree) return "Gratis";
    return `$${price}`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Hola papá!</Text>
        <Text style={styles.subtitle}>
          Descubre actividades increíbles para tus pequeños
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar eventos, lugares..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categorías</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          <TouchableOpacity
            style={[
              styles.categoryChip,
              {
                backgroundColor:
                  selectedCategory === null ? "#007AFF" : "#f0f0f0",
              },
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.categoryText,
                { color: selectedCategory === null ? "white" : "#666" },
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    selectedCategory === category
                      ? categoryColors[category]
                      : "#f0f0f0",
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Icon
                name={categoryIcons[category]}
                size={16}
                color={selectedCategory === category ? "white" : "#666"}
                style={styles.categoryIcon}
              />
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory === category ? "white" : "#666" },
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Events */}
      <View style={styles.eventsContainer}>
        <Text style={styles.sectionTitle}>Próximos Eventos</Text>
        {filteredEvents.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <View style={styles.eventImageContainer}>
              <View
                style={[
                  styles.eventImagePlaceholder,
                  { backgroundColor: categoryColors[event.category] },
                ]}
              >
                <Icon
                  name={categoryIcons[event.category]}
                  size={30}
                  color="white"
                />
              </View>
              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: categoryColors[event.category] },
                ]}
              >
                <Text style={styles.categoryBadgeText}>
                  {event.category.charAt(0).toUpperCase() +
                    event.category.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.eventContent}>
              <Text style={styles.eventTitle} numberOfLines={2}>
                {event.title}
              </Text>
              <Text style={styles.eventDescription} numberOfLines={2}>
                {event.description}
              </Text>

              <View style={styles.eventMeta}>
                <View style={styles.eventMetaRow}>
                  <Icon name="calendar" size={14} color="#666" />
                  <Text style={styles.eventMetaText}>
                    {formatDate(event.startDate)}
                  </Text>
                </View>
                <View style={styles.eventMetaRow}>
                  <Icon name="map-marker" size={14} color="#666" />
                  <Text style={styles.eventMetaText}>
                    {event.location.name}
                  </Text>
                </View>
                <View style={styles.eventMetaRow}>
                  <Icon name="currency-usd" size={14} color="#666" />
                  <Text style={styles.eventMetaText}>
                    {formatPrice(event.price, event.isFree)}
                  </Text>
                </View>
              </View>

              <View style={styles.ageRange}>
                <Icon name="baby-face" size={14} color="#666" />
                <Text style={styles.ageRangeText}>
                  {event.ageRange.min}-{event.ageRange.max} años
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="calendar-check" size={24} color="#007AFF" />
          <Text style={styles.statNumber}>{sampleEvents.length}</Text>
          <Text style={styles.statLabel}>Eventos</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="map-marker-multiple" size={24} color="#007AFF" />
          <Text style={styles.statNumber}>
            {new Set(sampleEvents.map((e) => e.location.id)).size}
          </Text>
          <Text style={styles.statLabel}>Lugares</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="gift" size={24} color="#007AFF" />
          <Text style={styles.statNumber}>
            {sampleEvents.filter((e) => e.isFree).length}
          </Text>
          <Text style={styles.statLabel}>Gratis</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    backgroundColor: "white",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesScroll: {
    paddingLeft: 15,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryIcon: {
    marginRight: 5,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 15,
    marginBottom: 15,
  },
  eventsContainer: {
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImageContainer: {
    position: "relative",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  eventImagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  categoryBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  eventContent: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  eventMeta: {
    marginBottom: 10,
  },
  eventMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  eventMetaText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
    flex: 1,
  },
  ageRange: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  ageRangeText: {
    fontSize: 12,
    color: "#007AFF",
    marginLeft: 5,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  statCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
});

export default HomeScreen;
