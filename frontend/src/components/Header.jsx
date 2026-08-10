import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Header({
  darkMode,
  toggleTheme,
}) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/jobs");
      return;
    }

    navigate(
      `/jobs?search=${encodeURIComponent(query)}`
    );
  };

  return (
    <header className="header">
      <div className="header-inner">

        {/* LOGO */}

        <a
          className="logo"
          href="https://github.com/thesumeetsingh/joblisting"
          target="_blank"
          rel="noreferrer"
        >
          Job<span>Lister</span>
        </a>


        {/* SEARCH */}

        <form
          className="header-search"
          onSubmit={handleSearch}
        >
          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </form>


        {/* NAVIGATION */}

        <nav className="header-nav">

          <Link
            className="nav-link"
            to="/"
          >
            Home
          </Link>

          <Link
            className="nav-link"
            to="/jobs"
          >
            Jobs
          </Link>

          <Link
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </Link>

        </nav>


        {/* THEME */}

        <button
          className="theme-button"
          onClick={toggleTheme}
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {darkMode ? "☀" : "☾"}
        </button>

      </div>
    </header>
  );
}

export default Header;