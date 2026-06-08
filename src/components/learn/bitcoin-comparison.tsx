import { bitcoinComparison } from "@/lib/learn-content";

export function BitcoinComparison() {
  return (
    <div className="surface-panel overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-card-hover">
            <th className="px-4 py-3 text-left font-medium text-muted" />
            <th className="px-4 py-3 text-left font-medium text-foreground">
              Bitcoin
            </th>
            <th className="px-4 py-3 text-left font-medium text-accent-foreground">
              Qubitcoin
            </th>
          </tr>
        </thead>
        <tbody>
          {bitcoinComparison.map((row, i) => (
            <tr
              key={row.label}
              className={i % 2 === 0 ? "bg-transparent" : "bg-accent-subtle"}
            >
              <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
              <td className="px-4 py-3 text-muted">{row.bitcoin}</td>
              <td className="px-4 py-3 text-foreground">{row.qubitcoin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
