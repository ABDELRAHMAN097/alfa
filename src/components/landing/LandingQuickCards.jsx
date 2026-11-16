import { FiPhone } from "react-icons/fi";
function BookingCard() {
    return (
        <div className="min-h-[195px] border border-gray-100 bg-white px-5 py-3 shadow-sm">
            <h2 className="mb-5 text-center text-2xl font-extrabold text-black">
                احجز موعداً
            </h2>

            <form
                id="booking"
                className="grid grid-cols-2 gap-3"
                dir="rtl"
            >
                <input
                    type="tel"
                    placeholder="رقم التليفون"
                    className="h-9 min-w-0 border border-gray-200 px-3 text-right text-sm outline-none focus:border-[var(--alfa-green)]"
                />

                <select
                    defaultValue=""
                    className="h-9 min-w-0 border border-gray-200 bg-white px-3 text-right text-sm text-gray-500 outline-none focus:border-[var(--alfa-green)]"
                >
                    <option value="" disabled>المنطقة</option>
                    <option value="cairo">القاهرة</option>
                    <option value="giza">الجيزة</option>
                    <option value="other">أخرى</option>
                </select>

                <input
                    type="email"
                    placeholder="الإيميل الإلكتروني"
                    className="h-9 min-w-0 border border-gray-200 px-3 text-right text-sm outline-none focus:border-[var(--alfa-green)]"
                />

                <button
                    type="submit"
                    className="h-9 bg-[var(--alfa-green)] px-2 text-sm font-bold text-white transition hover:bg-[var(--alfa-green-hover)]"
                >
                    حجز موعد متاح
                </button>
            </form>
        </div>
    );
}

function BranchesCard() {
  return (
    <div className="min-h-[195px] border border-gray-100 bg-white px-5 py-3 shadow-sm">
      <h2 className="mb-5 text-center text-2xl font-extrabold text-black">
        فروعنا
      </h2>

      <a
        href="#branches"
        className="relative mt-2 flex min-h-32 items-center justify-center overflow-hidden rounded-[25px] bg-gradient-to-br from-green-100 via-gray-100 to-lime-100 px-4 text-center transition hover:brightness-95"
      >
        <span className="absolute -left-4 top-0 h-16 w-16 rounded-full bg-green-300/70 blur-md" />

        <span className="absolute right-10 top-2 h-14 w-14 rounded-full bg-lime-300/70 blur-md" />

        <span className="absolute bottom-0 left-1/3 h-16 w-16 rounded-full bg-blue-200/70 blur-md" />

        <span className="absolute bottom-0 right-8 h-16 w-16 rounded-full bg-green-300/70 blur-md" />

        <span className="relative z-10 text-base font-extrabold text-gray-950">
          اضغط هنا لمعرفة الفروع
        </span>
      </a>
    </div>
  );
}

function ContactCard() {
    return (
        <div className="min-h-[195px] border border-gray-100 bg-white px-5 py-3 shadow-sm">
            <h2 className="mb-2 text-center text-2xl font-extrabold text-black">
                اتصل بنا
            </h2>

            <div className="flex flex-col items-center text-center">
                <a
                    href="tel:15662"
                    dir="ltr"
                    className="flex items-center gap-2 rounded-2xl bg-gray-900 px-3 py-1.5 text-2xl font-extrabold text-white transition hover:bg-gray-800"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                        <FiPhone className="text-xl text-white" />
                    </span>
                    15662
                </a>

                <div className="my-3 h-px w-4/5 bg-gray-200" />

                <p className="text-sm leading-7 text-gray-700">
                    تقدر تكلمنا على الخط الساخن طوال أيام الأسبوع
                    <br />
                    من 10 صباحاً حتى 10 مساءً
                </p>
            </div>
        </div>
    );
}

export default function LandingQuickCards() {
    return (
        <section
            className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-5 md:grid-cols-3 md:gap-6 lg:gap-8"
            dir="rtl"
        >
            <BookingCard />
            <BranchesCard />
            <ContactCard />
        </section>
    );
}
