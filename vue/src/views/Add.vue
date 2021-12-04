<template>
  <div class="addPage" id="app">
    <div class="add" id="tools">
      <h1>Add a new Note</h1>
      <form class="column">
        <input type="text" v-model="title" placeholder="Title" />
        <textarea v-model="text" placeholder="Note"></textarea>
        <input type="file" id="fileInput" />
        <button v-on:click.prevent="addObject">Add</button>
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
import axios from 'axios'
var filey
export default {
  name: 'Add',
  data() {
    return {
      objects: [],
      title: '',
      text: '',
    }
  },
  created() {
  },
  computed: {
    sortedObjects() {
      // if (this.objects == []) {
      return this.objects
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
    addObject() {
            filey = document.getElementById('fileInput');
            console.log(this.title)
            var imageUrl = "/image";
            const formData = new FormData();
            formData.append('photo', filey.files[0], filey.files[0].name);
            axios.post(imageUrl, formData)
                .then(response => {
                    console.log("Post Image Response ");
                    console.log(response.data);
                    this.objects.push(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            var url = "/objects";
            axios.post(url, {
                    title: this.title,
                    text: this.text,
                    imageName: filey.files[0].name,
                    page: 0
                })
                .then(response => {
                    console.log("Post Response ");
                    console.log(response.data);
                    this.objects.push(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            console.log(this.objects);
            this.latestPageNum += 1;
            this.newObject = "";
        },
  },
}
</script>
