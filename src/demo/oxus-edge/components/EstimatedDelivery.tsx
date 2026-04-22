
import { useState, useEffect } from "react";

export default function EstimatedDelivery({ className }: { className?: string }) {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const delivery = new Date(Date.now() + 5 * 86400000);
    setDate(delivery.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
  }, []);

  if (!date) return null;

  return (
    <span className={className}>
      Order today, arrives by <strong className="text-text-primary">{date}</strong>
    </span>
  );
}
