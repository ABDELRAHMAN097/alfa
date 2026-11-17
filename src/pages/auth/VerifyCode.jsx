import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiCheckCircle, FiRotateCw, FiArrowRight, FiMail, FiShield } from "react-icons/fi";

import {
  verifyCode,
  sendVerificationCode,
  getAuthErrorMessage,
} from "@/services/authService";

const CODE_LENGTH = 6;
const COOLDOWN_SECONDS = 60;

export default function VerifyCode() {
  const { locale = "ar" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email ||
    sessionStorage.getItem("alfa_current_reset_email") ||
    "";
  const purpose = location.state?.purpose || "reset"; // 'register' or 'reset'

  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(COOLDOWN_SECONDS);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (email) {
      sessionStorage.setItem("alfa_current_reset_email", email);
    }
  }, [email]);

  useEffect(() => {
    // Focus first input box on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleDigitChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Auto move to next input if digit entered
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace to previous input
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^[0-9]{6}$/.test(pasteData)) {
      const pasteDigits = pasteData.split("");
      setDigits(pasteDigits);
      inputRefs.current[CODE_LENGTH - 1]?.focus();
    }
  };

  const fullCode = digits.join("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fullCode.length < CODE_LENGTH) {
      toast.warning("يرجى إدخال رمز التحقق المكون من 6 أرقام كاملاً");
      return;
    }

    setLoading(true);
    try {
      await verifyCode(email, fullCode);
      toast.success("تم التحقق من الرمز بنجاح! جاري الانتقال لتعيين كلمة المرور...");

      if (purpose === "reset") {
        navigate(`/${locale}/reset-password`, {
          replace: true,
          state: { email, verified: true, code: fullCode },
        });
      } else {
        navigate(`/${locale}/dashboard`, { replace: true });
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error.message || getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("يرجى إدخال البريد الإلكتروني أو رقم الهاتف أولاً");
      return;
    }

    setResending(true);
    try {
      await sendVerificationCode(email, purpose);
      setCooldown(COOLDOWN_SECONDS);
      toast.success("تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني (Gmail). يرجى التحقق من صندوق الوارد.", {
        autoClose: 7000,
      });
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setResending(false);
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
          <FiShield className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          تأكيد رمز التحقق السري
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          تم إرسال رمز التحقق المكون من 6 أرقام إلى بريدك المسجل
        </p>
      </div>

      {/* Secure Instructions Banner */}
      <div className="mb-6 rounded-2xl bg-gray-800/80 border border-gray-700/80 p-4 text-center shadow-lg">
        <div className="flex items-center justify-center gap-2 text-[#88a531] mb-2">
          <FiMail className="w-5 h-5" />
          <span className="text-xs font-bold">تحقق من صندوق الوارد (Gmail)</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed mb-1.5">
          تم إرسال رمز التحقق السري إلى بريدك الإلكتروني:
        </p>
        <p className="font-mono font-bold text-white text-sm bg-gray-900/60 py-1 px-3 rounded-lg inline-block border border-gray-700" dir="ltr">
          {email || "بريدك الإلكتروني"}
        </p>
        <p className="text-[11px] text-gray-400 mt-2.5">
          يرجى فتح تطبيق Gmail أو متصفحك، ونسخ الرمز المكون من 6 أرقام وكتابته في الخانات أدناه للمتابعة.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* OTP Input Boxes */}
        <div className="flex justify-center items-center gap-2 sm:gap-3" dir="ltr">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={loading}
              className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-extrabold text-white bg-gray-800/90 border border-gray-700 rounded-xl outline-none focus:border-[#88a531] focus:ring-2 focus:ring-[#88a531]/30 transition shadow-inner"
            />
          ))}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading || fullCode.length < CODE_LENGTH}
          className="w-full h-11 bg-[#88a531] hover:bg-[#769226] disabled:opacity-50 text-white font-bold rounded-xl shadow-md shadow-[#88a531]/25 transition cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>تأكيد ومتابعة تعيين كلمة المرور</span>
          )}
        </motion.button>

        {/* Resend Code Section */}
        <div className="text-center text-xs text-gray-400">
          <span>لم يصلك الرمز في بريدك؟ </span>
          {cooldown > 0 ? (
            <span className="font-bold text-gray-500 tabular-nums">
              إعادة الإرسال بعد ({cooldown}) ثانية
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-[#88a531] hover:text-[#a0c239] font-bold hover:underline transition inline-flex items-center gap-1 cursor-pointer"
            >
              <FiRotateCw className={resending ? "animate-spin" : ""} />
              <span>إعادة إرسال رمز جديد إلى Gmail</span>
            </button>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center pt-1">
          <Link
            to={`/${locale}/${purpose === "reset" ? "forgot-password" : "login"}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition"
          >
            <FiArrowRight />
            <span>
              {purpose === "reset"
                ? "تغيير البريد أو رقم الهاتف"
                : "العودة لتسجيل الدخول"}
            </span>
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
