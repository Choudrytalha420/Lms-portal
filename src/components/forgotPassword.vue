<template>
  <div
    class="container d-flex align-items-center justify-content-center vh-100"
  >
    <div class="card p-4 shadow-sm reset-password-card">
      <h3 class="reset-password-title">Reset Password</h3>
      <form @submit.prevent="resetPassword">
        <div class="mb-3">
          <label for="email" class="form-label">Email Address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" class="btn send-reset-link">
          Send Reset Link
        </button>
      </form>
      <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
        {{ successMessage }}
      </div>
      <div class="mt-3 text-center">
        <router-link to="/loginPage" class="redirect-link"
          >Back to Login</router-link
        >
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios"; // Axios for API calls

export default {
  data() {
    return {
      email: "",
      successMessage: null, // Message to show after successful reset
    };
  },
  methods: {
    async resetPassword() {
      try {
        // Post request to the reset password API
        const response = await axios.post(
          "http://192.168.15.205:8000/api/reset-password",
          {
            email: this.email,
          }
        );
        if (response.data.success) {
          // Assuming the API returns a 'success' field
          this.successMessage = "Reset link sent successfully to your email.";
        } else {
          this.successMessage = "An error occurred, please try again.";
        }
      } catch (error) {
        console.error(error);
        this.successMessage =
          "Failed to send reset link. Please try again later.";
      }
    },
  },
};
</script>

<style scoped>
/* General styling for better appearance */
.container {
  padding: 20px;
  min-height: 100vh;
}

.reset-password-card {
  max-width: 400px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.reset-password-title {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.form-control {
  padding: 10px;
  font-size: 16px;
}

.send-reset-link {
  background-color: #ffa726;
  color: black;
  font-weight: 600;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.send-reset-link:hover {
  background-color: black;
  color: #ffa726;
}

.redirect-link {
  color: #007bff;
  text-decoration: none;
}

.redirect-link:hover {
  color: #0056b3;
}

.alert {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .reset-password-card {
    padding: 20px;
  }

  .reset-password-title {
    font-size: 22px;
  }
}
</style>
