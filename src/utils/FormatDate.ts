export function formatJoinDate(dateInput: string | Date): string {
  const date = new Date(dateInput);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}
