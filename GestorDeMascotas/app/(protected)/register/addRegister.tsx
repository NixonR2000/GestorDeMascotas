import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { agregarMascota } from "@/redux/slices/mascotaSlice"; // Importa la acción de Redux
import { v4 as uuidv4 } from "uuid"; // Para generar IDs únicos

export default function AddRegisterScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [mascota, setMascota] = useState({
    nombre: "",
    edad: "",
    raza: "",
    peso: "",
    estatura: "",
    image: null as string | null,
  });

  const handleChange = (field: string, value: string) => {
    setMascota((prev) => ({ ...prev, [field]: value }));
  };

  const selectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se necesita acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true, 
      quality: 1 
    });

    if (!result.canceled) {
      handleChange("image", result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se necesita acceso a la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 });

    if (!result.canceled) {
      handleChange("image", result.assets[0].uri);
    }
  };

  const saveMascota = () => {
    const { nombre, edad, raza, peso, estatura, image } = mascota;
    if (!nombre || !edad || !raza || !peso || !estatura || !image) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const nuevaMascota = {
      id: uuidv4(), // Genera un ID único
      nombre,
      edad,
      raza,
      peso,
      estatura,
      image,
    };

    dispatch(agregarMascota(nuevaMascota)); // Guarda la mascota en Redux
    Alert.alert("Éxito", "La mascota se ha registrado correctamente.");
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Mascotas</Text>

      <TextInput style={styles.input} placeholder="Nombre de la mascota" value={mascota.nombre} onChangeText={(text) => handleChange("nombre", text)} />
      <TextInput style={styles.input} placeholder="Edad" value={mascota.edad} onChangeText={(text) => handleChange("edad", text)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Raza" value={mascota.raza} onChangeText={(text) => handleChange("raza", text)} />
      <TextInput style={styles.input} placeholder="Peso (kg)" value={mascota.peso} onChangeText={(text) => handleChange("peso", text)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Estatura (cm)" value={mascota.estatura} onChangeText={(text) => handleChange("estatura", text)} keyboardType="numeric" />

      {mascota.image && <Image source={{ uri: mascota.image }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Ionicons name="image-outline" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Ionicons name="camera-outline" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSave} onPress={saveMascota}>
        <Ionicons name="save-outline" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 15, marginBottom: 10, backgroundColor: "#fff" },
  button: { 
    flexDirection: "row", 
    backgroundColor: "#007bff", 
    padding: 15, 
    borderRadius: 10, 
    width: "100%", 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 10 
  },
  buttonSave: { 
    flexDirection: "row", 
    backgroundColor: "#28a745", 
    padding: 15, 
    borderRadius: 10, 
    width: "100%", 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 10 
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 10 },
  image: { width: 200, height: 200, borderRadius: 10, marginVertical: 10 },
  icon: { marginRight: 10 },
});