<template>
  <div id="app">
    <div class="header">
      <h1>Escolha o seu novo sneaker</h1>
      <button class="cta">Qual Sneaker Deseja Comprar?</button>
    </div>
    <div class="container">
      <NavBar />
      <div class="main-content">
        <SliderImg />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavbarApp.vue';
import SliderImg from './components/SliderImg.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    SliderImg
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
.header {
  background-color: #003366;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container {
  display: flex;
}
.main-content {
  padding: 2rem;
  flex: 1;
}
.cta {
  background-color: white;
  color: #003366;
  border: 2px solid white;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}
</style>