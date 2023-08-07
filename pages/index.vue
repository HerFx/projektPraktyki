<template>
  <section class="bg">
    <v-container class="cont">
      <v-row>
        <v-col class="box" cols="5">
          <h1>Task</h1>
          <v-btn class="show-btn" @click="showFormHandle(1)">{{
            showForm ? "Close Add Form" : "Show Add Form"
          }}</v-btn>
          <TaskAddForm v-if="showForm" />
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="box" cols="5">
          <h1>Application</h1>
          <v-btn class="show-btn" @click="showFormHandle(2)">{{
            showForm2 ? "Close Add Form" : "Show Add Form"
          }}</v-btn>
          <AppAddForm v-if="showForm2" />
        </v-col>
      </v-row>
      <v-row style="display: flex; justify-content: center">
        <v-col class="box" cols="5">
          <h1>Server</h1>
          <v-btn class="show-btn" @click="showFormHandle(3)">{{
            showForm3 ? "Close Add Form" : "Show Add Form"
          }}</v-btn>
          <ServerAddForm v-if="showForm3" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import TaskAddForm from "~/components/TaskAddForm.vue";
import AppAddForm from "~/components/AppAddForm.vue";
import ServerAddForm from "~/components/ServerAddForm.vue";
export default {
  name: "IndexPage",
  components: {
    TaskAddForm,
    AppAddForm,
    ServerAddForm,
  },
  methods: {
    showFormHandle(index) {
      if (index == 1) {
        this.showForm = !this.showForm;
        this.showForm2 = false;
        this.showForm3 = false;
      } else if (index == 2) {
        this.showForm2 = !this.showForm2;
        this.showForm = false;
        this.showForm3 = false;
      } else {
        this.showForm3 = !this.showForm3;
        this.showForm = false;
        this.showForm2 = false;
      }
    },
    ...mapActions(["fetchSerwery", "fetchApplications", "fetchTasks"]),
  },
  data() {
    return {
      showForm: false,
      showForm2: false,
      showForm3: false,
      show: "Show Add Form",
    };
  },
  created() {
    this.fetchSerwery();
    this.fetchApplications();
    this.fetchTasks();
  },
};
</script>

<style lang="css" scoped>
.bg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  position: relative;
  background-image: url(~/assets/bg.jpg);
}

.bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.cont {
  position: relative;
  z-index: 1;
  height: 40vh;
  padding-top: 8vh;
}
</style>
