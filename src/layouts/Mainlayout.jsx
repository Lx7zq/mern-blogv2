/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navbar */}
      <header className="sticky top-0 left-0 w-full z-50 bg-white shadow-lg py-4">
        <Navbar />
      </header>

      {/* Main content area */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-base-200 text-base-content py-4 px-4 mt-auto text-sm">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
