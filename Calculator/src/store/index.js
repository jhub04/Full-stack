import { createStore } from "vuex";

const store = createStore({
    state: {
        name: '',
        email: ''
    },
    mutations: {
        setName(state, name) {
            state.name = name;
        },
        setEmail(state, email) {
            state.email = email;
        }
    },
    actions: {
        updateName({ commit }, name) {
            commit('setName', name);
        },
        updateEmail({ commit }, email) {
            commit('setEmail', email);
        }
    }
});

export default store