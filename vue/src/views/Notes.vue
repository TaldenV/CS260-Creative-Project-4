<template>
  <div id="app">
    <div id="display">
      <div id="title">{{ user }}'s NoteBook</div>
      <div id="notepage">
        <form id="pickPage" @submit.prevent>
          <div id="pageArrows">
            <button type="submit" @click="prevPage" v-if="currPageNum > 0">
              &lt;
            </button>
            <button type="submit" @click="goToAddPage" v-else>Add Page</button>
            <button
              type="submit"
              @click="nextPage"
              v-if="currPageNum < latestPageNum - 1"
            >
              &gt;
            </button>
            <button type="submit" @click="goToAddPage" v-else>Add Page</button>
          </div>
          <div id="pageInput">
            <span id="inputCaption">Enter page number: &nbsp;</span>
            <input
              type="number"
              min="0"
              v-bind:max="latestPageNum - 1"
              v-model="newPageNum"
            />
            <button type="submit" @click="enterPage">Go</button>
          </div>
        </form>
        <div id="currNote" v>
          <img v-bind:src="/images/ + currentObject.imageName" />
          <h1>{{ currentObject.title }}</h1>
          <span id="noteText"> {{ currentObject.text }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Add',
  data() {
    return {
      objects: [],
      currentObject: {},
      newTitle: '',
      newObject: '',
      currPageNum: 0,
      newPageNum: 0,
    }
  },
  created() {
    this.getItems()
  },
  computed: {
    sortedObjects() {
      return this.objects
      // return this.objects.sort((a, b) => {
      //   var rval = 0;
      //   if (a.page > b.page) {
      //     rval = 1;
      //   } else if (a.page < b.page) {
      //     rval = -1;
      //   }
      //   return rval;
      // });
    },
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get('/api/items')
        this.objects = response.data
        return true
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
