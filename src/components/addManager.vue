<template>
  <div class="form-container">
    <!-- Header Section -->
    <div class="header">
      <h2 class="header-title">Register Manager</h2>
      <button class="view-users-btn">
        <i class="fa fa-eye"></i> VIEW USERS
      </button>
    </div>

    <!-- Form Body Section -->
    <div class="form-body">
      <h3 class="form-subtitle">Manager Details</h3>
      <form @submit.prevent="registerManager">
        <div class="form-row">
          <div class="form-group">
            <label for="name">NAME *</label>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Name"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">EMAIL *</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="role">ROLE *</label>
            <select id="role" v-model="role" required>
              <option value="manager">Manager</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="form-row">
          <button type="submit" class="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  </div>
  <!-- Table Container -->
  <div class="table-container">
    <h3>Roles List</h3>
    <!-- Filter Section -->
    <div class="filter-section">
      <label for="filter">Filter by Role:</label>
      <select id="filter" v-model="filterRole" @change="filterRoles">
        <option value="">All</option>
        <option value="manager">Manager</option>
        <option value="supervisor">Supervisor</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(role, index) in filteredRoles" :key="index">
          <td>{{ role.name || "N/A" }}</td>
          <td>{{ role.email || "N/A" }}</td>
          <td>{{ role.role || "N/A" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      role: "",
      roles: [], // Array to hold the fetched roles
      filteredRoles: [], // Array to hold the filtered roles
      filterRole: "", // Selected role for filtering
      // token: "", // Store token here
    };
  },
  mounted() {
    this.fetchRoles();
    this.token = localStorage.getItem("token"); // Retrieve token on mount
  },
  methods: {
    async fetchRoles() {
      try {
        const response = await axios.get(
          "http://192.168.15.205:8000/api/show-roles"
        );
        this.roles = response.data.data || [];
        this.filteredRoles = this.roles; // Initialize filtered roles
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    },
    async registerManager() {
      this.token = localStorage.getItem("token");

      if (!this.token) {
        alert("No authorization token found. Please log in.");
        return;
      }

      // Log the data being sent
      const dataToSend = {
        name: this.name,
        email: this.email,
        role: this.role,
      };
      console.log("Data to send:", dataToSend);

      try {
        const response = await axios.post(
          "http://192.168.15.205:8000/api/add-role",
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          alert("Manager Registered Successfully!");
          this.fetchRoles();
        } else {
          alert("Registration Failed.");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error during registration:", error.response.data);
          if (error.response.status === 422) {
            alert("Validation failed: " + error.response.data.message);
          } else {
            alert("An error occurred during registration.");
          }
        } else {
          console.error("Network Error:", error);
          alert("Network error occurred. Please try again later.");
        }
      }
    },
    filterRoles() {
      if (this.filterRole) {
        this.filteredRoles = this.roles.filter(
          (role) => role.role === this.filterRole
        );
      } else {
        this.filteredRoles = this.roles; // Reset to all roles if no filter
      }
    },
  },
};
</script>

<style scoped>
/* Container styles */
.form-container {
  max-width: 1000px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  font-family: Arial, sans-serif;
}

/* Table styles */
.table-container {
  margin: 20px auto;
  max-width: 1000px;
}

/* Filter Section Styles */
.filter-section {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.filter-section label {
  margin-right: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 1px solid;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Header styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 10px 20px;
  color: #fff;
}

.header-title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: orange;
}

.view-users-btn {
  background-color: #ffa726;
  color: #333;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Form styles */
.form-body {
  padding: 20px;
}

.form-subtitle {
  font-size: 18px;
  margin-bottom: 10px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

/* Submit Button */
.submit-btn {
  padding: 10px 20px;
  background-color: #ffa726;
  color: rgb(12, 12, 12);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: black;
  color: #ffa726;
}

@media (max-width: 600px) {
  .form-container {
    padding: 10px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .view-users-btn {
    font-size: 12px;
  }
}
</style>
