import { SET_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: false,
    addresses: [],
  },

  getters: {
    getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",
  },

  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        this.$api.auth.logout();
      }

      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();

      commit(
        SET_ENTITY,
        {
          module: "Auth",
          entity: "isAuthenticated",
          value: false,
        },
        { root: true }
      );

      commit(
        SET_ENTITY,
        {
          module: "Auth",
          entity: "user",
          value: null,
        },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();

        commit(
          SET_ENTITY,
          {
            module: "Auth",
            entity: "isAuthenticated",
            value: true,
          },
          { root: true }
        );

        commit(
          SET_ENTITY,
          {
            module: "Auth",
            entity: "user",
            value: data,
          },
          { root: true }
        );
      } catch (error) {
        dispatch("logout", false);
      }
    },
  },
};
