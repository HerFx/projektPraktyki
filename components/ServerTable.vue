<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="serwery"
      :items-per-page="5"
      item-key="id"
      class="table-box"
    >
      <template v-slot:item="{ item }">
        <tr v-if="editingId === item.id">
          <td>
            <v-text-field
              v-model="editedServer.name"
              @keyup.enter="saveServer(item)"
              @blur="saveServer(item)"
              class="text-center edit-name"
            ></v-text-field>
          </td>
          <td class="btn-box">
            <v-icon small @click="saveServer(item)">mdi-check</v-icon>
            <v-icon small @click="editingId = null">mdi-close</v-icon>
          </td>
        </tr>
        <tr v-else>
          <td class="text-center">{{ item.name }}</td>
          <td class="btn-box">
            <v-icon small @click="startEditing(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteServer(item.id)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ServerTable",
  data() {
    return {
      editedServer: {},
      editingId: null,
    };
  },
  computed: {
    headers() {
      return [
        { text: "Server", value: "servers", align: "center", sortable: false },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          align: "center",
          sortable: false,
        },
      ];
    },
    ...mapState(["serwery"]),
  },
  methods: {
    ...mapActions(["deleteServer", "editServer", "fetchSerwery"]),
    startEditing(item) {
      this.editedServer = { ...item };
      this.editingId = item.id;
    },
    async saveServer() {
      try {
        await this.editServer(this.editedServer);
        this.editingId = null;
      } catch (error) {
        console.error("Błąd podczas zapisywania serwera:", error);
      }
    },
  },
  created() {
    this.fetchSerwery();
  },
};
</script>

<style lang="css" scoped>
.table-box tr:hover:not(.editing-row) {
  background-color: #333 !important;
}
</style>
