<template>
  <div class="navbar">
    <ul>
      <li v-for="brand in brands" :key="brand">{{ brand }}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "NavBar",
  data() {
    return {
      brands: ["Adidas", "Asics", "Converse", "Mizuno", "New Balance", "Nike", "Puma", "Under Armour"],
    };
    
  },
 
};

</script>

<style scoped>
.navbar {
  background-color: #003366;
  color: white;
  padding: 1rem;
  min-height: 100vh;
  width: 200px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 1rem 0;
  cursor: pointer;
}
li:hover {
  text-decoration: underline;
}
</style>