"""Create public monthly totals without retaining individual activity records."""

import argparse
import csv
import json
from collections import defaultdict
from decimal import Decimal
from pathlib import Path


def number(value):
    if value in ("", "--"):
        return Decimal(0)
    return Decimal(value.replace(",", "").removeprefix("'"))


def aggregate(rows):
    months = defaultdict(dict)
    excluded = 0
    missing_distance = 0
    for row in rows:
        if row["Activity Type"] == "Assistance Requested":
            excluded += 1
            continue
        month = row["Date"][:7]
        activity_type = row["Activity Type"]
        values = months[month].setdefault(
            activity_type,
            {"count": 0, "kilometers": Decimal(0), "seconds": Decimal(0), "steps": 0},
        )
        distance = number(row["Distance"])
        if row["Distance"] in ("", "--"):
            missing_distance += 1
        if activity_type == "Pool Swim":
            distance /= 1000
        hours, minutes, seconds = row["Time"].split(":")
        values["count"] += 1
        values["kilometers"] += distance
        values["seconds"] += int(hours) * 3600 + int(minutes) * 60 + number(seconds)
        values["steps"] += int(number(row["Steps"]))

    return {
        "firstMonth": min(months),
        "lastMonth": max(months),
        "excludedEvents": excluded,
        "missingDistance": missing_distance,
        "months": [
            {
                "month": month,
                "types": [
                    {
                        "type": activity_type,
                        **{
                            key: float(value) if isinstance(value, Decimal) else value
                            for key, value in values.items()
                        },
                    }
                    for activity_type, values in sorted(types.items())
                ],
            }
            for month, types in sorted(months.items())
        ],
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("csv", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    with args.csv.open(newline="", encoding="utf-8-sig") as source:
        result = aggregate(csv.DictReader(source))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
