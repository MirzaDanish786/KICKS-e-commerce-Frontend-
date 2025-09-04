import React from "react";
import Logo from "../../../assets/images/Logo.png";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <header>
      <nav>
        <div
          className="w-[92%] flex items-center justify-between bg-[#FAFAFA] mx-auto my-8 px-8 py-9 rounded-[24px] font-semibold max-xl:px-10 max-xl:py-6
        max-lg:px-5
        max-md:rounded-[12px]"
        >
          {/* Logo */}
          <div className="flex gap-2 items-end">
            <img
              className="w-full object-contain max-w-[100px]"
              src={Logo}
              alt="logo"
            />
            <div className="font-bold text-2xl leading-[80%]">Admin Panel</div>
          </div>

          {/* Options */}
          <div className="flex gap-10 leading-[80%]">
            <div>
            <NavLink to="/" className="">
              Go to website
            </NavLink>
            </div>
            <div className="flex gap-4">

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive && "border-b-2 border-black"
            }
            >
              Users
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                isActive && "border-b-2 border-black"
            }
            >
              Categories
            </NavLink>
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                isActive && "border-b-2 border-black"
            }
            >
              Products
            </NavLink>
              </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar;
