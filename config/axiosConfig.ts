import axios from "axios";

// Timeout para axios
axios.defaults.timeout = 15000;

// EXPO_PUBLIC_BASE_URL se define en .env
axios.defaults.baseURL = process.env.EXPO_PUBLIC_BASE_URL;
