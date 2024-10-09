<template>
  <div class="container result-container mt-5">
    <!-- Result Header -->
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8 col-sm-12">
        <div class="card shadow-lg text-center p-4">
          <h2 class="text-primary">Quiz Results</h2>

          <!-- Result Summary -->
          <div class="result-summary mt-4">
            <h4>Total Questions: {{ totalQuestions }}</h4>
            <h4>Correct Answers: {{ correctAnswers }}</h4>
            <h4>
              Your Score:
              <span class="text-success">{{ scorePercentage }}%</span>
            </h4>
          </div>

          <!-- Action Buttons -->
          <div class="mt-5 d-flex justify-content-around">
            <button @click="retryQuiz" class="btn btn-success">
              Retry Quiz
            </button>
            <button @click="viewAnswers" class="btn btn-info">
              View Correct Answers
            </button>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
  },
  computed: {
    scorePercentage() {
      return ((this.correctAnswers / this.totalQuestions) * 100).toFixed(2);
    },
  },
  methods: {
    retryQuiz() {
      this.$emit("retry");
    },
    viewAnswers() {
      this.$emit("view-answers");
    },
  },
};
</script>

<style scoped>
.result-container {
  max-width: 600px;
  margin: auto;
}

.card {
  border-radius: 12px;
  padding: 20px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.result-summary h4 {
  margin: 10px 0;
}

.btn {
  font-size: 1.1rem;
  padding: 10px 20px;
  /* border-radius: 50px; */
}

.btn-info {
  background-color: #17a2b8;
  border: none;
}

.btn-info:hover {
  background-color: #138496;
}
</style>
