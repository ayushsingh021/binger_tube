import React from "react";


export default function Header() {
  return (
    <header className="shadow fixed z-20 top-0">
      <nav className="space-x-4 fixed top-0 left-0 w-full h-16 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-10">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div
            className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <div
                  className={`block py-2 pr-4 pl-3 duration-200 font-bold 
                       orange_gradient
                     border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-grey-500 lg:p-0 `}
                >
                  BingeTube
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
