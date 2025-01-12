import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Do you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // เรียก logout ที่จะทำการลบ cookies และเคลียร์ข้อมูล
        Swal.fire({
          title: "Logout",
          text: "Logout Successfully",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/create">CreatePost</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a href="/" className="btn btn-ghost text-xl">
          Web-Blog
        </a>
      </div>
      <div className="navbar-end">
        {/* เช็คว่า user มีค่า (ผู้ใช้ล็อกอิน) หรือไม่ */}
        {user ? (
          <button className="btn btn-secondary ml-2" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div>
            <Link to="/login">
              <button className="btn btn-primary ml-2">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-outline ml-2">Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
