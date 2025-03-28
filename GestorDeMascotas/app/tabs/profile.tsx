import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/styles/themes";

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { theme } = useTheme();
  const themeStyles = theme === "dark" ? darkTheme : lightTheme;

  // Datos de ejemplo del dueño
  const userData = {
    name: "Nixon Rosales",
    email: "nixonrosales2000@gmail.com",
    username: "@nixonrosales",
    phone: "+52 55 1234 5678",
    address: "Calle Falsa 123, Honduras-San Pedro Sula",
    memberSince: "2025",
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: themeStyles.container.backgroundColor }]}>
      <View style={[styles.container, { backgroundColor: themeStyles.container.backgroundColor }]}>
        {/* Encabezado con imagen y nombre */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/PerfilGestor.png")}
            style={styles.avatar}
          />
          <Text style={[styles.name, { color: themeStyles.text.color }]}>{userData.name}</Text>
          <Text style={[styles.email, { color: themeStyles.text.color }]}>{userData.email}</Text>
        </View>

        {/* Información del dueño */}
        <View style={[styles.infoContainer, { backgroundColor: themeStyles.cardBackground.backgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: themeStyles.text.color }]}>Información Personal</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person" size={24} color="#4C6EF5" />
            <Text style={[styles.infoText, { color: themeStyles.text.color }]}>{userData.username}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call" size={24} color="#4C6EF5" />
            <Text style={[styles.infoText, { color: themeStyles.text.color }]}>{userData.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location" size={24} color="#4C6EF5" />
            <Text style={[styles.infoText, { color: themeStyles.text.color }]}>{userData.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={24} color="#4C6EF5" />
            <Text style={[styles.infoText, { color: themeStyles.text.color }]}>Miembro desde {userData.memberSince}</Text>
          </View>
        </View>

        {/* Botones de acción */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.buttonEdit, { backgroundColor: "#4C6EF5" }]}
            onPress={() => alert("Editar perfil")}
          >
            <Ionicons name="create" size={20} color="white" />
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
  style={[styles.buttonLogout, { backgroundColor: "#FF4C4C" }]}
  onPress={async () => {
    console.log("Cerrando sesión..."); // Depuración
    await logout(); // Cierra la sesión
    console.log("Redirigiendo a /home..."); // Depuración
    setTimeout(() => {
      router.replace("/(protected)/home"); // Redirige a /home después de un pequeño retraso
    }, 100);
  }}
>
  <Ionicons name="log-out" size={20} color="white" />
  <Text style={styles.buttonText}>Cerrar Sesión</Text>
</TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#4C6EF5",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    marginTop: 5,
  },
  infoContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  buttonEdit: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonLogout: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});