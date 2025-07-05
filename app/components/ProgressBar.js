export default function ProgressBar({ value, max }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        style={{ width: `${(value / max) * 100}%` }}
        className="bg-blue-600 h-4 rounded-full transition-all"
      ></div>
    </div>
  );
}