<template>
  <div class="home">
    <div id="tools">
      <form v-on:submit.prevent="addObject">
        <input type="text" v-model="newObject" />
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
}
</script>
