<template>
  <div class="addPage" id="app">
    <div class="add" id="tools">
      <h1>Add a new Note</h1>
      <form class="column">
        <input type="text" v-model="title" placeholder="Title" />
        <textarea v-model="text" placeholder="Note"></textarea>
        <input type="file" name="photo" @change="fileChanged" />
        <button v-on:click.prevent="upload">Add</button>
      </form>
      <h2 style="font-size: 16px">Notes added:</h2>
      <ul class="notesAdded">
        <li v-for="item in sortedObjects" :key="item.index">
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Add",
  data() {
    return {
      objects: [],
      title: "",
      text: "",
    };
  },
  created() {
    this.getItems();
  },
  computed: {
    sortedObjects() {
      // if (this.objects == []) {
      return this.objects;
      // } else {
      //   return this.objects.sort((a, b) => {
      //     var rval = 0;
      //     if (a.page > b.page) {
      //       rval = 1;
      //     } else if (a.page < b.page) {
      //       rval = -1;
      //     }
      //     return rval;
      //   });
      // }
    },
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.objects = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        let r2 = await axios.post("/api/items", {
          title: this.title,
          text: this.discription,
          path: r1.data.path,
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>