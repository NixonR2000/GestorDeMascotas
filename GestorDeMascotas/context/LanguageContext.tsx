import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18n } from "i18n-js";
import { createContext, useContext, useEffect, useState } from "react";

const translations = {
  en: {
    welcome: "Welcome",
    login: "Login",
    settings: "Settings",
    changeTheme: "Change Theme",
    currentLanguage: "Current Language",
    changeToSpanish: "Change to Spanish",
    changeToEnglish: "Change to English",
  },
  es: {
    welcome: "Bienvenido",
    login: "Ingresar",
    settings: "Configuración",
    changeTheme: "Cambiar Tema",
    currentLanguage: "Idioma Actual",
    changeToSpanish: "Cambiar a Español",
    changeToEnglish: "Cambiar a Inglés",
  },
  fr: {
    welcome: "Bienvenue",
    login: "Connexion",
    settings: "Paramètres",
    changeTheme: "Changer de Thème",
    currentLanguage: "Langue Actuelle",
    changeToSpanish: "Changer en Espagnol",
    changeToEnglish: "Changer en Anglais",
  },
  de: {
    welcome: "Wilkommen",
    login: "Anmelden",
    settings: "Einstellungen",
    changeTheme: "Thema Ändern",
    currentLanguage: "Aktuelle Sprache",
    changeToSpanish: "Zu Spanisch Wechseln",
    changeToEnglish: "Zu Englisch Wechseln",
  },
};

const i18n = new I18n(translations);
i18n.defaultLocale = "en"; // Idioma predeterminado
i18n.enableFallback = true; // Habilitar fallback al idioma predeterminado

type Language = "en" | "es" | "fr" | "de";

interface LanguageContextProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
  translate: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        if (storedLanguage && Object.keys(translations).includes(storedLanguage)) {
          setLanguage(storedLanguage as Language);
          i18n.locale = storedLanguage;
        }
      } catch (error) {
        console.error("Error al cargar el idioma:", error);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang: Language) => {
    try {
      setLanguage(lang);
      i18n.locale = lang;
      await AsyncStorage.setItem("language", lang);
    } catch (error) {
      console.error("Error al cambiar el idioma:", error);
    }
  };

  const translate = (key: string, params = {}) => {
    let text = i18n.t(key, params);
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { i18n };