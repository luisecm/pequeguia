import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Event, EventCategory, FilterOptions } from "../types";
import {
  sampleEvents,
  categoryColors,
  categoryIcons,
} from "../data/sampleData";

const { width } = Dimensions.get("window");

const EventsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    isFree: undefined,
  });

  const filteredEvents = sampleEvents
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(event.category);

      const matchesPrice =
        filters.isFree === undefined || event.isFree === filters.isFree;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

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

  const toggleCategoryFilter = (category: EventCategory) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      isFree: undefined,
    });
  };

  const activeFiltersCount =
    filters.categories.length + (filters.isFree !== undefined ? 1 : 0);

  return (
    <View style={styles.container}>
      {/* Search and Filter Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon
            name="magnify"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar eventos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFiltersCount > 0 && styles.filterButtonActive,
          ]}
          onPress={() => setShowFilters(true)}
        >
          <Icon
            name="filter-variant"
            size={20}
            color={activeFiltersCount > 0 ? "white" : "#666"}
          />
          {activeFiltersCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <ScrollView style={styles.eventsList}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredEvents.length} evento
            {filteredEvents.length !== 1 ? "s" : ""} encontrado
            {filteredEvents.length !== 1 ? "s" : ""}
          </Text>
        </View>

        {filteredEvents.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View
                style={[
                  styles.eventImagePlaceholder,
                  { backgroundColor: categoryColors[event.category] },
                ]}
              >
                <Icon
                  name={categoryIcons[event.category]}
                  size={24}
                  color="white"
                />
              </View>
              <View style={styles.eventHeaderContent}>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  {event.title}
                </Text>
                <View style={styles.eventMetaRow}>
                  <Icon name="calendar" size={14} color="#666" />
                  <Text style={styles.eventMetaText}>
                    {formatDate(event.startDate)}
                  </Text>
                </View>
                <View style={styles.eventMetaRow}>
                  <Icon name="map-marker" size={14} color="#666" />
                  <Text style={styles.eventMetaText} numberOfLines={1}>
                    {event.location.name}
                  </Text>
                </View>
              </View>
              <View style={styles.eventPrice}>
                <Text
                  style={[styles.priceText, event.isFree && styles.freeText]}
                >
                  {formatPrice(event.price, event.isFree)}
                </Text>
                <View style={styles.ageRange}>
                  <Icon name="baby-face" size={12} color="#666" />
                  <Text style={styles.ageRangeText}>
                    {event.ageRange.min}-{event.ageRange.max}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.eventDescription} numberOfLines={3}>
              {event.description}
            </Text>

            <View style={styles.eventFooter}>
              <View
                style={[
                  styles.categoryTag,
                  { backgroundColor: categoryColors[event.category] },
                ]}
              >
                <Text style={styles.categoryTagText}>
                  {event.category.charAt(0).toUpperCase() +
                    event.category.slice(1)}
                </Text>
              </View>

              {event.rating && (
                <View style={styles.rating}>
                  <Icon name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{event.rating}</Text>
                </View>
              )}

              <TouchableOpacity style={styles.favoriteButton}>
                <Icon name="heart-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {filteredEvents.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="calendar-remove" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>
              No se encontraron eventos
            </Text>
            <Text style={styles.emptyStateText}>
              Intenta ajustar tus filtros o búsqueda
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.filterModal}>
          <View style={styles.filterHeader}>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.filterTitle}>Filtros</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearButton}>Limpiar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterContent}>
            {/* Categories */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Categorías</Text>
              <View style={styles.categoriesGrid}>
                {Object.values(EventCategory).map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryFilterChip,
                      filters.categories.includes(category) && {
                        backgroundColor: categoryColors[category],
                      },
                    ]}
                    onPress={() => toggleCategoryFilter(category)}
                  >
                    <Icon
                      name={categoryIcons[category]}
                      size={16}
                      color={
                        filters.categories.includes(category) ? "white" : "#666"
                      }
                      style={styles.categoryFilterIcon}
                    />
                    <Text
                      style={[
                        styles.categoryFilterText,
                        filters.categories.includes(category) && {
                          color: "white",
                        },
                      ]}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Precio</Text>
              <View style={styles.priceFilters}>
                <TouchableOpacity
                  style={[
                    styles.priceFilterChip,
                    filters.isFree === undefined &&
                      styles.priceFilterChipActive,
                  ]}
                  onPress={() =>
                    setFilters((prev) => ({ ...prev, isFree: undefined }))
                  }
                >
                  <Text
                    style={[
                      styles.priceFilterText,
                      filters.isFree === undefined &&
                        styles.priceFilterTextActive,
                    ]}
                  >
                    Todos
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priceFilterChip,
                    filters.isFree === true && styles.priceFilterChipActive,
                  ]}
                  onPress={() =>
                    setFilters((prev) => ({ ...prev, isFree: true }))
                  }
                >
                  <Text
                    style={[
                      styles.priceFilterText,
                      filters.isFree === true && styles.priceFilterTextActive,
                    ]}
                  >
                    Gratis
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priceFilterChip,
                    filters.isFree === false && styles.priceFilterChipActive,
                  ]}
                  onPress={() =>
                    setFilters((prev) => ({ ...prev, isFree: false }))
                  }
                >
                  <Text
                    style={[
                      styles.priceFilterText,
                      filters.isFree === false && styles.priceFilterTextActive,
                    ]}
                  >
                    De pago
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.filterFooter}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.applyButtonText}>
                Aplicar filtros ({filteredEvents.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  filterButton: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    position: "relative",
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
  },
  filterBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  eventsList: {
    flex: 1,
  },
  resultsHeader: {
    padding: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  resultsText: {
    fontSize: 14,
    color: "#666",
  },
  eventCard: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  eventHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  eventImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  eventHeaderContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
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
  eventPrice: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  freeText: {
    color: "#34C759",
  },
  ageRange: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ageRangeText: {
    fontSize: 10,
    color: "#007AFF",
    marginLeft: 3,
    fontWeight: "500",
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 15,
  },
  eventFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryTagText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 3,
  },
  favoriteButton: {
    padding: 5,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginTop: 15,
    marginBottom: 5,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  filterModal: {
    flex: 1,
    backgroundColor: "white",
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  clearButton: {
    fontSize: 16,
    color: "#007AFF",
  },
  filterContent: {
    flex: 1,
    padding: 15,
  },
  filterSection: {
    marginBottom: 30,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryFilterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginBottom: 10,
  },
  categoryFilterIcon: {
    marginRight: 5,
  },
  categoryFilterText: {
    fontSize: 14,
    color: "#666",
  },
  priceFilters: {
    flexDirection: "row",
    gap: 10,
  },
  priceFilterChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  priceFilterChipActive: {
    backgroundColor: "#007AFF",
  },
  priceFilterText: {
    fontSize: 14,
    color: "#666",
  },
  priceFilterTextActive: {
    color: "white",
  },
  filterFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  applyButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventsScreen;
