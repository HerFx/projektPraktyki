<template>
  <v-container>
    <v-form @submit.prevent="addServerToDatabase">
      <v-text-field
        v-model="serverName"
        label="Server Name"
        outlined
        :rules="serverNameRules"
      ></v-text-field>
      <v-btn type="submit" block>Add Server</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      serverName: "",
      serverNameRules: [
        (value) => {
          if (value) return true;
          return "Server name is required.";
        },
      ],
    };
  },
  methods: {
    ...mapActions(["addServer"]),
    async addServerToDatabase() {
      try {
        const newServerData = {
          name: this.serverName,
        };

        if (!newServerData.name) {
          return;
        }
        await this.addServer(newServerData);
      } catch (error) {
        console.error("Error adding server:", error);
      }
    },
  },
};
</script>
<style lang="css" scoped>
button {
  background-color: #27d !important;
}
</style>
