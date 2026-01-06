import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Preloader from "./components/Preloader";
import UXProvider from "./components/UXProvider";

const queryClient = new QueryClient();

// 🔒 GLOBAL PRELOADER LOCK
let PRELOADER_ALREADY_SHOWN = false;

export default function App() {
  const [loading, setLoading] = useState(!PRELOADER_ALREADY_SHOWN);
  const completedRef = useRef(false);

  useEffect(() => {
    if (PRELOADER_ALREADY_SHOWN) {
      setLoading(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    if (completedRef.current) return;

    completedRef.current = true;
    PRELOADER_ALREADY_SHOWN = true;
    setLoading(false);
  };

  if (loading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UXProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UXProvider>
    </QueryClientProvider>
  );
}
