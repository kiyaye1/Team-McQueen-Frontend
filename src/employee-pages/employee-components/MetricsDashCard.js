import { Typography, Box } from "@mui/material";  // Import Typography along with Box

function MetricsDashCard({ title, dataPoints }) {
    return (
        <>
        <div className="w-full border border-border rounded-xl p-8 text-center">
            <Typography variant="h6" className="text-card-title">{title}</Typography>
            <div className="w-full flex justify-evenly">
                {dataPoints.map((data, key) => {
                    return (
                        <span key={key} className="text-center px-4">
                        <Typography sx={{ fontSize: "36px", color: "#000180", fontWeight: "bold", padding: "10px" }}>{data.title2}</Typography>
                        <Typography className="text-body-copy">{data.caption}</Typography>
                        </span>
                );
                })}
            </div>
        </div>
        </>
    );
}

export default MetricsDashCard;