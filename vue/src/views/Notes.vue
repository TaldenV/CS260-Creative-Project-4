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
          <div>
            <button type="submit" @click="showEditBox(0)">Edit note</button>
            <button
              type="submit"
              @click="deleteNote(currentObject)"
              v-if="showEditBoxes[0]"
            >
              Delete note
            </button>
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
        <div id="currNote">
          <button type="submit" @click="showEditBox(1)" v-if="showEditBoxes[0]">
            Upload new image
          </button>
          <input
            type="file"
            id="fileInput"
            v-if="showEditBoxes[1] && showEditBoxes[0]"
          />
          <button
            type="submit"
            @click="editFile(currentObject)"
            v-if="showEditBoxes[1] && showEditBoxes[0]"
          >
            Save image
          </button>
          <img v-bind:src="/images/ + currentObject.imageName" />
          <button type="submit" @click="showEditBox(2)" v-if="showEditBoxes[0]">
            Edit title
          </button>
          <input
            type="text"
            v-model="newTitle"
            v-if="showEditBoxes[2] && showEditBoxes[0]"
          />
          <button
            type="submit"
            @click="editTitle(currentObject)"
            v-if="showEditBoxes[2] && showEditBoxes[0]"
          >
            Save title
          </button>
          <h1>{{ currentObject.title }}</h1>
          <button type="submit" @click="showEditBox(3)" v-if="showEditBoxes[0]">
            Edit note
          </button>
          <textarea
            v-model="newObject"
            v-if="showEditBoxes[3] && showEditBoxes[0]"
          ></textarea>
          <button
            type="submit"
            @click="editNote(currentObject)"
            v-if="showEditBoxes[3] && showEditBoxes[0]"
          >
            Save text
          </button>
          <span id="noteText">
            {{ currentObject.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Vue from "vue";
var filey;
export default {
  name: "Add",
  data() {
    return {
      objects: [],
      currentObject: {},
      newTitle: "",
      newObject: "",
      currPageNum: 0,
      latestPageNum: 0,
      newPageNum: 0,
      user: "USER",
      showEditBoxes: [false, false, false, false],
    };
  },
  created() {
    this.getAll();
  },
  computed: {
    sortedObjects() {
      return this.objects;
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
    async getAll() {
      console.log("get all");
      var url = "/api/objects"; // This is the route we set up in index.js
      try {
        let response = await axios.get(url);
        this.objects = response.data; // Assign array to returned response
        console.log(this.objects);
        this.latestPageNum = this.objects.length;
        this.getOne(0);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    getOne(item) {
      this.currentObject = this.sortedObjects[item];
    },
    prevPage() {
      if (this.currPageNum > 0) {
        this.currPageNum -= 1;
        this.getOne(this.currPageNum);
      }
    },
    nextPage() {
      if (this.currPageNum < this.latestPageNum - 1) {
        this.currPageNum += 1;
        this.getOne(this.currPageNum);
      }
    },
    enterPage() {
      this.currPageNum = parseInt(this.newPageNum, 10);
      this.getOne(this.currPageNum);
    },
    goToAddPage() {
      window.location = "/add";
    },
    editFile(item) {
      filey = document.getElementById("fileInput");
      var imageUrl = "/api/image";
      const formData = new FormData();
      formData.append("photo", filey.files[0], filey.files[0].name);
      axios
        .post(imageUrl, formData)
        .then((response) => {
          console.log("Post Image Response ");
          console.log(response.data);
          this.objects.push(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      var url = "/api/objects/image/" + item._id;
      item.imageName = filey.files[0].name;
      axios
        .put(url, {
          imageName: filey.files[0].name,
        })
        .then((response) => {
          console.log("Post Response ");
          console.log(response.data);
          this.objects.push(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      this.newObject = "";
    },
    editTitle(item) {
      var url = "/api/objects/title/" + item._id;
      item.title = this.newTitle;
      axios
        .put(url, {
          title: this.newTitle,
        })
        .then((response) => {
          console.log("Post Response ");
          console.log(response.data);
          this.objects.push(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      this.newTitle = "";
    },
    editNote(item) {
      var url = "/api/objects/text/" + item._id;
      item.text = this.newObject;
      axios
        .put(url, {
          text: this.newObject,
        })
        .then((response) => {
          console.log("Post Response ");
          console.log(response.data);
          this.objects.push(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      this.newTitle = "";
    },
    showEditBox(index) {
      Vue.set(this.showEditBoxes, index, !this.showEditBoxes[index]);
    },
    async deleteNote(item) {
      var url = "/api/objects/" + item._id;
      axios
        .delete(url)
        .then((response) => {
          console.log("Delete Response ");
          console.log(response.data);
          this.objects.push(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      await this.getAll();
      if (this.currPageNum > this.latestPageNum - 1) {
        this.currPageNum = this.latestPageNum - 1;
      }
      this.getOne(this.currPageNum);
    },
  },
};
</script>
