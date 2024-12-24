import React from "react";
import { Outlet } from "react-router-dom";

const SimpleLayout = () => {
  return (
    <div>
      <header>
        <h1>My Website</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SimpleLayout;
