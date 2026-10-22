import { chartPalette, chartGradient, greenSegmentColours } from "../data/chartOptions";

export function toTimelineLineChartData(
  records = [],
  metricLabel = "Selected metric",
) {
  const sortedRecords = [...records].sort((a, b) => a.year - b.year);

  return {
    labels: sortedRecords.map((item) => item.year),
    datasets: [
      {
        label: metricLabel,
        data: sortedRecords.map((item) => item.estimate),
        borderColor: (context) => chartGradient(context, chartPalette.secondary, chartPalette.primary),
        borderWidth: 2,
        backgroundColor: (context) => chartGradient(context, "hsla(113.02,25%,40%,.28)", "hsla(113.02,25%,30%,0)"),
        pointBackgroundColor: chartPalette.primary,
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointHitRadius: 10,
        fill: true,
        tension: 0.35,
      },
    ],
  };
}

// Align categories across API responses; a missing estimate stays a gap, not zero.
export function toComparisonChartData(series, labels) {
  const indexed = new Set(series.map(({ metric }) => metric.unitType)).size > 1;
  const datasets = series.map(({ metric, records }, index) => {
    const values = labels.map((label) =>
      records.find((record) => record.categoryValue === label)?.estimate ?? null
    );
    const maximum = Math.max(0, ...values.filter(Number.isFinite).map(Math.abs));
    const [top, bottom] = greenSegmentColours[index % greenSegmentColours.length];

    return {
      label: metric.label,
      data: indexed ? values.map((value) =>
        Number.isFinite(value) ? (maximum ? value / maximum * 100 : 0) : null
      ) : values,
      backgroundColor: (context) => chartGradient(context, top, bottom),
      borderColor: bottom,
      borderWidth: 0,
      borderRadius: 4,
      maxBarThickness: 48,
      pointBackgroundColor: bottom,
      pointBorderColor: "#FFFFFF",
      pointBorderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
      hoverOffset: 4,
      fill: false,
    };
  });

  return {
    bar: { labels, datasets },
    metrics: series.map(({ metric }, index) => ({
      ...metric,
      colour: greenSegmentColours[index % greenSegmentColours.length][1],
    })),
  };
}
