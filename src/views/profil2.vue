<template></template>

<script>
export default {
  name: "profil2",
  data() {
    return {};
  },
  mounted: async function () {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      /* withCredentials: true, */
      /*  credentials: "include", */

      /* mode: "no-cors", */
    };
    try {
      const response = await fetch(
        "http://frenchtech.webo/api/profilusers/index/apiToken=" +
          window.apiToken,
        options
      );

      console.log("BALBALBALBALABLAAB", response);

      const data = await response.json();
      this.test = data;

      console.log("AHHAHAHAHAHAA", this.test);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
