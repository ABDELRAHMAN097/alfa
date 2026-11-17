import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { FiMail, FiKey, FiArrowRight, FiSend } from "react-icons/fi";

import {
  resetPassword,
  sendVerificationCode,
  getAuthErrorMessage,
} from "@/services/authService";
import { forgotPasswordSchema } from "@/validations/authSchemas";

export default function ForgotPassword() {
  const { locale = "ar" } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const identifier = values.email.trim();
      try {
        await sendVerificationCode(identifier, "reset");
        toast.success("تم إرسال رمز التحقق إلى بريدك الإلكتروني بنجاح! يرجى مراجعة صندوق الوارد في Gmail.", {
          autoClose: 7000,
        });
        navigate(`/${locale}/verify-code`, {
          state: {
            email: identifier,
            purpose: "reset",
          },
        });
      } catch (error) {
        console.error("Forgot password error:", error);
        toast.error(getAuthErrorMessage(error));
      } finally {
        setLoading(false);
      }
    },
  });

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
          <FiKey className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          استعادة كلمة المرور
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          أدخل بريدك الإلكتروني أو رقم هاتفك وسنرسل لك رمز التحقق لاستعادة حسابك
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 text-right">
            البريد الإلكتروني أو رقم الهاتف
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FiMail />
            </span>
            <input
              type="text"
              name="email"
              dir="ltr"
              placeholder="01012345678 أو name@example.com"
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

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-[#88a531] hover:bg-[#769226] disabled:opacity-60 text-white font-bold rounded-xl shadow-md shadow-[#88a531]/25 transition cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FiSend className="text-base" />
              <span>إرسال رمز التحقق</span>
            </>
          )}
        </motion.button>

        {/* Back to Login Link */}
        <div className="text-center pt-2">
          <Link
            to={`/${locale}/login`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition"
          >
            <FiArrowRight className="text-base" />
            <span>العودة إلى تسجيل الدخول</span>
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
