<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="server.serverName"
        label="Server"
        required
        outlined
      ></v-text-field>
      <v-btn type="submit" color="primary">Add Server</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "ServerAddForm",
  data() {
    return {
      server: {
        serverName: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (!this.server.serverName) {
        alert("Please enter a server name");
        return;
      }
      this.$store.commit("updateServer", this.server);
      this.server = {
        serverName: "",
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
