<template>
  <div class="container create-quiz-container mt-5">
    <!-- Quiz Creation Form Header -->
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="card shadow-lg p-4">
          <h2 class="text-primary text-center">Create a New Quiz</h2>

          <!-- Quiz Title -->
          <div class="form-group mt-4">
            <label for="quizTitle" class="form-label">Quiz Title</label>
            <input
              v-model="quiz.title"
              type="text"
              id="quizTitle"
              class="form-control"
              placeholder="Enter quiz title"
              required
            />
          </div>

          <!-- Duration -->
          <div class="form-group mt-3">
            <label for="quizDuration" class="form-label"
              >Duration (minutes)</label
            >
            <input
              v-model="quiz.duration"
              type="number"
              id="quizDuration"
              class="form-control"
              placeholder="Enter duration in minutes"
              required
            />
          </div>

          <!-- Total Marks -->
          <div class="form-group mt-3">
            <label for="quizTotalMarks" class="form-label">Total Marks</label>
            <input
              v-model="quiz.totalMarks"
              type="number"
              id="quizTotalMarks"
              class="form-control"
              placeholder="Enter total marks"
              required
            />
          </div>

          <!-- Questions Section -->
          <div class="form-group mt-4">
            <h4 class="text-secondary">Quiz Questions</h4>

            <div
              v-for="(question, index) in quiz.questions"
              :key="index"
              class="question-section mt-4"
            >
              <!-- Question Text -->
              <label :for="'question_' + index" class="form-label"
                >Question {{ index + 1 }}</label
              >
              <input
                v-model="question.question_text"
                :id="'question_' + index"
                type="text"
                class="form-control"
                placeholder="Enter question"
                required
              />

              <!-- Options for the Question -->
              <div class="form-group mt-3">
                <label class="form-label">Options</label>
                <div
                  v-for="(option, optIndex) in question.options"
                  :key="optIndex"
                  class="input-group mb-2"
                >
                  <input
                    v-model="question.options[optIndex]"
                    type="text"
                    class="form-control"
                    placeholder="Enter option"
                    required
                  />
                </div>

                <!-- Add Option Button -->
                <button
                  @click="addOption(index)"
                  class="btn btn-outline-secondary btn-sm"
                >
                  Add Option
                </button>
              </div>

              <!-- Answer Selection -->
              <div class="form-group mt-3">
                <label class="form-label">Correct Answer</label>
                <select v-model="question.answer" class="form-control" required>
                  <option
                    v-for="(option, optIndex) in question.options"
                    :key="optIndex"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>

              <!-- Marks for the Question -->
              <div class="form-group mt-3">
                <label for="questionMarks" class="form-label"
                  >Marks for this Question</label
                >
                <input
                  v-model.number="question.marks"
                  type="number"
                  class="form-control"
                  placeholder="Enter marks"
                  required
                />
              </div>

              <!-- Remove Question Button -->
              <button
                @click="removeQuestion(index)"
                class="btn btn-danger btn-sm mt-2"
              >
                Remove Question
              </button>
            </div>

            <!-- Add Question Button -->
            <button @click="addQuestion" class="btn btn-primary btn-sm mt-4">
              Add New Question
            </button>
          </div>

          <!-- Save Quiz Button -->
          <div class="text-center mt-5">
            <button @click="saveQuiz" class="btn btn-success btn-lg">
              Save Quiz
            </button>
          </div>
        </div>
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
      quiz: {
        title: "",
        description: "",
        duration: "", // Duration in minutes
        totalMarks: "", // Total marks for the quiz
        questions: [
          {
            question_text: "",
            options: ["", ""], // Minimum two options to start
            answer: "", // Correct answer
            marks: 0, // Marks for this question
          },
        ],
      },
    };
  },
  methods: {
    // Method to save the quiz
    async saveQuiz() {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");

        // First, save the quiz
        const response = await axios.post(
          "http://192.168.15.205:8000/api/add-quiz",
          {
            quiz_name: this.quiz.title,
            duration: this.quiz.duration, // Send the duration
            total_marks: this.quiz.totalMarks, // Send the total marks
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );

        if (response.data.success) {
          const quizId = response.data.data.id; // Get the quiz ID from the response
          console.log("Quiz saved:", response.data.data);

          // Now add each question to the newly created quiz
          for (const question of this.quiz.questions) {
            await this.addQuestionToQuiz(quizId, question);
          }

          alert(response.data.message); // Show success message
        } else {
          alert("Failed to create quiz: " + response.data.message);
        }
      } catch (error) {
        console.error("Error saving quiz:", error);
        alert("An error occurred while saving the quiz.");
      }
    },
    // Method to add a question to the quiz
    async addQuestionToQuiz(quizId, question) {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");

        // Prepare the question data
        const questionData = {
          question_text: question.question_text,
          options: question.options,
          answer: question.answer, // Send the correct answer
          marks: question.marks, // Send the marks for the question
        };

        // Make the API call to add the question
        await axios.post(
          `http://192.168.15.205:8000/api/add-question/${quizId}`,
          questionData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
      } catch (error) {
        console.error("Error adding question:", error);
        alert("An error occurred while adding a question.");
      }
    },
  },
};
</script>

<style scoped>
.create-quiz-container {
  max-width: 900px;
  margin: auto;
}

.card {
  border-radius: 12px;
  padding: 20px;
}

h2 {
  font-size: 1.8rem;
}

.form-group label {
  font-weight: bold;
}

input,
textarea,
select {
  border-radius: 8px;
}

button {
  border-radius: 20px;
}

@media (max-width: 768px) {
  h2 {
    font-size: 1.5rem;
  }
}
</style>
