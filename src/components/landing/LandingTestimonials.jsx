
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    image: "/Client-1.png",
    name: "ميزة السعيد",
    text: "فريق محترف جداً ويهتم بأدق التفاصيل، بعد فترة كبيرة في مرونة عضلاتي وتحسن وضعيتي.",
  },
  {
    id: 2,
    image: "/Client-2.png",
    name: "أ. أحمد مصطفى",
    text: "كنت أعاني من آلام شديدة في الظهر بسبب الجلوس الطويل على المكتب، وبعد عدة جلسات علاج طبيعي، شعرت بتحسن كبير في الحركة وانخفاض الألم بشكل ملحوظ. شكراً للفريق الرائع!",
  },
  {
    id: 3,
    image: "/Client-3.png",
    name: "أ. سارة فاروق",
    text: "تعرضت لإصابة في الركبة أثناء ممارسة الرياضة، لكن بفضل الجلسات المنتظمة والمتابعة المستمرة بدأت أتحسن بشكل ملحوظ.",
  },
];

export default function LandingTestimonials() {
  const [activeIndex, setActiveIndex] = useState(1);

  const getOffset = (index) => {
    let offset = index - activeIndex;

    if (offset > 1) offset -= testimonials.length;
    if (offset < -1) offset += testimonials.length;

    return offset;
  };

  return (
    <section className="w-full overflow-hidden bg-[#F5F5F5] py-14 sm:py-16 lg:py-[65px]">
      <div className="mx-auto w-full max-w-[1200px] px-4">

        {/* Section Title */}
        <h2 className="mb-8 text-center text-3xl font-extrabold text-black sm:mb-9 sm:text-[34px]">
          تقييمات العملاء
        </h2>

        {/* Testimonials Carousel */}
        <div className="relative mx-auto h-[300px] w-full max-w-[1100px]">

          {testimonials.map((item, index) => {
            const offset = getOffset(index);
            const isActive = offset === 0;

            return (
              <div
                key={item.id}
                className="absolute left-1/2 top-1/2 transition-all duration-500 ease-in-out"
                style={{
                  width: isActive
                    ? "min(492px, calc(100vw - 40px))"
                    : "min(270px, calc(100vw - 40px))",

                  transform: `translate(calc(-50% + ${offset * 285}px), -50%) scale(${isActive ? 1 : 0.94})`,

                  zIndex: isActive ? 10 : 2,

                  opacity: isActive ? 1 : 0.65,

                  visibility:
                    Math.abs(offset) > 1 ? "hidden" : "visible",

                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {/* Outer Card */}
                <div
                  className={`bg-white p-[14px] transition-all duration-500 ${
                    isActive
                      ? "shadow-[0_0_0_0px_#fff]"
                      : "shadow-none"
                  }`}
                >
                  {/* Inner Card */}
                  <div
                    className={`flex min-h-[241px] flex-col items-center justify-center border border-[#EEEEEE] px-4 py-5 text-center sm:px-6 ${
                      isActive ? "bg-white" : "bg-[#FAFAFA]"
                    }`}
                    dir="rtl"
                  >
                    {/* Client Image */}
                    <div className="mb-3 h-[64px] w-[64px] shrink-0 overflow-hidden rounded-full bg-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Review */}
                    <p className="mb-2 text-[14px] leading-[1.9] text-[#B5B5B5]">
                      {item.text}
                    </p>

                    {/* Client Name */}
                    <h3 className="mt-1 text-base font-extrabold text-black">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`التقييم ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-[7px] w-[7px] rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "h-[9px] w-[9px] border-2 border-[#85A91D] bg-white"
                  : "bg-[#A5A5A5]"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
