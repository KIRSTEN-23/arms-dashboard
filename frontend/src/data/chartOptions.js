export const chartPalette = {
  primary: "#31572C",      // Brand forest
  secondary: "#90A955",    // Brand sage
  tertiary: "#4F772D",     // Brand olive
  accent: "#7D9A78",       // Forest tint; excludes the yellow-green UI accent
  neutral: "#D7DDD5",
};

// Chart-area coordinates keep gradients aligned when the canvas resizes.
export function chartGradient(context, topColour, bottomColour) {
  const { ctx, chartArea } = context.chart;
  if (!chartArea) return topColour;
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, topColour);
  gradient.addColorStop(1, bottomColour);
  return gradient;
}

// Mixed brand greens, with an additional lighter olive shade.
// The yellow-green UI accent is excluded.
export const greenSegmentColours = [
  ["#42683D", "#31572C"],
  ["#9CB563", "#90A955"],
  ["#60883E", "#4F772D"],
  ["#A4B99F", "#96AE90"],
  ["#BBCB99", "#ADBF89"],
  ["#7D9A78", "#6F8C6A"],
];

const axisStyle = {
  border: { display: false },
  ticks: { color: "#667064", padding: 8, font: { size: 11 } },
  grid: { color: "rgba(15, 45, 23, 0.06)", drawTicks: false },
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const baseChartOptions = {
  font: { family: "Dosis, Rubik, sans-serif" },
  responsive: true,
  maintainAspectRatio: false,
  // Render crisp canvases on standard and high-density displays.
  devicePixelRatio: Math.max(2, window.devicePixelRatio || 1),
  animation: reducedMotion ? false : {
    duration: 800,
    easing: "easeOutQuart",
  },
  // Keep canvas gradients intact while Chart.js animates the geometry.
  animations: { colors: false },
  transitions: {
    active: { animation: { duration: reducedMotion ? 0 : 180 } },
    resize: { animation: { duration: 0 } },
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#667064",
        usePointStyle: false,
        boxWidth: 18,
        boxHeight: 10,
        padding: 16,
        font: { size: 11 },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#0F2D17",
      titleColor: "#FFFFFF",
      bodyColor: "#FFFFFF",
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
    },
  },
};

export const comparisonChartOptions = {
  ...baseChartOptions,
  indexAxis: "y",
  plugins: {
    ...baseChartOptions.plugins,
    legend: { display: false },
  },
  scales: {
    x: { ...axisStyle, beginAtZero: true, stacked: false },
    y: { ...axisStyle, stacked: false, grid: { display: false } },
  },
};

export const timelineChartOptions = {
  ...baseChartOptions,
  scales: {
    x: { ...axisStyle, grid: { display: false } },
    y: {
      ...axisStyle,
      beginAtZero: false,
    },
  },
};

export const doughnutChartOptions = {
  ...baseChartOptions,
  cutout: "55%",
  animation: reducedMotion ? false : {
    ...baseChartOptions.animation,
    animateRotate: true,
    animateScale: true,
  },
};

export const radarChartOptions = {
  ...baseChartOptions,
  scales: {
    r: {
      grid: { color: "rgba(15, 45, 23, 0.08)" },
      angleLines: { color: "rgba(15, 45, 23, 0.06)" },
      pointLabels: { color: "#667064", font: { size: 11 } },
      ticks: { display: false },
    },
  },
};

export const polarAreaChartOptions = {
  ...baseChartOptions,
  animation: reducedMotion ? false : {
    ...baseChartOptions.animation,
    animateRotate: true,
    animateScale: true,
  },
  scales: {
    r: {
      beginAtZero: true,
      grid: { color: "rgba(15, 45, 23, 0.08)" },
      angleLines: { display: false },
      ticks: { display: false },
    },
  },
};
