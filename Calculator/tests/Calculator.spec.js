import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Calculator from '../src/components/Calculator.vue';

describe('Calculator.vue', () => {
    it('appends numbers to the current value', async () => {
        const wrapper = mount(Calculator);

        const button1 = wrapper.findAll('button').find(button => button.text() === '1');
        await button1.trigger('click');
        expect(wrapper.vm.currentValue).toBe('1');
    });
    it('appends operator and performs calculation', async () => {
        const wrapper = mount(Calculator);

        const button1 = wrapper.findAll('button').find(button => button.text() === '1');
        await button1.trigger('click');
        const buttonPlus = wrapper.findAll('button').find(button => button.text() === '+');
        await buttonPlus.trigger('click');
        const button9 = wrapper.findAll('button').find(button => button.text() === '9');
        await button9.trigger('click');
        const buttonEquals = wrapper.findAll('button').find(button => button.text() === '=');
        await buttonEquals.trigger('click');

        expect(wrapper.vm.currentValue).toBe("10");
    });
    it('totally resets when C button is triggered', async () => {
        const wrapper = mount(Calculator);

        const button1 = wrapper.findAll('button').find(button => button.text() === '1');
        await button1.trigger('click');
        const buttonPlus = wrapper.findAll('button').find(button => button.text() === '+');
        await buttonPlus.trigger('click');

        expect(wrapper.vm.previousValue).toBe('1');
        expect(wrapper.vm.currentValue).toBe('');
        expect(wrapper.vm.operator).toBe("+");

        const buttonClear = wrapper.findAll('button').find(button => button.text() === 'C');
        await buttonClear.trigger('click');

        expect(wrapper.vm.currentValue).toBe("");
        expect(wrapper.vm.operator).toBe(null);
        expect(wrapper.vm.previousValue).toBe(null);

    });
    it('deletes last character when DEL button is triggered', async() => {
        const wrapper = mount(Calculator);

        const button1 = wrapper.findAll('button').find(button => button.text() === '1');
        await button1.trigger('click');
        const buttonPlus = wrapper.findAll('button').find(button => button.text() === '+');
        await buttonPlus.trigger('click')

        const buttonDEL = wrapper.findAll('button').find(button => button.text() === 'DEL');
        await buttonDEL.trigger('click');

        expect(wrapper.vm.currentValue).toBe('1');
        expect(wrapper.vm.previousValue).toBe(null);
        expect(wrapper.vm.operator).toBe(null);

    });
    it('handles division by zero', async () => {
        const wrapper = mount(Calculator);
    
        const button8 = wrapper.findAll('button').find(button => button.text() === '8');
        await button8.trigger('click');
        const buttonDivide = wrapper.findAll('button').find(button => button.text() === '/');
        await buttonDivide.trigger('click');
        const button0 = wrapper.findAll('button').find(button => button.text() === '0');
        await button0.trigger('click');
        const buttonEquals = wrapper.findAll('button').find(button => button.text() === '=');
        await buttonEquals.trigger('click');
    
        expect(wrapper.vm.currentValue).toBe('Error');
      });
})