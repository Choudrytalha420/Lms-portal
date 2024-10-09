<template>
  <div class="form-container">
    <!-- Header Section -->
    <h1 class="form-title">Student Registration</h1>
    <div class="header">
      <!-- <h2 class="header-title">Student Information</h2> -->
    </div>

    <!-- Form Body Section -->
    <div class="form-body">
      <form @submit.prevent="submitForm">
        <!-- Name Input -->
        <div class="form-row">
          <div class="form-group">
            <label for="name">Name *</label>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Enter Name"
              required
            />
          </div>
        </div>

        <!-- Email Input -->
        <div class="form-row">
          <div class="form-group">
            <label for="email">Email *</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter Email"
              required
            />
          </div>
        </div>

        <!-- CV Upload -->
        <div class="form-row">
          <div class="form-group">
            <label for="cv">Upload CV *</label>
            <input type="file" id="cv" @change="handleFileUpload" required />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="form-row">
          <button type="submit" class="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      cvFile: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.cvFile = event.target.files[0]; // Capture the selected file
    },
    async submitForm() {
      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("email", this.email);
        formData.append("cv", this.cvFile);

        const response = await axios.post(
          "http://192.168.15.205:8000/api/form-submit",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Form Submitted:", response.data);
        alert("Register Succesfully");
        // Handle response, possibly redirect to a login page or confirmation screen
      } catch (error) {
        console.error("Form submission failed:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Container styles */
.form-container {
  max-width: 600px;
  margin: 50px auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: Arial, sans-serif;
}

.form-title {
  text-align: center;
  margin: 0px;
  padding: 10px;
  background-color: #ffa726;
  color: #000;
}

/* .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffa726;
  padding: 10px 20px;
  color: black;
  
} */
/* 
.header-title {
  margin: 0;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
} */

.form-body {
  padding: 20px;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="file"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.submit-btn {
  padding: 10px;
  background-color: #ffa726;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #ff9800;
}
</style>
