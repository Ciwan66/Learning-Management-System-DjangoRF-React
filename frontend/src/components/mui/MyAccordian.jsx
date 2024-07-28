import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LanguageIcon from "@mui/icons-material/Language";
import { Box } from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

export default function MyAccordian(props) {
  const { section } = props;
  return (
    <div>
      <Accordion sx={{ border: "1px solid #d1d7dc" }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ background: "#f7f9fa" }}
        >
          <Typography>{section.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {section.lectures.map((l, index) => {
            return (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mt: 2 }}
              >
                <OndemandVideoIcon fontSize="small" />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    lineHeight: 1,
                    ml: 2,
                  }}
                >
                  {l.title}
                </Typography>{" "}
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
