<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 mb-3">
        <!-- Search Filter -->
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search quizzes..."
          class="form-control"
        />
      </div>

      <!-- Check if quizzes array is not empty -->
      <div v-if="filteredQuizzes.length > 0" class="col-12">
        <div class="row">
          <div
            class="col-12 col-md-6 col-lg-4 mb-4"
            v-for="quiz in paginatedQuizzes"
            :key="quiz.id"
          >
            <div class="quiz-card">
              <!-- Display the quiz name dynamically -->
              <h1 class="quiz-title">{{ quiz.quiz_name }}</h1>
              <p>Duration: {{ quiz.duration }} mins</p>
              <p>Total Marks: {{ quiz.total_marks }}</p>
              <router-link to="/attemptQuiz" class="attempt-button">
                <button
                  class="attempt-button"
                  @click="attemptQuiz(quiz.quiz_name)"
                >
                  Attempt Quiz
                </button>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="changePage(currentPage - 1)">
                Previous
              </button>
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              class="page-item"
              :class="{ active: page === currentPage }"
            >
              <button class="page-link" @click="changePage(page)">
                {{ page }}
              </button>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <button class="page-link" @click="changePage(currentPage + 1)">
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Show a message if no quizzes are available -->
      <div v-else>
        <p>No quizzes available at the moment.</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      quizzes: [], // Store quiz data fetched from the API
      searchTerm: "", // Search input
      currentPage: 1, // Current page for pagination
      itemsPerPage: 3, // Quizzes to display per page
    };
  },
  computed: {
    filteredQuizzes() {
      // Filter quizzes based on the search term
      return this.quizzes.filter((quiz) =>
        quiz.quiz_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    totalPages() {
      // Calculate the total number of pages
      return Math.ceil(this.filteredQuizzes.length / this.itemsPerPage);
    },
    paginatedQuizzes() {
      // Get quizzes for the current page
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredQuizzes.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    async fetchQuizzes() {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Check if the token exists
        if (token) {
          // Make the API request with the Authorization header
          const response = await axios.get(
            "http://192.168.15.205:8000/api/show-quiz",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Log the response to check the structure
          console.log("API response:", response.data);

          // Store the quizzes data in the state
          this.quizzes = response.data.data; // Ensure this is an array of quizzes
        } else {
          console.error("No token found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    },
    attemptQuiz(quizName) {
      alert(`You clicked Attempt Quiz for ${quizName}`);
    },
    changePage(page) {
      // Change the current page and ensure it's within valid range
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  created() {
    this.fetchQuizzes(); // Fetch quizzes when the component is created
  },
};
</script>

<style scoped>
.quiz-card {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 250px; /* Height of the card */
  background: linear-gradient(to bottom right, orange, yellow);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
}

.attempt-button {
  border-style: none;
  width: 100%;
  padding: 7px 0px;
  background-color: black;
  color: #ffa726;
  border-radius: 4px;
  margin-top: 40px;
}

.quiz-title {
  color: black;
  margin-top: 50px;
}

button:hover {
  background-color: #ffa726;
  color: black;
}

.pagination {
  justify-content: center;
  margin-top: 95px;
}

@media (max-width: 768px) {
  .quiz-card {
    height: 200px;
  }
}

@media (max-width: 576px) {
  .quiz-card {
    height: 180px;
  }
}
</style>
