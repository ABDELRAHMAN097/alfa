import {
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiShield,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/i18n/context";

const featureItemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function AboutFeatures() {
  const { t } = useI18n();

  const features = [
    {
      icon: FiBookOpen,
      title: t("landing.about.features.booking.title") || "حجز سهل",
      description:
        t("landing.about.features.booking.desc") || "احجز موعدك في خطوات بسيطة",
    },
    {
      icon: FiUsers,
      title: t("landing.about.features.team.title") || "فريق مؤهل",
      description:
        t("landing.about.features.team.desc") || "أكثر من 25 عاماً من الخبرة",
    },
    {
      icon: FiCalendar,
      title: t("landing.about.features.schedule.title") || "جدول زمني مرن",
      description:
        t("landing.about.features.schedule.desc") || "أطباؤنا متاحون دائماً",
    },
    {
      icon: FiShield,
      title: t("landing.about.features.price.title") || "ضمان أفضل الأسعار",
      description:
        t("landing.about.features.price.desc") || "لا توجد خدمات مبالغ في سعرها",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-16"
    >
      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <motion.div
            key={index}
            variants={featureItemVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex min-h-[160px] flex-col items-center justify-center bg-white dark:bg-[#161e29] border border-transparent dark:border-gray-800/80 px-3 py-6 text-center transition-all hover:shadow-md rounded-sm"
          >
            <motion.div
              whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
            >
              <Icon
                className="mb-2 h-10 w-10 text-[#85A91D] dark:text-[#bdd342]"
                strokeWidth={1.5}
              />
            </motion.div>

            <h3 className="mb-1 text-lg font-extrabold text-black dark:text-white">
              {feature.title}
            </h3>

            <p className="text-sm leading-6 text-[#AFAFAF] dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        );
      })}

      {/* Divider lines */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#E5E5E5] dark:bg-gray-800 sm:block origin-top"
      />

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-[#E5E5E5] dark:bg-gray-800 sm:block origin-center"
      />

      {/* Center diamond */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-[#85A91D] dark:bg-[#bdd342] sm:block"
      />
    </motion.div>
  );
}

export default function LandingAboutUs() {
  const { t } = useI18n();

  return (
    <section
      id="about"
      className="w-full bg-[#F6F6F6] dark:bg-[#0f141c] px-5 py-12 sm:py-16 lg:px-8 lg:py-[70px] transition-colors duration-300"
    >
      <div className="mx-auto grid max-w-[1030px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-[90px]">
        {/* About Us Box */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex min-h-[275px] w-full flex-col justify-center bg-white dark:bg-[#161e29] border border-transparent dark:border-gray-800/80 px-5 py-7 text-start sm:px-8 sm:py-6 shadow-sm hover:shadow-md transition-all duration-300 rounded-sm"
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 text-center text-3xl font-extrabold text-black dark:text-white sm:text-[34px]"
          >
            {t("landing.about.title") || "إحنا مين؟"}
          </motion.h2>

          <div className="space-y-2 text-[15px] leading-[1.9] text-[#777777] dark:text-gray-300 sm:text-base">
            <p className="font-bold text-[#85A91D] dark:text-[#bdd342]">
              {t("landing.about.highlight") || "ألفا كير 15 سنة في مصر !"}
            </p>

            <p>
              {t("landing.about.desc1") ||
                "أقوى خبراء العلاج الطبيعي معاكم بقالنا 15 سنة في 25 فرع في مصر عشان نقضي على الألم."}
            </p>

            <p>
              {t("landing.about.desc2") ||
                "من أول مرحلة الكشف وخبراء ألفا كير بيحددولك خطة العلاج على حسب حالتك والعلاج ده بيتضمن أحدث الأجهزة وأقوى التمرينات والعلاج اليدوي على يد أفضل المتخصصين في مصر."}
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <div className="w-full">
          <AboutFeatures />
        </div>
      </div>
    </section>
  );
}
