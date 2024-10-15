<template>
  <div class="client-list">
    <div class="header">
      <h2>Liste des clients :</h2>
      <a href="#" class="add-client" @click="showModal = true">+</a>
    </div>
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
    <div v-if="showModal" class="modal" @click.self="showModal = false">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Ajouter un client</h2>
        <form @submit.prevent="addClient">
          <div>
            <label for="nom">Nom:</label>
            <input type="text" id="nom" v-model="newClient.nom" required>
          </div>
          <div>
            <label for="prenom">Prénom:</label>
            <input type="text" id="prenom" v-model="newClient.prenom" required>
          </div>
          <div>
            <label for="dateNaissance">Date de naissance:</label>
            <input type="date" id="date_naissance" v-model="newClient.date_naissance" required>
          </div>
          <div>
            <label for="estPersonne">Est Personne:</label>
            <input type="checkbox" id="est_personne" v-model="newClient.est_personne">
          </div>
    <button type="submit" class="full-width-button">Ajouter</button>
        </form>
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
      getStatusText,
      addClient
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

button {
  background-color: #5a2b8a;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 24px; /* Increase font size for the + symbol */
}

button:hover {
  background-color: #4a2370;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #2b0d45;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  color: #fff;
}

.close {
  float: right;
  font-size: 24px;
  cursor: pointer;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input[type="text"],
form input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

form input[type="checkbox"] {
  margin-right: 10px;
}

form button {
  background-color: #5a2b8a;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #4a2370;
}

.full-width-button {
  width: 100%; /* Make the button full width */
  padding: 8px; /* Decrease padding */
}
.add-client {
  background-color: #5a2b8a;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  text-align: center;
  line-height: 24px; /* Center the + symbol vertically */
  width: 30px; /* Make the button larger */
  height: 30px; /* Make the button larger */
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>