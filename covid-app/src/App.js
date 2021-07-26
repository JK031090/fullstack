import {MenuItem,
  FormControl,
Select,
Card,
CardContent} from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import './Table.css';
import { sortData} from './util';
import './App.css';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
import {prettyPrintStat} from "./util";


function App() {

  //state = how to create short term memory for react
  //useeffect - runs a piece of code based on a condition 
  //https://disease.sh/v3/covid-19/countries

  const [countries,setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter] = 
  useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom,setMapZoom] = useState(3);
  const [mapCountries,setMapCountries] = useState([]);
  const [casesType,setCasesType] = useState("cases");
  

  // when page loads by default worldwide info should be fetched
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  },[])

  useEffect(() => {
    //async means send a request, wait for response and then do something
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => (
        {
          name:country.country,
          value:country.countryInfo.iso2
        }));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
    });
  };
  getCountriesData();
  },[]);

  const onCountryChange =  async(event) => {
    const countryCode = event.target.value;
    // console.log(countryCode);
    // setCountry(countryCode);

    //get data for country wise diseases
    const url = countryCode === "worldwide" 
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);

      //All of data
      //All of country response
      setCountryInfo(data);

      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);

    })
  }
    console.log("Country Info ----> ", countryInfo);
  return (
    <div className="app">
      {/* Left Container */}
      <div className="app__left">
        {/* Header */}
        <div className="app_header">
        <h1>COVID 19 TRACKER</h1>
        {/* Dropdown */}
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        </div>
        {/* This section is the top summary section */}
        {/* Info Boxes */}
        <div className="app__stats">
          {/* Info Boxes for covid cases*/}
          <InfoBox
          isRed
           active={casesType === "cases"}
          onClick = {(e) => setCasesType('cases')}
          title="Coronavirus Cases"
          cases={prettyPrintStat(countryInfo.todayCases)}
          total={prettyPrintStat(countryInfo.cases)}
          />
          {/* Info Boxes for covid recovery*/}
          <InfoBox
          active={casesType === "recovered"}
          onClick = {(e) => setCasesType('recovered')}
          title="Coronavirus Recovered"
          cases={prettyPrintStat(countryInfo.todayRecovered)}
          total={prettyPrintStat(countryInfo.recovered)}
          />
          {/* Info Boxes for covid deaths*/}
          <InfoBox
          isRed
          active={casesType === "deaths"}
          onClick = {(e) => setCasesType('deaths')}
          title="Coronavirus Deaths"
          cases={prettyPrintStat(countryInfo.todayDeaths)}
          total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        {/* Map */}
        <Map 
        countries={mapCountries}
        casesType={casesType}
        center={mapCenter}
        zoom={mapZoom}
        />

      </div>
      
      <Card className="app__right">
        {/* Table */}
        <h3>Live cases by country</h3>
        <Table countries={tableData}  />
        {/* Graph */}
        <h3>Worldwide New {casesType}</h3>
        <LineGraph casesType={casesType}/>
      </Card>
     
      
    </div>
  );
}

export default App;

