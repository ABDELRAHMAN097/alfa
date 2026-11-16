import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/i18n/context";

const branchCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function LandingBranches() {
  const { t } = useI18n();

  const branches = [
    {
      city: t("landing.branches.items.nasrCity.city") || "القاهرة",
      name: t("landing.branches.items.nasrCity.name") || "فرع مدينة نصر",
      address:
        t("landing.branches.items.nasrCity.address") ||
        "شارع عباس العقاد، بجوار البنك الأهلي، برج الأطباء - الدور الثالث",
      hours:
        t("landing.branches.items.nasrCity.hours") ||
        "يومياً من ٩ صباحاً إلى ١٠ مساءً",
      phone: "15662",
      whatsapp: "201026116087",
    },
    {
      city: t("landing.branches.items.mohandessin.city") || "الجيزة",
      name: t("landing.branches.items.mohandessin.name") || "فرع المهندسين",
      address:
        t("landing.branches.items.mohandessin.address") ||
        "شارع جامعة الدول العربية، أمام مسجد مصطفى محمود، الدور الثاني",
      hours:
        t("landing.branches.items.mohandessin.hours") ||
        "يومياً من ٩ صباحاً إلى ١٠ مساءً",
      phone: "15662",
      whatsapp: "201026116087",
    },
    {
      city: t("landing.branches.items.tagamoa.city") || "القاهرة الجديدة",
      name: t("landing.branches.items.tagamoa.name") || "فرع التجمع الخامس",
      address:
        t("landing.branches.items.tagamoa.address") ||
        "شارع التسعين الشمالي، ميديكال بارك بريميير، عيادة 204",
      hours:
        t("landing.branches.items.tagamoa.hours") ||
        "يومياً من ١٠ صباحاً إلى ١٠ مساءً",
      phone: "15662",
      whatsapp: "201026116087",
    },
    {
      city: t("landing.branches.items.maadi.city") || "القاهرة",
      name: t("landing.branches.items.maadi.name") || "فرع المعادي",
      address:
        t("landing.branches.items.maadi.address") ||
        "شارع النصر، دجلة المعادي، بجوار كارفور المعادي، برج الحياة",
      hours:
        t("landing.branches.items.maadi.hours") ||
        "يومياً من ٩ صباحاً إلى ٩ مساءً",
      phone: "15662",
      whatsapp: "201026116087",
    },
    {
      city: t("landing.branches.items.zayed.city") || "الجيزة",
      name: t("landing.branches.items.zayed.name") || "فرع الشيخ زايد",
      address:
        t("landing.branches.items.zayed.address") ||
        "وصلة دهشور، مول كابيتال بيزنس بارك، مبنى B4",
      hours:
        t("landing.branches.items.zayed.hours") ||
        "يومياً من ١٠ صباحاً إلى ١٠ مساءً",
      phone: "15662",
      whatsapp: "201026116087",
    },
    {
      city: t("landing.branches.items.smouha.city") || "الإسكندرية",
      name: t("landing.branches.items.smouha.name") || "فرع سموحة",
      address:
        t("landing.branches.items.smouha.address") ||
        "شارع فوزي معاذ، ميدان علي بن أبي طالب، برج الكيميائيين",
      hours:
        t("landing.branches.items.smouha.hours") ||
        "يومياً من ٩ صباحاً إلى ٩ مساءً",
      phone: "15662",
      whatsapp: "201026116087",
    },
  ];

  return (
    <section
      id="branches"
      className="py-20 bg-gray-50 dark:bg-[#121822] border-t border-gray-100 dark:border-gray-800/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#88a531]/10 dark:bg-[#88a531]/20 text-[#556e17] dark:text-[#c2d547] text-xs font-bold tracking-wide mb-3"
          >
            {t("landing.branches.badge") || "فروعنا في مصر"}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            {t("landing.branches.title") ||
              "أقرب مما تتخيل.. فروعنا تغطي محافظات مصر"}
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {t("landing.branches.desc") ||
              "مجهزة بأحدث التقنيات الطبية لاستقبالكم طوال أيام الأسبوع وتوفير أعلى سبل الراحة."}
          </p>
        </motion.div>

        {/* Branches Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {branches.map((b, idx) => (
            <motion.div
              key={idx}
              variants={branchCardVariants}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-[#161e29] rounded-2xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-xs hover:shadow-xl hover:border-[#88a531] dark:hover:border-[#88a531] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#88a531]/10 dark:bg-[#88a531]/20 text-[#556e17] dark:text-[#c2d547]">
                    {b.city}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[#88a531] transition-transform duration-300 group-hover:rotate-12">
                    <FiMapPin />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {b.name}
                </h3>

                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex items-start gap-2">
                    <FiMapPin className="text-[#88a531] shrink-0 mt-0.5 text-sm" />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-[#88a531] shrink-0 text-sm" />
                    <span>{b.hours}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href={`tel:${b.phone}`}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-gray-200 hover:text-[#88a531] dark:hover:text-[#c2d547] transition"
                >
                  <FiPhone className="text-[#88a531]" />
                  <span>
                    {t("landing.branches.hotline") || "الخط الساخن"} {b.phone}
                  </span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  href={`https://wa.me/${b.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition"
                  title={t("landing.branches.whatsapp") || "محادثة واتساب"}
                >
                  <FaWhatsapp />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
