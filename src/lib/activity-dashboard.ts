export interface ActivityTotals {
  count: number;
  kilometers: number;
  seconds: number;
  steps: number;
}

export interface ActivitySummary {
  firstMonth: string;
  lastMonth: string;
  months: {
    month: string;
    types: (ActivityTotals & { type: string })[];
  }[];
}

export type ChartMetric = "kilometers" | "seconds" | "count";

export const metricLabels: Record<ChartMetric, string> = {
  kilometers: "Distance (km)",
  seconds: "Time (hours)",
  count: "Activities",
};

const emptyTotals = (): ActivityTotals => ({
  count: 0,
  kilometers: 0,
  seconds: 0,
  steps: 0,
});

function add(target: ActivityTotals, values: ActivityTotals) {
  target.count += values.count;
  target.kilometers += values.kilometers;
  target.seconds += values.seconds;
  target.steps += values.steps;
}

export function formatNumber(value: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatMonth(month: string, short = false) {
  return new Intl.DateTimeFormat("en-US", {
    month: short ? "short" : "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${month}-01T00:00:00Z`));
}

export function metricValue(values: ActivityTotals, metric: ChartMetric) {
  return metric === "seconds" ? values.seconds / 3600 : values[metric];
}

export function buildDashboard(
  data: ActivitySummary,
  year = "all",
  activityType = "all",
) {
  const totals = emptyTotals();
  const types = new Map<string, ActivityTotals>();
  const months = [];
  const years = new Map<string, ActivityTotals>();
  const [firstYear, firstMonth] = data.firstMonth.split("-").map(Number);
  const [lastYear, lastMonth] = data.lastMonth.split("-").map(Number);
  const source = new Map(
    data.months.map((month) => [month.month, month.types]),
  );

  for (
    let index = firstYear * 12 + firstMonth - 1;
    index <= lastYear * 12 + lastMonth - 1;
    index++
  ) {
    const month = `${Math.floor(index / 12)}-${String((index % 12) + 1).padStart(2, "0")}`;
    const monthTotals = emptyTotals();
    const entries = (source.get(month) ?? []).filter(
      (entry) => activityType === "all" || entry.type === activityType,
    );
    for (const entry of entries) add(monthTotals, entry);

    const calendarYear = month.slice(0, 4);
    const yearTotals = years.get(calendarYear) ?? emptyTotals();
    add(yearTotals, monthTotals);
    years.set(calendarYear, yearTotals);

    if (year !== "all" && calendarYear !== year) continue;
    add(totals, monthTotals);
    months.push({ month, ...monthTotals });
    for (const entry of entries) {
      const typeTotals = types.get(entry.type) ?? emptyTotals();
      add(typeTotals, entry);
      types.set(entry.type, typeTotals);
    }
  }

  const breakdown = [...types].map(([type, values]) => ({ type, ...values }));
  breakdown.sort((a, b) => b.count - a.count || a.type.localeCompare(b.type));
  const busiest = months.reduce<(typeof months)[number] | undefined>(
    (best, month) => (!best || month.count > best.count ? month : best),
    undefined,
  );
  const leading = breakdown[0];
  const narrative =
    totals.count && leading && busiest
      ? `${formatNumber(totals.count)} activities across ${months.length} months, covering ${formatNumber(totals.kilometers, 1)} km in ${formatNumber(totals.seconds / 3600, 1)} hours. ${leading.type} accounts for ${formatNumber((leading.count / totals.count) * 100, 1)}% of activities. ${formatMonth(busiest.month)} was the busiest month with ${formatNumber(busiest.count)} activities.`
      : "No activities match these filters. Choose a different year or activity type.";

  return {
    totals,
    months,
    breakdown,
    years: [...years].map(([year, values]) => ({ year, ...values })),
    narrative,
  };
}
