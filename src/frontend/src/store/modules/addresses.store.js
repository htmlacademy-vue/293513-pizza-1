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

    async deleteAddress({ state, commit }, body) {
      await this.$api.addresses.delete(body);

      commit(
        SET_ENTITY,
        {
          module: "Addresses",
          entity: "addresses",
          value: state.addresses.filter((it) => it.id !== body.id),
        },
        { root: true }
      );
    },

    async editAddress({ state, commit }, body) {
      await this.$api.addresses.put(body);

      commit(
        SET_ENTITY,
        {
          module: "Addresses",
          entity: "addresses",
          value: state.addresses.map((it) => {
            if (it.id === body.id) {
              return body;
            }
            return it;
          }),
        },
        { root: true }
      );
    },
  },
};
