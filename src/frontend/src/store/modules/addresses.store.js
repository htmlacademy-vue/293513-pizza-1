import { SET_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    addresses: [],
    isLoading: false,
  },

  actions: {
    async getAddresses({ commit }) {
      const data = await this.$api.addresses.query();

      commit(
        SET_ENTITY,
        {
          module: "Addresses",
          entity: "addresses",
          value: data,
        },
        { root: true }
      );
    },

    async addAddress({ state, commit }, body) {
      const data = await this.$api.addresses.post(body);

      commit(
        SET_ENTITY,
        {
          module: "Addresses",
          entity: "addresses",
          value: [...state.addresses, data],
        },
        { root: true }
      );
    },
  },
};
