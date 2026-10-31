import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f8faf5] text-slate-800 text-center">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-3xl font-black text-slate-900">Page Not Found</h2>
      <p className="text-sm text-slate-500 mt-2 max-w-sm">
        The grocery page or aisle you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-colors"
      >
        Return to National Shopping Mall
      </Link>
    </div>
  );
}

