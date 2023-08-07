<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="aplikacje"
      item-key="id"
      class="table-box"
    >
      <template v-slot:item="{ item }">
        <tr v-if="editingId === item.id">
          <td>
            <v-text-field
              v-model="editedApp.name"
              class="text-center"
            ></v-text-field>
          </td>
          <td>
            <select
              v-model="editedApp.serwer"
              class="text-center"
              @change="updateSelectedServer"
            >
              <option value="" disabled>Select a server</option>
              <option
                v-for="server in serwery"
                :key="server.id"
                :value="server.name"
              >
                {{ server.name }}
              </option>
            </select>
          </td>

          <td class="btn-box">
            <v-btn @click="saveApp(item)" class="save-btn">Save</v-btn>
            <v-btn @click="editingId = null" class="close-btn">Close</v-btn>
          </td>
        </tr>
        <tr v-else>
          <td class="text-center">{{ item.name }}</td>
          <td class="text-center">{{ item.serwer }}</td>
          <td class="btn-box text-center">
            <v-btn @click="startEditing(item)" class="edit-btn">Edit</v-btn>
            <v-btn color="delete-btn" @click="deleteApplication(item.id)"
              >Delete</v-btn
            >
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ApplicationTable",
  data() {
    return {
      editedApp: {
        name: "",
        serwer: "",
        serwerId: "",
      },
      editingId: null,
    };
  },
  computed: {
    headers() {
      return [
        { text: "Application", value: "applications", align: "center" },
        { text: "Server", value: "servers", align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" },
      ];
    },
    ...mapState(["aplikacje", "serwery"]),
  },
  methods: {
    ...mapActions([
      "deleteApplication",
      "editApplication",
      "fetchApplications",
      "fetchSerwery",
    ]),

    startEditing(item) {
      this.editedApp = { ...item };
      this.editingId = item.id;
    },
    updateSelectedServer() {
      const selectedServer = this.serwery.find(
        (server) => server.name === this.editedApp.serwer
      );
      if (selectedServer) {
        this.editedApp.serwer = selectedServer.name;
        this.editedApp.serwerId = selectedServer.id;
      } else {
        console.error("Selected server not found.");
      }
    },
    async saveApp() {
      try {
        this.updateSelectedServer();

        await this.editApplication(this.editedApp);
        console.log("editedApp:", this.editedApp);
        this.editingId = null;
      } catch (error) {
        console.error("Error editing App:", error);
      }
    },
  },
  created() {
    this.fetchApplications();
    this.fetchSerwery();
  },
};
</script>

<style lang="css" scoped>
.table-box tr:hover:not(.editing-row) {
  background-color: #333 !important;
}
</style>
