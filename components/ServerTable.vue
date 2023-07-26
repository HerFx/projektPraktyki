<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="appOptions"
      item-key="id"
      class="table-box"
    >
      <template v-slot:item="{ item }">
        <tr v-if="item.id === editingItemId">
          <td>
            <v-text-field
              v-model="editedApp.serverName"
              class="text-center"
            ></v-text-field>
          </td>
          <td class="btn-box">
            <v-btn @click="saveEdited(item.id)" class="save-btn">Save</v-btn>
            <v-btn @click="close()" class="close-btn">Close</v-btn>
          </td>
        </tr>
        <tr v-else>
          <td class="text-center">{{ item.serverName }}</td>
          <td class="btn-box text-center">
            <v-btn class="edit-btn" @click="editItem(item)">Edit</v-btn>
            <v-btn color="delete-btn" @click="deleteServer(item.id)"
              >Delete</v-btn
            >
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "ServerTable",
  computed: {
    headers() {
      return [
        { text: "Server", value: "servers", align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" },
      ];
    },
    appOptions() {
      return this.$store.getters["getServer"];
    },
  },
  methods: {
    deleteServer(taskId) {
      this.$store.dispatch("deleteServerIndex", taskId);
    },
    editItem(item) {
      this.editingItemId = item.id;
      this.editedApp = { ...item };
    },
    saveEdited(oldAppId) {
      this.$store.commit("deleteServer", oldAppId);
      this.$store.commit("updateServer", this.editedApp);
      this.editingItemId = null;
      this.editedApp = {
        serverName: "",
      };
    },
    close() {
      this.editingItemId = null;
    },
  },
  data() {
    return {
      editingItemId: null,
      editedApp: {
        serverName: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.table-box tr:hover:not(.editing-row) {
  background-color: #333 !important; /* Kolor podświetlenia po najechaniu na wiersz (z wyjątkiem edytowanego wiersza) */
}
</style>
