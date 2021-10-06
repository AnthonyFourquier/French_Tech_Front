<template>
  <div class="charts">
    <div class="fundRaisingChart" v-if="fund_raising.length > 0">
      <h2>Levée de fonds</h2>
      <chart-component
        :chartData="fund_raising"
        :options="chartOptions"
        label="Levée de fonds"
        :chartColors="fundRaisingChartColor"
      ></chart-component>
    </div>

    <div class="caChart" v-if="ca.length > 0">
      <h2>Chiffre d'affaire</h2>
      <chart-component
        :chartData="ca"
        :options="chartOptions"
        label="Chiffre d'affaire"
        :chartColors="caChartColor"
      ></chart-component>
    </div>
  </div>
</template>

<script>
import ChartComponent from "@/components/ChartComponent.vue";

export default {
  components: {
    ChartComponent,
  },
  data() {
    return {
      //company: [],
      fund_raising: [],
      fundRaisingChartColor: {
        borderColor: "#241023",
        pointBorderColor: "#6B0504",
        pointBackGroundColor: "#D5E68D",
        backgroundColor: "#52414C",
      },

      ca: [],
      caChartColor: {
        borderColor: "#241023",
        pointBorderColor: "#6B0504",
        pointBackGroundColor: "#D5E68D",
        backgroundColor: "#E3655B",
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
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
        //const date = moment(d.updated_at, "YYYY-MM-DD").format("DD/MM");
        const name = d.name;
        const { fund_raising, ca } = d;

        this.fund_raising.push({ name, total: fund_raising });
        this.ca.push({ name, total: ca });

        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.charts {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>
