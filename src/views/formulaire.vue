<template>
  <div class="mainContainer">
    <div class="formulaire">
      <form @submit="sendForm">
        <br />
        <br />
        <label for="name">Nom:</label>
        <input type="text" name="name" v-model="name" />
        <br />
        <br />
        <label for="mail">Mail:</label>
        <input type="mail" name="mail" v-model="mail" />
        <br />
        <br />
        <label for="tel">Tel:</label>
        <input type="number" name="tel" v-model="tel" />
        <br />
        <br />
        <label for="address">Adresse:</label>
        <input type="text" name="address" v-model="address" />
        <br />
        <br />
        <label for="postcode">Code postal:</label>
        <input type="text" name="postcode" v-model="postcode" />
        <br />
        <br />
        <label for="website">Site web:</label>
        <input type="text" name="website" v-model="website" />
        <br />
        <br />
        <label for="facebook">Facebook:</label>
        <input
          type="text"
          placeholder="Entrez le lien facebook"
          name="facebook"
          v-model="facebook"
        />
        <br />
        <br />
        <label for="linkedin">Linkedin:</label>
        <input
          type="text"
          placeholder="Entrez le lien linkedin"
          name="linkedin"
          v-model="linkedin"
        />
        <br />
        <br />
        <label for="twitter">Twitter:</label>
        <input
          type="text"
          placeholder="Entrez le lien twitter"
          name="twitter"
          v-model="twitter"
        />
        <br />
        <br />
        <label for="instagram">Instagram:</label>
        <input
          type="text"
          placeholder="Entrez le lien instagram"
          name="instagram"
          v-model="instagram"
        />
        <br />
        <br />
        <select v-model="category" name="category">
          <option value="">--Choisir la catégorie--</option>
          <option value="startup">Start-Up</option>
          <option value="association">Association</option>
          <option value="organisme-financeur">Organisme financeur</option>
          <option value="organisme-formation">Organisme de formation</option>
          <option value="service-public">Service public</option>
          <option value="tpe-pme">TPE/PME</option>
          <option value="grand">Grande entreprises / Grand groupe / ETI</option>
          <option value="pole-competitivite">Pôle de compétitivité</option>
        </select>
        <br />
        <br />
        <select v-model="association" name="association">
          <option value="">--Choisir l'association--</option>
          <option value="cannes">Cannes is Up</option>
          <option value="grasse">
            Le club des entrepreneurs du pays de Grasse
          </option>
          <option value="nice">Nice Starts-up</option>
          <option value="telecom">Telecom Valley</option>
        </select>
        <br />
        <br />
        <select v-model="activity" name="activity">
          <option value="">--Choisir le secteur d'activité--</option>
          <option value="formation">Formation</option>
          <option value="energie">Energie</option>
          <option value="evenementiel">Evènementiel</option>
          <option value="textile">Mode et textile</option>
          <option value="industry">Industrie</option>
          <option value="recrutement">Recrutement</option>
          <option value="juridique">Juridique</option>
          <option value="media">Médias</option>
          <option value="web">Produits et services web</option>
          <option value="logiciel">Développement logiciel</option>
          <option value="sport">Sport</option>
          <option value="telecom">Telecom</option>
          <option value="transport">Transports</option>
          <option value="voyage">Voyages</option>
          <option value="healthy">Bien-être</option>
          <option value="finance">Finance</option>
          <option value="administration">Administration publique</option>
        </select>
        <br />
        <label for="fund_raising">Levees de fond:</label>
        <input type="number" name="fund_raising" v-model="fund_raising" />
        <br />
        <br />
        <label for="employees">Nombre de salaries:</label>
        <input type="number" name="employees" v-model="employees" />
        <br />
        <br />
        <label for="recrutement">Recrutement:</label>
        <input type="number" name="recrutement" v-model="recrutement" />
        <br />
        <br />
        <label for="women">Nombre de femmes:</label>
        <input type="number" name="women" v-model="women" />
        <br />
        <br />
        <label for="ca">Chiffre d'affaire:</label>
        <input type="number" name="ca" v-model="ca" />
        <br />
        <br />
        <div class="description">
          <p>Description:</p>
          <textarea
            v-model="description"
            name="description"
            cols="30"
            rows="10"
          ></textarea>
          <br />
        </div>
        <div>
          <button type="submit" value="Submit" @click="sendForm">
            <i class="fas fa-check-square fa-3x"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    name: "",
    /* logo: "", */
    address: "",
    postcode: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    category: "",
    association: "",
    description: "",
    website: "",
    mail: "",
    tel: "",
    activity: "",
    fund_raising: "",
    employees: "",
    recrutement: "",
    women: "",
    ca: "",
  }),
  methods: {
    async sendForm(e) {
      e.preventDefault();

      const body = {
        name: this.name,
        /* logo: this.logo, */
        address: this.address,
        postcode: this.postcode,
        facebook: this.facebook,
        linkedin: this.linkedin,
        twitter: this.twitter,
        instagram: this.instagram,
        category: this.category,
        association: this.association,
        description: this.description,
        website: this.website,
        mail: this.mail,
        tel: this.tel,
        activity: this.activity,
        fund_raising: this.fund_raising,
        employees: this.employees,
        recrutement: this.recrutement,
        women: this.women,
        ca: this.ca,
      };
      const options = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        //credentials: "include",
        body: JSON.stringify(body),
      };
      try {
        const response = await fetch(
          "http://frenchtech.webo/api/validatecompanies/store",
          options
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
button {
  border: none;
  color: #0f0041;
  background-color: white;
}
.formulaire {
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
  width: 40%;
}
</style>
