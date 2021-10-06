<template>
  <div class="mainContainer">
    <form>
      <div class="validateUsers">
        <ul v-for="elem in users" :key="elem.id">
          <div class="validateUser">
            <h2>
              <div>{{ elem.email }}</div>
            </h2>
          <div class="btn">
          <button
            type="submit"
            @click="
              function test(e) {
                validateUser(e, elem.id);
              }
            "
          >
            <i class="fas fa-check-square fa-2x"></i>
          </button>
          <button
            type="submit"
            @click="
              function test(e) {
                deleteUser(e, elem.id);
              }
            "
          >
            <i class="fas fa-trash-alt fa-2x"></i>
          </button>
          </div>
          </div>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    users: [],
    id: "",
  }),
  methods: {
    async validateUser(e, id) {
      e.preventDefault();
      const body = {
        id: id,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      try {
        const response = await fetch(
          "http://frenchtech.webo/api/validate",
          options
        );
        const data = await response.json();
        if (data.success) {
          this.users = this.users.filter((u) => u.id !== body.id);
        }

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(e, id) {
      e.preventDefault();
      const body = {
        id: id,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        /*  crendentials: "include", */
      };
      try {
        const response = await fetch(
          "http://frenchtech.webo/api/destroy",
          options
        );
        const data = await response.json();
        if (data.success) {
          this.users = this.users.filter((u) => u.id !== body.id);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted: async function () {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      crendentials: "include",
      //mode: "no-cors",
    };

    try {
      const response = await fetch(
        "http://frenchtech.webo/api/validateuser/index",
        options
      );

      //console.log(response);

      const data = await response.json();

      this.users = data;
      console.log(this.users);
      //console.log(data);
    } catch (error) {
      //console.log(error);
    }
  },
};
</script>
<style scoped>
.company {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2%;
}
h1 {
  font-family: "Alegreya Sans", sans-serif;
}
h2 {
  font-family: "Alegreya Sans", sans-serif;

}

.name {
  margin: 5%;
}
.network {
  display: flex;
  justify-content: flex-end;
}
button{
  border: none;
  color: #0f0041;
  background-color: none; text-decoration: none;
  background-color: white;
}
.validateUser{
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
}
.btn{
  display: flex;
  justify-content: flex-end;
}
</style>
