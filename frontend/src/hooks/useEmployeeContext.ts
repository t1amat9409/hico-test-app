import * as React from 'react';
import { EmployeeContext } from "../contexts/EmployeeContext";

export const useEmployeeContext = () => React.useContext(EmployeeContext);
