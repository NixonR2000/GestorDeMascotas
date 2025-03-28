import { View, Text, TouchableOpacity } from "react-native";
import { darkTheme, lightTheme } from "@/styles/themes";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, translate } = useLanguage();
  const styles = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {translate("currentLanguage")}: {language}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => changeLanguage("es")}>
        <Text style={styles.buttonText}>{translate("changeToSpanish")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => changeLanguage("en")}>
        <Text style={styles.buttonText}>{translate("changeToEnglish")}</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        {translate("changeTheme")}: {theme === "dark" ? "Oscuro" : "Claro"}
      </Text>
      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>{translate("changeTheme")}</Text>
      </TouchableOpacity>
    </View>
  );
}