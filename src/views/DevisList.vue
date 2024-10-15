<template>
  <div class="devis-list">
    <div class="header">
      <h2>Liste des devis :</h2>
      <a href="#" class="add-btn" @click="showModal = true">+</a>
    </div>
    <div v-for="(devis, index) in devisList" :key="index" class="devis-card">
      <div class="devis-info">
        <span class="devis-number">Numéro: {{ devis.numero }}</span>
      </div>
      <div class="devis-info">
        <span class="devis-date">Date d'effet: {{ formatDate(devis.dateEffet) }}</span>
      </div>
      <div class="devis-info">
        <span class="devis-price">Prix: {{ devis.prix }} {{ devis.frequencePrix }}</span>
      </div>
      <div class="devis-info">
        <span class="devis-client">Client: {{ devis.client.nom }} {{ devis.client.prenom }}</span>
      </div>
    </div>
    <div v-if="showModal" class="modal" @click.self="showModal = false">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Ajouter un devis</h2>
        <form @submit.prevent="addDevis">
          <div class="form-row">
            <div class="form-group">
              <label for="numero">Numéro:</label>
              <input type="text" id="numero" v-model="newDevis.numero" required>
            </div>
            <div class="form-group">
              <label for="dateEffet">Date d'effet:</label>
              <input type="date" id="dateEffet" v-model="newDevis.date_effet" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="prix">Prix:</label>
              <input type="number" id="prix" v-model="newDevis.prix" required>
            </div>
            <div class="form-group">
              <label for="frequencePrix">Fréquence Prix:</label>
              <input type="text" id="frequencePrix" v-model="newDevis.frequence_prix" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="clientId">Client:</label>
              <select id="clientId" v-model="newDevis.client_id" >
                <option v-for="client in store.state.clients" :key="client.id" :value="client.id">
                 {{ client.nom }} {{ client.prenom }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="voitures">Voitures:</label>
              <select id="voitures" v-model="newDevis.voitures" multiple>
                <option v-for="voiture in voitures" :key="voiture.id" :value="voiture.id">
                  {{ voiture.numero_immatriculation }}
                </option>
              </select>
            </div>
          </div>
          <button type="submit" class="full-width-button">Ajouter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/devis.css'
import { reactive, toRefs, onMounted } from 'vue';
import axiosInstance from '../data/axiosInstace';
import { format } from 'date-fns';
import store from '../store';

export default {
  setup() {
    const state = reactive({
      devisList: [],
      showModal: false,
      newDevis: {
        numero: '',
        date_effet: '',
        prix: '',
        frequence_prix: '',
        client_id: '',
        voitures: []
      },
      voitures: []
    });

    const fetchDevis = async () => {
      try {
        const response = await axiosInstance.get('/devis');
        state.devisList = response.data;
      } catch (error) {
        console.error('Error fetching devis:', error);
      }
    };

    const fetchVoitures = async () => {
      try {
        const response = await axiosInstance.get('/voitures');
        state.voitures = response.data;
      } catch (error) {
        console.error('Error fetching voitures:', error);
      }
    };

    const addDevis = async () => {
      try {
        const response = await axiosInstance.post('/devis/create', state.newDevis);
        state.devisList.push(response.data);
        state.showModal = false;
        state.newDevis = {
          numero: '',
          date_effet: '',
          prix: '',
          frequence_prix: '',
          client_id: '',
          voitures: []
        };
      } catch (error) {
        console.error('Error adding devis:', error);
      }
    };

    const formatDate = (dateString) => {
      return format(new Date(dateString), 'dd MMMM yyyy');
    };

    onMounted(() => {
      fetchDevis();
      fetchVoitures();
    });

    return {
          store,
      ...toRefs(state),
      formatDate,
      addDevis
    };
  }
};
</script>