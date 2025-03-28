import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import { useSelector, useDispatch } from "react-redux"; // Importa useSelector y useDispatch de Redux
import { logoutUser } from "@/redux/slices/userSlice"; // Importa la acción de logout de Redux
import { RootState } from "@/redux/store"; // Importa el tipo RootState

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch(); // Obtén la función dispatch de Redux
  const user = useSelector((state: RootState) => state.user.user); // Obtén el usuario desde Redux
  const { theme } = useTheme();
  const themeStyles = theme === "dark" ? darkTheme : lightTheme;

  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }).start();
  };

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispara la acción de logout de Redux
    router.replace("/login"); // Redirige al login después del logout
  };

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.container.backgroundColor }]}>
      {/* Barra de navegación personalizada */}
      <View style={[styles.navBar, { backgroundColor: themeStyles.navBar.backgroundColor, 
        borderBottomColor: themeStyles.navBar.borderBottomColor }]}>
        {/* Eliminé el título "Inicio" */}
        <TouchableOpacity onPress={() => router.push("/setting")}>
          <Ionicons name="settings-outline" size={24} color={themeStyles.text.color} />
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <Ionicons name="home-outline" size={100} color={themeStyles.text.color} style={styles.iconMain} />

        <Text style={[styles.welcomeText, { color: themeStyles.text.color }]}>
          ¡Hola, {user?.email || "Usuario"}!</Text>
        <Text style={[styles.subText, { color: themeStyles.text.color }]}>
          Bienvenido a Gestor de Macotas</Text>

        {/* Botón para Recordatorios de Cuidados */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeStyles.button.backgroundColor }]}
            onPress={() => router.push("/reminders")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="notifications-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Recordatorios de Cuidados</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón para Historial Veterinario */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeStyles.button.backgroundColor }]}
            onPress={() => router.push("/vet-history")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="medical-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Historial Veterinario</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón para Perfil */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeStyles.button.backgroundColor }]}
            onPress={() => router.push("/tabs/profile")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="person-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Perfil</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón para Inventario */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: themeStyles.button.backgroundColor }]}
            onPress={() => router.push("/register/register")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="paw-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Registrar Mascotas</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botón para Cerrar Sesión */}
        <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: "#D9534F" }]} // Color rojo fijo
            onPress={handleLogout}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="log-out-outline" size={28} color="white" />
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "flex-end", // Alinea el ícono a la derecha
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconMain: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  animatedView: {
    width: "85%",
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButton: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});