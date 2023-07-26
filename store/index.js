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
      console.log(task.id);
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
    console.log(state.tasks);
    console.log(state.tasks.length);
    console.log(tasks);
    state.tasks.push(tasks);
  },
  updateApp: (state, application) => {
    application.applicationId = uuidv4();
    state.application.push(application);
  },
  updateServer: (state, servers) => {
    servers.serverId = uuidv4();
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
        delete task.servers;
      }
    });
    state.application.forEach((app) => {
      if (app.applicationId === index) {
        delete app.servers;
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
