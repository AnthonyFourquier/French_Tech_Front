<template>
  <div class="container">
    <div class="search">
      <h3>Rechercher par Categorie:</h3>
      <div>
        <input type="text" v-model="search" class="search-input" />
        <div
          class="info"
          v-if="this.search && filteredCompanyCategory.length > 0"
        >
          {{ filteredCompanyCategory.length }} Adhérents trouvés.
        </div>
      </div>
    </div>
    <div class="companies">
      <ul v-for="(elem, index) in filteredCompanyCategory" :key="index">
        <div class="company">
          <h2>
            <b>{{ elem.name }}</b>
          </h2>
        
        <div><b>adresse : </b>{{ elem.address }}</div>
        <div><b>categorie : </b>{{ elem.category }}</div>
        <div><b>association : </b>{{ elem.association }}</div>
        <div><b>description rapide : </b>{{ elem.description }}</div>
        <div><b>email : </b>{{ elem.mail }}</div>
        <div><b>telephone : </b>{{ elem.tel }}</div>
        <div><b>activite : </b>{{ elem.activity }}</div>
        <div><b>levees de fond : </b>{{ elem.fund_raising }}</div>
        <div><b>Nombre de salaries : </b>{{ elem.employees }}</div>
        <div><b>postes a pourvoir : </b>{{ elem.recrutement }}</div>
        <div><b>Nombre de femmes : </b>{{ elem.women }}</div>
        <div><b>Chiffre d'affaires : </b>{{ elem.ca }}</div>
        <br />
        <br />
        <div class="network">
          <div>
            <a v-bind:href="elem.website">{{ elem.website }}</a>
          </div>

          <div>
            <!-- voir comment mettre elem.facebook en link -->
            <a v-bind:href="elem.facebook"
              ><img src="../assets/icons8-facebook.svg"
            /></a>
          </div>
          <div>
            <a v-bind:href="elem.linkedin"
              ><img src="../assets/icons8-linkedin.svg"
            /></a>
            <!-- {{ elem.linkedin }} -->
          </div>
          <div>
            <a v-bind:href="elem.twitter"
              ><img src="../assets/icons8-twitter.svg"
            /></a>
            <!-- {{ elem.twitter }} -->
          </div>
          <div>
            <a v-bind:href="elem.instagram"
              ><img src="../assets/icons8-instagram.svg"
            /></a>
            <!-- {{ elem.instagram }} -->
          </div>
        </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "company",

  data() {
    return {
      company: [],
      search: "",
    };
  },

  computed: {
    filteredCompanyName() {
      return this.company.filter((company) => {
        return company.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    filteredCompanyCategory() {
      return this.company.filter((company) => {
        return company.category
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
  mounted: async function () {
    //const token = localStorage.getItem("token", token);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      crendentials: "include",
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

<style scoped>
.companies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2%;
}
h1 {
  font-family: "Alegreya Sans", sans-serif;
}
h2 {
  font-family: "Alegreya Sans", sans-serif;

}

.name {
  margin: 5%;
}
.network {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 0;
}

.company{
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

</style>
