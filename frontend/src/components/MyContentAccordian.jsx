import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LanguageIcon from "@mui/icons-material/Language";
import { Box, Button } from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Checkbox from "@mui/material/Checkbox";

function MyContentAccordian(props) {
  const { section, index ,handleLectureChnage } = props;


  const handleCheckboxClick = (event) => {
    event.stopPropagation(); // Prevents the click event from bubbling up to the parent Box
    // You can add any additional logic for the checkbox click here if needed
  };

  return (
    <div>
      <Accordion sx={{ borderBottom: "1px solid #d1d7dc" }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ background: "#f7f9fa", height: "70px" }}
        >
          <Typography sx={{ fontWeight: "600" }}>
            Section {index + 1}: {section.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {section.lectures.map((l, index) => {
            return (
              <Box
                component={Button}
                onClick={()=>{handleLectureChnage(l.id)}}
                key={index}
                disableRipple
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  width: "100%",
                  height: "70px",
                }}
              >
                <Box sx={{}}>
                  {" "}
                  <Checkbox disableRipple size="small" onClick={handleCheckboxClick} />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 1.5,
                    ml: 0.5,
                  }}
                >
                  <Box sx={{ mb: 1.5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "15px",
                        lineHeight: 1,
                        p: 0,
                      }}
                    >
                      {index + 1}. {l.title}
                    </Typography>
                  </Box>

                  <Box sx={{fontSize:"12px" ,fontWeight:"400"}}>
                    {" "}
                    <OndemandVideoIcon fontSize="14px" sx={{}} />{" "}
                      4 mins
                  </Box>
                </Box>
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MyContentAccordian;
