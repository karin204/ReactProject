import React, { Component } from 'react';

class Countries extends Component {


 
 
    render() { 
        return (
            <select className="CountriesS" style={{ width :'100%',height:'100%',bordercolor:'transparent'}} size ="10" onChange={this.props.onChange}> 
                {
                     Object.keys(this.props.myClients).map(function (key,index) {
                         
                        return index === 0 ? <option style={  {fontSize:'30px', color:'RoyalBlue',izing: 'content-box', padding: '5px 0' }} key={index} defaultValue = {true} >{key}</option> 
                        :<option style={  {fontSize:'30px', color:'RoyalBlue',izing: 'content-box', padding: '5px 0' }} key={index} >{key}</option>

                    })   
                }
            </select>
         );
    }
}
 
export default Countries;