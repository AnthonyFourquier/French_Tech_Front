<template>
<div class="container">
  <form>
    <label
      >File
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload" />
    </label>
    <button v-on:click="submitFile"><i class="fas fa-file-import fa-2x"></i></button>
  </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  /*
      Defines the data used by the component
    */
  data() {
    return {
      file: "",
    };
  },

  methods: {
    handleFileUpload(e) {
      this.file = e.target.files[0];
    },

    submitFile(e) {
      e.preventDefault();
      let formData = new FormData();

      formData.append("file", this.file);

      axios
        .post("http://frenchtech.webo/api/admin/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          /* mode: "no-cors", */
          // crendentials: "include",
          // withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("bravo");
          }
        })

        .catch((error) => {
          // code here when an upload is not valid
          console.log("HAIHZIAHZIAHZIAHZIAHZIAZHAIZIAHZ", this.file);
          this.uploading = false;
          this.error = error.response.data;
          console.log("check error: ", this.error);
        });
    },
  },
};

/* export default {
  data() {
    return {
      file: "",
    };
  },

  methods: {
    async submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        formData,
      };

      //appel fetch
    },

    /*
        Handles a change on the file upload
      */
/*    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
};  */
</script>
<style scoped>
button{
  border: none;
  color: #0f0041;
  background-color: white;

}
.container{
  margin-bottom: 27.5%;
}
</style>