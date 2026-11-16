import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
const router = createBrowserRouter(routes);
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (

    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </AuthProvider>
  );
}