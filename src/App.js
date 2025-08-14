import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Registeration from './Registeration';
import Main from './Main';
import {Routes,Route} from 'react-router-dom'
import CollegeManager from './CollegeManager';
import ThankYou from './ThankYou';
import Attendence from './Attendence';
import CandidateExport from './CandidateExport';
import AttendanceList from './AttendanceList';
import RegistrationClosed from './RegistrationClosed';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
      <Route path='/vrm' element={<Registeration/>}/>
      {/* <Route path='/registration' element={<Main/>}/> */}
      <Route path='/' element={<RegistrationClosed/>}/>
      <Route path='/admin-1/college' element={<CollegeManager/>}/>
      <Route path='/thankyou/:id' element= {<ThankYou />}/>
      <Route path='/attendance' element= {<Attendence/>}/>
      <Route path='/admin-1' element={<CandidateExport/>}/>
      <Route path='/admin-1/attendance' element={<AttendanceList/>}/>
      
      </Routes> 
    </ChakraProvider>
  );
}

export default App;
