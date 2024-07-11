import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import App from "./App";
import "./styles/index.css";

ReactModal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
