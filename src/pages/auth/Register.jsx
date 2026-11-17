import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUserPlus,
  FiCheck,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import {
  registerWithEmail,
  signInWithGoogle,
  sendVerificationCode,
  getAuthErrorMessage,
} from "@/services/authService";
import { registerSchema } from "@/validations/authSchemas";
import { useI18n } from "@/i18n/i18n/context";

export default function Register() {
  const { locale = "ar" } = useParams();
  const { t } = useI18n();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      if (!values.terms) {
        toast.warning("يرجى الموافقة على الشروط والأحكام للمتابعة");
        return;
      }

      setLoading(true);
      try {
        await registerWithEmail({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          password: values.password,
        });

        // Send a verification OTP code for confirmation
        sendVerificationCode(values.email.trim(), "register");

        toast.success("تم إنشاء حسابك بنجاح في ألفا كير!");
        navigate(`/${locale}/verify-code`, {
          state: { email: values.email.trim(), purpose: "register" },
        });
      } catch (error) {
        console.error("Registration error:", error);
        toast.error(getAuthErrorMessage(error));
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast.success("تم تسجيل الدخول عبر Google بنجاح!");
      navigate(`/${locale}/dashboard`);
    } catch (error) {
      console.error("Google sign up error:", error);
      toast.error(getAuthErrorMessage(error));
    } finally {
      setGoogleLoading(false);
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
          <FiUserPlus className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          إنشاء حساب جديد
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          سجل الآن لمتابعة جلسات العلاج الطبيعي وملفك الطبي
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 text-right">
            الاسم الكامل
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FiUser />
            </span>
            <input
              type="text"
              name="name"
              placeholder="مثال: أحمد محمد"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
              className={`w-full h-11 bg-gray-800/80 border rounded-xl pr-10 pl-3 text-sm text-white placeholder-gray-500 outline-none transition focus:ring-1 focus:ring-[#88a531] ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-700 focus:border-[#88a531]"
              }`}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-xs text-red-400 text-right">{formik.errors.name}</p>
          )}
        </div>

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

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 text-right">
            رقم الهاتف
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FiPhone />
            </span>
            <input
              type="tel"
              name="phone"
              dir="ltr"
              placeholder="01XXXXXXXXX"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
              className={`w-full h-11 bg-gray-800/80 border rounded-xl pr-10 pl-3 text-sm text-white placeholder-gray-500 outline-none transition focus:ring-1 focus:ring-[#88a531] text-right ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-700 focus:border-[#88a531]"
              }`}
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <p className="mt-1 text-xs text-red-400 text-right">{formik.errors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 text-right">
            كلمة المرور
          </label>
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
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-white transition"
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-xs text-red-400 text-right">{formik.errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 text-right">
            تأكيد كلمة المرور
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FiLock />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="••••••••"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
              className={`w-full h-11 bg-gray-800/80 border rounded-xl pr-10 pl-10 text-sm text-white placeholder-gray-500 outline-none transition focus:ring-1 focus:ring-[#88a531] ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-700 focus:border-[#88a531]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-white transition"
              tabIndex={-1}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-400 text-right">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={formik.values.terms}
            onChange={formik.handleChange}
            className="mt-0.5 h-4 w-4 rounded border-gray-700 bg-gray-800 text-[#88a531] focus:ring-[#88a531] cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs text-gray-300 leading-relaxed cursor-pointer">
            أوافق على{" "}
            <span className="text-[#88a531] font-semibold underline">
              شروط الاستخدام
            </span>{" "}
            و{" "}
            <span className="text-[#88a531] font-semibold underline">
              سياسة الخصوصية
            </span>{" "}
            لمراكز ألفا كير.
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
              <FiCheck className="text-lg" />
              <span>إنشاء الحساب</span>
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
          onClick={handleGoogleSignUp}
          disabled={googleLoading || loading}
          className="w-full h-11 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-xl text-sm font-semibold text-white transition flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <FcGoogle className="text-xl" />
          <span>التسجيل بواسطة Google</span>
        </button>

        {/* Login Link */}
        <p className="text-center text-xs text-gray-400 pt-2">
          لديك حساب بالفعل؟{" "}
          <Link
            to={`/${locale}/login`}
            className="text-[#88a531] hover:text-[#a0c239] font-bold hover:underline transition"
          >
            تسجيل الدخول
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
