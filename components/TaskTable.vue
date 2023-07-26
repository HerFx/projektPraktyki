<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="store"
      item-key="id"
      class="table-box"
      :item-class="itemClass"
    >
      <template v-slot:item="{ item }">
        <tr v-if="item.id === editingItemId">
          <td>
            <v-text-field
              v-model="editedTask.taskTitle"
              class="text-center"
            ></v-text-field>
          </td>
          <td>
            <select v-model="editedTask.selectedOption" class="text-center">
              <option v-for="(option, index) in appOptions" :key="index">
                {{ option.application }}
              </option>
            </select>
          </td>
          <td>
            <select v-model="editedTask.servers" class="text-center">
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
          <td class="text-center">{{ item.taskTitle }}</td>
          <td class="text-center">{{ item.selectedOption }}</td>
          <td class="text-center">{{ item.servers }}</td>
          <td class="btn-box">
            <v-btn class="edit-btn" @click="editItem(item)">Edit</v-btn>
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
import db from "/helpers/db.json";
export default {
  name: "TaskTable",
  computed: {
    headers() {
      return [
        { text: "Task Title", value: "taskTitle", align: "center" },
        { text: "Application", value: "selectedOption", align: "center" },
        { text: "Server", value: "servers", align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" },
      ];
    },
    store() {
      this.$store.getters["getTask"].map((t) => {
        console.log(t);
      });
      return this.$store.getters["getTask"];
    },
    appOptions() {
      return this.$store.getters["getApp"];
    },
    appServer() {
      return this.$store.getters["getServer"];
    },
  },
  methods: {
    deleteTask(taskId) {
      this.$store.dispatch("delateTaskIndex", taskId);
    },
    editItem(item) {
      this.editingItemId = item.id;
      this.editedTask = { ...item };
    },
    saveEditedTask(oldTaskId) {
      console.log(oldTaskId);
      this.$store.commit("deleteTask", oldTaskId);
      this.$store.commit("updateTask", this.editedTask);
      this.editingItemId = null;
      this.editedTask = {
        taskTitle: "",
        selectedOption: "",
        servers: "",
      };
    },
    close() {
      this.editingItemId = null;
      this.editedTask = {
        taskTitle: "",
        selectedOption: "",
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
      // tasks: [],
      editedTask: {
        taskTitle: "",
        selectedOption: "",
        servers: "",
      },
    };
  },
  // created() {
  //   this.tasks = db.tasks;
  // },
};
</script>

<style lang="css" scoped>
.table-box tr:hover:not(.editing-row) {
  background-color: #333 !important; /* Kolor podświetlenia po najechaniu na wiersz (z wyjątkiem edytowanego wiersza) */
}
</style>
