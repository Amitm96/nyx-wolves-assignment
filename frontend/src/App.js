
import './App.css';
import AddRecord from './component/AddRecord';
import { AllRecords } from './component/AllRecords';
import UpdateRecord from './component/UpdateRecord';
import {BrowserRouter , Routes , Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<AllRecords/>}/>
        <Route path='/addrecord' element={<AddRecord/>} />
        <Route path='/update/:id' element={<UpdateRecord/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
