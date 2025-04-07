import { createSlice } from "@reduxjs/toolkit";

interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries: [
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Russia",
    "France",
    "Germany",
    "Italy",
    "Spain",
    "Brazil",
    "China",
    "India",
    "Japan",
    "Mexico",
    "South Africa",
    "Argentina",
    "Egypt",
    "Nigeria",
    "Sweden",
    "Norway",
  ],
};

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export default countrySlice.reducer;
