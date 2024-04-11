import React from "react";

import { Link,NavLink } from "react-router-dom";

 

 

  
export default function Header() {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="space-x-4 fixed top-0 left-0 w-full h-16 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-10">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* <Link to="/" className="flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjC7KzVskTMEHAGoPJC81z-S1dl55k0CjUMQ&usqp=CAU"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link> */}
      
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  exact
                  to="/"
                  className={(isActive) =>
                    `block py-2 pr-4 pl-3 duration-200 font-normal ${
                      isActive.isActive ? "text-white" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-grey-500 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  exact
                  to="/about"
                  className={(isActive) =>
                    `block py-2 pr-4 pl-3 duration-200 font-normal ${
                      isActive.isActive ? "text-white" : "text-gray-400"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-grey-200 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

  );
}