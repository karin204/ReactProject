import React, { Component } from 'react';
import MapView from './components/mapView';
import Countries from './components/countries';
import Cities from './components/cities';
import Companies from './components/companies';
import Clients from './data/clients.json';


import './App.css';

//make sort in countries by cities count
Clients.Customers.sort((a,b) => getCitiesCount(b.Country,b.City) - getCitiesCount(a.Country,a.City));
 
//create new object contains only distinct countries
 var names = {};
 Clients.Customers.forEach( function(item ) {
   names[item.Country] = names[item.Country] || {};
 });


function getCompanies(city)
{
  var companies = [];
  for (var i = 0; i < Clients.Customers.length; i++) {
    if (Clients.Customers[i].City === city) {
      if(companies.indexOf(Clients.Customers[i].CompanyName) <= -1)
      {
                companies.push(Clients.Customers[i].CompanyName);}
    }
  }
  companies.sort((a, b) => a.localeCompare(b)); 
  return companies;
}

function getCities(country)
{
  var cities = [];
  for (var i = 0; i < Clients.Customers.length; i++) {
    if (Clients.Customers[i].Country === country) {
      if(cities.indexOf(Clients.Customers[i].City) <= -1)
      {cities.push(Clients.Customers[i].City);}
    }
  }
  cities.sort((a,b) => getCompaniesCount(b) - getCompaniesCount(a));
  return cities;
}


function getCitiesCount(country, city) {
  var count = 1;
  var temp = [];
  for (var i = 0; i < Clients.Customers.length; i++) {
      if (Clients.Customers[i].Country === country) {
      
        if(Clients.Customers[i].City !== city)
        {
          if(temp.indexOf(Clients.Customers[i].City) <= -1)
            {temp.push(Clients.Customers[i].City);
              count++;}
        }
      }
  }
  return count;
}

function getCompaniesCount(city){
  var count = 0;
  for (var i = 0; i < Clients.Customers.length; i++) {
    if (Clients.Customers[i].City === city) {
            count++; 
    }
}
  return count;
}



function findAddress(country,city,company){
  for (var i = 0; i < Clients.Customers.length; i++) {
    if(Clients.Customers[i].Country === country  && Clients.Customers[i].City === city && Clients.Customers[i].CompanyName === company)
    {
      
      var addr = Clients.Customers[i].Address+ " "+ city+" "+country; 
      return addr;

    }
  }    
 return "none";
}
  


class App extends Component {
  
  state = {
    myClients: names,
    country: Clients.Customers[0].Country,
    city: getCities(Clients.Customers[0].Country)[0],
    company: getCompanies(getCities(Clients.Customers[0].Country)[0])[0],
    cities: getCities(Clients.Customers[0].Country),
    companies:  getCompanies(getCities(Clients.Customers[0].Country)[0]),
    location: findAddress(Clients.Customers[0].Country,  getCities(Clients.Customers[0].Country)[0],getCompanies(getCities(Clients.Customers[0].Country)[0])[0])
  };

  


  onChange = (event) => {
    event.persist();  
    var companyN =Clients.Customers[0].Country;
    var cityN = getCities(Clients.Customers[0].Country)[0];
    var countryN = getCompanies(getCities(Clients.Customers[0].Country)[0])[0];

    switch(event.target.className)
    {
     
      case 'CountriesS':
      {
        var index = event.nativeEvent.target.selectedIndex;
        var text = event.nativeEvent.target[index].text;
        companyN = text;
        this.setState({country : text});
        this.setState({cities : getCities(text)});
        this.setState({companies:getCompanies(getCities(text)[0])});
        this.setState({city:getCities(text)[0]});
        this.setState({companies:getCompanies(getCities(text)[0])});
        break;
      }
      case 'CitiesS':
      {
        index = event.nativeEvent.target.selectedIndex;
        text = event.nativeEvent.target[index].text;
        cityN = text;
        this.setState({city: text});
        this.setState({company:getCompanies(text)[0]});
        this.setState({companies:getCompanies(text)});
        break;
      }
      case 'CompaniesS':
      {
        index = event.nativeEvent.target.selectedIndex;
        text = event.nativeEvent.target[index].text;
        companyN = text;
        this.setState({company: text});
        this.setState({location: findAddress(countryN,cityN,companyN)});
        break;
      }
      default:
      {
        console.log("Invalid Choice");
        break;
      }
    }
  }

 
  render() {
    return (
    
      <div className="App">
        <div className="Top">
          <p>Countries Cities Company Map</p>
        </div>
        <div className = "Center">
          <div className="CountriesDiv">
            <Countries className="Countries" onChange ={this.onChange} myClients={this.state.myClients} country = {this.state.country} cities = {this.state.cities} companies={this.state.companies} city={this.state.city} location={this.state.location}/>
          </div>
          <div className="CitiesDiv">
           <Cities className="Cities" onChange ={this.onChange} myClients={this.state.myClients} country = {this.state.country} cities = {this.state.cities} companies={this.state.companies} city={this.state.city} location={this.state.location}/>
          </div>
          <div className="CompaniesDiv">
           <Companies className="Companies" onChange ={this.onChange} myClients={this.state.myClients} country = {this.state.country} cities = {this.state.cities} companies={this.state.companies} city={this.state.city} location={this.state.location}/>
          </div>
          <div className="MapDiv">
          <MapView className="Map" onChange ={this.onChange} myClients={this.state.myClients} country = {this.state.country} cities = {this.state.cities} companies={this.state.companies} city={this.state.city} location={this.state.location}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
