import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Linking,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Location, LocationType } from "../types";
import { sampleLocations } from "../data/sampleData";

const LocationsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<LocationType | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const locationTypeColors = {
    [LocationType.MALL]: "#FF6B6B",
    [LocationType.PARK]: "#4ECDC4",
    [LocationType.MUSEUM]: "#45B7D1",
    [LocationType.THEATER]: "#96CEB4",
    [LocationType.RESTAURANT]: "#FECA57",
    [LocationType.PLAYGROUND]: "#FF9FF3",
    [LocationType.LIBRARY]: "#54A0FF",
    [LocationType.SPORTS_CENTER]: "#5F27CD",
    [LocationType.ENTERTAINMENT_CENTER]: "#FFA502",
  };

  const locationTypeIcons = {
    [LocationType.MALL]: "shopping",
    [LocationType.PARK]: "tree",
    [LocationType.MUSEUM]: "bank",
    [LocationType.THEATER]: "theater",
    [LocationType.RESTAURANT]: "silverware-fork-knife",
    [LocationType.PLAYGROUND]: "slide",
    [LocationType.LIBRARY]: "book-open-page-variant",
    [LocationType.SPORTS_CENTER]: "soccer",
    [LocationType.ENTERTAINMENT_CENTER]: "gamepad-variant",
  };

  const locationTypeLabels = {
    [LocationType.MALL]: "Centros Comerciales",
    [LocationType.PARK]: "Parques",
    [LocationType.MUSEUM]: "Museos",
    [LocationType.THEATER]: "Teatros",
    [LocationType.RESTAURANT]: "Restaurantes",
    [LocationType.PLAYGROUND]: "Parques Infantiles",
    [LocationType.LIBRARY]: "Bibliotecas",
    [LocationType.SPORTS_CENTER]: "Centros Deportivos",
    [LocationType.ENTERTAINMENT_CENTER]: "Centros de Entretenimiento",
  };

  const filteredLocations = sampleLocations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.amenities.some((amenity) =>
        amenity.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesType = !selectedType || location.type === selectedType;

    return matchesSearch && matchesType;
  });

  const openInMaps = (location: Location) => {
    const url = `https://maps.google.com/?q=${location.coordinates.latitude},${location.coordinates.longitude}`;
    Linking.openURL(url);
  };

  const callLocation = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const visitWebsite = (website: string) => {
    Linking.openURL(website);
  };

  const formatOpeningHours = (openingHours?: any) => {
    if (!openingHours) return "Horarios no disponibles";

    const today = new Date().getDay();
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const currentDay = days[today];

    if (openingHours[currentDay]) {
      return `Hoy: ${openingHours[currentDay]}`;
    }

    return "Horarios no disponibles";
  };

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
            placeholder="Buscar lugares..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedType && styles.filterButtonActive,
          ]}
          onPress={() => setShowFilters(true)}
        >
          <Icon
            name="filter-variant"
            size={20}
            color={selectedType ? "white" : "#666"}
          />
        </TouchableOpacity>
      </View>

      {/* Location Types */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.typesScroll}
      >
        <TouchableOpacity
          style={[
            styles.typeChip,
            { backgroundColor: selectedType === null ? "#007AFF" : "#f0f0f0" },
          ]}
          onPress={() => setSelectedType(null)}
        >
          <Text
            style={[
              styles.typeText,
              { color: selectedType === null ? "white" : "#666" },
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>
        {Object.values(LocationType).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeChip,
              {
                backgroundColor:
                  selectedType === type ? locationTypeColors[type] : "#f0f0f0",
              },
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Icon
              name={locationTypeIcons[type]}
              size={16}
              color={selectedType === type ? "white" : "#666"}
              style={styles.typeIcon}
            />
            <Text
              style={[
                styles.typeText,
                { color: selectedType === type ? "white" : "#666" },
              ]}
            >
              {locationTypeLabels[type]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Locations List */}
      <ScrollView style={styles.locationsList}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredLocations.length} lugar
            {filteredLocations.length !== 1 ? "es" : ""} encontrado
            {filteredLocations.length !== 1 ? "s" : ""}
          </Text>
        </View>

        {filteredLocations.map((location) => (
          <View key={location.id} style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <View
                style={[
                  styles.locationIcon,
                  { backgroundColor: locationTypeColors[location.type] },
                ]}
              >
                <Icon
                  name={locationTypeIcons[location.type]}
                  size={24}
                  color="white"
                />
              </View>

              <View style={styles.locationHeaderContent}>
                <Text style={styles.locationName} numberOfLines={2}>
                  {location.name}
                </Text>
                <View style={styles.locationMetaRow}>
                  <Icon name="map-marker" size={14} color="#666" />
                  <Text style={styles.locationMetaText} numberOfLines={2}>
                    {location.address}
                  </Text>
                </View>
                {location.rating && (
                  <View style={styles.locationMetaRow}>
                    <Icon name="star" size={14} color="#FFD700" />
                    <Text style={styles.locationMetaText}>
                      {location.rating}/5
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity style={styles.favoriteButton}>
                <Icon name="heart-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.locationInfo}>
              <Text style={styles.openingHours}>
                {formatOpeningHours(location.openingHours)}
              </Text>

              {location.amenities.length > 0 && (
                <View style={styles.amenitiesContainer}>
                  <Text style={styles.amenitiesTitle}>Servicios:</Text>
                  <View style={styles.amenitiesList}>
                    {location.amenities.slice(0, 3).map((amenity, index) => (
                      <View key={index} style={styles.amenityChip}>
                        <Text style={styles.amenityText}>{amenity}</Text>
                      </View>
                    ))}
                    {location.amenities.length > 3 && (
                      <View style={styles.amenityChip}>
                        <Text style={styles.amenityText}>
                          +{location.amenities.length - 3}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>

            <View style={styles.locationActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => openInMaps(location)}
              >
                <Icon name="directions" size={16} color="#007AFF" />
                <Text style={styles.actionButtonText}>Direcciones</Text>
              </TouchableOpacity>

              {location.phone && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => callLocation(location.phone!)}
                >
                  <Icon name="phone" size={16} color="#007AFF" />
                  <Text style={styles.actionButtonText}>Llamar</Text>
                </TouchableOpacity>
              )}

              {location.website && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => visitWebsite(location.website!)}
                >
                  <Icon name="web" size={16} color="#007AFF" />
                  <Text style={styles.actionButtonText}>Web</Text>
                </TouchableOpacity>
              )}
            </View>

            <View
              style={[
                styles.typeTag,
                { backgroundColor: locationTypeColors[location.type] },
              ]}
            >
              <Text style={styles.typeTagText}>
                {locationTypeLabels[location.type]}
              </Text>
            </View>
          </View>
        ))}

        {filteredLocations.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="map-marker-off" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>
              No se encontraron lugares
            </Text>
            <Text style={styles.emptyStateText}>
              Intenta ajustar tu búsqueda o filtros
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
            <Text style={styles.filterTitle}>Filtrar por tipo</Text>
            <TouchableOpacity onPress={() => setSelectedType(null)}>
              <Text style={styles.clearButton}>Limpiar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterContent}>
            <TouchableOpacity
              style={[
                styles.filterOption,
                selectedType === null && styles.filterOptionActive,
              ]}
              onPress={() => {
                setSelectedType(null);
                setShowFilters(false);
              }}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  selectedType === null && styles.filterOptionTextActive,
                ]}
              >
                Todos los lugares
              </Text>
            </TouchableOpacity>

            {Object.values(LocationType).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterOption,
                  selectedType === type && styles.filterOptionActive,
                ]}
                onPress={() => {
                  setSelectedType(type);
                  setShowFilters(false);
                }}
              >
                <Icon
                  name={locationTypeIcons[type]}
                  size={20}
                  color={
                    selectedType === type ? "white" : locationTypeColors[type]
                  }
                  style={styles.filterOptionIcon}
                />
                <Text
                  style={[
                    styles.filterOptionText,
                    selectedType === type && styles.filterOptionTextActive,
                  ]}
                >
                  {locationTypeLabels[type]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
  },
  typesScroll: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  typeChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  typeIcon: {
    marginRight: 5,
  },
  typeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  locationsList: {
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
  locationCard: {
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
    position: "relative",
  },
  locationHeader: {
    flexDirection: "row",
    marginBottom: 15,
  },
  locationIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  locationHeaderContent: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  locationMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  locationMetaText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
    flex: 1,
  },
  favoriteButton: {
    padding: 5,
  },
  locationInfo: {
    marginBottom: 15,
  },
  openingHours: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
    marginBottom: 10,
  },
  amenitiesContainer: {
    marginBottom: 10,
  },
  amenitiesTitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  amenitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  amenityChip: {
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  amenityText: {
    fontSize: 12,
    color: "#007AFF",
  },
  locationActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#f0f8ff",
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 12,
    color: "#007AFF",
    marginLeft: 5,
    fontWeight: "500",
  },
  typeTag: {
    position: "absolute",
    top: 15,
    right: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeTagText: {
    color: "white",
    fontSize: 10,
    fontWeight: "500",
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
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f8f9fa",
  },
  filterOptionActive: {
    backgroundColor: "#007AFF",
  },
  filterOptionIcon: {
    marginRight: 15,
  },
  filterOptionText: {
    fontSize: 16,
    color: "#333",
  },
  filterOptionTextActive: {
    color: "white",
  },
});

export default LocationsScreen;
