export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181111] px-4 py-12">
      <div className="w-full max-w-2xl bg-[#231313] rounded-2xl shadow-xl p-8 animate-pulse">
        <div className="h-10 w-2/3 bg-orange-900 rounded mb-6 mx-auto" />
        <div className="h-4 w-full bg-orange-900 rounded mb-3" />
        <div className="h-4 w-5/6 bg-orange-900 rounded mb-3" />
        <div className="h-4 w-4/6 bg-orange-900 rounded mb-3" />
        <div className="h-4 w-3/4 bg-orange-900 rounded mb-3" />
        <div className="h-4 w-1/2 bg-orange-900 rounded mb-3" />
      </div>
    </div>
  );
}