

/* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

////////////////////////////////////////////////////////////// 
//////////////////////// Set-Up ////////////////////////////// 
////////////////////////////////////////////////////////////// 

var margin = { top: 100, right: 100, bottom: 100, left: 100 },
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

////////////////////////////////////////////////////////////// 
////////////////////////// Data ////////////////////////////// 
////////////////////////////////////////////////////////////// 

var data2 = [
    [//iPhone
        { axis: "Battery Life", value: 0.22 },
        { axis: "Brand", value: 0.28 },
        { axis: "Contract Cost", value: 0.29 },
        { axis: "Design And Quality", value: 0.17 },
        { axis: "Have Internet Connectivity", value: 0.22 },
    ], [//Samsung
        { axis: "Battery Life", value: 0.27 },
        { axis: "Brand", value: 0.16 },
        { axis: "Contract Cost", value: 0.35 },
        { axis: "Design And Quality", value: 0.13 },
        { axis: "Have Internet Connectivity", value: 0.22 },
    ], [//Nokia Smartphone
        { axis: "Battery Life", value: 0.26 },
        { axis: "Brand", value: 0.10 },
        { axis: "Contract Cost", value: 0.30 },
        { axis: "Design And Quality", value: 0.14 },
        { axis: "Have Internet Connectivity", value: 0.22 },
    ]
];
////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////// 

//   d3.select("#btn2013").on('click', function(){
//     console.log(this.name)
//   })

var color
var radarChartOptions
var metadata_URL = '/names'
var data
var legend_name = []

function init() {

d3.json(metadata_URL, function (error, bike_data) {
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.


    data = bike_data


    ////////////////////////////////////////////////////////////// 
    //////////////////// Draw the Chart ////////////////////////// 
    ////////////////////////////////////////////////////////////// 

    color = d3.scale.ordinal()
        .range(["#EDC951", "#CC333F", "#00A0B0"]);

    radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: 0.5,
        levels: 5,
        roundStrokes: true,
        color: color,
        legend: { title: 'Year', translateX: 100, translateY: 40 }
    };
    //Call function to draw the Radar chart
    RadarChart("#bubble", data, radarChartOptions);

})
}




function updateGraph() {

    var temp = this.value
    let updateURL = "/stations"

    d3.json(updateURL, function (error, station_data) {

        var yr_2013 = []
        var yr_2014 = []
        var yr_2015 = []
        var all_year = []

        station_data.forEach(d => {
            d.forEach(e => {
                if (e.city == temp) {
                    if (e.name == '2013') {
                        yr_2013.push(e)
                    } else if (e.name == '2014') {
                        yr_2014.push(e)
                    } else if (e.name == '2015') {
                        yr_2015.push(e)
                    }
                }

            })
        })
        all_year = [yr_2015, yr_2014, yr_2013]
        console.log(all_year)
        RadarChart("#bubble", all_year, radarChartOptions);

    })
}

init()

d3.select("#btnMV").on('click', updateGraph)
d3.select("#btnSF").on('click', updateGraph)
d3.select("#btnSJ").on('click', updateGraph)
d3.select("#btnPL").on('click', updateGraph)
d3.select("#btnRC").on('click', updateGraph)
d3.select("#btnAll").on('click', init)
        // RadarChart("#bubble", updateData, radarChartOptions);
