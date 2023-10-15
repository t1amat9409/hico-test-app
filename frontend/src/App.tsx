import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeForm } from "./components/EmployeeForm";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { useEmployeeContext } from "./hooks/useEmployeeContext";

function App() {
  const { setShowForm, showForm, onEmployeeSelected } =  useEmployeeContext()
  return (
    <Box className="App">
      <Box className="AppPanel" sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box sx={{
          display: 'flex',
          mb: 2,
        }}>
          <Typography sx={{
            flex: 1,
            textAlign: 'center'
          }} variant="h5">Current Employees</Typography>
          <Button data-cy={`employeeAddForm`} size="small" onClick={() => {
            onEmployeeSelected(undefined);
            setShowForm(true);
          }} variant="contained">ADD EMPLOYEE</Button>
        </Box>
        <Box sx={{
          flex: 1,
          overflowY: 'auto'
        }}>
          <EmployeeList />
        </Box>
      </Box>
      <Box height={16} />
      {showForm && (
        <Box className="AppPanel" sx={{
          flex: 1,
        }}>
          <EmployeeForm onCancel={() => setShowForm(false)} />
        </Box>
      )}
    </Box>
  );
}

export default App;
