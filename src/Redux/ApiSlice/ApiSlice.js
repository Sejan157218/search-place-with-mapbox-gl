import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  placeData: [],
  place: {},
  longitude: 90.399452,
  latitude: 23.777176,
  status: "idle",
};

export const fetchPlaces = createAsyncThunk("api/fetchPlaces", async (url) => {
  const response = await fetch(url).then((res) => res.json());
  return response;
});

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    addToPlace: (state, { payload }) => {
      state.place = payload;
    },
    addToLongitude: (state, { payload }) => {
      state.longitude = payload;
    },
    addToLatitude: (state, { payload }) => {
      state.latitude = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.status = "idle";

      state.placeData = action.payload;
    });
  },
});

export const { addToPlace,addToLongitude,addToLatitude } = apiSlice.actions;

export default apiSlice.reducer;
