<template>
  <div id="app">
    <header>
      <div class="header">
        <div class="leftHeader">
          <a v-bind:href="url_ftca"
            ><img class="logo" src="@/assets/FTCA-logo.png"
          /></a>
          <h1 class="title">French Tech Côte d'Azur</h1>
        </div>
        <div id="nav">
          <div v-if="!this.apiToken" class="guest">
            <div><router-link to="/">accueil</router-link></div>
            |
            <div><router-link to="/register">register</router-link></div>
            |
            <div><router-link to="/login">login</router-link></div>
            |
          </div>
          <div class="user" v-else-if="this.apiToken && this.role === 1">
            <div><router-link to="/">accueil</router-link></div>
            |
            <div><router-link to="/formulaire">formulaire</router-link></div>
            |
            <div><router-link to="/logout">logout</router-link></div>
            |
            <div><router-link to="/profil">profil</router-link></div>
            |
          </div>
          <div class="admin" v-else-if="this.apiToken && this.role === 2">
            <div><router-link to="/">accueil</router-link></div>
            |
            <!-- <div><router-link to="/formulaire">formulaire</router-link></div>
            | -->
            <div><router-link to="/admin">Admin</router-link></div>
            <!--  |
            <div><router-link to="/profil">profil</router-link></div> -->
            |
            <div><router-link to="/logout">logout</router-link></div>
          </div>
        </div>
      </div>
    </header>
    <router-view />
    <body></body>
    <footer>
      <p class="footer">&copy; FrenchTech.Azur</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url_ftca: "https://www.frenchtechcotedazur.fr/",
      apiToken: "",
      isConnected: false,
      role: "",
    };
  },
  mounted: async function () {
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
        /* apiToken: eT, */
      },
      /* withCredentials: true, */
      /* credentials: "include", */
      body: JSON.stringify(body),

      // mode: "no-cors",
    };
    try {
      const response = await fetch("http://frenchtech.webo/api/login", options);

      console.log("BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", response);

      const data = await response.json();
      this.test = data;
      this.role = data.role;
      console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH", this.role);
      this.isConnected = true;

      console.log(data);
    } catch (error) {
      console.log(error);
      this.isConnected = false;
    }
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  flex-direction: row;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #c8d1da;
}

#nav a.router-link-exact-active {
  color: #e65744;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0f0041;
  height: 100px;
}
.leftHeader {
  display: flex;
}
.logo {
  margin: 5%;
  height: 10vh;
  margin: 0 32px;
}
.title {
  margin-top: 8%;
}
.footer {
  position: relative;
  bottom: 0;
  /* background-color: #0f0041; */
  height: 50px;
  width: 100%;
  z-index: 4;
}
body {
  background-color: #f6f7fc;
}
.guest {
  display: flex;
  flex-direction: row;
}
.user {
  display: flex;
  flex-direction: row;
}
.admin {
  display: flex;
  flex-direction: row;
}
.admin,
.guest,
.user {
  color: white;
}
.admin > div,
.guest > div,
.user > div {
  margin: 0 24px;
  text-transform: uppercase;
  height: 20px;
}
body {
  margin: 0;
}

.logo {
  height: 86px;
}
</style>
