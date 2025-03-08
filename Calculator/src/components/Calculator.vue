<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useTokenStore } from "@/store/token";
import { getUserInfo } from "@/utils/httputils";

const tokenStore = useTokenStore();
const currentValue = ref("");
const previousValue = ref(null);
const operator = ref(null);
const history= ref([]);
const errorMessage = ref("");
const currentPage = ref(0);
const pageSize = ref(10);
const currentUser = ref(null);

const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const operators = ["+", "-", "*", "/"];

const fetchHistory = async () => {
  if (!currentUser.value) return;

  try {
    console.log("Fetching history for username:", currentUser.value);

    const response = await axios.get('http://localhost:8080/calculator', {
      params: {
        userName: currentUser.value,
        page: currentPage.value,
        size: pageSize.value
      },
      headers: {
        "Authorization": "Bearer " + tokenStore.jwtToken
      }
    });
    history.value = response.data; 
  } catch (error) {
    errorMessage.value = "Failed to fetch history";
    console.error("Error fetching history", error);
  }
};

const calculateResult = async () => {
  const prev = parseFloat(previousValue.value);
  const current = parseFloat(currentValue.value);
  const operation = operator.value;

  if (isNaN(prev) || isNaN(current) || !operation) return;

  const expression = `${prev} ${operation} ${current}`;


  try {
    const response = await axios.post("http://localhost:8080/calculator/calculate", 
    {
      userName: currentUser.value,
      expression: expression
    },
    {
      headers: {
        "Authorization": "Bearer " + tokenStore.jwtToken
      }
    });

    currentValue.value = response.data.result;
    fetchHistory();
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = "Calculation failed!";
    console.log("Error: ", error);
  }

  operator.value = null;
  previousValue.value = null;
};


const appendNumber = (number) => {
  if (currentValue.value === "0") currentValue.value = "";
  currentValue.value = number;
};

const appendOperator = (op) => {
  if (currentValue.value === "") return;
  ///if (operator.value) calculateResult();
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

onMounted(async () => {
  if (!tokenStore.jwtToken) {
    console.log("Unauthenticated context");
  } else {
    console.log("Authenticated context!");
    let response = await getUserInfo(tokenStore.loggedInUser, tokenStore.jwtToken);
    currentUser.value = response.data;
    fetchHistory();
  }
});
  
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
