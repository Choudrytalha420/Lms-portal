<template>
  <div class="container mt-5">
    <h3 class="mb-4 text-center">Assign Quiz to Accepted Students</h3>

    <!-- Search input for filtering students -->
    <div class="mb-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Search student by name or email..."
      />
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-striped align-middle">
        <thead class="thead-dark">
          <tr>
            <th>Student ID</th>
            <!-- Added Student ID column -->
            <th>Student Name</th>
            <th>Email</th>
            <th>Select Quiz</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through filtered students -->
          <tr v-for="student in filteredStudents" :key="student.id">
            <td>{{ student.student_id }}</td>
            <!-- Display Student ID -->
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>
              <select
                v-model="selectedQuizzes[student.id]"
                class="form-control"
                value="Select Quiz"
              >
                <option value="">Select Quiz</option>
                <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">
                  {{ quiz.quiz_name }}
                </option>
              </select>
            </td>
            <td>
              <button
                @click="assignQuiz(student)"
                class="btn btn-primary"
                :disabled="!selectedQuizzes[student.id]"
              >
                Assign Quiz
              </button>
            </td>
          </tr>
          <!-- Show message when no students are found -->
          <tr v-if="filteredStudents.length === 0">
            <td colspan="5" class="text-center">No students found</td>
            <!-- Updated colspan to 5 -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      students: [], // Holds the student data
      quizzes: [], // Holds the list of available quizzes
      selectedQuizzes: {}, // Tracks the selected quiz for each student
      searchQuery: "", // For filtering students by name or email
      token: localStorage.getItem("token") || "", // Retrieve token from localStorage
    };
  },

  computed: {
    // Filter only the students with 'accepted' status
    acceptedStudents() {
      return this.students.filter((student) => student.status === "accepted");
    },
    // Filter students based on the search query
    filteredStudents() {
      return this.acceptedStudents.filter((student) => {
        return (
          student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },

  methods: {
    async fetchStudents() {
      try {
        const response = await axios.get(
          "http://192.168.15.205:8000/api/show-students",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (response.data && response.data.success) {
          this.students = response.data.data; // Set students data
        } else {
          console.error("Failed to fetch students:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    },

    async fetchQuizzes() {
      try {
        const response = await axios.get(
          "http://192.168.15.205:8000/api/show-quiz",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (response.data && response.data.success) {
          this.quizzes = response.data.data; // Set quizzes data
          console.log("Quizzes fetched:", this.quizzes); // Check fetched quizzes
        } else {
          console.error("Failed to fetch quizzes:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    },

    async assignQuiz(student) {
      try {
        const quizId = this.selectedQuizzes[student.id];
        const response = await axios.post(
          `http://192.168.15.205:8000/api/assign-quiz/${quizId}/FCCU${student.id}`,
          {}, // No request body needed
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (response.data && response.data.success) {
          alert(`Quiz assigned to ${student.name} successfully!`);
        } else {
          console.error("Failed to assign quiz:", response.data.message);
          alert("Failed to assign quiz.");
        }
      } catch (error) {
        console.error("Error assigning quiz:", error);
        alert("An error occurred while assigning the quiz. Please try again.");
      }
    },
  },

  mounted() {
    this.fetchStudents(); // Fetch students when component is mounted
    this.fetchQuizzes(); // Fetch quizzes when component is mounted
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
}

.table {
  background-color: white;
}

.table-hover tbody tr:hover {
  background-color: #f0f8ff;
}

thead.thead-dark th {
  background-color: #343a40;
  color: white;
}

input {
  max-width: 400px;
  margin: 0 auto;
}

h3 {
  font-size: 1.8rem;
  font-weight: bold;
}

.btn {
  padding: 8px 16px;
  font-size: 0.9rem;
}
</style>
