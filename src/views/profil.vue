<template>
  <div class="profilWrapper">
    <profil-editable cle="name" @value="save" index="0" label="votre nom" />
    <profil-editable
      @value="save"
      cle="firstname"
      index="1"
      label="votre prenom"
    />
    <profil-editable
      cle="name"
      @value="save"
      index="2"
      label="votre entreprise"
    />
    <profil-editable
      cle="address"
      @value="save"
      index="3"
      label="votre adresse"
    />
    <profil-editable
      cle="activity"
      @value="save"
      index="4"
      label="votre categorie d'activity"
    />
    <profil-editable
      cle="association"
      @value="save"
      index="5"
      label="votre association"
    />
    <profil-editable
      cle="description"
      @value="save"
      index="6"
      label="votre descriptif"
    />
    <profil-editable cle="email" @value="save" index="7" label="votre email" />
    <profil-editable cle="a" @value="save" index="8" label="votre activité" />
    <profil-editable
      cle="crund_founding"
      @value="save"
      index="9"
      label="vos levées de fond"
    />
    <profil-editable
      cle="employees"
      @value="save"
      index="10"
      label="votre Nombre de salaries"
    />
    <profil-editable
      cle="recruitment"
      @value="save"
      index="11"
      label="vos postes a pourvoir"
    />
    <profil-editable
      cle="women"
      @value="save"
      index="12"
      label="votre Nombre de femmes"
    />
    <profil-editable
      cle="ca"
      @value="save"
      index="13"
      label="votre Chiffre d'affaires"
    />
    <profil-editable cle="tel" @value="save" index="14" label="votre tel" />
  </div>
</template>

<script>
import ProfilEditable from "../components/ProfilEditable.vue";
export default {
  components: { ProfilEditable },
  name: "profil",
  data() {
    return {
      test: [],
      values: [],
      inputVisible: false,
    };
  },
  methods: {
    save({ index, cle, value }) {
      let x = { [cle]: value };
      console.log(x, cle, index);
      this.values[index] = x;
    },
    showInput() {
      this.inputVisible = true;
    },
  },
  mounted: async function () {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      /* withCredentials: true, */
      /*  credentials: "include", */

      mode: "no-cors",
    };
    try {
      const response = await fetch(
        "http://frenchtech.webo/api/profilusers/index/apiToken=" +
          window.apiToken,
        options
      );

      console.log("BALBALBALBALABLAAB", response);

      const data = await response.json();
      this.test = data;

      console.log("AHHAHAHAHAHAA", this.test);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
