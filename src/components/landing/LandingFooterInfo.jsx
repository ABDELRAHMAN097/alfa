import { FiPhone, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/i18n/context";

const colVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function FooterContact() {
  const { t, dir } = useI18n();

  return (
    <motion.div variants={colVariants} className="w-full" dir={dir}>
      <h3 className="mb-4 border-b border-[#9CA3AF] dark:border-gray-700 pb-2 text-start text-base font-bold text-[#333] dark:text-white">
        {t("landing.footer.contactTitle") || "تواصل معنا"}
      </h3>

      <div className="flex flex-col gap-4">
        <motion.a
          whileHover={{ x: -4 }}
          href="tel:15662"
          className="flex items-center gap-3 text-xs font-semibold text-[#444] dark:text-gray-300 transition hover:text-[#85A52C] dark:hover:text-[#c2d547]"
          dir="ltr"
        >
          <FiPhone className="h-4 w-4 text-[#85A52C]" />
          <span>15662</span>
        </motion.a>

        <motion.a
          whileHover={{ x: -4 }}
          href="mailto:alfa-care@info.com"
          className="flex items-center gap-3 text-xs font-semibold text-[#444] dark:text-gray-300 transition hover:text-[#85A52C] dark:hover:text-[#c2d547]"
          dir="ltr"
        >
          <FiMail className="h-4 w-4 text-[#85A52C]" />
          <span>alfa-care@info.com</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

function FooterEvents() {
  const { t, dir } = useI18n();

  const events = [
    {
      title:
        t("landing.footer.event1") || "تعاقد مع شركة SEHAONE",
      date: t("landing.footer.event1Date") || "21 نوفمبر 2024",
    },
    {
      title:
        t("landing.footer.event2") || "تعاقد مع شركة RELIANCE HEALTH",
      date: t("landing.footer.event2Date") || "18 سبتمبر 2024",
    },
  ];

  return (
    <motion.div variants={colVariants} className="w-full" dir={dir}>
      <h3 className="mb-3 border-b border-[#9CA3AF] dark:border-gray-700 pb-2 text-start text-base font-bold text-[#333] dark:text-white">
        {t("landing.footer.eventsTitle") || "آخر الفعاليات"}
      </h3>

      <div className="flex flex-col gap-3">
        {events.map((event, index) => (
          <motion.div
            key={index}
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
            className="border-r-2 rtl:border-r-2 ltr:border-l-2 ltr:border-r-0 border-[#85A52C] px-2 text-start transition-colors"
          >
            <p className="text-[13px] leading-5 text-[#333] dark:text-gray-200 font-medium">
              {event.title}
            </p>

            <span className="block text-[9px] text-[#888888] dark:text-gray-400">
              {event.date}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FooterMessage() {
  const { t, dir } = useI18n();

  return (
    <motion.div variants={colVariants} className="w-full" dir={dir}>
      <h3 className="mb-5 border-b border-[#9CA3AF] dark:border-gray-700 pb-2 text-start text-base font-bold text-[#333] dark:text-white">
        {t("landing.footer.messageTitle") || "أرسل رسالة"}
      </h3>

      <form
        className="flex flex-col gap-3 sm:flex-row"
        dir="ltr"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Message */}
        <textarea
          name="message"
          placeholder={t("landing.footer.messagePlaceholder") || "رسالتك"}
          required
          className="h-[87px] w-full resize-none bg-white dark:bg-[#161e29] border border-gray-200 dark:border-gray-700 px-3 py-3 text-start text-xs text-gray-700 dark:text-white outline-none placeholder:text-[#999999] focus:ring-1 focus:ring-[#85A52C] sm:flex-1 rounded-sm transition-colors"
          dir={dir}
        />

        {/* Email and Submit */}
        <div className="flex w-full flex-col gap-4 sm:w-[173px] sm:shrink-0">
          <input
            type="email"
            name="email"
            placeholder={
              t("landing.footer.emailPlaceholder") || "البريد الإلكتروني"
            }
            required
            className="h-[35px] w-full bg-white dark:bg-[#161e29] border border-gray-200 dark:border-gray-700 px-3 text-start text-xs text-gray-700 dark:text-white outline-none placeholder:text-[#999999] focus:ring-1 focus:ring-[#85A52C] rounded-sm transition-colors"
            dir={dir}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="h-[35px] w-full bg-[#88A52C] text-sm font-bold text-white transition hover:bg-[#769226] rounded-sm cursor-pointer shadow-xs"
          >
            {t("landing.footer.send") || "إرسال"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default function LandingFooterInfo() {
  const { dir } = useI18n();

  return (
    <footer className="w-full bg-[#EEEEEE] dark:bg-[#0c1017] border-t border-gray-200 dark:border-gray-800/80 px-5 py-10 sm:px-8 sm:py-12 transition-colors duration-300">
      <motion.div
        id="contact"
        dir={dir}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="mx-auto grid w-full max-w-[1030px] grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[188px_188px_minmax(0,400px)] lg:items-start lg:justify-between lg:gap-0"
      >
        {/* Left */}
        <FooterContact />

        {/* Center */}
        <FooterEvents />

        {/* Right */}
        <FooterMessage />
      </motion.div>
    </footer>
  );
}
