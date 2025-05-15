import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { PagesRoutesConstants, TranslationConstants } from '@/utils/constants';
import { useAppSelector } from '@/store';
import type { RootState } from '@/store/store';
import { UserRoleEnum } from '@/types';
import { Button } from '../ui/button';
import { logout } from '@/utils/auth/logout';
import Logo from '../shared/Logo';
import useClickOutside from '@/hooks/use-click-outside';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useClickOutside<HTMLDivElement>(menuRef, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

  const isLoginPage = location.pathname === PagesRoutesConstants.SIGN_IN;

  return (
    <nav className="bg-white dark:bg-duck-brown/10 backdrop-blur-md border-b border-duck-yellow/10 fixed w-full z-10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center rtl:flex-row-reverse">
              <Logo className="h-10 w-10 mr-2" isAnimated={false} />
              <span className="text-xl font-bold text-duck-brown dark:text-duck-yellow">
                {t(TranslationConstants.APP.TITLE)}
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          {/* TODO: I didnt like this part ui */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to={PagesRoutesConstants.EVENTS} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-duck-yellow/10 transition-colors duration-200">
              {t(TranslationConstants.NAV.EVENTS)}
            </Link>

            {user && (
              <Link to={user.role === UserRoleEnum.ADMIN ? PagesRoutesConstants.ADMIN_DASHBOARD : PagesRoutesConstants.USER_DASHBOARD} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-duck-yellow/10 transition-colors duration-200">
                {t(TranslationConstants.NAV.DASHBOARD)}
              </Link>
            )}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex md:items-center md:space-x-4  rtl:flex-row-reverse">
            <ThemeSwitcher />
            <LanguageSwitcher />

            {user ? (
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => logout()}
                  className="border border-duck-yellow/20 hover:bg-duck-yellow/10 text-gray-700 dark:text-gray-200"
                >
                  {t(TranslationConstants.NAV.LOGOUT)}
                </Button>
              </div>
            ) : !isLoginPage && (
              <Link to={PagesRoutesConstants.SIGN_IN}>
                <Button
                  className="bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
                >
                  {t(TranslationConstants.NAV.LOGIN)}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-duck-yellow/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div ref={menuRef} className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-duck-brown/10 shadow-lg">
          <div className="flex flex-col space-y-2">
            <Link to={PagesRoutesConstants.EVENTS} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-duck-yellow/10">
              {t(TranslationConstants.NAV.EVENTS)}
            </Link>

            {user && (
              <Link to={user.role === UserRoleEnum.ADMIN ? PagesRoutesConstants.ADMIN_DASHBOARD : PagesRoutesConstants.USER_DASHBOARD} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-duck-yellow/10">
                {t(TranslationConstants.NAV.DASHBOARD)}
              </Link>
            )}
          </div>

          <div className="border-t border-duck-yellow/10 mt-2 pt-2">
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>

              {user ? (
                <Button
                  variant="outline"
                  onClick={() => logout()}
                  className="border border-duck-yellow/20 hover:bg-duck-yellow/10 text-gray-700 dark:text-gray-200"
                >
                  {t(TranslationConstants.NAV.LOGOUT)}
                </Button>
              ) : !isLoginPage && (
                <Link to={PagesRoutesConstants.SIGN_IN}>
                  <Button
                    className="bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown"
                  >
                    {t(TranslationConstants.NAV.LOGIN)}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;