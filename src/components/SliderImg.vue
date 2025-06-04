<template>
  <div class="slider">
    <button @click="prevImage">Anterior</button>
    <img :src="images[current]" alt="Sneaker" />
    <button @click="nextImage">Próximo</button>
  </div>

  <!-- Lista de modelos retornados do backend -->
  <div>
    <h3>Modelos Disponíveis:</h3>
    <ul>
      <li v-for="modelo in modelos" :key="modelo.modeloid">
        {{ modelo.modelonome }} - R$ {{ modelo.modelopreco }} ({{ modelo.marcanome }})
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SliderImg",
  data() {
    return {
      current: 0,
      images: [
        'https://th.bing.com/th/id/OIP.lNLEp9NMaUTjUStOGdGU7wHaJ3?rs=1&pid=ImgDetMain',
        'https://images.contentstack.io/v3/assets/bltd427b71c2e191abd/bltfa47e5ab003c30f1/67aed4130b17d71b87055cb1/1052A069_111_SB_FR_GLB.png_-_Web_Rendition_(1).png',
        'https://ostoresneakers.vteximg.com.br/arquivos/ids/222923-1000-1000/Converse-Weapon-Leather-A10342C-3.jpg?v=638608997429000000',
      ],
      modelos: [],
      url: 'http://localhost:3000/marca',
    };
  },
  methods: {
    nextImage() {
      this.current = (this.current + 1) % this.images.length;
    },
    prevImage() {
      this.current = (this.current - 1 + this.images.length) % this.images.length;
    },
    async pegaTenis() {
      try {
        const resp = await axios.get(this.url);
        this.modelos = resp.data;
        console.log(this.modelos);
      } catch (error) {
        console.error("Erro ao buscar modelos:", error);
      }
    },
  },
  mounted() {
    this.pegaTenis();
  },
};
</script>

<style scoped>
.slider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 20px;
}
img {
  max-width: 400px;
  height: auto;
  border-radius: 10px;
}
button {
  background-color: #003366;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 8px;
}
</style>
