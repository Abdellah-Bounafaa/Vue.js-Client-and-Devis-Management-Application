<template>
  <div class="client-list">
    <div class="header">
      <h2>Liste des clients :</h2>
      <a href="#" class="add-btn" @click="store.state.showModal = true">+</a>
    </div>
    <div v-for="(client, index) in store.state.clients" :key="index" class="client-card">
      <div class="client-type">Particulier</div>
      <div class="client-info">
        <span class="client-name">{{ client.nom }} {{ client.prenom }}</span>
      </div>
      <div class="client-info">
        <span class="client-email">{{ formatDate(client.dateNaissance) }}</span>
      </div>
      <div :class="getStatusClass(client.estPersonne)">
        {{ getStatusText(client.estPersonne) }}
      </div>
    </div>
    <div v-if="store.state.showModal" class="modal" @click.self="store.state.showModal = false">
      <div class="modal-content">
        <span class="close" @click="store.state.showModal = false">&times;</span>
        <h2>Ajouter un client</h2>
        <form @submit.prevent="store.addClient">
          <div>
            <label for="nom">Nom:</label>
            <input type="text" id="nom" v-model="store.state.newClient.nom" required>
          </div>
          <div>
            <label for="prenom">Prénom:</label>
            <input type="text" id="prenom" v-model="store.state.newClient.prenom" required>
          </div>
          <div>
            <label for="dateNaissance">Date de naissance:</label>
            <input type="date" id="date_naissance" v-model="store.state.newClient.date_naissance" required>
          </div>
          <div>
            <label for="estPersonne">Est Personne:</label>
            <input type="checkbox" id="est_personne" v-model="store.state.newClient.est_personne">
          </div>
          <button type="submit" class="full-width-button">Ajouter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/clients.css'
import { onMounted } from 'vue';
import store from '../store';
import { format } from 'date-fns';

export default {
  setup() {
    const formatDate = (dateString) => {
      return format(new Date(dateString), 'dd MMMM yyyy');
    };

    const getStatusClass = (est_personne) => {
      return est_personne ? 'status-active' : 'status-prospect';
    };

    const getStatusText = (est_personne) => {
      return est_personne ? 'Actif' : 'Refusé';
    };

    onMounted(() => {
      store.fetchClients();
    });

    return {
      store,
      formatDate,
      getStatusClass,
      getStatusText
    };
  }
};
</script>