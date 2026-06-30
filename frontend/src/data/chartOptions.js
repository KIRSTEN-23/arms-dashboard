export const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      enabled: true,
    },
  },
};

export const comparisonChartOptions = {
  ...baseChartOptions,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const timelineChartOptions = {
  ...baseChartOptions,
  scales: {
    y: {
      beginAtZero: false,
    },
  },
};