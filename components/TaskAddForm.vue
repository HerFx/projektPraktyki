<template>
  <v-container class="form-box">
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="task.taskTitle"
        label="Task Title"
        outlined
        required
        :rules="rules"
        class="custom-input"
      ></v-text-field>
      <select v-model="task.servers" outlined required :rules="rules">
        <option value="" disabled>Select a server</option>
        <option v-for="(option, index) in serwery" :key="index">
          {{ option.name }}
        </option>
      </select>
      <select v-model="task.selectedOption" outlined>
        <option value="" disabled>Select an application</option>
        <option v-for="(option, index) in aplikacje" :key="index">
          {{ option.name }}
        </option>
      </select>
      <v-btn type="submit" color="primary">Add Task</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "TaskAddForm",
  data() {
    return {
      task: {
        taskTitle: "",
        servers: "",
        selectedOption: "",
      },
      rules: [(value) => !!value || "Required."],
    };
  },
  computed: {
    ...mapState(["serwery", "aplikacje"]),
  },
  methods: {
    ...mapActions(["addTask"]),
    async submitForm() {
      const wybranySerwer = this.serwery.find(
        (serwer) => serwer.name === this.task.servers
      );

      const wybranaAplikacja = this.aplikacje.find(
        (aplikacja) => aplikacja.name === this.task.selectedOption
      );

      try {
        const newTaskData = {
          name: this.task.taskTitle,
          serwerId: wybranySerwer.id,
          serwer: wybranySerwer.name,
          applicationId: wybranaAplikacja ? wybranaAplikacja.id : 0,
          application: wybranaAplikacja ? wybranaAplikacja.name : "",
        };

        console.log("newTaskData before sending:", newTaskData);
        await this.addTask(newTaskData);

        this.task.taskTitle = "";
        this.task.servers = "";
        this.task.selectedOption = "";
      } catch (error) {
        console.error("Error adding Task:", error);
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
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  color: #333;
  border: 1px solid #fff;
}

.invalid-field {
  border: 1px solid red; /* Dodajemy czerwoną obwódkę w przypadku nieprawidłowej wartości */
}
</style>
