import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import mascotaReducer from "./slices/mascotaSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    mascota: mascotaReducer,
  },
});

store.subscribe(() => {
  console.log("Estado actualizado:", store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;