import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Contact from "../src/components/Contact.vue";
import { createStore } from "vuex";
import axios from "axios";

describe("Contact.vue", () => {
  let store;

  beforeEach(() => {
    store = createStore({
      state: {
        name: "",
        email: "",
      },
      mutations: {
        setName(state, name) {
          state.name = name;
        },
        setEmail(state, email) {
          state.email = email;
        },
      },
      actions: {
        updateName({ commit }, name) {
          commit("setName", name);
        },
        updateEmail({ commit }, email) {
          commit("setEmail", email);
        },
      },
    });
  });
  

  it("renders the form correctly", () => {
    const wrapper = mount(Contact, { global: { plugins: [store] } });
    expect(wrapper.find("h2").text()).toBe("Contact Form");
  });

  it("disables submit button when fields are empty", async () => {
    const wrapper = mount(Contact, { global: { plugins: [store] } });
    expect(wrapper.find("button").element.disabled).toBe(true);
  });

  it("enables submit button when all fields are filled", async () => {
    const wrapper = mount(Contact, { global: { plugins: [store] } });
    await wrapper.find("input[type='text']").setValue("John Doe");
    await wrapper.findAll("input[type='text']")[1].setValue("john@example.com");
    await wrapper.findAll("input[type='text']")[2].setValue("Great service!");
    expect(wrapper.find("button").element.disabled).toBe(false);
  });
});
