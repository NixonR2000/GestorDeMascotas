import { StyleSheet } from "react-native";

export const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardBackground: {
    backgroundColor: "#FFFFFF", // Fondo de las tarjetas en tema claro
  },
  input: {
    backgroundColor: "#F5F5F5",
    color: "#000000",
    borderColor: "#DDD",
  },
  linkText: {
    color: "#3498db",
  },
  navBar: {
    backgroundColor: "#F5F5F5", // Fondo de la barra de navegación en tema claro
    borderBottomColor: "#DDD", // Color del borde inferior en tema claro
  },
});

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1abc9c",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardBackground: {
    backgroundColor: "#1E1E1E", // Fondo de las tarjetas en tema oscuro
  },
  input: {
    backgroundColor: "#2D2D2D",
    color: "#FFFFFF",
    borderColor: "#444",
  },
  linkText: {
    color: "#1abc9c",
  },
  navBar: {
    backgroundColor: "#1E1E1E", // Fondo de la barra de navegación en tema oscuro
    borderBottomColor: "#333", // Color del borde inferior en tema oscuro
  },
});