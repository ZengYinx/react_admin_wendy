import axios from 'axios';
import React, { useEffect } from 'react';
import IndexRouter from './router/IndexRouter';

function App() {
  // useEffect(() => {
  //   axios.get('/ajax/comingList?ci=30&limit=10&movieIds=&token=&optimus_uuid=FE48D2B06A4011ED9202F7A3C5B5021BCB9007CDE21F4A9186EB5F38DFE936F6&optimus_risk_level=71&optimus_code=10').then((res) => {
  //     console.log('接口的访问', res);
  //   })
  // }, [])
  return <IndexRouter></IndexRouter>;
}
export default App;