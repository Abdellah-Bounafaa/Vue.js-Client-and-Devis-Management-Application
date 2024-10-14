<template>
  <div class="client-list">
    <h2>Liste des clients :</h2>
    <div v-for="(client, index) in clients" :key="index" class="client-card">
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
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import axiosInstance from '../data/axiosInstace';
import { format } from 'date-fns';

export default {
  setup() {
    const state = reactive({
      clients: []
    });

    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/clients');
        state.clients = response.data;
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

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
      fetchClients();
    });

    return {
      ...toRefs(state),
      formatDate,
      getStatusClass,
      getStatusText
    };
  }
};
</script>

<style scoped>
.client-list {
  background-color: #1c0833;
  padding: 30px;
  color: #ffffff;
  border-radius: 8px;
  width: 800px;
  margin: 0 auto; /* Center the client list */
}

h2 {
  margin-bottom: 20px;
}

.client-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2b0d45;
  border-radius: 8px;
  padding: 10px 30px;
  margin-bottom: 10px;
  gap: 20px; /* Increase space between elements */
}

.client-type {
  background-color: #5a2b8a;
  padding: 5px 10px;
  border-radius: 4px;
  color: #fff;
}

.client-info {
  flex-grow: 1;
  margin-left: 20px;
  color: #fff;
}

.client-name,
.client-email {
  display: block;
}

.status-active {
  color: #00ff00;
}

.status-prospect {
  color: #ff7b00;
}

.status-resolved {
  color: #ff005c;
}
</style>