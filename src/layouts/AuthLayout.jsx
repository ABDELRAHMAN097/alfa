import { Outlet, Link, useParams } from "react-router-dom";
import AlfaLogo from "@/components/common/AlfaLogo";
import { FiPhoneCall, FiCheckCircle } from "react-icons/fi";
import heroImg from "@/assets/alfa-hero.jpg";

export default function AuthLayout() {
  const { locale = "ar" } = useParams();

  return (
    <div
      className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-between"
      dir="rtl"
    >
      {/* Header */}
      <header className="shrink-0 px-6 py-4 md:px-12 flex items-center justify-between z-20 border-b border-gray-800 bg-gray-900/90 backdrop-blur-md">
        <Link to={`/${locale}`}>
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/15 transition">
            <AlfaLogo />
          </div>
        </Link>

        <a
          href="tel:15662"
          className="flex items-center gap-2 bg-[#88a531]/10 hover:bg-[#88a531]/20 border border-[#88a531]/30 text-xs px-4 py-2 rounded-xl transition text-[#c2d547] font-bold"
        >
          <FiPhoneCall className="text-[#88a531] animate-pulse" />
          <span>الخط الساخن: 15662</span>
        </a>
      </header>

      {/* Main Body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-gray-950 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Left / Form column */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center relative bg-gray-900">
            <Outlet />
          </div>

          {/* Right / Visual banner column */}
          <div className="hidden lg:flex lg:col-span-6 relative overflow-hidden flex-col justify-between p-10 border-r border-gray-800 bg-[#141b08]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
              style={{ backgroundImage: `url(${heroImg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-[#141b08]/80 to-transparent pointer-events-none" />

            <div className="relative z-10 self-start">
              <span className="inline-flex items-center gap-2 bg-[#88a531]/20 backdrop-blur-md border border-[#88a531]/40 text-[#c2d547] px-4 py-1.5 rounded-full text-xs font-bold">
                <span>✦</span>
                أول سلسلة علاج طبيعي وتأهيل في مصر
              </span>
            </div>

            <div className="relative z-10 mt-auto space-y-4">
              <blockquote className="text-xl font-bold text-white leading-relaxed">
                "رعايتكم مسؤوليتنا.. نساعدك على استعادة حركتك وحياتك الطبيعية بدون ألم."
              </blockquote>

              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#88a531]" />
                  <span>متابعة إلكترونية لملفك الطبي ومواعيد الجلسات</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#88a531]" />
                  <span>تواصل مباشر مع استشاريي المركز</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="shrink-0 px-6 py-3 text-center text-xs text-gray-500 border-t border-gray-800 bg-gray-950">
        &copy; {new Date().getFullYear()} ألفا كير (Alfa Care) - جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
