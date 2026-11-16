
import {
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiShield,
} from "react-icons/fi";

const features = [
  {
    icon: FiBookOpen,
    title: "حجز سهل",
    description: "احجز موعدك في خطوات بسيطة",
  },
  {
    icon: FiUsers,
    title: "فريق مؤهل",
    description: "أكثر من 25 عاماً من الخبرة",
  },
  {
    icon: FiCalendar,
    title: "جدول زمني مرن",
    description: "أطباؤنا متاحون دائماً",
  },
  {
    icon: FiShield,
    title: "ضمان أفضل الأسعار",
    description: "لا توجد خدمات مبالغ في سعرها",
  },
];

function AboutFeatures() {
  return (
    <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-16">
      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <div
            key={index}
            className="flex min-h-[160px] flex-col items-center justify-center bg-white px-3 py-6 text-center transition-shadow hover:shadow-sm"
          >
            <Icon
              className="mb-2 h-10 w-10 text-[#85A91D]"
              strokeWidth={1.5}
            />

            <h3 className="mb-1 text-lg font-extrabold text-black">
              {feature.title}
            </h3>

            <p className="text-sm leading-6 text-[#AFAFAF]">
              {feature.description}
            </p>
          </div>
        );
      })}

      {/* Divider lines */}
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#E5E5E5] sm:block" />

      <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-[#E5E5E5] sm:block" />

      {/* Center diamond */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#85A91D] sm:block" />
    </div>
  );
}

export default function LandingAboutUs() {
  return (
   <section
   id="about"
   className="w-full bg-[#F6F6F6] px-5 py-12 sm:py-16 lg:px-8 lg:py-[70px]">
    <div className="mx-auto grid max-w-[1030px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-[90px]">

      {/* About Us */}
      <div className="flex min-h-[275px] w-full flex-col justify-center bg-white px-5 py-7 text-right sm:px-8 sm:py-6">
        <h2 className="mb-5 text-center text-3xl font-extrabold text-black sm:text-[34px]">
          إحنا مين؟
        </h2>

        <div className="space-y-1 text-[15px] leading-[1.9] text-[#AFAFAF] sm:text-base">
          <p>ألفا كير 15 سنة في مصر !</p>

          <p>
            أقوى خبراء العلاج الطبيعي معاكم بقالنا 15 سنة في 25 فرع في مصر
            عشان نقضي على الألم.
          </p>

          <p>
            من أول مرحلة الكشف وخبراء ألفا كير بيحددولك خطة العلاج على حسب حالتك
            والعلاج ده بيتضمن أحدث الأجهزة وأقوى التمرينات والعلاج اليدوي
            على يد أفضل المتخصصين في مصر.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="w-full">
        <AboutFeatures />
      </div>

    </div>
  </section>
  );
}
