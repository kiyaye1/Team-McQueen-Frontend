import { Box } from "@mui/material";

function DashCard() {
    return (
      <><div >
       <Box
          height={256}
          width={320}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: '2px solid #c6c6c8', borderRadius: "24px" }}
        >
          <div>
            <p class = "text-card-title">Customer Approval Requests</p>
            <div class = "grid grid-cols-2 gap-4">
              <div>
                <p class = "text-hero">48</p>
                <p>New Tickets</p>
              </div>
              <div>
                <p class = "text-hero">48</p>
                <p>New Tickets</p>
              </div>
            </div>
          </div>
    </Box>
      </div></>
  
    );
  }
  
  export default DashCard;