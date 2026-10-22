export const UNIT_TYPES = {
  CURRENCY: "currency",
  PERCENT: "percent",
  RATIO: "ratio",
};

export const PAGE_KEYS = {
  OVERVIEW: "overview",
  COMPARISON: "comparison",
  TIMELINE: "timeline",
};

export const PAGE_GROUPS = {
  ALL: [PAGE_KEYS.OVERVIEW, PAGE_KEYS.COMPARISON, PAGE_KEYS.TIMELINE],
  OVERVIEW_ONLY: [PAGE_KEYS.OVERVIEW],
  ANALYSIS: [PAGE_KEYS.COMPARISON, PAGE_KEYS.TIMELINE],
};

export const REPORT_KEYS = {
  BALANCE_SHEET: "balanceSheet",
  INCOME_STATEMENT: "incomeStatement",
  FINANCIAL_RATIOS: "financialRatios",
  DEBT_REPAYMENT: "debtRepayment",
};

// IDs and API names retain the USDA report identifiers supported by this project.
export const FARM_BUSINESS_REPORTS = [
  { key: REPORT_KEYS.BALANCE_SHEET, id: 1, label: "Balance Sheet", apiName: "farm business balance sheet" },
  { key: REPORT_KEYS.INCOME_STATEMENT, id: 2, label: "Income Statement", apiName: "income statement" },
  { key: REPORT_KEYS.FINANCIAL_RATIOS, id: 3, label: "Financial Ratios", apiName: "farm business financial ratios" },
  { key: REPORT_KEYS.DEBT_REPAYMENT, id: 5, label: "Debt Repayment", apiName: "farm business debt repayment capacity" },
];

// overviewRole describes presentation, not a USDA variable or report total.
export const FARM_BUSINESS_METRICS = [
  {
    id: "igcfi",
    label: "Gross Cash Farm Income",
    reportKey: REPORT_KEYS.INCOME_STATEMENT,
    unitType: UNIT_TYPES.CURRENCY,
    unitLabel: "Dollars per farm",
    pages: PAGE_GROUPS.ALL,
    overviewRole: "both",
    overviewLabel: "Revenue",
  },
  {
    id: "etot",
    label: "Total Cash Expenses",
    reportKey: REPORT_KEYS.INCOME_STATEMENT,
    unitType: UNIT_TYPES.CURRENCY,
    unitLabel: "Dollars per farm",
    pages: PAGE_GROUPS.ALL,
    overviewRole: "both",
    overviewLabel: "Expenses",
  },
  {
    id: "incfi",
    label: "Net Cash Farm Income",
    reportKey: REPORT_KEYS.INCOME_STATEMENT,
    unitType: UNIT_TYPES.CURRENCY,
    unitLabel: "Dollars per farm",
    pages: PAGE_GROUPS.ALL,
    overviewRole: "breakdown",
  },
  {
    id: "infi",
    label: "Net Farm Income",
    reportKey: REPORT_KEYS.INCOME_STATEMENT,
    unitType: UNIT_TYPES.CURRENCY,
    unitLabel: "Dollars per farm",
    pages: PAGE_GROUPS.ALL,
    overviewRole: "both",
    overviewLabel: "Net income",
  },
  {
    id: "atot",
    label: "Farm Assets",
    reportKey: REPORT_KEYS.BALANCE_SHEET,
    unitType: UNIT_TYPES.CURRENCY,
    unitLabel: "Dollars per farm",
    pages: PAGE_GROUPS.ALL,
    overviewRole: "both",
    overviewLabel: "Assets",
  },
  {
    id: "actot",
    label: "Current Assets",
    reportKey: REPORT_KEYS.BALANCE_SHEET,
    unitType: UNIT_TYPES.CURRENCY,
    unitLabel: "Dollars per farm",
    pages: PAGE_GROUPS.ALL,
    overviewRole: "breakdown",
  },
  {
    id: "dtot",
    label: "Farm Liabilities",
    reportKey: REPORT_KEYS.BALANCE_SHEET,
    unitType: UNIT_TYPES.CURRENCY,
    unitLabel: "Dollars per farm",
    pages: PAGE_GROUPS.ALL,
    overviewRole: "breakdown",
    overviewLabel: "Liabilities",
  },
  {
    id: "netw",
    label: "Farm Equity",
    reportKey: REPORT_KEYS.BALANCE_SHEET,
    unitType: UNIT_TYPES.CURRENCY,
    unitLabel: "Dollars per farm",
    pages: PAGE_GROUPS.ALL,
    overviewRole: "breakdown",
    overviewLabel: "Equity",
  },
  {
    id: "frcrnum",
    label: "Current Ratio",
    reportKey: REPORT_KEYS.FINANCIAL_RATIOS,
    unitType: UNIT_TYPES.RATIO,
    unitLabel: "Ratio",
    pages: PAGE_GROUPS.ALL,
    overviewRole: "breakdown",
  },
  {
    id: "frwcnum",
    label: "Working Capital-to-Expense Ratio",
    reportKey: REPORT_KEYS.FINANCIAL_RATIOS,
    unitType: UNIT_TYPES.PERCENT,
    unitLabel: "Percent",
    pages: PAGE_GROUPS.ALL,
    overviewRole: "breakdown",
  },
  {
    id: "frdanum",
    label: "Debt-to-Asset Ratio",
    reportKey: REPORT_KEYS.FINANCIAL_RATIOS,
    unitType: UNIT_TYPES.PERCENT,
    unitLabel: "Percent",
    pages: PAGE_GROUPS.ALL,
    overviewRole: "breakdown",
  },
];

export const MIN_COMPARISON_OBJECTS = 2;
export const DEFAULT_COMPARISON_OBJECT_COUNT = 5;

export const COMPARISON_GROUPS = [
  {
    id: "spec",
    label: "Production Specialty",
    apiCategory: "Production Specialty",
    requiresObjectSelection: true,
  },
  {
    id: "ftyppll",
    label: "Collapsed Farm Typology",
    apiCategory: "Collapsed Farm Typology",
    requiresObjectSelection: true,
  },
  {
    id: "n5reg",
    label: "NASS Region",
    apiCategory: "NASS Region",
    requiresObjectSelection: true,
  },
];

// Derive filter metadata from the configured measure and comparison group.
const defaultMetric = FARM_BUSINESS_METRICS.find((metric) => metric.id === "igcfi");
const defaultGroup = COMPARISON_GROUPS.find((group) => group.id === "spec");
const defaultMetricFilters = {
  reportKey: defaultMetric.reportKey,
  variable: defaultMetric.id,
  metricLabel: defaultMetric.label,
  unitType: defaultMetric.unitType,
};

export const DEFAULT_COMPARISON_FILTERS = {
  year: 2024,
  state: "all",
  ...defaultMetricFilters,
  comparisonGroupId: defaultGroup.id,
  category: defaultGroup.apiCategory,
  selectedObjects: [],
};

export const DEFAULT_TIMELINE_FILTERS = {
  startYear: 2015,
  endYear: 2024,
  state: "all",
  ...defaultMetricFilters,
};
