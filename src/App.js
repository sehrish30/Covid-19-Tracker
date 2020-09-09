import React, {useState, useEffect} from 'react';
import './App.css';
import {
  FormControl, 
  MenuItem, 
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import {sortData} from './utility/util'

function App() {

  //hooks
  const [countries, setCountries]= useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])

  //fetch Data from worldwide and then change it when user selects country
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

  useEffect(()=>{   
    const getCountriesData = async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response => response.json())
      .then(data =>{
        const countries= data.map((country)=>(
          {
            key: country.countryInfo.iso2,
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      })
    }

    //call async function
    getCountriesData();
  }, [])

  const onCountryChange = async (event)=>{
    const countryCode= event.target.value;

    const url= 
    countryCode === "worldwide"
    ? 'https://disease.sh/v3/covid-19/all'
    : `https://disease.sh/v3/covid-19/countries/${countryCode}` 

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    })
  }

  console.log('Country info', countryInfo)

  return (
    <div className="app">

    <div className="app__left">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl>
          <Select variant="outlined" onChange={onCountryChange} value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map(country => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
          </Select>
        </FormControl>
        </div>
     
      <div className="app__stats">
        <InfoBox title="Coronavirus cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
        <InfoBox title="Recorded" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
        <InfoBox title="Total" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
      </div>

       <Map/>
     </div>
     <Card className="app__right">
       <CardContent>
         <h3>Live Cases by Country</h3>
         <Table countries={tableData} />
         <h3>Worldwide new cases</h3>
       </CardContent>
    </Card>

  </div>
  );
}

export default App;
