const fs = require('fs');

// Read the JSON file
fs.readFile('jsondata.json', 'utf8', async (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Parse JSON data
    const jsonData = JSON.parse(data);

    // Work with JSON data
    // console.log(typeof(jsonData));

    // for(let i=2016; i<=2050; i++){
    //     getStartYears(jsonData, i);
    // }

    
    
});


async function getSumOfIntensities(jsonData){
    let topics = {};
    let end_year = {};
    let sector = {};
    let region = {};
    let pestle = {};
    let source = {};
    let country = {};

    for (let i = 0; i < jsonData.length; i++) {
        // console.log(jsonData[i].topic);
        if(typeof(jsonData[i].intensity) == "number") {
            if(topics[jsonData[i].topic] == undefined) {
                topics[jsonData[i].topic] = 0;
            }
            else{
                topics[jsonData[i].topic] += parseInt(jsonData[i].intensity);
            }

            if(end_year[jsonData[i].end_year] == undefined){
                end_year[jsonData[i].end_year] = 0;
            }
            else{
                end_year[jsonData[i].end_year] += parseInt(jsonData[i].intensity);
            }

            if(sector[jsonData[i].sector] == undefined){
                sector[jsonData[i].sector] = 0;
            }
            else{
                sector[jsonData[i].sector] += parseInt(jsonData[i].intensity);
            }

            if(region[jsonData[i].region] == undefined){
                region[jsonData[i].region] = 0;
            }
            else{
                region[jsonData[i].region] += parseInt(jsonData[i].intensity);
            }
            
            if(pestle[jsonData[i].pestle] == undefined){
                pestle[jsonData[i].pestle] = 0;
            }
            else{
                pestle[jsonData[i].pestle] += parseInt(jsonData[i].intensity);
            }

            if(source[jsonData[i].source] == undefined){
                source[jsonData[i].source] = 0;
            }
            else{
                source[jsonData[i].source] += parseInt(jsonData[i].intensity);
            }

            if(country[jsonData[i].country] == undefined){
                country[jsonData[i].country] = 0;
            }
            else{
                country[jsonData[i].country] += parseInt(jsonData[i].intensity);
            }
        }
    }
    
    for(let key in country){
        if(country[key] > 0){
            console.log(key, country[key]);
        }
    }
}


async function getEndYears(jsonData){
    let years = {};
    for(let i=0; i<jsonData.length; i++){
        if(years[jsonData[i].end_year] == undefined){
            years[jsonData[i].end_year] = 0;
        }
        else{
            years[jsonData[i].end_year] += 1;
        }
    }
    return years;
}


function getStartYears(jsonData, year){
    let intensity = 0;
    let relevance = 0;
    let likelihood = 0;

    for(let i=0; i<jsonData.length; i++){
        if(year == jsonData[i].start_year){
            if(typeof(jsonData[i].intensity) == "number") {
                intensity += parseInt(jsonData[i].intensity);
            }
            if(typeof(jsonData[i].relevance) == "number") {
                intensity += parseInt(jsonData[i].relevance);
            }
            if(typeof(jsonData[i].likelihood) == "number") {
                intensity += parseInt(jsonData[i].likelihood);
            }
        }
        // if(years[jsonData[i].start_year] == undefined){
        //     years[jsonData[i].start_year] = 0;
        // }
        // else{
        //     years[jsonData[i].start_year] += 1;
        // }
    }
    console.log("Year: ", year);
    console.log("Intensity: ", intensity);
    console.log("Relevance: ", relevance);
    console.log("Likelihood: ", likelihood);
    console.log("\n");
}