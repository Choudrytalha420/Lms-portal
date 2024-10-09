// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/components/loginPage.vue";
import RegistrationForm from "@/components/registrationForm.vue";
import MainDashboard from "@/components/mainDashboard.vue";
import StudentRequests from "@/components/studentRequests.vue";
import AddManager from "@/components/addManager.vue";
import AssignQuiz from "@/components/assignQuiz.vue";
import ViewAllQuiz from "@/components/viewAllQuiz.vue";
import ForgotPassword from "@/components/forgotPassword.vue";
import AttemptQuiz from "@/components/attemptQuiz.vue";
import ViewQuizResult from "@/components/viewQuizResult.vue";
import CreateQuiz from "@/components/createQuiz.vue";
import StudentAssignQuiz from "@/components/studentAssignQuiz.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/registrationForm",
    name: "registrationForm",
    component: RegistrationForm,
  },
  {
    path: "/forgotPassword",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/attemptQuiz",
    name: "attemptQuiz",
    component: AttemptQuiz,
  },
  {
    path: "/mainDashboard",
    name: "mainDashboard",
    component: MainDashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "studentRequests",
        name: "studentRequests",
        component: StudentRequests,
        meta: { roles: ["admin", "manager", "supervisor"] },
      },
      {
        path: "addManager",
        name: "addManager",
        component: AddManager,
        meta: { roles: ["admin"] },
      },
      {
        path: "assignQuiz",
        name: "assignQuiz",
        component: AssignQuiz,
        meta: { roles: ["admin", "manager"] },
      },
      {
        path: "viewAllQuiz",
        name: "viewAllQuiz",
        component: ViewAllQuiz,
        meta: { roles: ["student"] },
      },
      {
        path: "viewQuizResult",
        name: "viewQuizResult",
        component: ViewQuizResult,
        meta: { roles: ["admin", "manager", "supervisor", "student"] },
      },
      {
        path: "createQuiz",
        name: "createQuiz",
        component: CreateQuiz,
        meta: { roles: ["admin", "manager", "supervisor"] },
      },
      {
        path: "studentAssignQuiz",
        name: "studentAssignQuiz",
        component: StudentAssignQuiz,
        meta: { roles: ["student"] },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
