<template>
  <!-- penser a supprimer toute la carte ( True et false), jouer avec le v-show displayOn et displayNone -->
  <div class="container">
    <form>
      <div class="company">
        <ul v-for="(elem, index) in company" :key="index">
          <div class="validateCompany">
            <h2>
              <b>{{ elem.name }}</b>
            </h2>

            <div><b>adresse : </b>{{ elem.address }}</div>
            <div><b>categorie : </b>{{ elem.category }}</div>
            <div><b>association : </b>{{ elem.association }}</div>
            <div><b>description rapide : </b>{{ elem.description }}</div>
            <div><b>site web : </b>{{ elem.website }}</div>
            <div><b>email : </b>{{ elem.mail }}</div>
            <div><b>telephone : </b>{{ elem.tel }}</div>
            <div><b>activite : </b>{{ elem.activity }}</div>
            <div><b>levees de fond : </b>{{ elem.fund_raising }}</div>
            <div><b>Nombre de salaries : </b>{{ elem.employees }}</div>
            <div><b>postes a pourvoir : </b>{{ elem.recrutement }}</div>
            <div><b>Nombre de femmes : </b>{{ elem.women }}</div>
            <div><b>Chiffre d'affaires : </b>{{ elem.ca }}</div>
            <br />
            <div class="network">
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
            <br />
            <div class="btn">
              <button
                type="submit"
                @click="
                  function test(e) {
                    validateCompany(e, elem.id);
                  }
                "
              >
                <i class="fas fa-check-square fa-2x"></i>
              </button>
              <button
                type="submit"
                @click="
                  function test(e) {
                    deleteCompany(e, elem.id);
                  }
                "
              >
                <i class="fas fa-trash-alt fa-2x"></i>
              </button>
            </div>
          </div>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: [],
    };
  },
  methods: {
    async validateCompany(e, id) {
      e.preventDefault();
      e.stopPropagation();
      const body = {
        id: id,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        //mode: "no-cors",
      };
      console.log(JSON.stringify(body));
      try {
        const response = await fetch(
          "http://frenchtech.webo/api/validatecompanies/validate",
          options
        );

        //console.log(response);

        const data = await response.json();
        if (data.success) {
          this.company = this.company.filter((c) => c.id !== body.id);
        }
        //console.log(data);
      } catch (error) {
        //console.log(error);
      }
    },
    async deleteCompany(e, id) {
      e.preventDefault();
      const body = {
        id: id,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        //mode: "no-cors",
      };

      try {
        const response = await fetch(
          "http://frenchtech.webo/api/validatecompanies/destroy",
          options
        );

        //console.log(response);

        const data = await response.json();

        if (data.success) {
          this.company = this.company.filter((c) => c.id !== body.id);
        }
        //console.log(data);
      } catch (error) {
        //console.log(error);
      }
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
        "http://frenchtech.webo/api/validatecompanies/index",
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
.company {
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
  justify-content: flex-end;
}
button {
  border: none;
  color: #0f0041;
  background-color: none;
  text-decoration: none;
  background-color: white;
}
.validateCompany {
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
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
