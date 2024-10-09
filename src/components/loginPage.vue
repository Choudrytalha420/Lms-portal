<template>
  <div class="row no-gutters">
    <!-- Left Section with Image and Text -->
    <div class="col-lg-6 left-section d-none d-lg-block">
      <div class="overlay-text">
        <h1>Online Training Program</h1>
        <p>
          Register an account and commence your learning journey on our online
          learning platform.
        </p>
      </div>
    </div>

    <!-- Right Section with Login Form -->
    <div class="col-lg-6 form-section">
      <div class="form-container">
        <div class="logo mb-3">
          <!-- <img src="logo.png" alt="Logo" /> -->
        </div>
        <h3 class="welcome mb-4">Hello! Welcome Back</h3>
        <p>
          Please enter your credentials below to get full access to your online
          learning course.
        </p>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <input
              type="email"
              v-model="email"
              class="form-control"
              placeholder="Email Address"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div
            class="form-check d-flex justify-content-between align-items-center"
          >
            <div>
              <input
                type="checkbox"
                v-model="remember"
                class="form-check-input"
                id="remember"
              />
              <label class="form-check-label" for="remember"
                >Remember Credentials</label
              >
            </div>
            <router-link to="/forgotPassword" class="forgot-link"
              ><a href="#" class="forgot-link">Forgot Password?</a></router-link
            >
          </div>
          <button type="submit" class="btn btn-block mt-3">Login</button>
        </form>
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
        <div class="text-center mt-3">
          <p>
            New on this platform?
            <router-link to="/registrationForm" class="create-one">
              Create One
            </router-link>
          </p>
          <p>
            By clicking 'Log in' you agree to our's
            <a href="#" class="terms-service">Terms of Service</a> and
            <a href="#" class="privacy-policy">Privacy Policy</a>
          </p>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      remember: false,
      errorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://192.168.15.205:8000/api/login",
          {
            email: this.email,
            password: this.password,
          }
        );

        // Log the entire response object to check the structure
        console.log("Login response:", response.data);

        // Access the token and user details from the response
        const { token, user, role } = response.data.data; // Adjust based on your API response structure

        if (token) {
          // Store user details in local storage
          localStorage.setItem("token", token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              role: role, // Storing role directly; can be accessed as an array if needed
            })
          );

          console.log("Token and user details saved:", token, user, role);

          // Redirect to the dashboard
          this.$router.push("/mainDashboard");
        } else {
          console.error("Token not found in response.");
          this.errorMessage = "Login successful, but token not found.";
        }
      } catch (error) {
        console.error("Login failed", error.response);
        this.errorMessage = error.response
          ? error.response.data.message
          : "An error occurred during login.";
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.login-container {
  height: 97vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* overflow: auto; */
}

/* Ensure left-section covers the entire height */
.left-section {
  background: url("@/assets/yellow.png") no-repeat center center/cover;
  height: 97vh; /* Ensure it takes full height */
  position: relative;
  /* overflow: auto; */
}
.logo {
  text-align: center;
}
.welcome {
  text-align: center;
}
.overlay-text {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}

.overlay-text h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

.overlay-text p {
  font-size: 1.2rem;
  margin-top: 10px;
}

.form-section {
  background-color: white;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  max-width: 500px;
  margin: auto;
}
.form-group input {
  padding: 10px;
  margin: 10px 0px;
}
.btn {
  padding: 10px 30px;
  width: 100%; /* Make the button take full width */
  max-width: 900px; /* Limit the width on larger screens */
  font-size: 1rem;
  background-color: #ffa726;
}
.btn:hover {
  color: #ffa726;
  background-color: black;
}
.btn-block {
  width: 100%;
}
.forgot-link {
  text-decoration: none;
  color: #ac6a07;
}
.forgot-link:hover {
  color: rgb(218, 163, 46);
}
.create-one {
  text-decoration: none;
  color: #ac6a07;
}
.create-one:hover {
  color: rgb(218, 163, 46);
}
.terms-service {
  text-decoration: none;
  color: #ac6a07;
}
.terms-service:hover {
  color: rgb(218, 163, 46);
}
.privacy-policy {
  text-decoration: none;
  color: #ac6a07;
}
.privacy-policy:hover {
  color: rgb(218, 163, 46);
}

/* Mobile Responsive */
@media (max-width: 767.98px) {
  .left-section {
    height: 250px;
  }
  .form-section {
    padding: 1rem;
  }
  .overlay-text {
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    text-align: center;
  }
  .overlay-text h1 {
    font-size: 1.8rem;
  }
  .overlay-text p {
    font-size: 1rem;
  }
  .btn {
    padding: 10px 20px; /* Adjust padding for smaller screens */
    font-size: 0.9rem;
  }
}
</style>
