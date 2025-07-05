"use client";
import { useEffect, useState } from "react";

export default function Timer({ duration, onExpire }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time === 0) {
      onExpire();
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, onExpire]);

  return (
    <div className="py-2 font-mono text-lg font-bold text-blue-700">
      Time Left: {time}s
    </div>
  );
}