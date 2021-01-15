<template>
   <!-- REGISTER PAGE -->
  <div class="login-page container" v-if="halaman == 'register'">
    <div class="login-form">
      <form @submit.prevent='register'>
        <h2>REGISTER</h2><br>
        <div class="mb-3">
          <label for="register-name" class="form-label">Name</label>
          <input type="text" class="form-control" id="register-name" v-model="user.name">
        </div>
        <div class="mb-3">
          <label for="register-email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="register-email" aria-describedby="emailHelp" v-model="user.email">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="register-password" class="form-label">Password</label>
          <input type="password" class="form-control" id="register-password" v-model="user.password">
        </div>
        <div class="loginbuttons">
        <button type="submit" class="btn btn-primary register-btn">REGISTER</button>
         </div>
      </form>
    </div>
  </div> 
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  props: ['halaman'],
  methods: {
    register() {
      this.$emit('register', this.user)
      this.$emit('changePage')
    },
  }
}
</script>

<style>

</style>