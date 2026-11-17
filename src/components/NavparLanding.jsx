import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiPhoneCall, FiUser } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/i18n/i18n/context";
import AlfaLogo from "./common/AlfaLogo";
import ThemeToggle from "./common/ThemeToggle";

const NAV_ITEMS = [
  ["home", "nav.home", "الرئيسية"],
  ["about", "nav.about", "من نحن؟"],
  ["services", "nav.services", "خدماتنا"],
  // ["branches", "nav.branches", "فروعنا"],
  ["contact", "nav.contact", "اتصل بنا"],
];

export default function NavbarLanding() {
  const { locale = "ar" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, canAccessDashboard, logout } = useAuth();
  const { t } = useI18n();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isArabic = locale === "ar";

  const closeMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (id) => {
    closeMenu();
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } 
  };

  const handleBookingClick = () => {
    closeMenu();
    const bookingSection = document.getElementById("booking-card") || document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "tel:15662";
    }
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed scroll-mt-20 inset-x-0 top-0 z-50 bg-white/95 dark:bg-[#0f141c]/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80 shadow-xs transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            to={`/${locale}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex shrink-0 items-center hover:opacity-95 transition"
          >
            <AlfaLogo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map(([id, key, fallback]) => (
              <motion.button
                key={id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => scrollToSection(id)}
                className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#88a531] dark:hover:text-[#c2d547] transition-colors cursor-pointer"
              >
                {t(key) || fallback}
              </motion.button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Language Switch */}
            <Link
              to={`/${isArabic ? "en" : "ar"}`}
              className="px-2.5 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-[#88a531] dark:hover:text-[#c2d547] transition border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60"
            >
              {isArabic ? "EN" : "العربية"}
            </Link>

{/*
  Login / Dashboard

  {!user ? (
    <Link
      to={`/${locale}/login`}
      className="flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161e29] px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-100 transition hover:border-[#88a531] hover:bg-white dark:hover:bg-[#1f2937] hover:text-[#88a531]"
    >
      <FiUser className="text-base" />
      {t("nav.login") || "تسجيل الدخول"}
    </Link>
  ) : canAccessDashboard ? (
    <button
      type="button"
      onClick={() => navigate(`/${locale}/dashboard`)}
      className="rounded-xl bg-gray-900 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black dark:hover:bg-gray-700"
    >
      {t("nav.dashboard") || "لوحة التحكم"}
    </button>
  ) : (
    <Link
      to={`/${locale}/select-role`}
      className="rounded-xl border border-[#88a531] px-4 py-2 text-sm font-semibold text-[#5b7519] dark:text-[#c2d547] hover:bg-[#88a531]/10 transition"
    >
      {t("nav.profile") || "ملفي الطبي"}
    </Link>
  )}
*/}


            {/* Logout button if user is logged in */}

            {/* {user && (
              <button
                type="button"
                onClick={logout}
                title={t("nav.logout") || "تسجيل الخروج"}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition cursor-pointer"
              >
                <RiLogoutBoxRLine className="h-5 w-5" />
              </button>
            )} */}

            {/* Book Now Button */}
            {/* <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={handleBookingClick}
              className="rounded-xl bg-[#88a531] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#88a531]/25 transition hover:bg-[#738f25] cursor-pointer"
            >
              {t("nav.bookNow") || "احجز كشفك الآن"}
            </motion.button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle className="h-9 w-9" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161e29] text-gray-800 dark:text-gray-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown with Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f141c] py-4 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map(([id, key, fallback]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className="rounded-xl px-4 py-2.5 text-start font-semibold text-gray-700 dark:text-gray-200 hover:bg-[#88a531]/10 hover:text-[#88a531] transition"
                  >
                    {t(key) || fallback}
                  </button>
                ))}

                <a
                  href="tel:15662"
                  className="flex items-center justify-between rounded-xl bg-[#88a531]/10 dark:bg-[#88a531]/20 px-4 py-2.5 text-sm font-bold text-[#5b7519] dark:text-[#c2d547]"
                >
                  <span>{t("nav.hotline") || "الخط الساخن: 15662"}</span>
                  <FiPhoneCall className="text-[#88a531]" />
                </a>

                {/* Theme Toggle Pill in Mobile Menu */}
                <div className="px-1 py-1">
                  <ThemeToggle variant="pill" className="w-full justify-center" />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  {!user ? (
                    <Link
                      to={`/${locale}/login`}
                      onClick={closeMenu}
                      className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161e29] py-2.5 text-center font-semibold text-gray-800 dark:text-gray-200"
                    >
                      {t("nav.login") || "تسجيل الدخول"}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        navigate(canAccessDashboard ? `/${locale}/dashboard` : `/${locale}/select-role`);
                      }}
                      className="rounded-xl bg-gray-900 dark:bg-gray-800 py-2.5 text-center font-semibold text-white"
                    >
                      {canAccessDashboard ? (t("nav.dashboard") || "لوحة التحكم") : (t("nav.profile") || "ملفي الطبي")}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleBookingClick}
                    className="rounded-xl bg-[#88a531] py-2.5 text-center font-bold text-white shadow"
                  >
                    {t("nav.bookNow") || "احجز كشفك"}
                  </button>
                </div>

                {user && (
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      logout();
                    }}
                    className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/20 py-2.5 text-sm font-semibold text-red-600 border border-red-200 dark:border-red-900/40"
                  >
                    <RiLogoutBoxRLine />
                    {t("nav.logout") || "تسجيل الخروج"}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
