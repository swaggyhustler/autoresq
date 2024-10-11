import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState, useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";
import axios from 'axios';
import qs from 'qs';
import ReactLoading from "react-loading";

const mapplsClassObject = new mappls();
let token = null;  
var geoData={
            "type": "FeatureCollection",
            "features": []
          };

const Map = () => {
  const [loading, setLoading]=useState(true);
  const {currentCoords, setList}=useContext(GlobalContext);
  // let currentCoords=null;
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
      
      try{
        if(currentCoords){
          const json=JSON.stringify({latitude: currentCoords.latitude, longitude: currentCoords.longitude});
          // const json = JSON.stringify({latitude: , longitude: });
          const data=await axios.post("http://localhost:3000/api/getMechLocation", json, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
          return data.data;
        }
      }catch(error){
        console.error(`E: Error while fetching locaitons\n${error}`);
      }

    }
    
  const loadObject = { 
    map: true, 
    layer: 'raster', // Optional Default Vector
    version: '3.0', // // Optional, other version 3.5 also available with CSP headers
    libraries: ['polydraw'], //Optional for Polydraw and airspaceLayers
    plugins:['direction', 'getDistance'] // Optional for All the plugins
  };
  useEffect( () => {
    const initialize= async ()=>{
      const data=await fetchLocationData();
      if(data){
        setList(data);
        geoData.features=[
          {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [currentCoords.latitude, currentCoords.longitude]
            },
            "properties": {
                "name": "<div onclick=\"function1()\">MapmyIndia New Office</div>",
                "description": "68,Okhla delhi",
                "icon": "https://apis.mapmyindia.com/map_v3/1.png",
                "text": "Your Location"
            }
        },...data];
      }
      try{
        token=await generateToken();
        console.log(token);
      }catch(e){
        console.log("Cannot generate Map");
      }
      mapplsClassObject.initialize(token , loadObject, 
        () => {
          const newMap = mapplsClassObject.Map({
            id: "map",
            properties: {
              center: [currentCoords.latitude, currentCoords.longitude],
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
      if(currentCoords){
        initialize();
        setLoading(false);
        }
    },[currentCoords]);
    
  return (
    <div className="w-screen h-screen flex flex-col justify-evenly items-center">
        <h1 className='text-5xl font-bold'>Garages near your location</h1>
        {loading?<ReactLoading className="mt-6" type="spin" color="black"/>:''}
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
