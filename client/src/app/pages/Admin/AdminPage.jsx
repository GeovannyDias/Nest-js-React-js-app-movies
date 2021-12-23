import { Container, Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";

import { useState } from "react";
import { TableMovies } from "../../components/TableMovies/TableMovies";
import { TableActors } from "../../components/TableActors/TableActors";
import { TableGenders } from "../../components/TableGenders/TableGenders";

export function AdminPage() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab
              icon={<LocalMoviesIcon />}
              iconPosition="end"
              label="LISTA DE PELÍCULAS"
              value="1"
            />
            <Tab
              icon={<PeopleAltIcon />}
              iconPosition="end"
              label="LISTA DE ACTORES"
              value="2"
            />
            <Tab
              icon={<ClosedCaptionIcon />}
              iconPosition="end"
              label="GÉNEROS"
              value="3"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Container fixed>
            <TableMovies />
          </Container>
        </TabPanel>
        <TabPanel value="2">
          <Container fixed>
            <TableActors />
          </Container>
        </TabPanel>
        <TabPanel value="3">
          <Container fixed>
            <TableGenders />
          </Container>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

// maxWidth="sm"
