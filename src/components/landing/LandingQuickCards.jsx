import { FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/i18n/context";

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function BookingCard() {
  const { t, dir } = useI18n();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="min-h-[195px] border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-[#161e29] px-5 py-3 shadow-sm hover:shadow-md dark:shadow-black/40 transition-colors duration-300 rounded-sm"
    >
      <h2 className="mb-5 text-center text-2xl font-extrabold text-black dark:text-white">
        {t("landing.quickCards.bookingTitle") || "احجز موعداً"}
      </h2>

      <form id="booking" className="grid grid-cols-2 gap-3" dir={dir}>
        <input
          type="tel"
          placeholder={t("landing.quickCards.phonePlaceholder") || "رقم التليفون"}
          className="h-9 min-w-0 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f2937] px-3 text-sm text-gray-900 dark:text-white outline-none focus:border-[var(--alfa-green)] placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
        />

        <select
          defaultValue=""
          className="h-9 min-w-0 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f2937] px-3 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-[var(--alfa-green)] transition-colors"
        >
          <option value="" disabled>
            {t("landing.quickCards.areaSelect") || "المنطقة"}
          </option>
          <option value="cairo">
            {t("landing.quickCards.areaCairo") || "القاهرة"}
          </option>
          <option value="giza">
            {t("landing.quickCards.areaGiza") || "الجيزة"}
          </option>
          <option value="other">
            {t("landing.quickCards.areaOther") || "أخرى"}
          </option>
        </select>

        <input
          type="email"
          placeholder={t("landing.quickCards.emailPlaceholder") || "الإيميل الإلكتروني"}
          className="h-9 min-w-0 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f2937] px-3 text-sm text-gray-900 dark:text-white outline-none focus:border-[var(--alfa-green)] placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="h-9 bg-[var(--alfa-green)] px-2 text-sm font-bold text-white transition hover:bg-[var(--alfa-green-hover)] cursor-pointer"
        >
          {t("landing.quickCards.submitButton") || "حجز موعد متاح"}
        </motion.button>
      </form>
    </motion.div>
  );
}

function BranchesCard() {
  const { t } = useI18n();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="min-h-[195px] border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-[#161e29] px-5 py-3 shadow-sm hover:shadow-md dark:shadow-black/40 transition-colors duration-300 rounded-sm"
    >
      <h2 className="mb-5 text-center text-2xl font-extrabold text-black dark:text-white">
        {t("landing.quickCards.branchesTitle") || "فروعنا"}
      </h2>

      <motion.a
        href="#branches"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative mt-2 flex min-h-32 items-center justify-center overflow-hidden rounded-[25px] bg-gradient-to-br from-green-100 via-gray-100 to-lime-100 dark:from-[#21301a] dark:via-[#1c2633] dark:to-[#2c3d18] px-4 text-center transition hover:brightness-95"
      >
        <span className="absolute -left-4 top-0 h-16 w-16 rounded-full bg-green-300/70 dark:bg-green-600/30 blur-md animate-pulse" />

        <span className="absolute right-10 top-2 h-14 w-14 rounded-full bg-lime-300/70 dark:bg-lime-600/30 blur-md" />

        <span className="absolute bottom-0 left-1/3 h-16 w-16 rounded-full bg-blue-200/70 dark:bg-blue-600/20 blur-md" />

        <span className="absolute bottom-0 right-8 h-16 w-16 rounded-full bg-green-300/70 dark:bg-green-600/30 blur-md" />

        <span className="relative z-10 text-base font-extrabold text-gray-950 dark:text-white">
          {t("landing.quickCards.branchesButton") || "اضغط هنا لمعرفة الفروع"}
        </span>
      </motion.a>
    </motion.div>
  );
}

function ContactCard() {
  const { t } = useI18n();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="min-h-[195px] border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-[#161e29] px-5 py-3 shadow-sm hover:shadow-md dark:shadow-black/40 transition-colors duration-300 rounded-sm"
    >
      <h2 className="mb-2 text-center text-2xl font-extrabold text-black dark:text-white">
        {t("landing.quickCards.contactTitle") || "اتصل بنا"}
      </h2>

      <div className="flex flex-col items-center text-center">
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          href="tel:15662"
          dir="ltr"
          className="flex items-center gap-2 rounded-2xl bg-gray-900 dark:bg-black px-3.5 py-1.5 text-2xl font-extrabold text-white transition hover:bg-gray-800 border border-transparent dark:border-gray-700 shadow-sm"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
            <FiPhone className="text-xl text-white" />
          </span>
          15662
        </motion.a>

        <div className="my-3 h-px w-4/5 bg-gray-200 dark:bg-gray-800" />

        <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
          {t("landing.quickCards.contactDesc1") || "تقدر تكلمنا على الخط الساخن طوال أيام الأسبوع"}
          <br />
          {t("landing.quickCards.contactDesc2") || "من 10 صباحاً حتى 10 مساءً"}
        </p>
      </div>
    </motion.div>
  );
}

export default function LandingQuickCards() {
  const { dir } = useI18n();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-5 md:grid-cols-3 md:gap-6 lg:gap-8"
      dir={dir}
    >
      <BookingCard />
      <BranchesCard />
      <ContactCard />
    </motion.section>
  );
}
