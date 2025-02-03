<template>
  <div class="calculator">
    <div class="calculator-container">
      <div class="screen">
        <input type="text" v-model="currentValue" disabled />
      </div>
      <div class="buttons">
        <button
          v-for="number in numbers"
          :key="number"
          @click="appendNumber(number)"
        >
          {{ number }}
        </button>
        <button
          v-for="operator in operators"
          :key="operator"
          @click="appendOperator(operator)"
        >
          {{ operator }}
        </button>

        <button class="action" @click="clearAll">C</button>
        <button class="action" @click="deleteLast">DEL</button>
        <button class="action equals" @click="calculateResult">=</button>
      </div>
    </div>

    <History :history="calculationHistory"></History>
  </div>
</template>

<script setup>
import { ref } from "vue";
import History from "./History.vue";

const currentValue = ref("");
const previousValue = ref(null);
const operator = ref(null);
const calculationHistory = ref([]);

const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const operators = ["+", "-", "*", "/"];

const appendNumber = (number) => {
  if (currentValue.value === "0") currentValue = "";
  currentValue.value = number;
};

const appendOperator = (op) => {
  if (currentValue === "") return;
  if (operator.value) calculateResult();
  previousValue.value = currentValue.value;
  currentValue.value = "";
  operator.value = op;
};

const clearAll = () => {
  previousValue.value = null;
  currentValue.value = "";
  operator.value = null;
};

const deleteLast = () => {
  if (currentValue.value && !operator.value) {
    currentValue.value = currentValue.value.slice(0, -1);
  } else if (previousValue.value && operator.value && !currentValue.value) {
    operator.value = null;
    currentValue.value = previousValue.value;
    previousValue.value = null;
  } else if (previousValue.value && operator.value && currentValue.value) {
    currentValue.value = "";
  }
};

const calculateResult = () => {
  if (!previousValue.value || !operator.value || !currentValue) return;

  const num1 = parseFloat(previousValue.value);
  const num2 = parseFloat(currentValue.value);
  let result = 0;

  switch (operator.value) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
      console.error("Invalid operator");
      return;
  }

  //Add to history
  if (calculationHistory.value.length >= 7) {
    calculationHistory.value.pop();
  }
  calculationHistory.value.unshift(`${num1} ${operator.value} ${num2} = ${result}`);

  currentValue.value = result !== null ? result.toString() : "";
  previousValue.value = null;
  operator.value = null;
};
</script>

<style scoped>
.calculator {
  display: flex;
  flex-direction: row;
  gap: 250px;
  max-width: 1200px;
  margin: 50px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

.screen input {
  width: 100%;
  padding: 10px;
  font-size: 24px;
  text-align: right;
  margin-bottom: 10px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

button {
  padding: 15px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: #dcdcdc;
}

.action {
  background-color: #ff6666;
  color: white;
}

.equals {
  background-color: #66cc66;
  color: white;
  grid-column: span 2;
}
</style>
