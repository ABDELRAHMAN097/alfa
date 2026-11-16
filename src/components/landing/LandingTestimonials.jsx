import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/i18n/context";

export default function LandingTestimonials() {
  const { t, dir } = useI18n();
  const [activeIndex, setActiveIndex] = useState(1);

  const testimonials = [
    {
      id: 1,
      image: "/Client-1.png",
      name: t("landing.testimonials.items.client1.name") || "ميزة السعيد",
      text:
        t("landing.testimonials.items.client1.text") ||
        "فريق محترف جداً ويهتم بأدق التفاصيل، بعد فترة كبيرة في مرونة عضلاتي وتحسن وضعيتي.",
    },
    {
      id: 2,
      image: "/Client-2.png",
      name: t("landing.testimonials.items.client2.name") || "أ. أحمد مصطفى",
      text:
        t("landing.testimonials.items.client2.text") ||
        "كنت أعاني من آلام شديدة في الظهر بسبب الجلوس الطويل على المكتب، وبعد عدة جلسات علاج طبيعي، شعرت بتحسن كبير في الحركة وانخفاض الألم بشكل ملحوظ. شكراً للفريق الرائع!",
    },
    {
      id: 3,
      image: "/Client-3.png",
      name: t("landing.testimonials.items.client3.name") || "أ. سارة فاروق",
      text:
        t("landing.testimonials.items.client3.text") ||
        "تعرضت لإصابة في الركبة أثناء ممارسة الرياضة، لكن بفضل الجلسات المنتظمة والمتابعة المستمرة بدأت أتحسن بشكل ملحوظ.",
    },
  ];

  const getOffset = (index) => {
    let offset = index - activeIndex;

    if (offset > 1) offset -= testimonials.length;
    if (offset < -1) offset += testimonials.length;

    return offset;
  };

  return (
    <section className="w-full overflow-hidden bg-[#F5F5F5] dark:bg-[#111721] py-14 sm:py-16 lg:py-[65px] transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center text-3xl font-extrabold text-black dark:text-white sm:mb-9 sm:text-[34px]"
        >
          {t("landing.testimonials.title") || "تقييمات العملاء"}
        </motion.h2>

        {/* Testimonials Carousel */}
        <div className="relative mx-auto h-[300px] w-full max-w-[1100px]">
          {testimonials.map((item, index) => {
            const offset = getOffset(index);
            const isActive = offset === 0;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: `calc(-50% + ${offset * 285}px)`,
                  y: "-50%",
                  scale: isActive ? 1 : 0.94,
                  opacity: isActive ? 1 : 0.65,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute left-1/2 top-1/2 cursor-pointer"
                style={{
                  width: isActive
                    ? "min(492px, calc(100vw - 40px))"
                    : "min(270px, calc(100vw - 40px))",
                  zIndex: isActive ? 10 : 2,
                  visibility: Math.abs(offset) > 1 ? "hidden" : "visible",
                  pointerEvents: isActive ? "auto" : "none",
                }}
                onClick={() => !isActive && setActiveIndex(index)}
              >
                {/* Outer Card */}
                <motion.div
                  whileHover={isActive ? { y: -4, scale: 1.01 } : {}}
                  transition={{ duration: 0.2 }}
                  className={`bg-white dark:bg-[#161e29] border border-transparent dark:border-gray-800/80 p-[14px] rounded-sm transition-all duration-300 ${
                    isActive
                      ? "shadow-lg dark:shadow-black/50"
                      : "shadow-none"
                  }`}
                >
                  {/* Inner Card */}
                  <div
                    className={`flex min-h-[241px] flex-col items-center justify-center border border-[#EEEEEE] dark:border-gray-800 px-4 py-5 text-center sm:px-6 rounded-xs ${
                      isActive
                        ? "bg-white dark:bg-[#161e29]"
                        : "bg-[#FAFAFA] dark:bg-[#131922]"
                    }`}
                    dir={dir}
                  >
                    {/* Client Image */}
                    <div className="mb-3 h-[64px] w-[64px] shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Review */}
                    <p className="mb-2 text-[14px] leading-[1.9] text-[#666666] dark:text-gray-300">
                      {item.text}
                    </p>

                    {/* Client Name */}
                    <h3 className="mt-1 text-base font-extrabold text-black dark:text-white">
                      {item.name}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {testimonials.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveIndex(index)}
              aria-label={`Testimonial ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === index
                  ? "h-[9px] w-[9px] border-2 border-[#85A91D] bg-white dark:bg-gray-900"
                  : "h-[7px] w-[7px] bg-[#A5A5A5] dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
