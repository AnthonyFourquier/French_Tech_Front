<template>
  <div id="app">
    <Tabs>
      <Tab name="Dashboard" selected="true">
        <h1><u>DASHBOARD</u></h1>
        <div class="dashboard">
          <div class="private">
            <private-component></private-component>
          </div>
          <div class="chart">
            <div class="startup">
              <h2>Startup de la région</h2>
              <pie-chart-data></pie-chart-data>
            </div>
            <div class="salarie">
              <bar-chart-data></bar-chart-data>
            </div>
            <div class="money">
              <chart-data></chart-data>
            </div>
          </div>
          <!-- <pie-chart-component></pie-chart-component> -->
        </div>
      </Tab>
      <Tab name="Adherents">
        <div class="adherents">
          <h1><u>NOS ADHERENTS</u></h1>
          <company-component></company-component>
        </div>
      </Tab>

      <Tab name="Export">
        <h1>EXPORT DE FICHIER EXCEL</h1>
        <div class="test"><export-excel-component /></div>
      </Tab>

      <Tab name="Import ">
        <h1>IMPORT DE FICHIER EXCEL</h1>
        <div class="test">
          <import-excel-component></import-excel-component>
        </div>
      </Tab>
      <Tab name="Valider Adherents">
        <h1>VALIDATION UTILISATEUR</h1>
        <div class="general"><validate-user-component /></div>
      </Tab>
      <Tab name="Valider Entreprise">
        <h1>COMPANY VALIDATION</h1>
        <div class="test">
          <validate-company-component></validate-company-component>
        </div>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import CompanyComponent from "@/components/CompanyComponent.vue";
import PrivateComponent from "@/components/PrivateComponent.vue";
//import ChartData from "@/components/ChartData.vue";
import Tab from "@/components/tab.vue";
import Tabs from "@/components/tabs.vue";
import ValidateCompanyComponent from "@/components/ValidateCompanyComponent.vue";
import ValidateUserComponent from "@/components/ValidateUserComponent.vue";
import ExportExcelComponent from "../components/ExportExcelComponent.vue";
import ImportExcelComponent from "@/components/ImportExcelComponent.vue";
import PieChartData from "../components/PieChartData.vue";
import BarChartData from "@/components/BarChartData.vue";
import ChartData from "../components/ChartData.vue";
//import PieChartComponent from "../components/PieChartComponent.vue";

export default {
  name: "App",
  components: {
    CompanyComponent,
    PrivateComponent,
    Tab,
    Tabs,
    ValidateCompanyComponent,
    ValidateUserComponent,
    ExportExcelComponent,
    ImportExcelComponent,
    BarChartData,
    PieChartData,
    ChartData,
    //PieChartComponent,
  },
};
</script>

<style scoped>
.private {
  height: 20%;
  width: 100%;
}
.chart {
  width: 100%;
}
</style>
