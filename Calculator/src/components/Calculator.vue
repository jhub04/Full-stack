<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";

const store = useStore();
const currentValue = ref("");
const previousValue = ref(null);
const operator = ref(null);
const history= ref([]);
const errorMessage = ref("");

const currentUser = computed(() => store.getters.currentUser);

const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const operators = ["+", "-", "*", "/"];


const saveCalculation = async(expression, result) => {
  if (!currentUser.value) {
    errorMessage.value = "You need to be logged in to save calculations!";
    return;
  }
  console.log("User is recognized");

  try {
    const response = await axios.post("http://localhost:8080/calculator/calculate", {
      userId: currentUser.value.id,
      expression: expression,
      result: result.toString(),
    });
    console.log(response);
    console.log("POST request successfull");
    //await fetchHistory();
  } catch (error) {
    errorMessage.value = "Failed to save calculation";
    console.error("Error: ", error);
  }
  
}

const calculateResult = async() => {
  let result;
  const prev = parseFloat(previousValue.value);
  const current = parseFloat(currentValue.value);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator.value) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  const expression = `${prev} ${operator.value} ${current}`;
  console.log("Result is " + result);
  await saveCalculation(expression, result);
  console.log("saveCalculation method called");
  
  currentValue.value = result;
  operator.value = null;
  previousValue.value = null;

}

const appendNumber = (number) => {
  if (currentValue.value === "0") currentValue.value = "";
  currentValue.value = number;
};

const appendOperator = (op) => {
  if (currentValue.value === "") return;
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

  
</script>

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
  </div>
</template>

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
