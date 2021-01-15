<template>
  <!-- LOGIN PAGE -->

    <div class="login-page container" v-if="halaman == 'login'">
      <div class="login-form">
        <form>
          <h2>LOGIN</h2><br>
          <div class="mb-3">
            <label for="login-email" class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="user.email" id="login-email" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="login-password" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="user.password" id="login-password">
          </div>
          <div class="loginbuttons">
          <button type="submit" class="btn btn-primary login-btn" @click="login">Login</button>
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            <button type="submit" class="btn btn-primary login-btn" >Google Sign In</button>
          </g-signin-button>
          </div>
        </form>
      </div>
    </div>

    
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      googleSignInParams: {
        client_id: '122096021696-r7jpik1v6gs6lm7c3l0hndp1to32ueok.apps.googleusercontent.com'
      }
    }
  },
  props: ['halaman'],
  methods: {
    login() {
      this.$emit('login', this.user)
      this.$emit('checkAuth')
    },
    onSignInSuccess(googleUser) {
     this.$emit('success', googleUser)
    },
    onSignInError(error) {
      this.$emit('error', googleUser)
    }
  }
}
</script>

<style>

</style>