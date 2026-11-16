import { FiPhone, FiMail } from "react-icons/fi";

const events = [
  {
    title: "تعاقد مع شركة SEHAONE",
    date: "21 نوفمبر 2024",
  },
  {
    title: "تعاقد مع شركة RELIANCE HEALTH",
    date: "18 سبتمبر 2024",
  },
];

function FooterContact() {
  return (
    <div className="w-full" dir="rtl">
      <h3 className="mb-4 border-b border-[#9CA3AF] pb-2 text-right text-base font-medium text-[#333]">
        تواصل معنا
      </h3>

      <div className="flex flex-col gap-4">
        <a
          href="tel:15662"
          className="flex items-center gap-3 text-xs font-medium text-[#444] transition hover:text-[#85A52C]"
          dir="ltr"
        >
          <FiPhone className="h-4 w-4 text-[#85A52C]" />
          <span>15662</span>
        </a>

        <a
          href="mailto:alfa-care@info.com"
          className="flex items-center gap-3 text-xs font-medium text-[#444] transition hover:text-[#85A52C]"
          dir="ltr"
        >
          <FiMail className="h-4 w-4 text-[#85A52C]" />
          <span>alfa-care@info.com</span>
        </a>
      </div>
    </div>
  );
}

function FooterEvents() {
  return (
    <div className="w-full" dir="rtl">
      <h3 className="mb-3 border-b border-[#9CA3AF] pb-2 text-right text-base font-medium text-[#333]">
        آخر الفعاليات
      </h3>

      <div className="flex flex-col gap-3">
        {events.map((event, index) => (
          <div
            key={index}
            className="border-r-2 border-[#85A52C] pr-2 text-right"
          >
            <p className="text-[13px] leading-5 text-[#333]">
              {event.title}
            </p>

            <span className="block text-[9px] text-[#AAAAAA]">
              {event.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterMessage() {
  return (
    <div className="w-full" dir="rtl">
      <h3 className="mb-5 border-b border-[#9CA3AF] pb-2 text-right text-base font-medium text-[#333]">
        أرسل رسالة
      </h3>

      <form
        className="flex flex-col gap-3 sm:flex-row"
        dir="ltr"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Message */}
        <textarea
          name="message"
          placeholder="رسالتك"
          required
          className="h-[87px] w-full resize-none bg-white px-3 py-3 text-right text-xs text-gray-700 outline-none placeholder:text-[#BDBDBD] focus:ring-1 focus:ring-[#85A52C] sm:flex-1"
          dir="rtl"
        />

        {/* Email and Submit */}
        <div className="flex w-full flex-col gap-4 sm:w-[173px] sm:shrink-0">
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            required
            className="h-[35px] w-full bg-white px-3 text-right text-xs text-gray-700 outline-none placeholder:text-[#BDBDBD] focus:ring-1 focus:ring-[#85A52C]"
            dir="rtl"
          />

          <button
            type="submit"
            className="h-[35px] w-full bg-[#88A52C] text-sm font-medium text-white transition hover:bg-[#769226]"
          >
            إرسال
          </button>
        </div>
      </form>
    </div>
  );
}

export default function LandingFooterInfo() {
  return (
    <footer className="w-full bg-[#EEEEEE] px-5 py-10 sm:px-8 sm:py-12">
      <div
        id="contact"
        className="mx-auto grid w-full max-w-[1030px] grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[188px_188px_minmax(0,400px)] lg:items-start lg:justify-between lg:gap-0"
      >
        {/* Left */}
        <FooterContact />

        {/* Center */}
        <FooterEvents />

        {/* Right */}
        <FooterMessage />
      </div>

     
    </footer>
  );
}
