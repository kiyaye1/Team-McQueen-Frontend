import MetricsDashCard from "../employee-pages/employee-components/MetricsDashCard";
import { Link } from "react-router-dom";

function MetricsDashboard() {
    
    return (
        <div>
        <div class = "mx-16 mt-16 mb-8 text-section-head">Metrics</div>
        <div class = "mx-16 grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            <Link to = "/app-metrics">
            <MetricsDashCard
            title = "Application Metrics"
                dataPoints = {[
                {
                    title2: "Total Applications",
                    caption: "By Month"
                }
                ]}
            />
            </Link>
            <Link to = "/rental-metrics">
            <MetricsDashCard
            title = "Rental Metrics"
            dataPoints = {[
                {
                    title2: "Number of Rentals",
                    caption: "Per Day"
                }
            ]}
            />
            </Link>
        </div>
    </div>
    );
} 

export default MetricsDashboard;