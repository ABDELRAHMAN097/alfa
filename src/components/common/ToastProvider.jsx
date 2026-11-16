import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}

      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
};

export default ToastProvider;