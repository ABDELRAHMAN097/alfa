import { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiShield,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import {
  loginWithEmail,
  loginAsDemo,
  signInWithGoogle,
  getAuthErrorMessage,
} from "@/services/authService";
import { loginSchema } from "@/validations/authSchemas";
import { useI18n } from "@/i18n/i18n/context";

export default function Login() {
  const { locale = "ar" } = useParams();
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: location.state?.email || "",
      password: "",
      remember: true,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await loginWithEmail(values.email.trim(), values.password);
        toast.success("أهلاً بك مجدداً! تم تسجيل الدخول بنجاح.");
        navigate(`/${locale}/dashboard`);
      } catch (error) {
        console.error("Login error:", error);
        toast.error(getAuthErrorMessage(error));
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast.success("تم تسجيل الدخول عبر Google بنجاح!");
      navigate(`/${locale}/dashboard`);
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error(getAuthErrorMessage(error));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleQuickDemo = async (role) => {
    setLoading(true);
    try {
      await loginAsDemo(role);
      toast.info(`تم تسجيل الدخول كـ (${role === "admin" ? "مدير المركز" : "طبيب استشاري"})`);
      navigate(`/${locale}/dashboard`);
    } catch (e) {
      toast.error("فشل تسجيل الدخول التجريبي");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#88a531]/15 text-[#88a531] mb-3">
          <FiLogIn className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          تسجيل الدخول
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          مرحباً بعودتك! يرجى إدخال بياناتك للمتابعة
        </p>
      </div>

      {/* Quick Demo Access Pills */}
      <div className="mb-5 p-3 rounded-2xl bg-gray-800/60 border border-gray-750 text-right">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300 mb-2">
          <FiShield className="text-[#88a531]" />
          <span>حسابات تجريبية سريعة:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo("admin")}
            className="px-2.5 py-1.5 rounded-lg bg-gray-700/70 hover:bg-[#88a531]/20 hover:text-[#c2d547] text-xs font-semibold text-gray-200 border border-gray-600/60 transition cursor-pointer"
          >
            مدير المركز (Admin)
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo("doctor")}
            className="px-2.5 py-1.5 rounded-lg bg-gray-700/70 hover:bg-[#88a531]/20 hover:text-[#c2d547] text-xs font-semibold text-gray-200 border border-gray-600/60 transition cursor-pointer"
          >
            طبيب استشاري (Doctor)
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 text-right">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FiMail />
            </span>
            <input
              type="email"
              name="email"
              dir="ltr"
              placeholder="name@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
              className={`w-full h-11 bg-gray-800/80 border rounded-xl pr-10 pl-3 text-sm text-white placeholder-gray-500 outline-none transition focus:ring-1 focus:ring-[#88a531] text-right ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-700 focus:border-[#88a531]"
              }`}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-xs text-red-400 text-right">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Link
              to={`/${locale}/forgot-password`}
              className="text-xs text-[#88a531] hover:text-[#a0c239] transition hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
            <label className="text-xs font-semibold text-gray-300">
              كلمة المرور
            </label>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FiLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
              className={`w-full h-11 bg-gray-800/80 border rounded-xl pr-10 pl-10 text-sm text-white placeholder-gray-500 outline-none transition focus:ring-1 focus:ring-[#88a531] ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-700 focus:border-[#88a531]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-white transition cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-xs text-red-400 text-right">{formik.errors.password}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              name="remember"
              checked={formik.values.remember}
              onChange={formik.handleChange}
              className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-[#88a531] focus:ring-[#88a531] cursor-pointer"
            />
            <span>تذكرني على هذا الجهاز</span>
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-[#88a531] hover:bg-[#769226] disabled:opacity-60 text-white font-bold rounded-xl shadow-md shadow-[#88a531]/25 transition cursor-pointer flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FiLogIn className="text-lg" />
              <span>تسجيل الدخول</span>
            </>
          )}
        </motion.button>

        {/* Divider */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="border-t border-gray-800 w-full" />
          <span className="bg-gray-900 px-3 text-xs text-gray-500 absolute">أو</span>
        </div>

        {/* Google Sign-in */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full h-11 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-xl text-sm font-semibold text-white transition flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <FcGoogle className="text-xl" />
          <span>الدخول بواسطة Google</span>
        </button>

        {/* Register Link */}
        <p className="text-center text-xs text-gray-400 pt-2">
          ليس لديك حساب بعد؟{" "}
          <Link
            to={`/${locale}/register`}
            className="text-[#88a531] hover:text-[#a0c239] font-bold hover:underline transition"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
