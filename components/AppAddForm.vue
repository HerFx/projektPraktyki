<template>
  <v-container>
    <v-form @submit.prevent="addAppToDatabase">
      <v-text-field
        v-model="appName"
        label="Application"
        required
        outlined
        :rules="rules"
      ></v-text-field>
      <select v-model="selectedServer" :rules="rules">
        <option value="" disabled>Select a server</option>
        <option v-for="server in serwery" :key="server.id">
          {{ server.name }}
        </option>
      </select>
      <v-btn type="submit" color="primary">Add App</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AppAddForm",
  data() {
    return {
      appName: "",
      selectedServer: "",
      rules: [(value) => !!value || "Required."],
    };
  },
  computed: {
    ...mapState(["serwery"]),
  },
  methods: {
    ...mapActions(["addApplication"]),
    async addAppToDatabase() {
      console.log("selectedServer:", this.selectedServer);

      const wybranySerwer = this.serwery.find(
        (serwer) => serwer.name === this.selectedServer
      );

      try {
        const newAppData = {
          name: this.appName,
          serwerId: wybranySerwer.id,
          serwer: wybranySerwer.name,
        };

        console.log("newAppData before sending:", newAppData);

        if (!newAppData.name || !newAppData.serwerId) {
          return;
        }

        await this.addApplication(newAppData);

        this.appName = "";
        this.selectedServer = "";
      } catch (error) {
        console.error("Error adding App:", error);
      }
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
