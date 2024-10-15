// src/store.js
import { reactive } from 'vue';
import axiosInstance from './data/axiosInstace';

const state = reactive({
    clients: [],
    showModal: false,
    newClient: {
        nom: '',
        prenom: '',
        date_naissance: '',
        est_personne: false
    }
});

const fetchClients = async () => {
    try {
        const response = await axiosInstance.get('/clients');
        state.clients = response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
    }
};

const addClient = async () => {
    try {
        const response = await axiosInstance.post('/clients/create', state.newClient);
        state.clients.push(response.data);
        state.showModal = false;
        state.newClient = {
            nom: '',
            prenom: '',
            date_naissance: '',
            est_personne: false
        };
    } catch (error) {
        console.error('Error adding client:', error);
    }
};

const deleteClient = async (clientId) => {
    try {
        await axiosInstance.delete(`/clients/${clientId}`);
        state.clients = state.clients.filter(client => client.id !== clientId);
    } catch (error) {
        console.error('Error deleting client:', error);
    }
};

export default {
    state,
    fetchClients,
    addClient,
    deleteClient
};