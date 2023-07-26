// store/index.js
import { v4 as uuidv4 } from "uuid";

export const state = () => ({
  tasks: [],
  application: [],
  servers: [
    {
      serverName: "Server 1",
    },
  ],
});

export const getters = {
  getTask: (state) => {
    state.tasks.map((task) => {
      return task.id;
    });
    return state.tasks;
  },
  getApp: (state) => {
    return state.application;
  },
  getServer: (state) => {
    return state.servers;
  },
};

export const mutations = {
  updateTask: (state, tasks) => {
    tasks.id = uuidv4();
    state.tasks.push(tasks);
  },
  updateApp: (state, application) => {
    application.id = uuidv4();
    state.application.push(application);
  },
  updateServer: (state, servers) => {
    servers.id = uuidv4();
    state.servers.push(servers);
  },
  deleteTask: (state, index) => {
    state.tasks.splice(index, 1);
  },
  deleteApp: (state, index) => {
    const deletedApp = state.application.splice(index, 1)[0];

    state.tasks.forEach((task) => {
      if (task.selectedOption === deletedApp.application) {
        delete task.selectedOption;
      }
    });
  },
  deleteServer: (state, index) => {
    const deletedServer = state.servers.splice(index, 1)[0];
    state.tasks.forEach((task) => {
      if (task.servers === deletedServer.serverName) {
        state.tasks.splice(task, 1);
      }
    });
    state.application.forEach((app) => {
      if (app.applicationId === index) {
        state.application.splice(app, 1);
      }
    });
  },
};

export const actions = {
  delateTaskIndex({ commit }, index) {
    commit("deleteTask", index);
  },
  deleteServerIndex({ commit }, index) {
    commit("deleteServer", index);
  },
  delateAppIndex({ commit }, index) {
    commit("deleteApp", index);
  },
};

export const namespaced = true;
