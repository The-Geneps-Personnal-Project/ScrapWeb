import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllSites = async () => {
    try {
        const response = await api.get("/sites");
        return response.data;
    } catch (error) {
        console.error("Error fetching sites:", error);
        throw error;
    }
};
