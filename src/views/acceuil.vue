<template>
  <div id="app">
    <div class="company">
      <private-component />
    </div>
    <div class="map">
      <map-component></map-component>
    </div>
    <div class="chart">
      <h2>Start-up</h2>
      <pie-chart-data></pie-chart-data>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";
import PrivateComponent from "@/components/PrivateComponent.vue";
import PieChartData from "../components/PieChartData.vue";

export default {
  name: "App",
  components: {
    MapComponent,
    PrivateComponent,
    PieChartData,
  },
  data() {
    return {
      company: [],
    };
  },
  mounted: async function () {
    if (window.location.search.substr(3)) {
      const body = {
        apiToken: window.location.search.substr(3),
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        /* withCredentials: true, */
        credentials: "include",
        /* mode: "no-cors", */
        body: JSON.stringify(body),
      };
      console.log(body);

      try {
        const response = await fetch(
          "http://frenchtech.webo/api/login",
          options
        );

        console.log(response);

        const data = await response.json();

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>
.map {
  margin-top: 2%;
  margin-left: 5%;
  z-index: 9;
}
.company {
  width: 100%;
}
.chart {
  margin-top: 18%;
  position: absolute;
  width: 20%;
  margin-left: 67%;
  z-index: 10;
}
</style>
