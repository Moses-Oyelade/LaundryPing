import axios from "axios";

const BASE_URL = "http://localhost:8000"; // Change this if your Django server differs

export const fetchMachines = () => axios.get(`${BASE_URL}/api/machines/`);
export const createMachine = (data) => axios.post(`${BASE_URL}/api/machines/`, data);
export const updateMachine = (id, data) => axios.patch(`${BASE_URL}/api/machines/${id}/`, data);
export const deleteMachine = (id) => axios.delete(`${BASE_URL}/api/machines/${id}/`);
