<template>
  <div class="devis-list">
    <h2>Liste des devis :</h2>
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
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import axiosInstance from '../data/axiosInstace';
import { format } from 'date-fns';

export default {
  setup() {
    const state = reactive({
      devisList: []
    });

    const fetchDevis = async () => {
      try {
        const response = await axiosInstance.get('/devis');
        state.devisList = response.data;
      } catch (error) {
        console.error('Error fetching devis:', error);
      }
    };

    const formatDate = (dateString) => {
      return format(new Date(dateString), 'dd MMMM yyyy');
    };

    onMounted(() => {
      fetchDevis();
    });

    return {
      ...toRefs(state),
      formatDate
    };
  }
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw; /* Ensure the header takes the full width */
  background-color: #1c0833;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

nav {
  width: 100%;
  font-size: 12px;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.devis-list {
  background-color: #1c0833;
  padding: 30px;
  color: #ffffff;
  border-radius: 8px;
  width: 800px;
  margin: 0 auto; /* Center the devis list */
}

h2 {
  margin-bottom: 20px;
}

.devis-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2b0d45;
  border-radius: 8px;
  padding: 10px 30px;
  margin-bottom: 10px;
  gap: 20px; /* Increase space between elements */
}

.devis-info {
  flex-grow: 1;
  margin-left: 20px;
  color: #fff;
}

.devis-number,
.devis-date,
.devis-price,
.devis-client {
  display: block;
}
</style>