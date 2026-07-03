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
  // -------------------------
  // Income Statement
  // -------------------------

  {
    id: "igcfi",
    label: "Gross Cash Farm Income",
    reportId: 2,
    report: "Income Statement",
    unitType: "currency",
  },
  {
    id: "etot",
    label: "Total Cash Expenses",
    reportId: 2,
    report: "Income Statement",
    unitType: "currency",
  },
  {
    id: "incfi",
    label: "Net Cash Farm Income",
    reportId: 2,
    report: "Income Statement",
    unitType: "currency",
  },
  {
    id: "infi",
    label: "Net Farm Income",
    reportId: 2,
    report: "Income Statement",
    unitType: "currency",
  },

  // -------------------------
  // Balance Sheet
  // -------------------------

  {
    id: "atot",
    label: "Farm Assets",
    reportId: 1,
    report: "Balance Sheet",
    unitType: "currency",
  },
  {
    id: "actot",
    label: "Current Assets",
    reportId: 1,
    report: "Balance Sheet",
    unitType: "currency",
  },
  {
    id: "dtot",
    label: "Farm Liabilities",
    reportId: 1,
    report: "Balance Sheet",
    unitType: "currency",
  },
  {
    id: "netw",
    label: "Farm Equity",
    reportId: 1,
    report: "Balance Sheet",
    unitType: "currency",
  },

  // -------------------------
  // Financial Ratios
  // -------------------------

  {
    id: "frcrnum",
    label: "Current Ratio",
    reportId: 3,
    report: "Financial Ratios",
    unitType: "ratio",
  },
  {
    id: "frwcnum",
    label: "Working Capital-to-Expense Ratio",
    reportId: 3,
    report: "Financial Ratios",
    unitType: "percent",
  },
  {
    id: "frdanum",
    label: "Debt-to-Asset Ratio",
    reportId: 3,
    report: "Financial Ratios",
    unitType: "percent",
  },
];

export const OVERVIEW_METRICS = [
  "igcfi",
  "etot",
  "infi",
  "atot",
  "dtot",
  "netw",
  "frdanum",
  "frwcnum",
  "frcrnum",
];

export const COMPARISON_METRICS = FARM_BUSINESS_METRICS;

export const TIMELINE_METRICS = FARM_BUSINESS_METRICS;