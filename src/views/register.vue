<template>
  <div class="register">
    <form @submit="sendForm">
      <label for="email"><b>Votre Mail : </b></label>
      <input type="text" name="email" v-model="email" />
      <br />
      <div>
        <button type="submit"><i class="fas fa-check-square fa-3x"></i></button>
      </div>
      <p>{{ email }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "register",
  data: () => ({
    email: "",
    role: "",
  }),
  methods: {
    async sendForm(e) {
      e.preventDefault();
      const body = {
        email: this.email,
        role: this.role,
      };
      console.log(body);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        mode: "no-cors",
      };

      try {
        const response = await fetch(
          "http://frenchtech.webo/api/validateuser/register",
          options
        );
        const data = await response.json();

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
button {
  border: none;
  color: #0f0041;
  background-color: white;
}
</style>
