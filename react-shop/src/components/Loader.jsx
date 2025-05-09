const Loader = () => {
  return (
    <div className="relative flex flex-col">
      <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center transition-opacity">
        <p className="text-green-600 text-2xl font-semibold">Ładowanie....</p>
      </div>
    </div>
  );
};
export default Loader;
