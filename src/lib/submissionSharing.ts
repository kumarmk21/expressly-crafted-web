export type SubmissionColumn = { key: string; label: string };

export const formatSubmissionValue = (value: unknown) =>
  value === true ? "Yes" : value === false ? "No" : value == null ? "" : String(value);

export function submissionDetails(label: string, columns: SubmissionColumn[], row: Record<string, unknown>) {
  const details = columns.map(column => {
    const value = formatSubmissionValue(row[column.key]);
    return value ? `${column.label}: ${value}` : null;
  }).filter(Boolean);
  return [
    `Scorpion Express — ${label}`,
    row.created_at ? `Received: ${new Date(String(row.created_at)).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}` : null,
    ...details,
  ].filter(Boolean).join("\n");
}

export function submissionShareLinks(label: string, text: string) {
  return {
    email: `mailto:?subject=${encodeURIComponent(`Scorpion Express — ${label}`)}&body=${encodeURIComponent(text)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
  };
}