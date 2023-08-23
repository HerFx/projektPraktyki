<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="tasks"
      item-key="id"
      class="table-box"
    >
      <template v-slot:item="{ item }">
        <tr v-if="editingId === item.id">
          <td>
            <v-text-field
              v-model="editedTask.name"
              @keyup.enter="saveApp(item)"
              @blur="saveTask(item)"
              class="text-center"
            ></v-text-field>
          </td>
          <td class="text-center">{{ item.application }}</td>
          <td class="text-center">{{ item.serwer }}</td>
          <td class="btn-box">
            <v-btn @click="saveTask(item)" class="save-btn">Save</v-btn>
            <v-btn @click="editingId = null" class="close-btn">Close</v-btn>
          </td>
        </tr>
        <tr v-else>
          <td class="text-center">{{ item.name }}</td>
          <td class="text-center">{{ item.application }}</td>
          <td class="text-center">{{ item.serwer }}</td>
          <td class="btn-box text-center">
            <v-btn @click="startEditing(item)" class="edit-btn">Edit</v-btn>
            <v-btn color="delete-btn" @click="deleteTask(item.id)"
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
  created() {
    this.fetchTasks();
  },
  data() {
    return {
      editedTask: {},
      editingId: null,
    };
  },
  computed: {
    headers() {
      return [
        { text: "Task", value: "task", align: "center" },
        { text: "Application", value: "applications", align: "center" },
        { text: "Server", value: "servers", align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" },
      ];
    },
    ...mapState(["tasks"]),
  },
  methods: {
    ...mapActions(["fetchTasks", "deleteTask", "editTask"]),
    startEditing(item) {
      this.editedTask = { ...item };
      this.editingId = item.id;
    },
    async saveTask() {
      try {
        await this.editTask(this.editedTask);
        this.editingId = null;
      } catch (error) {
        console.error("Błąd podczas zapisywania tasku:", error);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.table-box tr:hover:not(.editing-row) {
  background-color: #333 !important;
}
</style>
