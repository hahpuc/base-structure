import BarChartOne from "../../components/charts/bar/BarChartOne";
import ComponentCard from "../../components/common/card.component";
import PageBreadcrumb from "../../components/common/page-bread-crumb";

export default function BarChart() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6">
        <ComponentCard title="Bar Chart 1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
