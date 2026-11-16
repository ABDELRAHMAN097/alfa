
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const doctors = [
  {
    id: 1,
    image: "/mohamadHadad.png",
    name: "د. محمد حداد",
    specialty: "أخصائي علاج طبيعي متخصص بالجلف وتشوهات العمود الفقري",
  },
  {
    id: 2,
    image: "/abdelkhalek.png",
    name: "د. عبدالخالق منصور",
    specialty: "خبير إصابات الكتف",
  },
  {
    id: 3,
    image: "/omarelshaf3y.png",
    name: "د. عمر الشافعي",
    specialty: "خبير إصابات وتشوهات العمود الفقري",
  },
  {
    id: 4,
    image: "/mohamedHelme.png",
    name: "د. محمد حلمي",
    specialty: "استشاري العلاج الطبيعي لحالات العمود الفقري",
  },
];

export default function LandingDoctors() {
  const doctorsRef = useRef(null);

  const handleScroll = (direction) => {
    doctorsRef.current?.scrollBy({
      left: direction * 210,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto flex max-w-[1036px] flex-col gap-5 md:flex-row md:items-end md:gap-5">

        

        
        <div className="min-w-0 flex-1" id="doctors">

          {/* Header & Pagination */}
          <div
            className="mb-5 flex items-center justify-end gap-1.5 border-b border-gray-200 pb-2"
            dir="ltr"
          >
            <button
              type="button"
              onClick={() => handleScroll(-1)}
              aria-label="Previous doctors"
              className="flex h-[35px] w-[36px] shrink-0 items-center justify-center border border-gray-200 text-gray-700 transition hover:bg-gray-100"
            >
              <FiChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => handleScroll(1)}
              aria-label="Next doctors"
              className="flex h-[35px] w-[36px] shrink-0 items-center justify-center border border-gray-200 text-gray-700 transition hover:bg-gray-100"
            >
              <FiChevronRight size={20} />
            </button>

            <a
              href="#all-doctors"
              className="flex h-[35px] shrink-0 items-center bg-[#EEEEEE] px-3 text-sm text-gray-700 transition hover:bg-gray-200"
            >
              كل الدكاترة
            </a>
          </div>

          {/* Doctors Cards */}
          <div
            ref={doctorsRef}
            className="flex gap-[22px] overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            dir="ltr"
          >
            {doctors.map((doctor) => (
              <article
                key={doctor.id}
                className="w-[188px] shrink-0 snap-start overflow-hidden bg-[#88A52C]"
                dir="rtl"
              >
                {/* Doctor Image */}
                <div className="h-[152px] w-full overflow-hidden bg-[#F3F3F3]">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
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
              </article>
            ))}
          </div>

        </div>

        
        <div
          className="relative flex h-[340px] w-full shrink-0 flex-col items-center justify-end overflow-hidden bg-cover bg-center px-4 pb-10 text-center sm:mx-auto sm:max-w-[260px] md:mx-0 md:h-[340px] md:w-[188px] md:max-w-none"
          style={{
            backgroundImage: "url('/banar.png')",
          }}
        >
          <div className="absolute inset-0 bg-[#85A91D]/70" />

          <div className="relative z-10 text-white" dir="rtl">
            <h2 className="mb-2 text-xl font-extrabold sm:text-[22px]">
              احجز موعد الآن
            </h2>

            <p className="text-xs leading-[1.8]">
              احجز جلستك من الموقع
              <br />
              ووفر الوقت على نفسك!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
