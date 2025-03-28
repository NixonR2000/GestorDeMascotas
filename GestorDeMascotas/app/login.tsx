import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { darkTheme, lightTheme } from "@/styles/themes";
import { useTheme } from "@/context/ThemeContext";
import { i18n } from "@/context/LanguageContext";
import { useDispatch } from "react-redux"; // Importa useDispatch de Redux
import { loginUser } from "@/redux/slices/userSlice"; // Importa la acción de login de Redux

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const dispatch = useDispatch(); // Obtén la función dispatch de Redux
  const { theme } = useTheme();
  const themeStyles = theme === "dark" ? darkTheme : lightTheme;

  const handleLogin = async () => {
    if (!email.endsWith("@gmail.com")) {
      Alert.alert("Error", "Solo correos @gmail.com pueden ingresar"); // Validación de correo
      return;
    }

    const user = {
      name: "Usuario", // Nombre por defecto
      email,
      password: "123456", // Contraseña por defecto (puedes cambiarla)
    };

    dispatch(loginUser(user)); // Dispara la acción de login de Redux
    router.replace("/home"); // Redirige al home después del login
  };

  return (
    <View style={[themeStyles.container, styles.container]}>
      {/* Imagen de la mascota */}
      <Image
        source={require("../assets/images/PetGestor.jpg")}
        style={styles.avatar}
      />

      {/* Título de bienvenida */}
      <Text style={[styles.title, { color: themeStyles.text.color }]}>
        {i18n.t("welcome")}
      </Text>

      {/* Campo de entrada para el correo electrónico */}
      <View style={[styles.inputContainer, { borderColor: themeStyles.input.borderColor }]}>
        <Ionicons name="mail-outline" size={24} color={themeStyles.text.color} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: themeStyles.text.color, backgroundColor: 
            themeStyles.input.backgroundColor }]}
          placeholder="Correo electrónico"
          placeholderTextColor={themeStyles.text.color}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Botón de Ingresar */}
      <TouchableOpacity style={[styles.button, { backgroundColor: themeStyles.button.backgroundColor }]} 
      onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      {/* Separador */}
      <View style={styles.separator}>
        <View style={[styles.separatorLine, { backgroundColor: themeStyles.text.color }]} />
        <Text style={[styles.separatorText, { color: themeStyles.text.color }]}>o</Text>
        <View style={[styles.separatorLine, { backgroundColor: themeStyles.text.color }]} />
      </View>

      {/* Botón de Ingresar con Google */}
      <TouchableOpacity style={[styles.googleButton, { backgroundColor: themeStyles.container.
        backgroundColor }]} onPress={() => { }}>
        <Image
          source={{ uri: 
"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" }}
          style={styles.googleIcon}
        />
        <Text style={[styles.googleButtonText, { color: themeStyles.text.color }]}>Ingresar con Google</Text>
      </TouchableOpacity>

      {/* Enlace para registrarse */}
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={[styles.linkText, { color: themeStyles.linkText.color }]}>
          ¿No tienes cuenta? <Text style={[styles.linkHighlight, { color: themeStyles.button.backgroundColor }]}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
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
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
  },
  separatorLine: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  googleButton: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
  linkHighlight: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});