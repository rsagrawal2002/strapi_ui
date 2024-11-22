import axios from "axios";

const API_URL = "http://localhost:1337/api"; // Update this to your deployed Strapi URL if necessary.

export const fetchContent = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};
