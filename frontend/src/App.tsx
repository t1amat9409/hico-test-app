import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeForm } from "./components/EmployeeForm";
import Button from "@mui/material/Button";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEmployeeContext } from "./hooks/useEmployeeContext";

function App() {
  const { setShowForm, showForm, onEmployeeSelected, loading } =  useEmployeeContext()
  return (
    <>
      <Box className="App">
        <Box className="AppPanel" sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '50%',
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
            height: '50%',
          }}>
            <EmployeeForm onCancel={() => setShowForm(false)} />
          </Box>
        )}
      </Box>
      {loading && (
        <Box sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default App;
