import { useEffect, useState } from "react";
import { getYears } from "../api/armsApi";

// Pages use configured reports/metrics and survey-derived comparison objects.
// Only the available years need a separate metadata request.
function useArmsMetadata() {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function fetchMetadata() {
      try {
        setLoading(true);
        setError("");
        const availableYears = await getYears();
        const recentYears = [...new Set(availableYears.map(Number).filter(Number.isFinite))]
          .sort((a, b) => b - a).slice(0, 10);
        if (active) setYears(recentYears);
      } catch (err) {
        if (!active) return;
        console.error(err);
        setError(err.message || "Unable to load available ARMS years.");
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchMetadata();
    return () => { active = false; };
  }, []);

  return { years, loading, error };
}

export default useArmsMetadata;
