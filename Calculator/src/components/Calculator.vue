<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";

const store = useStore();
const currentValue = ref("");
const previousValue = ref(null);
const operator = ref(null);
const history= ref([]);
const errorMessage = ref("");
const currentPage = ref(0);
const pageSize = ref(10);

const currentUser = computed(() => store.getters.currentUser);

const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const operators = ["+", "-", "*", "/"];

const fetchHistory = async () => {
  if (!currentUser.value) return;

  try {
    console.log("Fetching history for user ID:", currentUser.value.id);

    const response = await axios.get('http://localhost:8080/calculator', {
      params: {
        userId: currentUser.value.id,
        page: currentPage.value,
        size: pageSize.value
      }
    });
    console.log("API Response:", response.data);

    history.value = response.data; 

    console.log("Mapped history:", history.value);
  } catch (error) {
    errorMessage.value = "Failed to fetch history";
    console.error("Error fetching history", error);
  }
};

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
    await fetchHistory();
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

const nextPage = () => {
  currentPage.value++;
  fetchHistory();
};

const prevPage = () => {
  currentPage.value = Math.max(0, currentPage.value - 1);
  fetchHistory();
};

onMounted(() => {
  if (currentUser.value) {
    fetchHistory();
  }
})
  
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

    <div class="history" v-if="currentUser">
      <h3>Calculation History</h3>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      
      <div class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
        <span>Page {{ currentPage + 1 }}</span>
        <button @click="nextPage">Next</button>
      </div>

      <ul>
        <li v-for="(calc, index) in history" :key="index">
          {{ calc.expression }} = {{ calc.result }} ({{ calc.createdAt }})
        </li>
      </ul>
    </div>

    <div v-else class="auth-warning">
      Please log in to view and save calculation history
    </div>
  </div>
    
</template>

<style scoped>
.calculator {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.display {
  font-size: 2em;
  padding: 20px;
  background: #f0f0f0;
  text-align: right;
  margin-bottom: 10px;
  border-radius: 5px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  padding: 15px;
  font-size: 1.2em;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
}

button:hover {
  background: #f0f0f0;
}

.history {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.history ul {
  list-style: none;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
}

.history li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.error {
  color: #ff4444;
  margin-bottom: 10px;
}

.auth-warning {
  color: #666;
  margin-top: 20px;
  text-align: center;
}
</style>
