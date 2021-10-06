<template>
  <div class="private">
    <div class="general">
      <div class="sub">
        <div class="num">
          <img class="icon1" src="../assets/woman.png" alt="woman icon" />
          <b>{{ sumWomen }}</b>
        </div>
        <p>Femmes Salariée</p>
      </div>
      <div class="sub">
        <div class="num">
          <img class="icon2" src="../assets/hand.png" alt="hand icon" />
          <b>{{ sumCa }} €</b>
        </div>
        <p>De chiffre d'affaire</p>
      </div>
      <div class="sub">
        <div class="num">
          <img class="icon3" src="../assets/employee.png" alt="employee icon" />
          <b>{{ sumEmployees }}</b>
        </div>
        <p>Salariés</p>
      </div>
      <div class="sub">
        <div class="num">
          <img
            class="icon4"
            src="../assets/job-offer.png"
            alt="job-offer icon"
          />
          <b>{{ sumRecrutement }}</b>
        </div>
        <p>Emplois a pourvoir</p>
      </div>
      <div class="sub">
        <div class="num">
          <img class="icon5" src="../assets/company.png" alt="startup icon" />
          <b>{{ totalStartup }}</b>
        </div>
        <p>Startups</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      company: [],
      startup: [],
      totalStartup: null,
    };
  },
  computed: {
    sumWomen() {
      return this.company.reduce((sum, company) => {
        return (sum += company.women);
      }, 0);
    },
    sumEmployees() {
      return this.company.reduce((sum, company) => {
        return (sum += company.employees);
      }, 0);
    },
    sumRecrutement() {
      return this.company.reduce((sum, company) => {
        return (sum += company.recrutement);
      }, 0);
    },
    sumCa() {
      return this.company.reduce((sum, company) => {
        return (sum += company.ca);
      }, 0);
    },
  },

  mounted: async function () {
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

      console.log(response);

      const data = await response.json();

      this.company = data;

      data.forEach((d) => {
        const category = d.category;
        if (category === "startup") {
          let startup = category;
          this.startup.push(startup);
        }
      });
      this.totalStartup = this.startup.length;

      //this.startup.push
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.private {
  margin-top: 1%;
}

.general {
  margin-left: 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: auto;
  margin-right: 7%;
  color: rgb(22, 24, 170);
  box-shadow: 10px 5px 5px rgb(145, 142, 142);
  height: 110px;
  background: conic-gradient(at 0% 30%, #3366ff 10%, white 30%, #e52345 50%);
}
.sub {
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* .content {
  margin: 1%;
} */
.icon1,
.icon2,
.icon3,
.icon4,
.icon5 {
  margin-left: 10px;
  width: 50px;
}
.num {
  display: flex;
}
</style>
