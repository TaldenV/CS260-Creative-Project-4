<template>
  <b-container class="d-flex align-content-center">
    <div class="home">
      <div id="tools">
        <form v-on:submit.prevent="addObject">
          <input type="text" v-model="newObject" />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>