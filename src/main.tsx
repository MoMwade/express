import ReactDOM from "react-dom/client";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import App from "./app";
import "@/assets/overwrite.css";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
  parent: "#root",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
