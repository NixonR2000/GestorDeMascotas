import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <LanguageProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    />
                </LanguageProvider>
            </AuthProvider>
        </ThemeProvider>

    );
}
