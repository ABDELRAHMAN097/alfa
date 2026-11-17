import NavbarLanding from "@/components/NavparLanding";
import LandingHero from "@/components/landing/LandingHero";
import LandingQuickCards from "@/components/landing/LandingQuickCards";
import LandingAboutUs from "@/components/landing/LandingAboutUs";
import LandingServices from "@/components/landing/LandingServices";
import LandingTestimonials from "@/components/landing/LandingTestimonials";
// import LandingBranches from "@/components/landing/LandingBranches";
import LandingDoctors from "@/components/landing/LandingDoctors";
import LandingFooterInfo from "@/components/landing/LandingFooterInfo";
import LandingFooterBottom from "@/components/landing/LandingFooterBottom";
import { useI18n } from "@/i18n/i18n/context";

export default function LandingPage() {
  const { dir } = useI18n();

  return (
    <div
      className="min-h-screen bg-white dark:bg-[#0f141c] text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-300"
      dir={dir}
    >
      <NavbarLanding />
      <main className="flex-1">
        <LandingHero />

        <div className="relative z-20 -mt-14 md:-mt-16 mb-12 hidden md:block">
          <LandingQuickCards />
        </div>

        <LandingAboutUs />

        {/* Section 3: Specialized Medical Services */}
        <LandingServices />

        {/* Section 4: Our Branches across Egypt */}
        <LandingTestimonials />

        {/* <LandingBranches /> */}

        {/* Section 5: Call to Action / Instant Booking */}
        <LandingDoctors />
      </main>

      {/* Footer */}
      <LandingFooterInfo />
      <LandingFooterBottom />
    </div>
  );
}
