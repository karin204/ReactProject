import React, { Component } from 'react';

class Companies extends Component {
    state = {  }
    render() { 
        return (
            <select className="CompaniesS" size ="10" style = {{width:'200px'}} onChange={this.props.onChange}  > 
            { 

                 this.props.companies.map(function (key,index) {
                    return index === 0 ? <option style={  {fontSize:'30px', color:'RoyalBlue',izing: 'content-box', padding: '5px 0' }} key={index} defaultValue = {true} >{key}</option> 
                    :<option style={  {fontSize:'30px', color:'RoyalBlue',izing: 'content-box', padding: '5px 0' }} key={index} >{key}</option>

                }) 
            }
        </select>
          );
    }
}
 
export default Companies;