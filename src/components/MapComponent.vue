<template>
  <div class="container">
    <div>
      <div class="search">
        <h3>Rechercher par Nom:</h3>
        <input type="text" v-model="search" class="search-input" />
      </div>
      <div class="info" v-if="this.search && filteredMarker.length > 0">
        {{ filteredMarker.length }} Adhérents trouvés.
      </div>
    </div>
    <div class="map">
      <l-map
        :center="center"
        :zoom="zoom"
        ref="map"
        @update:center="centerUpdated"
        @update:zoom="zoomUpdated"
      >
        <!-- la carte affichée dans un navigateur est composée d'un ensemble de petites tuiles que l'on recup avec l-type-layer
    on va lui binder une url qui va lui permettre d allé chercher les bonnes tyles-->

        <l-tile-Layer :url="url"></l-tile-Layer>

        <l-marker
          v-for="(marker, index) in filteredMarker"
          :lat-lng="[marker.coordinateY, marker.coordinateX]"
          :key="index"
        >
          <l-popup>
            <div class="popup">
              <p>
                <b
                  >{{ marker.name }}<i> / {{ marker.category }}</i></b
                >
              </p>
              <p><b>Association: </b>{{ marker.association }}</p>
              <div>
                <p><b>mail: </b>{{ marker.mail }}</p>
                <p><b>Tel: </b>{{ marker.tel }}</p>
                <a v-bind:href="marker.website">{{ marker.website }}</a>
              </div>
            </div>
          </l-popup>
          <l-tooltip
            ><p>{{ marker.name }}</p></l-tooltip
          >
        </l-marker>

        <v-geosearch :options="geosearchOptions"></v-geosearch>
      </l-map>
    </div>
    <div class="mapbtn">
      <button class="btn" type="button" @click="urlChange">carte 1</button>
      <button class="btn" type="button" @click="urlChange1">carte 2</button>
      <button class="btn" type="button" @click="urlChange2">carte 3</button>
      <button class="btn" type="button" @click="urlChange3">carte 4</button>
      <button class="btn" type="button" @click="urlChange4">carte 5</button>
    </div>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
  //LIcon,
} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
//import pour le geosearch
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch";

//import permettant l affichage des iconnes marker par default
import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// appeler le composant
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    //LIcon,
    VGeosearch,
  },

  //msp des data dont on a besoin
  data() {
    //pour l'url-> s = le nom de la tyle, z =zoom et xy les coordonnées.
    return {
      company: [],
      url:
        "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
      url1:
        "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
      url2:
        "https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png",
      url3:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
      url4: "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
      center: [43.62480611903789, 7.159941894290817],
      zoom: 11,
      markers: [],
      search: "",

      geosearchOptions: {
        provider: new OpenStreetMapProvider(),
      },
    };
  },

  computed: {
    filteredMarker() {
      return this.markers.filter((marker) => {
        return marker.category
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },

  //les methods update vont nous permettre qu'a chaque refresh, on s'update avec le bon zoom et center.
  methods: {
    centerUpdated(center) {
      this.center = center;
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    urlChange: function () {
      this.url =
        "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png";
    },
    urlChange1: function () {
      this.url = this.url1;
    },
    urlChange2: function () {
      this.url = this.url2;
    },
    urlChange3: function () {
      this.url = this.url3;
    },
    urlChange4: function () {
      this.url = this.url4;
    },
  },

  mounted: async function () {
    //const token = localStorage.getItem("token", token);
    console.log(this.markerLatLng);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "bearer " + token,
      },
      crendentials: "include",
    };

    try {
      const response = await fetch(
        "http://frenchtech.webo/api/companies/index",
        options
      );

      //console.log(response);

      const data = await response.json();

      this.company = data;

      data.forEach((d) => {
        const {
          coordinate_y,
          coordinate_x,
          name,
          category,
          association,
          description,
          website,
          mail,
          tel,
        } = d;

        let coordinateY = parseFloat(coordinate_y);
        let coordinateX = parseFloat(coordinate_x);

        this.markers.push({
          coordinateY,
          coordinateX,
          name,
          category,
          association,
          description,
          website,
          mail,
          tel,
        });
      });
      this.markers.forEach((e) => {
        console.log(e.name);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: row;

  margin-bottom: 2.5%;
  margin-left: 30%;
}
input {
  border-radius: 0;
  margin: 4px 13px;
  padding: 8px;
  border: none;
  border-bottom: 1px solid;
  background: transparent;
}

.map {
  position: relative;
  width: 90%;
  height: 70vh;
  overflow: hidden;
  z-index: 9;
}
.mapbtn {
  display: flex;
  width: 90%;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px;
}

.mapbtn button {
  flex-grow: 1;
  cursor: pointer;
  position: relative;
  padding: 0.6rem;
  border: 0.125rem solid #0f0041;
  color: #0f0041;
  background-color: white;
  font-size: 1.5rem;
  font-family: monospace;
  text-transform: lowercase;
  text-shadow: rgba(0, 0, 0, 0.1) 2px 2px;
  transition: flex-grow 250ms cubic-bezier(0.215, 0.61, 0.355, 1);
}

.mapbtn button + button {
  border-left: 0.125rem solid #0f0041;
  margin-left: calc(0.125rem * -1);
}

.mapbtn button:hover,
.mapbtn button:focus {
  flex-grow: 2;
  color: white;
  outline: none;
  text-shadow: none;
  background-color: #0f0041;
}

.mapbtn button:focus {
  outline: 0.125rem dashed white;
  outline-offset: calc(0.125rem * -3);
}

.mapbtn:hover button:focus:not(:hover) {
  flex-grow: 1;
  color: #0f0041;
  background-color: white;
  outline-color: #e52345;
}

.mapbtn button:active {
  transform: translateY(0.125rem);
}
</style>
