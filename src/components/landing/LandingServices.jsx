
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const services = [
  {
    image: "/Layer 1.png",
    title: "علاج ألم الظهر والمفاصل",
    description:
      "حلول فعالة للتخلص من آلام العمود الفقري والركبة والمفاصل المختلفة.",
  },
  {
    image: "/Layer 2.png",
    title: "تمارين تصحيحية وتأهيلية",
    description:
      "خطط تمارين مخصصة لتحسين وضعية الجسم وتقليل المشاكل العضلية والمفصلية.",
  },
  {
    image: "/Layer 3.png",
    title: "العلاج اليدوي",
    description:
      "تقنيات متخصصة لتخفيف الألم وتحسين الحركة والوظائف العضلية.",
  },
  {
    image: "/Layer 4.png",
    title: "إعادة التأهيل بعد الإصابات",
    description:
      "نساعدك على التعافي بعد الإصابات الرياضية أو الحوادث لضمان عودتك لحياتك الطبيعية.",
  },
  {
    image: "/Layer 5.png",
    title: "العلاج الطبيعي العام",
    description:
      "نقدم خدمات علاج طبيعي شاملة للحفاظ على صحتك البدنية.",
  },
];

export default function LandingServices() {
  const servicesRef = useRef(null);

  const scrollServices = (direction) => {
    servicesRef.current?.scrollBy({
      left: direction * 220,
      behavior: "smooth",
    });
  };

  return (
    <section
    id="services"
    className="w-full bg-white pt-12 pb-10 sm:pt-16">
      <div className="mx-auto max-w-[1050px] px-4 sm:px-5">

        {/* Header */}
        <div
          className="mb-5 flex items-center justify-between gap-3 border-b border-gray-100 pb-4"
          dir="ltr"
        >
          {/* Pagination */}
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollServices(-1)}
              aria-label="Previous services"
              className="flex h-[35px] w-[36px] items-center justify-center border border-gray-200 text-gray-700 transition hover:bg-gray-100"
            >
              <FiChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scrollServices(1)}
              aria-label="Next services"
              className="flex h-[35px] w-[36px] items-center justify-center border border-gray-200 text-gray-700 transition hover:bg-gray-100"
            >
              <FiChevronRight size={20} />
            </button>

            <a
              href="#all-services"
              className="flex h-[35px] items-center justify-center bg-[#EEEEEE] px-3 text-sm text-gray-700 transition hover:bg-gray-200"
            >
              كل الخدمات
            </a>
          </div>

          {/* Title */}
          <h2
            className="shrink-0 text-3xl font-extrabold text-black sm:text-[34px]"
            dir="rtl"
          >
            خدماتنا
          </h2>
        </div>

        {/* Services */}
        <div
          ref={servicesRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          dir="ltr"
        >
          {services.map((service, index) => (
            <article
              key={index}
              className="w-[80%] shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-96px)/5)]"
              dir="rtl"
            >
              {/* Image */}
              <div className="h-[162px] w-full overflow-hidden bg-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Title */}
              <div className="mt-3 flex items-center justify-start gap-2">
                <span className="h-[2px] w-[27px] shrink-0 bg-[#85A91D]" />

                <h3 className="whitespace-nowrap text-[15px] font-extrabold leading-6 text-black">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="mt-1.5 px-1 text-right text-[14px] leading-[1.7] text-[#B0B0B0]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
