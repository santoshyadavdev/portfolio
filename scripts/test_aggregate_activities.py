import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location(
    "aggregate_activities", Path(__file__).with_name("aggregate-activities.py")
)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class AggregateTests(unittest.TestCase):
    def row(self, **overrides):
        return {
            "Activity Type": "Walking",
            "Date": "2026-01-03 08:00:00",
            "Distance": "1.25",
            "Time": "01:02:03.5",
            "Steps": "1,234",
            "Title": "Private location",
            "Avg HR": "120",
            **overrides,
        }

    def test_sums_monthly_totals_and_removes_private_fields(self):
        result = module.aggregate([self.row(), self.row()])
        self.assertEqual(
            result["months"],
            [{
                "month": "2026-01",
                "types": [{
                    "type": "Walking", "count": 2, "kilometers": 2.5,
                    "seconds": 7447.0, "steps": 2468,
                }],
            }],
        )
        self.assertNotIn("Private location", str(result))
        self.assertNotIn("Avg HR", str(result))
        self.assertNotIn("08:00", str(result))

    def test_normalizes_pool_meters_and_handles_missing_values(self):
        result = module.aggregate([
            self.row(**{"Activity Type": "Pool Swim", "Distance": "1,900", "Steps": "--"}),
            self.row(**{"Activity Type": "Meditation", "Distance": "--", "Steps": "--"}),
            self.row(**{"Activity Type": "Assistance Requested"}),
        ])
        self.assertEqual(result["excludedEvents"], 1)
        self.assertEqual(result["missingDistance"], 1)
        values = {row["type"]: row for row in result["months"][0]["types"]}
        self.assertEqual(values["Pool Swim"]["kilometers"], 1.9)
        self.assertEqual(values["Meditation"]["kilometers"], 0)
        self.assertEqual(values["Meditation"]["steps"], 0)


if __name__ == "__main__":
    unittest.main()
