import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import ReactModal from "react-modal";
import App from "./App";
import "./shared/styles/index.css";

ReactModal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
