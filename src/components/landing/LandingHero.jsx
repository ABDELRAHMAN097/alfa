
export default function LandingHero() {
  return (
    <section
    id="home"
    className="relative flex min-h-[100svh] w-full items-center overflow-hidden">
      <img
        src="/alfa-hero.jpg"
        alt="Alfa Care"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_left,var(--alfa-green)_0%,var(--alfa-green)_22%,transparent_65%)]" />

      <div className="relative z-10 ml-auto flex min-h-[100svh] w-[48%] items-center justify-center px-5 sm:w-[45%] sm:px-8 lg:w-[42%]">
        <div className="text-center" dir="rtl">
          <h1 className="text-5xl font-extrabold text-black sm:text-6xl lg:text-8xl">
            ألفا كير
          </h1>

          <p className="mt-5 text-lg font-medium text-black sm:text-xl lg:text-2xl">
            أول سلسلة علاج طبيعي في مصر
          </p>
        </div>
      </div>
    </section>
  );
}
