import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
    .required("الاسم الكامل مطلوب"),

  phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح")
    .required("رقم الهاتف مطلوب"),

  email: Yup.string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),

  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
    
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمتا المرور غير متطابقتين")
    .required("تأكيد كلمة المرور مطلوب"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),

  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .test(
      "email-or-phone",
      "يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف صحيح (مثال: 01012345678 أو name@example.com)",
      (value) => {
        if (!value) return false;
        const v = value.trim();
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        const isPhone = /^(\+?[0-9]{10,14}|01[0125][0-9]{8})$/.test(v);
        return isEmail || isPhone;
      }
    )
    .required("البريد الإلكتروني أو رقم الهاتف مطلوب"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمتا المرور غير متطابقتين")
    .required("تأكيد كلمة المرور مطلوب"),
});

export const verifyCodeSchema = Yup.object({
  code: Yup.string()
    .length(6, "يجب إدخال 6 أرقام")
    .matches(/^[0-9]+$/, "يجب أن يحتوي الرمز على أرقام فقط")
    .required("رمز التحقق مطلوب"),
});
