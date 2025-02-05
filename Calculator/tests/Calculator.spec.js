import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Calculator from "../src/components/Calculator.vue";

describe("Calculator.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Calculator);
  });

  const findButton = (text) =>
    wrapper.findAll("button").find((button) => button.text() === text);
  const clickButton = async (text) => {
    const button = findButton(text);
    if (button) await button.trigger("click");
  };

  it("appends numbers to the current value", async () => {
    await clickButton('1');
    expect(wrapper.vm.currentValue).toBe('1');
  });
  it("appends operator and performs calculation", async () => {
    await clickButton('1');
    await clickButton('+');
    await clickButton('9');
    await clickButton('=');
    expect(wrapper.vm.currentValue).toBe("10");
  });
  it("totally resets when C button is triggered", async () => {
    await clickButton('7');
    await clickButton('C');

    expect(wrapper.vm.currentValue).toBe("");
    expect(wrapper.vm.operator).toBe(null);
    expect(wrapper.vm.previousValue).toBe(null);
  });
  it("deletes last character when DEL button is triggered", async () => {
    await clickButton('7');
    await clickButton('+');
    await clickButton('DEL')

    expect(wrapper.vm.currentValue).toBe('7');
    expect(wrapper.vm.previousValue).toBe(null);
    expect(wrapper.vm.operator).toBe(null);
  });
  it("handles division by zero", async () => {

    await clickButton('8');
    await clickButton('/');
    await clickButton('0');
    await clickButton('=');

    expect(wrapper.vm.currentValue).toBe("Error");
  });
});
