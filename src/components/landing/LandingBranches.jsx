import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const BRANCHES = [
  {
    city: "القاهرة",
    name: "فرع مدينة نصر",
    address: "شارع عباس العقاد، بجوار البنك الأهلي، برج الأطباء - الدور الثالث",
    hours: "يومياً من ٩ صباحاً إلى ١٠ مساءً",
    phone: "15662",
    whatsapp: "201026116087",
  },
  {
    city: "الجيزة",
    name: "فرع المهندسين",
    address: "شارع جامعة الدول العربية، أمام مسجد مصطفى محمود، الدور الثاني",
    hours: "يومياً من ٩ صباحاً إلى ١٠ مساءً",
    phone: "15662",
    whatsapp: "201026116087",
  },
  {
    city: "القاهرة الجديدة",
    name: "فرع التجمع الخامس",
    address: "شارع التسعين الشمالي، ميديكال بارك بريميير، عيادة 204",
    hours: "يومياً من ١٠ صباحاً إلى ١٠ مساءً",
    phone: "15662",
    whatsapp: "201026116087",
  },
  {
    city: "القاهرة",
    name: "فرع المعادي",
    address: "شارع النصر، دجلة المعادي، بجوار كارفور المعادي، برج الحياة",
    hours: "يومياً من ٩ صباحاً إلى ٩ مساءً",
    phone: "15662",
    whatsapp: "201026116087",
  },
  {
    city: "الجيزة",
    name: "فرع الشيخ زايد",
    address: "وصلة دهشور، مول كابيتال بيزنس بارك، مبنى B4",
    hours: "يومياً من ١٠ صباحاً إلى ١٠ مساءً",
    phone: "15662",
    whatsapp: "201026116087",
  },
  {
    city: "الإسكندرية",
    name: "فرع سموحة",
    address: "شارع فوزي معاذ، ميدان علي بن أبي طالب، برج الكيميائيين",
    hours: "يومياً من ٩ صباحاً إلى ٩ مساءً",
    phone: "15662",
    whatsapp: "201026116087",
  },
];

export default function LandingBranches() {
  return (
    <section id="branches" className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#88a531]/10 text-[#556e17] text-xs font-bold tracking-wide mb-3">
            فروعنا في مصر
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
            أقرب مما تتخيل.. فروعنا تغطي محافظات مصر
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            مجهزة بأحدث التقنيات الطبية لاستقبالكم طوال أيام الأسبوع وتوفير أعلى سبل الراحة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCHES.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#88a531] transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#88a531]/10 text-[#556e17]">
                    {b.city}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#88a531]">
                    <FiMapPin />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {b.name}
                </h3>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <FiMapPin className="text-[#88a531] shrink-0 mt-0.5 text-sm" />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-[#88a531] shrink-0 text-sm" />
                    <span>{b.hours}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={`tel:${b.phone}`}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-900 hover:text-[#88a531] transition"
                >
                  <FiPhone className="text-[#88a531]" />
                  <span>الخط الساخن {b.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${b.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition"
                  title="محادثة واتساب"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

