<template>
  <v-container class="form-box">
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="task.taskTitle"
        label="Task Title"
        outlined
        required
        class="custom-input"
      ></v-text-field>
      <select v-model="task.servers" outlined required>
        <option value="" disabled>Select a server</option>
        <option v-for="(option, index) in selectedServer" :key="index">
          {{ option.serverName }}
        </option>
      </select>
      <select v-model="task.selectedOption" outlined>
        <option value="" disabled>Select an application</option>
        <option v-for="(option, index) in selectOptions" :key="index">
          {{ option.application }}
        </option>
      </select>
      <v-btn type="submit" color="primary">Add Task</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "TaskAddForm",
  data() {
    return {
      task: {
        taskTitle: "",
        selectedOption: "",
        servers: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (!this.task.servers) {
        alert("Please select a server");

        return;
      }
      this.$store.commit("updateTask", this.task);
      this.task = {
        taskTitle: "",
        selectedOption: "",
        servers: "",
      };
    },
  },
  computed: {
    selectOptions() {
      return this.$store.getters["getApp"];
    },
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
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  color: #333;
  border: 1px solid #fff;
}

.invalid-field {
  border: 1px solid red; /* Dodajemy czerwoną obwódkę w przypadku nieprawidłowej wartości */
}
</style>
