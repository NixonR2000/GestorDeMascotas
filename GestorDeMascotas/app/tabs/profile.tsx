import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
export default function ProfileScreen() {
    const router = useRouter();
    const { logout } = useAuth();
    return (

// codigo para limpiar estado en cambio de tabs
    // useFocusEffect(
    //     useCallback(() => {
    //         return () => setNombre('');
    //     }, [])
    // );
        <ScrollView contentContainerStyle={styles.scrollContainer}>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/images/PerfilGestor.png")}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>Juan Pérez</Text>
                    <Text style={styles.email}>juan.perez@example.com</Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Ionicons name="person" size={24} color="#4C6EF5" />
                        <Text style={styles.infoText}>@juanperez</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="location" size={24} color="#4C6EF5" />
                        <Text style={styles.infoText}>Ciudad de México</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="calendar" size={24} color="#4C6EF5" />
                        <Text style={styles.infoText}>Miembro desde 2022</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonEdit} onPress={() => alert("Editar perfil")}>
                        <Ionicons name="create" size={20} color="white" />
                        <Text style={styles.buttonText}>Editar Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonLogout}
                        onPress={() => { logout(); router.replace("/login"); }}
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
        backgroundColor: "#f4f4f4",
        alignItems: "center",
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginVertical: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#4C6EF5",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        color: "gray",
    },
    infoContainer: {
        backgroundColor: "white",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },
    infoText: {
        fontSize: 16,
        marginLeft: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
    },
    buttonEdit: {
        flexDirection: "row",
        backgroundColor: "#4C6EF5",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: "center",
        flex: 1,
        marginRight: 10,
    },
    buttonLogout: {
        flexDirection: "row",
        backgroundColor: "#FF4C4C",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: "center",
        flex: 1,
        marginLeft: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        marginLeft: 10,
    },
});

