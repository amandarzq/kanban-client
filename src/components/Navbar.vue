<template>

   <nav class="navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">KANBAN</a>
      <div class="navbar-right">
        <a class="navlink" href="#" v-if="halaman == 'login'" v-on:click="changePage('register')" >REGISTER</a>
        <a class="navlink" href="#" v-if="halaman == 'register'" v-on:click="changePage('login')">LOGIN</a>
        <a class="navlink" href="#" v-if="halaman == 'main'" @click="showAddModal">ADD TASK</a>
        <a class="navlink" href="#" v-if="halaman == 'add'" v-on:click="changePage('main')">BACK</a>
        <a class="navlink" href="#" v-if="halaman == 'main' || halaman == 'add'" v-on:click="logout">LOGOUT</a>
      </div>
    </div>
  </nav>
    
</template>

<script>
export default {
  name: "Navbar",
  props: ['halaman'],
  methods: {
    changePage(halaman) {
      this.$emit('changePage', halaman)
    },
    logout() {
      this.$emit('logout')
    },
    showAddModal() {
      this.$emit('showAddModal')
    }
  }
}
</script>

<style>

</style>