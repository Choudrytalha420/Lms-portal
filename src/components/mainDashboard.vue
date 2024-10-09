<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav
      id="sidebar"
      :class="{
        'd-none d-md-block': !sidebarVisible,
        'd-block': sidebarVisible,
      }"
    >
      <div class="sidebar-header">
        <h4>Dashboard</h4>
      </div>
      <hr />
      <ul class="list-unstyled components">
        <li v-if="canView('studentRequests')">
          <router-link
            to="/mainDashboard/studentRequests"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i> Student Requests
          </router-link>
        </li>
        <li v-if="canView('addManager')">
          <router-link to="/mainDashboard/addManager" class="redirect-link">
            <i class="icon fas fa-tachometer-alt"></i> Add Manager
          </router-link>
        </li>
        <li v-if="canView('createQuiz')">
          <router-link to="/mainDashboard/createQuiz" class="redirect-link">
            <i class="icon fas fa-tachometer-alt"></i> Create Quiz
          </router-link>
        </li>
        <li v-if="canView('assignQuiz')">
          <router-link to="/mainDashboard/assignQuiz" class="redirect-link">
            <i class="icon fas fa-tachometer-alt"></i> Assign Quizzes
          </router-link>
        </li>
        <li v-if="canView('viewAllQuiz')">
          <router-link to="/mainDashboard/viewAllQuiz" class="redirect-link">
            <i class="icon fas fa-tachometer-alt"></i> View All Quizzes
          </router-link>
        </li>
        <li v-if="canView('studentAssignQuiz')">
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i> View Student Quizzes
          </router-link>
        </li>
        <li>
          <router-link to="/mainDashboard/viewQuizResult" class="redirect-link">
            <i class="icon fas fa-tachometer-alt"></i> View Quiz Result
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <div id="content" class="flex-grow-1">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <!-- Toggle button for sidebar in mobile -->
          <button
            class="btn btn-primary d-md-none"
            type="button"
            id="sidebarToggle"
            @click="toggleSidebar"
          >
            ☰
          </button>

          <div class="profile-menu ms-auto">
            <img
              src="@/assets/profileImage.png"
              alt="Profile"
              class="profile-img"
            />
            <div class="dropdown">
              <button
                class="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                {{ userName }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="#">Edit Profile</a></li>
                <li>
                  <router-link to="/" class="redirect-link">
                    <a class="dropdown-item" href="#">Logout</a>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <!-- Router View -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Ref to control sidebar visibility
const sidebarVisible = ref(false);

// Get the user's role from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const userName = computed(() => user?.name || "Guest");
const userRole = computed(() => user?.role || "Guest");

// Toggle sidebar visibility
function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

// Define a method to check permissions for each role
const permissions = {
  admin: [
    "studentRequests",
    "addManager",
    "assignQuiz",
    "createQuiz",
    "viewAllQuiz",
    "viewQuizResult",
  ],
  manager: ["studentRequests", "assignQuiz", "viewAllQuiz"],
  supervisor: ["assignQuiz", "viewAllQuiz"],
  student: ["viewAllQuiz", "viewQuizResult"],
};

function canView(route) {
  return permissions[userRole.value]?.includes(route);
}
</script>
<style>
body {
  font-family: Arial, sans-serif;
}
</style>
<style scoped>
/* Layout */
.wrapper {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
}
.navbar-brand {
  font-size: 22px;
  color: rgb(7, 7, 7);
}
#sidebar {
  background: #070707;
  width: 300px;
  padding: 15px;
  color: white;
  text-align: left;
  transition: all 0.3s;
}
.sidebar-header {
  text-align: left;
}

#sidebar ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

#sidebar ul li {
  padding: 10px 0;
  /* margin-left: 60px; */
  text-align: left;
}
#sidebar ul li a {
  color: white;
  display: block;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar ul li a:hover {
  color: white; /* Keep text white on hover */
  background-color: #ffa726; /* Preserve the background color */
  padding: 10px;
  border-radius: 4px;
  transition: all 0.3;
}

#sidebar ul li:hover .icon {
  color: black; /* Change icon color to black on hover */
}

.icon {
  color: #ffa726; /* Initial icon color */
  transition: color 0.3s; /* Smooth transition for icon color change */
}

/* Fix sidebar position in mobile */

@media (max-width: 768px) {
  #sidebar {
    width: 100%;
    height: auto;
    position: fixed; /* Make sidebar fixed */
    top: 56px; /* Align below the fixed navbar */
    left: 0; /* Align to the left */
    z-index: 9999;
    display: none;
  }

  #sidebar.d-block {
    display: block; /* Show when sidebar is toggled */
  }

  .wrapper {
    flex-direction: column;
  }
  .navbar {
    margin-top: -60px;
    top: 0;
  }
  .navbar-brand {
    display: none;
  }
  #content {
    margin-top: 56px; /* Ensure main content doesn't overlap the navbar */
    width: 100%;
  }
}

/* Navbar */
.navbar {
  padding: 10px;
  color: black;
  background-color: #ffa726;
}

.profile-menu {
  display: flex;
  align-items: center;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
