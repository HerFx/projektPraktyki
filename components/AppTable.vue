<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="appOptions"
      item-key="id"
      class="table-box"
      :item-class="itemClass"
    >
      <template v-slot:item="{ item }">
        <tr v-if="item.id === editingItemId">
          <td>
            <v-text-field
              v-model="editedApp.application"
              class="text-center"
            ></v-text-field>
          </td>
          <td>
            <select v-model="editedApp.servers" class="text-center">
              <option v-for="(option, index) in appServer" :key="index">
                {{ option.serverName }}
              </option>
            </select>
          </td>
          <td class="btn-box">
            <v-btn @click="saveEditedTask(item.id)" class="save-btn"
              >Save</v-btn
            >
            <v-btn @click="close()" class="close-btn">Close</v-btn>
          </td>
        </tr>
        <tr v-else>
          <td class="text-center">{{ item.application }}</td>
          <td class="text-center">{{ item.servers }}</td>
          <td class="btn-box text-center">
            <v-btn class="edit-btn" @click="editItem(item)">Edit</v-btn>
            <v-btn color="delete-btn" @click="deleteApp(item.id)">Delete</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "TaskTable",
  computed: {
    headers() {
      return [
        { text: "Application", value: "selectedOption", align: "center" },
        { text: "Server", value: "servers", align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" },
      ];
    },
    appOptions() {
      return this.$store.getters["getApp"];
    },
    appServer() {
      return this.$store.getters["getServer"];
    },
  },
  methods: {
    deleteApp(appId) {
      this.$store.dispatch("delateAppIndex", appId);
    },
    editItem(item) {
      this.editingItemId = item.id;
      this.editedApp = { ...item };
    },
    saveEditedTask(oldAppId) {
      this.$store.commit("deleteApp", oldAppId);
      this.$store.commit("updateApp", this.editedApp);
      this.editingItemId = null;
      this.editedApp = {
        application: "",
        servers: "",
      };
    },
    close() {
      this.editingItemId = null;
      this.editedApp = {
        application: "",
        servers: "",
      };
    },
    itemClass(item) {
      return item.id === this.editingItemId ? "editing-row" : "";
    },
  },
  data() {
    return {
      editingItemId: null,
      editedApp: {
        application: "",
        servers: "",
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
