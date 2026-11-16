import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/i18n/context";

export default function LandingServices() {
  const { t, dir } = useI18n();
  const servicesRef = useRef(null);

  const services = [
    {
      image: "/Layer 1.png",
      title:
        t("landing.services.items.backJoint.title") ||
        "علاج ألم الظهر والمفاصل",
      description:
        t("landing.services.items.backJoint.desc") ||
        "حلول فعالة للتخلص من آلام العمود الفقري والركبة والمفاصل المختلفة.",
    },
    {
      image: "/Layer 2.png",
      title:
        t("landing.services.items.corrective.title") ||
        "تمارين تصحيحية وتأهيلية",
      description:
        t("landing.services.items.corrective.desc") ||
        "خطط تمارين مخصصة لتحسين وضعية الجسم وتقليل المشاكل العضلية والمفصلية.",
    },
    {
      image: "/Layer 3.png",
      title: t("landing.services.items.manual.title") || "العلاج اليدوي",
      description:
        t("landing.services.items.manual.desc") ||
        "تقنيات متخصصة لتخفيف الألم وتحسين الحركة والوظائف العضلية.",
    },
    {
      image: "/Layer 4.png",
      title:
        t("landing.services.items.rehab.title") ||
        "إعادة التأهيل بعد الإصابات",
      description:
        t("landing.services.items.rehab.desc") ||
        "نساعدك على التعافي بعد الإصابات الرياضية أو الحوادث لضمان عودتك لحياتك الطبيعية.",
    },
    {
      image: "/Layer 5.png",
      title:
        t("landing.services.items.general.title") || "العلاج الطبيعي العام",
      description:
        t("landing.services.items.general.desc") ||
        "نقدم خدمات علاج طبيعي شاملة للحفاظ على صحتك البدنية.",
    },
  ];

  const scrollServices = (direction) => {
    servicesRef.current?.scrollBy({
      left: direction * 220,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="services"
      className="w-full bg-white dark:bg-[#0f141c] pt-12 pb-10 sm:pt-16 transition-colors duration-300 border-t border-transparent dark:border-gray-800/80"
    >
      <div className="mx-auto max-w-[1050px] px-4 sm:px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 flex items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4"
          dir="ltr"
        >
          {/* Pagination */}
          <div className="flex shrink-0 items-center gap-1.5">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => scrollServices(-1)}
              aria-label="Previous services"
              className="flex h-[35px] w-[36px] items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 transition hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-xs"
            >
              <FiChevronLeft size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => scrollServices(1)}
              aria-label="Next services"
              className="flex h-[35px] w-[36px] items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 transition hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-xs"
            >
              <FiChevronRight size={20} />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#all-services"
              className="flex h-[35px] items-center justify-center bg-[#EEEEEE] dark:bg-gray-800 px-3 text-sm font-semibold text-gray-700 dark:text-gray-200 transition hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xs"
            >
              {t("landing.services.allServices") || "كل الخدمات"}
            </motion.a>
          </div>

          {/* Title */}
          <h2
            className="shrink-0 text-3xl font-extrabold text-black dark:text-white sm:text-[34px]"
            dir={dir}
          >
            {t("landing.services.title") || "خدماتنا"}
          </h2>
        </motion.div>

        {/* Services */}
        <div
          ref={servicesRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 pt-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          dir="ltr"
        >
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="group w-[80%] shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-96px)/5)] cursor-pointer"
              dir={dir}
            >
              {/* Image */}
              <div className="h-[162px] w-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-sm shadow-xs">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
              </div>

              {/* Title */}
              <div className="mt-3 flex items-center justify-start gap-2">
                <span className="h-[2px] w-[27px] shrink-0 bg-[#85A91D] dark:bg-[#bdd342] transition-all duration-300 group-hover:w-[38px]" />

                <h3 className="whitespace-nowrap text-[15px] font-extrabold leading-6 text-black dark:text-white group-hover:text-[#85A91D] dark:group-hover:text-[#bdd342] transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="mt-1.5 px-1 text-start text-[14px] leading-[1.7] text-[#777777] dark:text-gray-400">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
