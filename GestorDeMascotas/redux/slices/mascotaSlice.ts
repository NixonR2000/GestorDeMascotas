import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Mascota {
  id: string;
  nombre: string;
  edad: string;
  raza: string;
  peso: string;
  estatura: string;
  image: string | null;
}

interface MascotaState {
  mascotas: Mascota[];
}

const initialState: MascotaState = {
  mascotas: [],
};

const mascotaSlice = createSlice({
  name: "mascota",
  initialState,
  reducers: {
    agregarMascota: (state, action: PayloadAction<Mascota>) => {
      state.mascotas.push(action.payload);
    },
    eliminarMascota: (state, action: PayloadAction<string>) => {
      state.mascotas = state.mascotas.filter((m) => m.id !== action.payload);
    },
    actualizarMascota: (state, action: PayloadAction<Mascota>) => {
      const index = state.mascotas.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.mascotas[index] = action.payload;
      }
    },
  },
});

export const { agregarMascota, eliminarMascota, actualizarMascota } = mascotaSlice.actions;
export default mascotaSlice.reducer;