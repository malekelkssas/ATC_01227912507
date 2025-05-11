import React, { type ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <footer className="bg-white dark:bg-duck-brown/10 border-t border-duck-yellow/10 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-duck-brown dark:text-duck-yellow font-bold text-lg">QuackSeats 🦆</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">© {new Date().getFullYear()} QuackSeats. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <a href="https://www.linkedin.com/in/malek-elkssas-003846227/" className="text-gray-600 dark:text-gray-400 hover:text-duck-yellow group">
                <span className="sr-only">LinkedIn</span>
                <img src="/linkedin-svgrepo-com.svg" alt="LinkedIn" className="h-6 w-6 group-hover:[filter:brightness(0)_saturate(100%)_invert(85%)_sepia(30%)_saturate(1000%)_hue-rotate(358deg)_brightness(103%)_contrast(103%)] dark:[filter:brightness(0)_saturate(100%)_invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(100%)_contrast(100%)]" />
              </a>
              <a href="https://www.upwork.com/freelancers/~015acda9682670c3cc" className="text-gray-600 dark:text-gray-400 hover:text-duck-yellow group">
                <span className="sr-only">Upwork</span>
                <img src="/upwork-svgrepo-com.svg" alt="Upwork" className="h-6 w-6 group-hover:[filter:brightness(0)_saturate(100%)_invert(85%)_sepia(30%)_saturate(1000%)_hue-rotate(358deg)_brightness(103%)_contrast(103%)] dark:[filter:brightness(0)_saturate(100%)_invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(100%)_contrast(100%)]" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;