# Activity journal

The static `/activities` page publishes monthly activity totals, with year and
activity filters, a switchable monthly chart, activity mix, yearly distance,
summary text, and a monthly data table. It also works without JavaScript (all-time
view). It uses the portfolio's theme and navigation.

## Data and privacy

`src/data/activity-summary.json` is the only published dataset. It contains counts,
kilometers, recorded seconds, and recorded steps grouped by month and activity
type. It does not contain individual activities, locations, titles, exact dates,
heart rates, or other health readings. Never place the source CSV in the repository
or `public/`.

The supplied export uses kilometers for walking/running and meters for pool
swimming. The generator converts swimming to kilometers before summing. It
excludes non-exercise "Assistance Requested" events and counts missing distances.
Missing metric values contribute nothing to their totals; activities still count.
Steps are activity steps, not all-day totals. Duration is the `Time` field, not
`Moving Time` or `Elapsed Time`.

## Refreshing the snapshot

With Python 3.9+ and a metric-unit export stored outside the repository:

```sh
python3 scripts/aggregate-activities.py /absolute/path/to/Activities.csv src/data/activity-summary.json
```

Review the resulting aggregates before publishing. The displayed coverage is
derived from the earliest and latest included month; first and last years may be
partial. Empty months inside this range appear as zero. Yearly distance always
compares all years for the selected activity, independent of the year filter.
Summary percentages are by activity count, not time or distance.

Focused checks (Node 22.18+ supports the TypeScript test import):

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s scripts -p 'test_*.py'
node --test scripts/activity-dashboard.test.mjs
pnpm exec astro check
```
