const fs = require('fs');
const {parse} = require('csv-parse');

const HabitablePlanet=[];

function isHabitablePlanet(planet) {
    //ES6 object destructuring
    let {koi_disposition, koi_insol, koi_prad} = planet
    return koi_disposition==="CONFIRMED" && koi_insol > 0.36 && koi_insol<1.11 && koi_prad<1.6
}

fs.createReadStream('keplerExo.csv').pipe(parse({
    comment:"#",
    columns:true,
})).on("data",(data)=>{
   if (isHabitablePlanet(data)) {
     HabitablePlanet.push(data)
   }
}).on("error",()=>{
    console.log("File didn't found")
}).on("end",()=>{
    console.log(` We found ${HabitablePlanet.length} 🌎 habitable planets`)
})

