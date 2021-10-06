<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,

  props: {
    data: {
      type: Array,
    },
    options: {
      type: Object,
    },
  },
  data() {
    return {
      sophiaStartup: [],
      cannesStartup: [],
      grasseStartup: [],
      niceStartup: [],
      tab: [],
      chartData: {
        labels: ["Nice", "Sophia-Antipolis", "Cannes", "Grasse"],
        datasets: [
          {
            backgroundColor: ["#e63946", "#f1faee", "#1d3557", "#a8dadc"],
            data: [],
          },
        ],
      },
      chartOptions: {
        hoverBorderWidth: 20,
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
    };

    try {
      const response = await fetch(
        "http://frenchtech.webo/api/companies/index",
        options
      );

      console.log(response);

      const data = await response.json();

      this.company = data;
      console.log(data);

      data.forEach((d) => {
        const category = d.category;
        const ville = d.association;

        if (category === "startup" && ville === "telecom") {
          let sophia = d.name;
          this.sophiaStartup.push(sophia);
        } else if (category === "startup" && ville === "cannes") {
          let cannes = d.name;
          this.cannesStartup.push(cannes);
        } else if (category === "startup" && ville === "nice") {
          let nice = d.name;
          this.niceStartup.push(nice);
        } else if (category === "startup" && ville === "grasse") {
          let grasse = d.name;
          this.grasseStartup.push(grasse);
        }
      }),
        console.log(this.grasseStartup);

      //this.totalStartup = this.startup.length;

      let nice = this.niceStartup.length;
      let cannes = this.cannesStartup.length;
      let sophia = this.sophiaStartup.length;
      let grasse = this.grasseStartup.length;

      this.chartData.datasets[0].data.push(nice, sophia, cannes, grasse);
    } catch (error) {
      console.log(error);
    }

    this.renderChart(this.chartData, this.chartOptions);
  },
};
</script>