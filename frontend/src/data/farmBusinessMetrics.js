export const FARM_BUSINESS_REPORTS = [
  {
    id: 2,
    label: "Income Statement",
    apiName: "income statement",
  },
  {
    id: 1,
    label: "Balance Sheet",
    apiName: "farm business balance sheet",
  },
  {
    id: 3,
    label: "Financial Ratios",
    apiName: "farm business financial ratios",
  },
  {
    id: 5,
    label: "Debt Repayment",
    apiName: "farm business debt repayment capacity",
  },
];

export const FARM_BUSINESS_METRICS = [
  {
    id: "igcfi",
    label: "Gross Cash Farm Income",
    reportId: 2,
    unit: "Dollars per farm",
  },
  {
    id: "etot",
    label: "Total Cash Expenses",
    reportId: 2,
    unit: "Dollars per farm",
  },
  {
    id: "incfi",
    label: "Net Cash Farm Income",
    reportId: 2,
    unit: "Dollars per farm",
  },
  {
    id: "infi",
    label: "Net Farm Income",
    reportId: 2,
    unit: "Dollars per farm",
  },
  {
    id: "atot",
    label: "Farm Assets",
    reportId: 1,
    unit: "Dollars per farm",
  },
  {
    id: "actot",
    label: "Current Assets",
    reportId: 1,
    unit: "Dollars per farm",
  },
];

export const OVERVIEW_METRICS = ["igcfi", "etot", "infi", "atot"];

export const COMPARISON_METRICS = FARM_BUSINESS_METRICS;

export const TIMELINE_METRICS = FARM_BUSINESS_METRICS;
