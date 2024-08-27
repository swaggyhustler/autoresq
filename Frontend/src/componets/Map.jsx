import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';


const mapplsClassObject = new mappls();
// const mapplsPluginObject = new mappls_plugin();


const Map = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
    var geoData={
                "type": "FeatureCollection",
                "features": [
                ]
            };
  const fetchLocationData=async()=>{
      const data=await axios.get("http://localhost:3000/api/getMechLocation");
      geoData.features=[...data.data]
      console.log(geoData)
    }

  const loadObject = { 
    map: true, 
    layer: 'raster', // Optional Default Vector
    version: '3.0', // // Optional, other version 3.5 also available with CSP headers
    libraries: ['polydraw'], //Optional for Polydraw and airspaceLayers
    plugins:['direction'] // Optional for All the plugins
};

  useEffect(() => {
    fetchLocationData();
    mapplsClassObject.initialize("1d96084012cfa906ae51ee449adaf925", loadObject, () => {
      const newMap = mapplsClassObject.Map({
        id: "map",
        properties: {
          center: [28.633, 77.2194],
          // center: [latitude, longitude],
          zoom: 4,
        },
      });
        // mapplsClassObject.Marker({
        //     position: {"lat": 28.519467,"lng": 77.223150 },
        //     map: newMap,
        // })
        mapplsClassObject.addGeoJson({map:newMap,data:geoData,fitbounds:true,cType:0});
      newMap.on("load", () => {
        setIsMapLoaded(true);
      });
      mapRef.current = newMap;
    });
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

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
