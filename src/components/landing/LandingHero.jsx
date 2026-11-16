
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/i18n/context";

export default function LandingHero() {
  const { t, dir } = useI18n();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      <motion.img
        initial={{ scale: 1.08, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        src="/alfa-hero.jpg"
        alt="Alfa Care"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[linear-gradient(to_left,var(--alfa-green)_0%,var(--alfa-green)_22%,transparent_65%)]"
      />

      <div className="relative z-10 ml-auto flex min-h-[100svh] w-[48%] items-center justify-center px-5 sm:w-[45%] sm:px-8 lg:w-[42%]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.25,
                delayChildren: 0.2,
              },
            },
          }}
          className="text-center"
          dir={dir}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 35, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="text-5xl font-extrabold text-black sm:text-6xl lg:text-8xl drop-shadow-xs"
          >
            {t("landing.hero.title") || "ألفا كير"}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="mt-5 text-lg font-medium text-black sm:text-xl lg:text-2xl"
          >
            {t("landing.hero.subtitle") || "أول سلسلة علاج طبيعي في مصر"}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
