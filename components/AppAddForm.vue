<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="app.application"
        label="Aplication"
        required
        outlined
      ></v-text-field>
      <select v-model="app.servers">
        <option value="" disabled>Select a server</option>
        <option v-for="(option, index) in selectedServer" :key="index">
          {{ option.serverName }}
        </option>
      </select>
      <v-btn type="submit" color="primary">Add App</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "AppAddForm",
  data() {
    return {
      app: {
        application: "",
        servers: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (!this.app.servers) {
        alert("Please select a server");

        return;
      }
      this.$store.commit("updateApp", this.app);
      this.app = {
        application: "",
        servers: "",
      };
    },
  },
  computed: {
    selectedServer() {
      return this.$store.getters["getServer"];
    },
  },
};
</script>

<style lang="css" scoped>
button {
  background-color: #27d !important;
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #fff;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  color: #333;
  border: 1px solid #fff;
}
</style>
