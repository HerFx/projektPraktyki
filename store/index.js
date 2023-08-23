// store/index.js

export const state = () => ({
  serwery: [],
  aplikacje: [],
  tasks: [],
});

export const mutations = {
  SET_SERWERY(state, serwery) {
    state.serwery = serwery;
  },
  DELETE_SERVER(state, serverId) {
    state.serwery = state.serwery.filter((server) => server.id !== serverId);
  },
  EDIT_SERVER(state, updatedServer) {
    state.serwery = state.serwery.map((server) =>
      server.id === updatedServer.id ? updatedServer : server
    );
  },
  ADD_SERVER(state, newServer) {
    state.serwery.push(newServer);
  },

  //Aplikacja
  SET_APLIKACJE(state, aplikacje) {
    state.aplikacje = aplikacje;
  },
  DELETE_APPLICATION(state, applicationId) {
    state.aplikacje = state.aplikacje.filter(
      (application) => application.id !== applicationId
    );
  },
  EDIT_APPLICATION(state, updatedApplication) {
    state.aplikacje = state.aplikacje.map((application) =>
      application.id === updatedApplication.id
        ? updatedApplication
        : application
    );
  },
  ADD_APPLICATION(state, newApplication) {
    state.aplikacje.push(newApplication);
  },

  //Task
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  DELETE_TASK(state, taskId) {
    state.tasks = state.tasks.filter((task) => task.id !== taskId);
  },
  EDIT_TASK(state, updatedTask) {
    state.tasks = state.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
  },
  ADD_TASK(state, newTask) {
    state.tasks.push(newTask);
  },
};

export const actions = {
  //Serwer
  async fetchSerwery({ commit }) {
    try {
      const url = process.env.apiUrl + "/serwery";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Nie udało się pobrać danych z serwera");
      }

      const serwery = await response.json();
      commit("SET_SERWERY", serwery);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    }
  },
  async deleteServer({ commit }, serverId) {
    try {
      const url = process.env.apiUrl + "/serwery/" + serverId;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Nie udało się usunąć serwera");
      }
      commit("DELETE_SERVER", serverId);
      // await this.dispatch("deleteApplicationsByServerId", serverId);
      // await this.dispatch("deleteTasksByServerId", serverId);
    } catch (error) {
      console.error("Błąd podczas usuwania serwera:", error);
    }
  },
  async editServer({ commit }, server) {
    try {
      const url = process.env.apiUrl + "/serwery/" + server.id;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: server.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się zaktualizować serwera");
      }
      commit("EDIT_SERVER", server);
    } catch (error) {
      console.error("Błąd podczas zaktualizowania serwera:", error);
    }
  },
  async addServer({ commit }, serverData) {
    try {
      const url = process.env.apiUrl + "/serwery";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serverData),
      });

      if (!response.ok) {
        throw new Error("Nie udało się dodać serwera");
      }

      const newServer = await response;
      commit("ADD_SERVER", newServer);

      return newServer;
    } catch (error) {
      console.error("Błąd podczas dodawania serwera:", error);
      throw error;
    }
  },

  //Aplikacja
  async fetchApplications({ commit }) {
    try {
      const url = process.env.apiUrl + "/application";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Nie udało się pobrać danych z serwera");
      }

      const aplikacje = await response.json();
      commit("SET_APLIKACJE", aplikacje);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    }
  },
  async deleteApplication({ commit }, applicationId) {
    try {
      const url = process.env.apiUrl + "/application/" + applicationId;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Nie udało się usunąć aplikacji");
      }
      commit("DELETE_APPLICATION", applicationId);
    } catch (error) {
      console.error("Błąd podczas usuwania aplikacji:", error);
    }
  },
  async editApplication({ commit }, application) {
    try {
      const url = process.env.apiUrl + "/application/" + application.id;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: application.name,
          serwer: application.serwer,
          serwerId: application.serwerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się zaktualizować aplikacji");
      }
      commit("EDIT_APPLICATION", application);
    } catch (error) {
      console.error("Błąd podczas zaktualizowania aplikacji:", error);
    }
  },
  async addApplication({ commit }, applicationData) {
    try {
      console.log(applicationData);
      const url = process.env.apiUrl + "/application";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        throw new Error("Nie udało się dodać aplikacji");
      }

      const newApplication = await response;
      commit("ADD_APPLICATION", newApplication);

      return newApplication;
    } catch (error) {
      console.error("Błąd podczas dodawania aplikacji:", error);
      throw error;
    }
  },

  //Task
  async fetchTasks({ commit }) {
    try {
      const url = process.env.apiUrl + "/task";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Nie udało się pobrać danych z serwera");
      }

      const tasks = await response.json();
      commit("SET_TASKS", tasks);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    }
  },
  async deleteTask({ commit }, taskId) {
    try {
      const url = process.env.apiUrl + "/task/" + taskId;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Nie udało się usunąć zadania");
      }
      commit("DELETE_TASK", taskId);
    } catch (error) {
      console.error("Błąd podczas usuwania zadania:", error);
    }
  },
  async editTask({ commit }, task) {
    try {
      const url = process.env.apiUrl + "/task/" + task.id;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: task.name,
          application: task.application,
          applicationId: task.applicationId,
          serwer: task.serwer,
          serwerId: task.serwerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się zaktualizować zadania");
      }
      commit("EDIT_TASK", task);
    } catch (error) {
      console.error("Błąd podczas zaktualizowania zadania:", error);
    }
  },
  async addTask({ commit }, taskData) {
    try {
      const url = process.env.apiUrl + "/task";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Nie udało się dodać zadania");
      }

      const newTask = await response;
      commit("ADD_TASK", newTask);

      return newTask;
    } catch (error) {
      console.error("Błąd podczas dodawania zadania:", error);
      throw error;
    }
  },

  // async deleteApplicationsByServerId({ commit, state }, serverId) {
  //   try {
  //     const applicationsToDelete = state.aplikacje.filter(
  //       (application) => application.serwerId === serverId
  //     );

  //     // Loop through the applications to delete them one by one
  //     for (const application of applicationsToDelete) {
  //       const url = process.env.apiUrl + "/application/" + application.id;
  //       const response = await fetch(url, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Nie udało się usunąć aplikacji");
  //       }

  //       commit("DELETE_APPLICATION", application.id);
  //     }
  //   } catch (error) {
  //     console.error("Błąd podczas usuwania aplikacji:", error);
  //   }
  // },
  // async deleteTasksByServerId({ commit, state }, serverId) {
  //   try {
  //     const tasksToDelete = state.tasks.filter(
  //       (task) => task.serwerId === serverId
  //     );

  //     // Loop through the tasks to delete them one by one
  //     for (const task of tasksToDelete) {
  //       const url = process.env.apiUrl + "/task/" + task.id;
  //       const response = await fetch(url, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Nie udało się usunąć zadania");
  //       }

  //       commit("DELETE_TASK", task.id);
  //     }
  //   } catch (error) {
  //     console.error("Błąd podczas usuwania zadania:", error);
  //   }
  // },

  //filter tasks by serverId
  async fetchTasksByServerId({ commit }, serverId) {
    try {
      const url = process.env.apiUrl + "/task/" + serverId;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Nie udało się pobrać danych z serwera");
      }

      const tasks = await response.json();
      commit("SET_TASKS", tasks);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    }
  },
};
