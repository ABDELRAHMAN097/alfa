import { useRouteError, Link } from "react-router-dom";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";

export default function RouteErrorBoundary() {
  const error = useRouteError();
  const errorMessage = error?.statusText || error?.message || "حدث خطأ غير متوقع في الصفحة";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b0f14] px-4 py-12">
      <div className="max-w-md w-full text-center bg-white dark:bg-[#161e29] p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 dark:text-amber-400">
          <FiAlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          عذراً، حدث خطأ غير متوقع
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          نعتذر عن هذا الخطأ. يمكنك إعادة المحاولة أو العودة إلى الصفحة الرئيسية.
        </p>

        {process.env.NODE_ENV !== "production" && error?.message && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-start text-xs font-mono text-red-600 dark:text-red-400 overflow-x-auto border border-red-200 dark:border-red-900/50">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <FiRefreshCw className="w-4 h-4" />
            إعادة التحميل
          </button>
          <Link
            to="/ar"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#88a531] text-white font-semibold shadow-md shadow-[#88a531]/20 hover:bg-[#738f25] transition"
          >
            <FiHome className="w-4 h-4" />
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
