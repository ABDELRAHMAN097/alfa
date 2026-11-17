import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { FiLock, FiEye, FiEyeOff, FiShield, FiCheck } from "react-icons/fi";

import { resetPasswordSchema } from "@/validations/authSchemas";
import {
  updateNewPassword,
  verifyFirebaseResetCode,
  confirmFirebasePasswordReset,
  getAuthErrorMessage,
} from "@/services/authService";

export default function ResetPassword() {
  const { locale = "ar" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Check if opened from Firebase email link (which carries oobCode)
  const oobCode = searchParams.get("oobCode") || searchParams.get("code");

  const [loading, setLoading] = useState(false);
  const [verifyingLink, setVerifyingLink] = useState(Boolean(oobCode));
  const [targetEmail, setTargetEmail] = useState(
    location.state?.email ||
    sessionStorage.getItem("alfa_current_reset_email") ||
    ""
  );
  const [isVerified, setIsVerified] = useState(
    Boolean(
      location.state?.verified ||
      (targetEmail && sessionStorage.getItem("alfa_reset_verified_" + targetEmail.toLowerCase()) === "true")
    )
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // If opened via Firebase oobCode link from Gmail
  useEffect(() => {
    if (oobCode) {
      setVerifyingLink(true);
      verifyFirebaseResetCode(oobCode)
        .then((userEmail) => {
          setTargetEmail(userEmail);
          setIsVerified(true);
          setVerifyingLink(false);
        })
        .catch((error) => {
          console.error("Firebase oobCode verification error:", error);
          toast.error("رابط استعادة كلمة المرور غير صالح أو منتهي الصلاحية.");
          setVerifyingLink(false);
          navigate(`/${locale}/forgot-password`, { replace: true });
        });
    } else if (!isVerified) {
      toast.warning("يرجى إدخال رمز التحقق أو فتح رابط الاستعادة من بريدك أولاً للمتابعة");
      navigate(`/${locale}/forgot-password`, { replace: true });
    }
  }, [oobCode, isVerified, navigate, locale]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (oobCode) {
          // Update password in Firebase Auth using the verified oobCode
          await confirmFirebasePasswordReset(oobCode, values.password);
        }

        if (targetEmail) {
          await updateNewPassword({
            email: targetEmail.trim(),
            newPassword: values.password,
          });
        }

        toast.success("تم تعيين كلمة المرور الجديدة بنجاح! يمكنك الآن تسجيل الدخول.");
        navigate(`/${locale}/login`, {
          replace: true,
          state: { email: targetEmail },
        });
      } catch (error) {
        console.error("Reset password error:", error);
        toast.error(getAuthErrorMessage(error) || "حدث خطأ أثناء تعيين كلمة المرور الجديدة");
      } finally {
        setLoading(false);
      }
    },
  });

  if (verifyingLink) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-16 bg-gray-800/80 rounded-2xl border border-gray-700 p-8 shadow-xl">
        <span className="inline-block h-10 w-10 border-3 border-[#88a531] border-t-transparent rounded-full animate-spin mb-4" />
        <h3 className="text-lg font-bold text-white mb-1">جاري التحقق من الرابط الآمن...</h3>
        <p className="text-xs text-gray-400">يرجى الانتظار لحظات</p>
      </div>
    );
  }

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
          <FiShield className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          تعيين كلمة مرور جديدة
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          {targetEmail ? `أدخل كلمة المرور الجديدة لحسابك: (${targetEmail})` : "أدخل كلمة المرور الجديدة لحسابك"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        {/* New Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 text-right">
            كلمة المرور الجديدة
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
            <p className="mt-1 text-xs text-red-400 text-right">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 text-right">
            تأكيد كلمة المرور الجديدة
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
              <span>حفظ كلمة المرور وتسجيل الدخول</span>
            </>
          )}
        </motion.button>

        {/* Link back to login */}
        <p className="text-center text-xs text-gray-400 pt-2">
          تذكرت كلمة المرور؟{" "}
          <Link
            to={`/${locale}/login`}
            className="text-[#88a531] hover:text-[#a0c239] font-bold hover:underline transition"
          >
            العودة لتسجيل الدخول
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
