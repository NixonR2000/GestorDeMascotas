import { View, Text, TouchableOpacity } from "react-native";
import { darkTheme, lightTheme } from "@/styles/themes";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const styles = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Modo Actual: {theme === "dark" ? "Oscuro" : "Claro"}</Text>
      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Cambiar Tema</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Idioma Actual: {language}</Text>
      <TouchableOpacity style={styles.button} onPress={() => changeLanguage("es")}>
        <Text style={styles.buttonText}>Cambiar a Español</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => changeLanguage("en")}>
        <Text style={styles.buttonText}>Cambiar a Inglés</Text>
      </TouchableOpacity>
    </View>
  );
}