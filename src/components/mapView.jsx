import React, { Component } from 'react';



class MapView extends Component {
 state = {
    latlng : "",
    loc:""
 }
    componentDidMount(){
        this.renderMap();
    }


    renderMap = () =>{
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAcR-H-4t7TMr1i3guqsBdikgVwxIlLzGE&callback=initMap&lang=en&region=US");
        window.initMap = this.initMap;
       
    }


    initMap = () => {
        var map;
        var curLoc;
        console.log(this.props.location);

        var geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({
            "address":this.props.location
        }, function(result){
            console.log(result);
           // curLoc =result[0].geometry.location;
        });

        map = new window.google.maps.Map(document.getElementById('map'), {
             center: {lat: -34.397, lng: 150.644},
             zoom: 8
           });
        
      }
    





    render() { 
        return ( 
            <div>
                <div id="map"  style = {{height:'465px',width:'420px'}}></div>
            </div>
         );
    }
}
 


function loadScript(url){
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script,index)
}


export default MapView ;
