import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux'; // Importa el Provider de Redux
import { store } from '@/redux/store'; // Importa el store de Redux

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <Provider store={store}> {/* Envuelve tu aplicación con el Provider de Redux */}
            <Stack
              screenOptions={{
                headerShown: false, // Oculta la barra de título por defecto
              }}
            >
              {/* Oculta la barra de título solo en la pantalla de inicio */}
              <Stack.Screen
                name="index" // Pantalla de inicio
                options={{
                  headerShown: false, // Oculta la barra de título
                }}
              />
              {/* Otras pantallas pueden tener la barra de título visible */}
              <Stack.Screen
                name="setting" // Ejemplo: Pantalla de configuración
                options={{
                  headerShown: true, // Muestra la barra de título
                  title: "Configuración", // Título personalizado
                }}
              />
              {/* Agrega más pantallas según sea necesario */}
            </Stack>
          </Provider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}