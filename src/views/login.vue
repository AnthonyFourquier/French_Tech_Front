<template>
  <div class="login">
    <form @submit="sendForm">
      <label for="email"><b>Votre Mail : </b></label>
      <input type="text" name="email" v-model="email" />
      <br />
      <div><button type="submit">valider</button></div>
    </form>
  </div>
</template>
<script>
export default {
  name: "App",

  data: () => ({
    email: "",
  }),

  methods: {
    async sendForm(e) {
      e.preventDefault();
      const body = {
        email: this.email,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      try {
        const response = await fetch(
          "http://frenchtech.webo/api/loginsend",
          options
        );

        console.log(response);

        const data = await response.json();

        console.log(data);
        /* if (data.success === true) {
          this.$router.push("/");
        } */
      } catch (error) {
        console.log(error);
      }
    },
  },
}; //export
</script>
