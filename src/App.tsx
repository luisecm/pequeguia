import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import EventsScreen from "./screens/EventsScreen";
import LocationsScreen from "./screens/LocationsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            switch (route.name) {
              case "Home":
                iconName = focused ? "home" : "home-outline";
                break;
              case "Events":
                iconName = focused ? "calendar" : "calendar-outline";
                break;
              case "Locations":
                iconName = focused ? "map-marker" : "map-marker-outline";
                break;
              case "Profile":
                iconName = focused ? "account" : "account-outline";
                break;
              default:
                iconName = "circle";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: styles.tabBar,
          headerStyle: {
            backgroundColor: "#ffffff",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Inicio" }}
        />
        <Tab.Screen
          name="Events"
          component={EventsScreen}
          options={{ title: "Eventos" }}
        />
        <Tab.Screen
          name="Locations"
          component={LocationsScreen}
          options={{ title: "Lugares" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Perfil" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: 5,
    height: 60,
  },
});

export default App;
