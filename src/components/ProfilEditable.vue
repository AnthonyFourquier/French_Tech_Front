<template>
  <div class="inputWrapper">
    <div class="inputText" @click="showInput" v-show="!inputVisible">
      <span class="inputTextName">{{ label }} : </span>
      <span class="inputTextValue">{{ value }}</span>
    </div>

    <input v-show="inputVisible" class="inputEdit" v-model="value" />
    <button v-show="inputVisible" type="button" @click="save">
      <i class="fas fa-check-square fa-2x"></i>
    </button>
  </div>
</template>
<script>
export default {
  name: "profil",
  props: ["label", "index", "cle"],
  data() {
    return {
      test: [],
      value: "",
      inputVisible: false,
    };
  },
  methods: {
    save() {
      console.log("ataat", this.cle, this.index, this.value);
      this.inputVisible = false;
      this.$emit("value", {
        index: this.index,
        cle: this.cle,
        value: this.value,
      });
    },
    showInput() {
      this.inputVisible = true;
    },
  },
  mounted: async function () {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      /* credentials: "include",
      mode: "no-cors", */
    };

    try {
      const response = await fetch(
        "http://frenchtech.webo/api/companies/index",
        options
      );

      //console.log(response);

      const data = await response.json();

      this.company = data;
      //console.log(data);
    } catch (error) {
      //console.log(error);
    }
  },
};
</script>
<style>
.profilWrapper {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  max-width: 768px;
  min-width: 364px;
  margin: 1em auto;
  border-radius: 6px;
  box-shadow: 0 2px 3px #ccc;
  padding: 1em 2.5em;
  background: #fafafa;
}

.profilWrapper .inputWrapper {
  border-bottom: 1px solid #ddd;
}
.inputEdit {
  margin: 16px;
}
.inputText {
  display: flex;
  justify-content: space-between;
  margin: 16px;
}
.inputTextName {
  flex: 2;
  text-align: left;
}
.inputTextValue {
  flex: 1;
  text-align: right;
}
input {
  border-radius: 0;
  margin: 4px 13px;
  padding: 8px;
  border: none;
  border-bottom: 1px solid;
  background: transparent;
}

.formulaire label {
  width: 301px;
  display: inline-block;
  text-align: left;
}

select {
  width: 508px;
  padding: 8px;
  margin: 8px 0;
}
button {
  border: none;
  color: #0f0041;
  background-color: none;
  text-decoration: none;
  background-color: white;
}
</style>
