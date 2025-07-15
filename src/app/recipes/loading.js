export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181111] px-4 py-12">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg shadow-md flex flex-col items-center p-6 bg-[#231313] border border-[#2d1616] animate-pulse"
          >
            <div className="w-20 h-20 rounded-full bg-orange-900 mb-4" />
            <div className="h-6 w-2/3 bg-orange-900 rounded mb-2" />
            <div className="h-4 w-3/4 bg-orange-900 rounded mb-2" />
            <div className="h-8 w-1/2 bg-orange-900 rounded mb-4" />
            <div className="h-8 w-24 bg-orange-700 rounded-full mt-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}