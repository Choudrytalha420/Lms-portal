<template>
  <div>
    <div class="table-responsive mt-4">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>CV</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.status }}</td>
            <td>
              <a v-if="student.cv_path" :href="student.cv_path" target="_blank">
                View CV
              </a>
              <span v-else>No CV</span>
            </td>
            <td>
              <!-- Enable buttons only if the status is 'pending' -->
              <button
                @click="approveStudent(student.id)"
                class="btn btn-success"
                :disabled="student.status !== 'pending'"
              >
                Accept
              </button>
              <button
                @click="rejectStudent(student.id)"
                class="btn btn-danger"
                :disabled="student.status !== 'pending'"
              >
                Reject
              </button>
            </td>
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
      token: localStorage.getItem("token") || "", // Retrieve token from localStorage
    };
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

    async rejectStudent(studentId) {
      try {
        const response = await axios.post(
          `http://192.168.15.205:8000/api/reject-form/${studentId}`,
          null,
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );

        // Check for "rejected successfully" in the message
        if (
          response.data.message &&
          response.data.message.toLowerCase().includes("rejected successfully")
        ) {
          // Find and update the student's status to 'rejected'
          const studentIndex = this.students.findIndex(
            (s) => s.id === studentId
          );
          if (studentIndex !== -1) {
            this.students[studentIndex].status = "rejected"; // Update status locally
          }
          alert("Student rejected successfully.");
        } else {
          console.error("Rejection failed:", response.data);
          alert("Failed to reject student.");
        }
      } catch (error) {
        this.handleError(error, "rejecting");
      }
    },

    async approveStudent(studentId) {
      try {
        const response = await axios.post(
          `http://192.168.15.205:8000/api/accept-form/${studentId}`,
          null,
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );

        // Check for success message or student object
        if (
          (response.data.message &&
            response.data.message.toLowerCase().includes("success")) ||
          response.data.student
        ) {
          // Find and update the student's status to 'accepted'
          const studentIndex = this.students.findIndex(
            (s) => s.id === studentId
          );
          if (studentIndex !== -1) {
            this.students[studentIndex].status = "accepted"; // Update status locally
          }
          alert("Student approved successfully.");
        } else {
          console.error("Approval failed:", response.data);
          alert("Failed to approve student.");
        }
      } catch (error) {
        this.handleError(error, "approving");
      }
    },

    handleError(error, action) {
      if (error.response) {
        console.error(
          `Error response while ${action} student:`,
          error.response
        );
        console.error(`Error data:`, error.response.data);
        alert(
          `Error while ${action} student. Please check the console for more details.`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from the server. Please try again.");
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred. Please check the console.");
      }
    },
  },

  mounted() {
    this.fetchStudents(); // Fetch students when component is mounted
  },
};
</script>

<style scoped>
.table {
  margin-top: 30px;
  margin-left: 30px;
  max-width: 1000px;
  width: 100%;
}

.btn {
  margin-right: 5px; /* Space between buttons */
}
</style>
