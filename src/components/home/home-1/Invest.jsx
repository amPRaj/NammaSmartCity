// No imports needed for icons

const Invest = () => {
  return (
    <div className="pt-10 pb-16 px-6 md:px-12 lg:px-16 xl:px-24">
      <div className="grid grid-cols-1 overflow-hidden rounded-lg sm:grid-cols-2 md:grid-cols-3">
        <div className="md:col-span-1">
          <img
            src="/images/property (1).jpeg"
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="relative flex-col gap-5 p-8 md:col-span-2 bg-secondary text-slate-100 flex-center-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Dream Home with Smart Investment Options
            </h1>
            <p className="text-lg text-slate-200 max-w-2xl mx-auto">
              Discover premium properties in smart city locations with cutting-edge amenities and excellent investment potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invest;
