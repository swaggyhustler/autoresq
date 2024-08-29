import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import qs from 'qs';

const mapplsClassObject = new mappls();

var geoData={
            "type": "FeatureCollection",
            "features": []
          };

const Map = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const generateToken= async ()=>{
    const tokenURL='https://outpost.mappls.com/api/security/oauth/token';
      const formData=qs.stringify({
      grant_type: "client_credentials",
      client_id: "96dHZVzsAuv20IWCfMxHc6Uf6L8Tbi0xJNgKibjV2YJLHlByTOq1oMRWsjdwPM0_pSBw7wnbZz6YDQdllQDfHQVUoiP6oX42",
      client_secret: "lrFxI-iSEg8X6iZXS0T0zrBeOdKLSy8bVDWhqm13QfQMSVlvyEiQpPghTiOioaFup-dOXYsab3Rs2_ck3SfgQbHh-9adjoeZBTXuoc5qfqI="
    });
    const result = await axios({method: "post", data: formData, url: tokenURL, headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    } });
    return result.data.access_token;
  }
  const fetchLocationData=async()=>{
      
      const getCurrentCoords=()=>{
        return new Promise((resolve, reject)=>{
          navigator.geolocation.getCurrentPosition((position)=>{
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            }, (error)=>{
            console.log("E: Error getting users current locaiton");
            reject(error);
          });
        });
      }

      try{
        const currentCoords=await getCurrentCoords();
        const json=JSON.stringify({latitude: currentCoords.latitude, longitude: currentCoords.longitude})
          const data=await axios.post("http://localhost:3000/api/getMechLocation", json, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
        console.log(data.data);
        return data.data;
      }catch(error){
        console.error(`E: Error while fetching locaitons\n${error}`);
      }

    }
    
  const loadObject = { 
    map: true, 
    layer: 'raster', // Optional Default Vector
    version: '3.0', // // Optional, other version 3.5 also available with CSP headers
    libraries: ['polydraw'], //Optional for Polydraw and airspaceLayers
    plugins:['direction'] // Optional for All the plugins
};
  useEffect( () => {
    const initialize= async ()=>{
      const data=await fetchLocationData();
      geoData.features=[...data];
      const token=await generateToken();
      mapplsClassObject.initialize(token , loadObject, 
        () => {
          const newMap = mapplsClassObject.Map({
            id: "map",
            properties: {
              center: [28.633, 77.2194],
              // center: [latitude, longitude],
              zoom: 4,
            },
          });

          newMap.on("load", () => {
            mapplsClassObject.addGeoJson({map:newMap,data:geoData,fitbounds:true,cType:0});
            setIsMapLoaded(true);
          });

          mapRef.current = newMap;
        });
      };
      initialize();
    });
    
  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <div
            id="map"
            //   style={{ width: "100%", height: "99vh", display: "inline-block" }}
            className="w-5/6 h-2/3 inline-block"
            >
            {isMapLoaded}
        </div>
    </div>
  );
};
export default Map;
