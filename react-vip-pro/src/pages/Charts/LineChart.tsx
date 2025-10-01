import LineChartOne from "../../components/charts/line/LineChartOne";
import ComponentCard from "../../components/common/card.component";
import PageBreadcrumb from "../../components/common/page-bread-crumb";

export default function LineChart() {
  return (
    <>
      <PageBreadcrumb pageTitle="Line Chart" />
      <div className="space-y-6">
        <ComponentCard title="Line Chart 1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </>
  );
}
