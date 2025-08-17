import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { User, Child } from "../types";

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Carlos Rodríguez",
    email: "carlos@email.com",
    children: [
      {
        id: "1",
        name: "Sofía",
        age: 7,
        interests: ["teatro", "arte", "música"],
      },
      {
        id: "2",
        name: "Diego",
        age: 4,
        interests: ["deportes", "parques", "juegos"],
      },
    ],
    favoriteEvents: [],
    favoriteLocations: [],
  });

  const [showAddChild, setShowAddChild] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [newChild, setNewChild] = useState({
    name: "",
    age: "",
    interests: "",
  });
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const addChild = () => {
    if (!newChild.name || !newChild.age) {
      Alert.alert("Error", "Por favor completa el nombre y la edad");
      return;
    }

    const child: Child = {
      id: Date.now().toString(),
      name: newChild.name,
      age: parseInt(newChild.age),
      interests: newChild.interests
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i),
    };

    setUser((prev) => ({
      ...prev,
      children: [...prev.children, child],
    }));

    setNewChild({ name: "", age: "", interests: "" });
    setShowAddChild(false);
  };

  const removeChild = (childId: string) => {
    Alert.alert(
      "Confirmar",
      "¿Estás seguro de que quieres eliminar este niño de tu perfil?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setUser((prev) => ({
              ...prev,
              children: prev.children.filter((child) => child.id !== childId),
            }));
          },
        },
      ]
    );
  };

  const updateProfile = () => {
    setUser((prev) => ({
      ...prev,
      name: editName,
      email: editEmail,
    }));
    setShowEditProfile(false);
  };

  const getAgeGroupRecommendations = () => {
    const ages = user.children.map((child) => child.age);
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);

    if (minAge <= 3)
      return "Eventos para primera infancia y actividades sensoriales";
    if (minAge <= 6) return "Actividades preescolares y juegos educativos";
    if (minAge <= 10)
      return "Deportes, talleres creativos y aventuras al aire libre";
    return "Actividades más complejas y deportes competitivos";
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Icon name="account-circle" size={80} color="#007AFF" />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setShowEditProfile(true)}
        >
          <Icon name="pencil" size={16} color="#007AFF" />
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Children Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mis Pequeños</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddChild(true)}
          >
            <Icon name="plus" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {user.children.map((child) => (
          <View key={child.id} style={styles.childCard}>
            <View style={styles.childInfo}>
              <View style={styles.childAvatar}>
                <Icon name="baby-face" size={24} color="#007AFF" />
              </View>
              <View style={styles.childDetails}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.childAge}>{child.age} años</Text>
                <View style={styles.interestsContainer}>
                  {child.interests.map((interest, index) => (
                    <View key={index} style={styles.interestChip}>
                      <Text style={styles.interestText}>{interest}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeChild(child.id)}
            >
              <Icon name="close" size={16} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        ))}

        {user.children.length === 0 && (
          <View style={styles.emptyChildren}>
            <Icon name="baby-face-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>
              Agrega información sobre tus hijos
            </Text>
            <Text style={styles.emptySubtext}>
              Esto nos ayudará a recomendarte eventos más relevantes
            </Text>
          </View>
        )}
      </View>

      {/* Recommendations */}
      {user.children.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
          <View style={styles.recommendationCard}>
            <Icon name="lightbulb-outline" size={24} color="#FFA500" />
            <Text style={styles.recommendationText}>
              {getAgeGroupRecommendations()}
            </Text>
          </View>
        </View>
      )}

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Icon name="heart" size={20} color="#FF3B30" />
          <Text style={styles.settingText}>Mis favoritos</Text>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Icon name="bell" size={20} color="#FF9500" />
          <Text style={styles.settingText}>Notificaciones</Text>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Icon name="map-marker" size={20} color="#007AFF" />
          <Text style={styles.settingText}>Ubicación</Text>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Icon name="shield-check" size={20} color="#34C759" />
          <Text style={styles.settingText}>Privacidad</Text>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Icon name="help-circle" size={20} color="#5856D6" />
          <Text style={styles.settingText}>Ayuda y soporte</Text>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appName}>PequeGuía</Text>
        <Text style={styles.appVersion}>Versión 1.0.0</Text>
        <Text style={styles.appDescription}>
          Tu guía definitiva para actividades familiares
        </Text>
      </View>

      {/* Add Child Modal */}
      <Modal
        visible={showAddChild}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddChild(false)}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Agregar niño</Text>
            <TouchableOpacity onPress={addChild}>
              <Text style={styles.saveButton}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={newChild.name}
                onChangeText={(text) =>
                  setNewChild((prev) => ({ ...prev, name: text }))
                }
                placeholder="Nombre del niño"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Edad</Text>
              <TextInput
                style={styles.input}
                value={newChild.age}
                onChangeText={(text) =>
                  setNewChild((prev) => ({ ...prev, age: text }))
                }
                placeholder="Edad"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Intereses (separados por comas)
              </Text>
              <TextInput
                style={styles.input}
                value={newChild.interests}
                onChangeText={(text) =>
                  setNewChild((prev) => ({ ...prev, interests: text }))
                }
                placeholder="deportes, arte, música..."
                multiline
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditProfile}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowEditProfile(false)}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Editar perfil</Text>
            <TouchableOpacity onPress={updateProfile}>
              <Text style={styles.saveButton}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Tu nombre"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="tu@email.com"
                keyboardType="email-address"
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  profileHeader: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatarContainer: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#f0f8ff",
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    color: "#007AFF",
    marginLeft: 5,
  },
  section: {
    backgroundColor: "white",
    marginTop: 15,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
  },
  childCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  childInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  childAvatar: {
    width: 40,
    height: 40,
    backgroundColor: "#f0f8ff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  childDetails: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  childAge: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  interestChip: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  interestText: {
    fontSize: 12,
    color: "#1976d2",
  },
  removeButton: {
    padding: 5,
  },
  emptyChildren: {
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  recommendationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff8e1",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FFA500",
  },
  recommendationText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
    flex: 1,
  },
  appInfo: {
    alignItems: "center",
    padding: 30,
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  appDescription: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  saveButton: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  modalContent: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
  },
});

export default ProfileScreen;
