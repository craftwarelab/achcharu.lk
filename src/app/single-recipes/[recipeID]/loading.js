export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181111] px-4 py-12">
      <div className="w-full max-w-2xl bg-[#231313] rounded-2xl shadow-xl p-8 animate-pulse">
        <div className="w-32 h-32 bg-[#181111] rounded-full mx-auto mb-6" />
        <div className="h-8 bg-orange-900 rounded w-2/3 mx-auto mb-4" />
        <div className="h-4 bg-orange-900 rounded w-1/2 mx-auto mb-6" />
        <div className="space-y-3 mb-8">
          <div className="h-4 bg-orange-900 rounded w-full" />
          <div className="h-4 bg-orange-900 rounded w-5/6" />
          <div className="h-4 bg-orange-900 rounded w-3/4" />
        </div>
        <div className="flex gap-4 justify-center">
          <div className="h-10 w-32 bg-orange-700 rounded-full" />
          <div className="h-10 w-32 bg-orange-900 rounded-full" />
        </div>
      </div>
    </div>
  );
}
