import { FaFacebookF, FaTwitter, FaGooglePlusG, FaPinterestP } from "react-icons/fa";
import { motion } from "framer-motion";
import ThemeToggle from "../common/ThemeToggle";
import { useI18n } from "@/i18n/i18n/context";

const socialLinks = [
  { href: "#facebook", label: "Facebook", icon: FaFacebookF, size: 12 },
  { href: "#twitter", label: "Twitter", icon: FaTwitter, size: 12 },
  { href: "#google", label: "Google Plus", icon: FaGooglePlusG, size: 14 },
  { href: "#pinterest", label: "Pinterest", icon: FaPinterestP, size: 12 },
];

export default function LandingFooterBottom() {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#E0E0E0] dark:bg-[#080b10] border-t border-gray-300/40 dark:border-gray-800/80 px-5 py-5 sm:px-8 transition-colors duration-300"
    >
      <div className="mx-auto flex max-w-[1030px] flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Copyright */}
        <p className="text-[11px] text-[#777777] dark:text-gray-400">
          Alfa Care © {new Date().getFullYear()}.{" "}
          <a
            href="#privacy"
            className="underline transition hover:text-gray-800 dark:hover:text-white"
          >
            {t("landing.footer.privacy") || "Privacy Policy"}
          </a>
        </p>

        {/* Theme Control in Footer (Requested by user) */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400">
            {t("landing.footer.themeLabel") || "مظهر الموقع:"}
          </span>
          <ThemeToggle variant="footer-switch" />
        </div>

        {/* Social Media */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-[#777777] dark:text-gray-400">
            {t("landing.footer.followUs") || "Follow Us"}
          </span>

          {socialLinks.map(({ href, label, icon: Icon, size }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              whileHover={{ scale: 1.25, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="text-[#666666] dark:text-gray-400 hover:text-[#85A52C] dark:hover:text-[#c2d547] transition-colors"
            >
              <Icon size={size} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
