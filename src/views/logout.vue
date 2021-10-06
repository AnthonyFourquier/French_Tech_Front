<template>
  <div>
    <form @submit.prevent="logout">
      <button type="submit">logout</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Logout",
  data() {
    return {
      apiToken: "",
    };
  },
  methods: {
    async logout() {
      let eT = window.location.search.substr(3);
      window.apiToken = eT;
      this.apiToken = eT;
      const body = {
        apiToken: eT,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiToken: eT,
        },
        /* withCredentials: true, */
        /* credentials: "include", */
        body: JSON.stringify(body),

        // mode: "no-cors",
      };
      try {
        const response = await fetch(
          "http://frenchtech.webo/api/logout",
          options
        );

        console.log("BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", response);

        const data = await response.json();
        /* this.$router.push("/"); */
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  //   mounted: async function () {
  //     let eT = window.location.search.substr(3);
  //     window.apiToken = eT;
  //     this.apiToken = eT;
  //     const body = {
  //       apiToken: eT,
  //     };
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         /* apiToken: eT, */
  //       },
  //       /* withCredentials: true, */
  //       /* credentials: "include", */
  //       body: JSON.stringify(body),

  //       // mode: "no-cors",
  //     };
  //     try {
  //       const response = await fetch("http://frenchtech.webo/api/login", options);

  //       console.log("BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", response);

  //       const data = await response.json();
  //       this.test = data;
  //       this.role = data.role;
  //       console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH", this.role);
  //       this.isConnected = true;

  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //       this.isConnected = false;
  //     }
  //   },
};
</script>
