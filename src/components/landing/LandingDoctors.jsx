import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/i18n/context";

export default function LandingDoctors() {
  const { t, dir } = useI18n();
  const doctorsRef = useRef(null);

  const doctors = [
    {
      id: 1,
      image: "/mohamadHadad.png",
      name: t("landing.doctors.items.hadad.name") || "د. محمد حداد",
      specialty:
        t("landing.doctors.items.hadad.specialty") ||
        "أخصائي علاج طبيعي متخصص بالجلف وتشوهات العمود الفقري",
    },
    {
      id: 2,
      image: "/abdelkhalek.png",
      name: t("landing.doctors.items.mansour.name") || "د. عبدالخالق منصور",
      specialty:
        t("landing.doctors.items.mansour.specialty") || "خبير إصابات الكتف",
    },
    {
      id: 3,
      image: "/omarelshaf3y.png",
      name: t("landing.doctors.items.shafey.name") || "د. عمر الشافعي",
      specialty:
        t("landing.doctors.items.shafey.specialty") ||
        "خبير إصابات وتشوهات العمود الفقري",
    },
    {
      id: 4,
      image: "/mohamedHelme.png",
      name: t("landing.doctors.items.helmy.name") || "د. محمد حلمي",
      specialty:
        t("landing.doctors.items.helmy.specialty") ||
        "استشاري العلاج الطبيعي لحالات العمود الفقري",
    },
  ];

  const handleScroll = (direction) => {
    doctorsRef.current?.scrollBy({
      left: direction * 210,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white dark:bg-[#0f141c] px-4 py-12 sm:px-6 lg:py-16 transition-colors duration-300">
      <div className="mx-auto flex max-w-[1036px] flex-col gap-5 md:flex-row md:items-end md:gap-5">
        <div className="min-w-0 flex-1" id="doctors">
          {/* Header & Pagination */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex items-center justify-end gap-1.5 border-b border-gray-200 dark:border-gray-800 pb-2"
            dir="ltr"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => handleScroll(-1)}
              aria-label="Previous doctors"
              className="flex h-[35px] w-[36px] shrink-0 items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 transition hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-xs"
            >
              <FiChevronLeft size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => handleScroll(1)}
              aria-label="Next doctors"
              className="flex h-[35px] w-[36px] shrink-0 items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 transition hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-xs"
            >
              <FiChevronRight size={20} />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#all-doctors"
              className="flex h-[35px] shrink-0 items-center bg-[#EEEEEE] dark:bg-gray-800 px-3 text-sm font-semibold text-gray-700 dark:text-gray-200 transition hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xs"
            >
              {t("landing.doctors.allDoctors") || "كل الدكاترة"}
            </motion.a>
          </motion.div>

          {/* Doctors Cards */}
          <div
            ref={doctorsRef}
            className="flex gap-[22px] overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            dir="ltr"
          >
            {doctors.map((doctor, index) => (
              <motion.article
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
                className="group w-[188px] shrink-0 snap-start overflow-hidden bg-[#88A52C] rounded-sm shadow-sm cursor-pointer"
                dir={dir}
              >
                {/* Doctor Image */}
                <div className="h-[152px] w-full overflow-hidden bg-[#F3F3F3] dark:bg-gray-800">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-108"
                  />
                </div>

                {/* Doctor Information */}
                <div className="flex min-h-[112px] flex-col items-center justify-start bg-[#88A52C] px-2.5 py-3 text-center text-white">
                  <h3 className="mb-1 text-[19px] font-extrabold leading-7 whitespace-nowrap">
                    {doctor.name}
                  </h3>

                  <p className="text-[12px] font-medium leading-[1.7] text-white/95">
                    {doctor.specialty}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Banner Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 25 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
          className="relative flex h-[340px] w-full shrink-0 flex-col items-center justify-end overflow-hidden bg-cover bg-center px-4 pb-10 text-center sm:mx-auto sm:max-w-[260px] md:mx-0 md:h-[340px] md:w-[188px] md:max-w-none rounded-sm shadow-md"
          style={{
            backgroundImage: "url('/banar.png')",
          }}
        >
          <div className="absolute inset-0 bg-[#85A91D]/80 backdrop-blur-[1px]" />

          <div className="relative z-10 text-white" dir={dir}>
            <h2 className="mb-2 text-xl font-extrabold sm:text-[22px]">
              {t("landing.doctors.bannerTitle") || "احجز موعد الآن"}
            </h2>

            <p className="text-xs leading-[1.8] font-medium text-white/90 whitespace-pre-line">
              {t("landing.doctors.bannerDesc") ||
                "احجز جلستك من الموقع\nووفر الوقت على نفسك!"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
