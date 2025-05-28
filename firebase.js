import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "Place your API Key",
  authDomain: "todo-task-management-system.firebaseapp.com",
  projectId: "todo-task-management-system",
  appId: "1:959730446787:web:063576849d3270a4858d76",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider};
