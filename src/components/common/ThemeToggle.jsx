import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({
  variant = "icon", // "icon" | "pill" | "footer-switch"
  className = "",
}) {
  const { isDark, toggleTheme } = useTheme();

  if (variant === "footer-switch") {
    return (
      <div className={`inline-flex items-center gap-1.5 p-1 rounded-xl bg-white/10 dark:bg-white/5 border border-white/10 ${className}`}>
        <button
          type="button"
          onClick={() => isDark && toggleTheme()}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            !isDark
              ? "bg-[#88a531] text-white shadow-sm"
              : "text-gray-400 hover:text-white"
          }`}
          title="تفعيل المظهر الفاتح"
        >
          <FiSun className="text-sm" />
          <span>نهاري</span>
        </button>

        <button
          type="button"
          onClick={() => !isDark && toggleTheme()}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            isDark
              ? "bg-[#88a531] text-white shadow-sm"
              : "text-gray-400 hover:text-white"
          }`}
          title="تفعيل المظهر الليلي"
        >
          <FiMoon className="text-sm" />
          <span>ليلي</span>
        </button>
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161e29] text-gray-700 dark:text-gray-200 hover:border-[#88a531] transition-all cursor-pointer text-xs font-semibold ${className}`}
        aria-label={isDark ? "التبديل للمظهر النهاري" : "التبديل للمظهر الليلي"}
      >
        {isDark ? (
          <>
            <FiSun className="text-[#f59e0b] text-base" />
            <span>المظهر النهاري</span>
          </>
        ) : (
          <>
            <FiMoon className="text-[#88a531] text-base" />
            <span>المظهر الليلي</span>
          </>
        )}
      </button>
    );
  }

  // Default: Icon button
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161e29] text-gray-700 dark:text-gray-200 hover:border-[#88a531] dark:hover:border-[#88a531] hover:text-[#88a531] dark:hover:text-[#c2d547] transition-all duration-300 shadow-xs active:scale-95 cursor-pointer ${className}`}
      title={isDark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي (مريح للعين)"}
      aria-label={isDark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
    >
      <div className="transition-transform duration-300">
        {isDark ? (
          <FiSun className="h-5 w-5 text-[#f59e0b] transition-transform duration-300 hover:rotate-45" />
        ) : (
          <FiMoon className="h-5 w-5 text-gray-700 hover:text-[#88a531] transition-transform duration-300 hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}

