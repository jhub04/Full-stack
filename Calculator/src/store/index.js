import { createStore } from "vuex";

const store = createStore({
    state: {
        user: null // Will hold { id, username } when logged in
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state) {
            state.user = null;
        }
    },
    actions: {
        login({ commit }, user) {
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('clearUser');
        }
    },
    getters: {
        currentUser: state => state.user,
        isAuthenticated: state => !!state.user
    }
});

export default store;