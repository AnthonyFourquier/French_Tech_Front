<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
    chartColors: {
      type: Object,
    },
  },
  mounted() {
    const name = this.chartData.map((d) => d.name);
    const totals = this.chartData.map((d) => d.total);
    const {
      borderColor,
      pointBorderColor,
      pointBackGroundColor,
      backgroundColor,
    } = this.chartColors;

    this.renderChart(
      {
        labels: name,
        datasets: [
          {
            label: this.label,
            data: totals,
            borderColor: borderColor,
            pointBorderColor: pointBorderColor,
            pointBackGroundColor: pointBackGroundColor,
            backgroundColor: backgroundColor,
          },
        ],
      },
      this.options
    );
  },
};
</script>

<style scoped></style>