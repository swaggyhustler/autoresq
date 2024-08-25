import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";

const mapplsClassObject = new mappls();
// const mapplsPluginObject = new mappls_plugin();


const Map = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const loadObject = { 
    map: true, 
    layer: 'raster', // Optional Default Vector
    version: '3.0', // // Optional, other version 3.5 also available with CSP headers
    libraries: ['polydraw'], //Optional for Polydraw and airspaceLayers
    plugins:['direction'] // Optional for All the plugins
};

  useEffect(() => {
    var geoData={
                "type": "FeatureCollection",
                "features": [{
                "type": "Feature",
                "properties":
                    {
                        "description":"noida",
                        "icon":"https://apis.mapmyindia.com/map_v3/1.png",
                        "icon-size":.75,
                        "icon-offset":[0,-10],
                        "text":"1",
                        "text-size":10,
                        "text-offset":[0,.6]
                },
                "geometry": {"type": "Point",
                "coordinates": [28.544,77.5454]}
                },{
                "type": "Feature",
                "properties": {"description":"faridabad","icon":"https://apis.mapmyindia.com/map_v3/1.png"},
                "geometry": {"type": "Point",
                "coordinates": [28.27189158,77.2158203125]}
                },{
                "type": "Feature",
                "properties": {"description":"delhi","icon":"https://apis.mapmyindia.com/map_v3/1.png"},
                "geometry": {"type": "Point",
                "coordinates": [28.549511,77.2678250]}
                }]
            };
    mapplsClassObject.initialize("1d96084012cfa906ae51ee449adaf925", loadObject, () => {
      const newMap = mapplsClassObject.Map({
        id: "map",
        properties: {
          center: [28.633, 77.2194],
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
