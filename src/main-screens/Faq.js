import { Accordion, Button } from "@mui/material";
import {AccordionDetails} from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { FAQInfo } from "../data/faq-data";
import {TextField} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Faq() {
    return (
      <><div class = "">
        <div class = "w-full bg-gray5 px-16 py-12">
          <h1 class = "text-section-head">Frequently Asked Questions</h1>
          <p class = "text-body text-body-copy">Find answers to most of your questions here. Use the form below for any additional inquiries.</p>
        </div>
        <div class = "py-8">
          {FAQInfo.map((data,key) => {
            return (
             
              <Accordion key = {key} style={{ boxShadow: "none" }}>
                 <div class = "mx-12">
                 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <div class = "text-body font-bold text-blue-primary py-2">{data.question}</div>
                  </AccordionSummary>
                 </div>
                
                <AccordionDetails>
                  <div class = "px-12 text-body-copy">{data.answer}</div>
                  </AccordionDetails>
              </Accordion>
          
            );
          })}
        </div>
        <div class = "w-full bg-purple-accent px-16 py-12">
          <h1 class = "text-subhead">Can't find what you're looking for? Contact us.</h1>
          <div class = "grid grid-cols-3 py-8 gap-16">
            <form class = "col-span-1 grid grid cols-1 gap-8">
              <div>
                <TextField 
                 label = "Name"
                 variant = "outlined"
                 size="small"
                 sx = {{marginRight:1, width: '100%', backgroundColor: 'white', borderRadius: '4px'}}
                />
              </div>
              <div>
                <TextField 
                  label = "Email"
                  variant = "outlined"
                  size="small"
                  sx = {{marginRight:1, width: '100%', backgroundColor: 'white', borderRadius: '4px'}}
                />
              </div>
              <div>
                <TextField 
                  label = "Send us a Message!"
                  variant = "outlined"
                  sx = {{marginRight:1, width: '100%', backgroundColor: 'white', borderRadius: '4px'}}
                />
              </div>
              <div>
                <Button variant = "contained" sx = {{backgroundColor: '#000180'}}>Send</Button>
              </div>
              
            </form>
            <div class = "col-span-2">
              <p class = "text-body-copy">Our Customer Service staff will be happy to answer any questions you may have.
                <br/><br/>Office hours
                <br/>Mon - Fri
                <br/>8:00 AM – 8:00 PM EST.
                <br/><br/>Members will receive a 24-hour emergency service number in their rental confirmation.
              </p>
            </div>
          </div>
        </div>
      </div></>
  
    );
  }
  
  export default Faq;