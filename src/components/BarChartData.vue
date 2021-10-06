<template>
  <div class="charts">
    <div class="womenChart" v-if="women.length > 0">
      <h2>Femmes</h2>
      <bar-chart-component
        :chartData="women"
        :options="chartOptions"
        label="women"
        :chartColors="womenChartColor"
      ></bar-chart-component>
    </div>
    <div class="employeesChart" v-if="employees.length > 0">
      <h2>Nombre de salariés</h2>
      <bar-chart-component
        :chartData="employees"
        :options="chartOptions"
        label="employees"
        :chartColors="employeesChartColor"
      ></bar-chart-component>
    </div>
  </div>
</template>

<script>
import BarChartComponent from "@/components/BarChartComponent.vue";

export default {
  components: {
    BarChartComponent,
  },
  data() {
    return {
      //company: [],

      women: [],
      womenChartColor: {
        borderColor: "",
        pointBorderColor: "#E3655B",
        pointBackGroundColor: "#E3655B",
        backgroundColor: "#596157",
      },
      employees: [],
      employeesChartColor: {
        borderColor: "",
        pointBorderColor: "#6B0504",
        pointBackGroundColor: "#D5E68D",
        backgroundColor: "#CFD186",
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
        const name = d.name;
        const { employees, women } = d;

        this.employees.push({ name, total: employees });
        this.women.push({ name, total: women });

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