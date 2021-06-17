import { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './Apis';
import CountrySelector from './components/CountrySelector';
import HighLight from './components/HighLight';
import Summary from './components/Summary';
import Clock from './components/Clock';
import { Container, Typography } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/vi';


moment.locale('vi')

function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => { // get API va chi chay 1 lan
    getCountries().then((res) => {
      setCountries(res.data.sort((a,b) => a['Country'].localeCompare(b['Country'])));

      setSelectedCountry('vn');
    })
  }, [])

  const handleOnChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  useEffect(() => {
    if(selectedCountry){
      //query coutry duoc chon
      const {Slug} = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountry
      );

      getReportByCountry(Slug).then((res) => {
        //xoa di item cuoi cung trong array
        res.data.pop()
        setReport(res.data);
        });
      }
  }, [countries, selectedCountry])







  return (
    <Container style={{marginTop: 20}}>
      <Typography variant='h2' component='h2'>
        Số liệu COVID-19
      </Typography>
      {/* <Typography>{moment().format('LL')} <Clock /></Typography> */}
      <Clock />
      <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountry}/>
      <HighLight report={report}/>
      <Summary report={report} selectedCountryID={selectedCountry}/>
    </Container>
  );
}

export default App;
