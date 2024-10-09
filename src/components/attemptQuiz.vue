<template>
  <div class="container quiz-container mt-4">
    <!-- Quiz Header -->
    <div class="row">
      <div class="col-12">
        <div
          class="quiz-header bg-primary text-white text-center py-3 rounded-top shadow-sm"
        >
          <h2 class="m-0">JavaScript Quiz</h2>
          <span class="total-questions badge bg-light text-dark mt-2"
            >Total Questions: 25</span
          >
        </div>
      </div>
    </div>

    <!-- Question & Options Card -->
    <div class="row justify-content-center mt-3">
      <div class="col-lg-8 col-md-10">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="question-text">
              1. Inside which HTML element do we put the JavaScript?
            </h5>

            <form @submit.prevent="submitAnswer">
              <!-- Dynamic Radio Options -->
              <div
                class="form-check option-item p-2"
                v-for="(option, index) in options"
                :key="index"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  :id="'option' + index"
                  :value="option"
                  v-model="selectedOption"
                  name="quizOption"
                />
                <label class="form-check-label" :for="'option' + index">{{
                  option
                }}</label>
              </div>

              <!-- Navigation Buttons -->
              <div class="mt-4 d-flex justify-content-between">
                <button
                  type="button"
                  class="btn btn-outline-secondary prev-btn"
                  @click="previousQuestion"
                >
                  Previous
                </button>
                <button type="submit" class="btn btn-success next-btn">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: null,
      options: ["<script>", "<javascript>", "<scripting>", "<js>"],
    };
  },
  methods: {
    submitAnswer() {
      if (this.selectedOption) {
        alert(`You selected: ${this.selectedOption}`);
      } else {
        alert("Please select an option.");
      }
    },
    previousQuestion() {
      alert("Previous question clicked");
    },
  },
};
</script>

<style scoped>
/* Container */
.quiz-container {
  max-width: 800px;
  margin: auto;
}

/* Quiz Header */
.quiz-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.total-questions {
  font-size: 1rem;
  padding: 0.4em 0.8em;
  margin-top: 10px;
}

/* Question Text */
.question-text {
  font-weight: 500;
  margin-bottom: 1rem;
}

/* Form Options Styling */
.option-item {
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.option-item:hover {
  background-color: #e6f7ff;
}

.form-check-input {
  margin-right: 10px;
}

.form-check-label {
  font-size: 1.1rem;
  cursor: pointer;
}

/* Buttons */
.btn {
  padding: 0.6rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.next-btn {
  background-color: #28a745;
  border: none;
}

.next-btn:hover {
  background-color: #218838;
}

.prev-btn {
  border-color: #6c757d;
}

.prev-btn:hover {
  background-color: #6c757d;
  color: #fff;
}

/* Card Shadow */
.card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
}

.card-body {
  padding: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .quiz-container {
    padding: 0 15px;
  }
  .question-text {
    font-size: 1.2rem;
  }
  .option-item {
    font-size: 1rem;
  }
}
</style>
