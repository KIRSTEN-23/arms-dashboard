import { useEffect, useState } from "react";
import {
  getCategories,
  getFarmTypes,
  getReports,
  getStates,
  getVariables,
  getYears,
} from "../api/armsApi";

function useArmsMetadata() {
  const [metadata, setMetadata] = useState({
    states: [],
    years: [],
    farmTypes: [],
    reports: [],
    variables: [],
    categories: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMetadata() {
      try {
        setLoading(true);
        setError("");

        const [
          states,
          years,
          farmTypes,
          reports,
          variables,
          categories,
        ] = await Promise.all([
          getStates(),
          getYears(),
          getFarmTypes(),
          getReports(),
          getVariables(),
          getCategories(),
        ]);

        setMetadata({
          states,
          years,
          farmTypes,
          reports,
          variables,
          categories,
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load ARMS metadata.");
      } finally {
        setLoading(false);
      }
    }

    fetchMetadata();
  }, []);

  return {
    ...metadata,
    loading,
    error,
  };
}

export default useArmsMetadata;