<template>
  <div id="login-page">
    <div class="login d-flex p-4">
      <b-row align-v="center">
        <b-col>
          <form>
            <h3>Sign In</h3>

            <div class="form-group">
              <label>Email address</label>
              <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">
              Sign In
            </button>

            <p class="forgot-password text-right mt-2 mb-4">
              <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
          </form>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {}
  },
}
</script>

<style>
.login {
  background-color: darkgray;
}
</style>
