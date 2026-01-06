import { createRoot } from "react-dom/client";
import App from "./App";

// Global styles
import "./index.css";
import "@/components/ui/ux.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

createRoot(container).render(<App />);
