import assert from "node:assert/strict";
import test from "node:test";
import { buildDashboard, metricValue } from "../src/lib/activity-dashboard.ts";

const data = {
  firstMonth: "2025-12",
  lastMonth: "2026-02",
  months: [
    {
      month: "2025-12",
      types: [
        {
          type: "Running",
          count: 2,
          kilometers: 12,
          seconds: 3600,
          steps: 5000,
        },
      ],
    },
    {
      month: "2026-02",
      types: [
        {
          type: "Walking",
          count: 3,
          kilometers: 6,
          seconds: 7200,
          steps: 8000,
        },
        {
          type: "Running",
          count: 1,
          kilometers: 5,
          seconds: 1800,
          steps: 3000,
        },
      ],
    },
  ],
};

test("combines totals and includes zero months across year boundaries", () => {
  const model = buildDashboard(data);
  assert.deepEqual(model.totals, {
    count: 6,
    kilometers: 23,
    seconds: 12600,
    steps: 16000,
  });
  assert.equal(model.months[1].month, "2026-01");
  assert.equal(model.months[1].count, 0);
  assert.match(model.narrative, /February 2026 was the busiest month with 4/);
});

test("combines year and type filters but keeps yearly comparison across years", () => {
  const model = buildDashboard(data, "2026", "Running");
  assert.equal(model.totals.count, 1);
  assert.equal(model.months.length, 2);
  assert.equal(model.breakdown.length, 1);
  assert.deepEqual(
    model.years.map((year) => year.count),
    [2, 1],
  );
  assert.equal(metricValue(model.totals, "seconds"), 0.5);
});

test("empty combinations have zero totals and an explicit empty summary", () => {
  const model = buildDashboard(data, "2025", "Walking");
  assert.equal(model.totals.count, 0);
  assert.equal(model.breakdown.length, 0);
  assert.match(model.narrative, /No activities match/);
  assert.equal(buildDashboard(data, "2030").months.length, 0);
});
