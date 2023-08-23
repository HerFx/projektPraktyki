<template>
  <v-container>
    <v-container fluid>
      <h2>Filter</h2>
      <label>Server:</label>
      <select class="filter_select" v-model="selectedServerFilter">
        <option value="">All</option>
        <option v-for="item in serwery" :key="item.id" :value="item">
          {{ item.name }}
        </option>
      </select>
      <label>Application:</label>
      <select class="filter_select" v-model="selectedApplicationFilter">
        <option value="">All</option>
        <option v-for="item in aplikacje" :key="item.id" :value="item">
          {{ item.name }}
        </option>
        <option value="-">None</option>
      </select>
    </v-container>
    <v-data-table
      :headers="headers"
      :items="filteredTasks"
      :items-per-page="5"
      loading
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
          <td>
            <select
              v-model="editedTask.application"
              class="text-center"
              @change="updateSelectedApplication"
            >
              <option value="" disabled>Select an application</option>
              <option
                v-for="application in aplikacje"
                :key="application.id"
                :value="application.name"
              >
                {{ application.name }}
              </option>
            </select>
          </td>
          <td>
            <select
              v-model="editedTask.serwer"
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
    this.fetchApplications();
  },
  data() {
    return {
      editedTask: {
        name: "",
        application: "",
        applicationId: "",
        serwer: "",
        serwerId: "",
      },
      editingId: null,
      selectedApplicationFilter: "",
      selectedServerFilter: "",
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
    ...mapState(["tasks", "aplikacje", "serwery"]),
    filteredTasks() {
      let filtered = this.tasks;

      if (
        this.selectedApplicationFilter &&
        this.selectedApplicationFilter !== "-"
      ) {
        filtered = filtered.filter(
          (task) => task.application === this.selectedApplicationFilter.name
        );
      } else if (this.selectedApplicationFilter === "-") {
        filtered = filtered.filter(
          (task) => !task.application || task.application === "-"
        );
      } else if (this.selectedServerFilter) {
        filtered = filtered.filter(
          (task) => task.serwer === this.selectedServerFilter.name
        );
      }
      return filtered;
    },
  },
  methods: {
    ...mapActions([
      "fetchTasks",
      "deleteTask",
      "editTask",
      "fetchApplications",
    ]),
    startEditing(item) {
      this.editedTask = { ...item };
      this.editingId = item.id;
    },
    updateSelectedApplication() {
      const selectedApplication = this.aplikacje.find(
        (app) => app.name === this.editedTask.application
      );
      if (selectedApplication) {
        this.editedTask.application = selectedApplication.name;
        this.editedTask.applicationId = selectedApplication.id;
      } else {
        console.error("Selected application not found.");
      }
    },
    updateSelectedServer() {
      const selectedServer = this.serwery.find(
        (server) => server.name === this.editedTask.serwer
      );
      if (selectedServer) {
        this.editedTask.serwer = selectedServer.name;
        this.editedTask.serwerId = selectedServer.id;
      } else {
        console.error("Selected server not found.");
      }
    },
    async saveTask() {
      try {
        this.updateSelectedApplication();

        this.updateSelectedServer();

        await this.editTask(this.editedTask);
        console.log("editedTask:", this.editedTask);
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

.filter_select {
  width: 20%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-right: 10px;
  background-color: #333;
}

.filter_select option {
  color: #fff !important;
}

label {
  margin-right: 10px;
}
</style>
