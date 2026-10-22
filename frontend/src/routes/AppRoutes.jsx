import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import OverviewPage from "../pages/OverviewPage";
import ComparisonPage from "../pages/ComparisonPage";
import TimelinePage from "../pages/TimelinePage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/trends" element={<TimelinePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
