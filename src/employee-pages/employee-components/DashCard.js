import { Box } from "@mui/material";

function DashCard({title, dataPoints}) {
    return (
      <>
        <div class = "w-full border border-border rounded-xl p-8 text-center">
          <p class = "text-card-title">{title}</p>
          <div class = "w-full flex justify-evenly">
            {dataPoints.map((data, key) => {
              return (
                <span key = {key} class = "text-center px-4">
                  <p class = "text-hero text-blue-primary">{data.number}</p>
                  <p class = "text-body-copy">{data.caption}</p>
                </span>
              );
            })}
          </div>
        </div>
      </>
  
    );
  }
  
  export default DashCard;