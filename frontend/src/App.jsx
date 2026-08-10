import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import CreateJob from "./pages/CreateJob";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("joblister-theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return true;
  });

  useEffect(() => {
    document.body.className = darkMode
      ? "dark"
      : "light";

    localStorage.setItem(
      "joblister-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((previous) => !previous);
  };

  return (
    <BrowserRouter>
      <Header
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <main className="page-content">
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/employer"
            element={<Dashboard />}
          />

          <Route
            path="/post-job"
            element={<CreateJob />}
          />

          <Route
            path="/employer/create"
            element={<CreateJob />}
          />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;