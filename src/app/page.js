import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white p-6">
      <main className="container mx-auto w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
          {"Task Management"}
        </h1>

        <section className="bg-white shadow-md rounded-2xl p-8 sm:p-12">
          <p className="text-slate-700 mb-6">
            Get started by visiting your tasks dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              href="/tasks"
              className="px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-lg transition"
            >
              View Tasks
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
