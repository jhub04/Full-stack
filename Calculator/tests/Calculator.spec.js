import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect} from "vitest";
import Calculator from "../src/components/Calculator.vue";
import axios from "axios";

vi.mock("axios");

describe("Calculator.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Calculator, {attachTo: document.body});
  });

  afterEach(() => {
    wrapper.unmount();
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
    axios.post.mockResolvedValue({
      data: { result: 10 },
    });

    await clickButton("9");
    await clickButton("+");
    await clickButton("1");
    await clickButton("=");

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
    axios.post.mockResolvedValue({
      data: { result: "Error" },
    });
    await clickButton('8');
    await clickButton('/');
    await clickButton('0');
    await clickButton('=');

    expect(wrapper.vm.currentValue).toBe("Error");
  });
});
