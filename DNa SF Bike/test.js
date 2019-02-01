    window.onload = function() {
        var dataPoints = [];
 
// --------------------------------------------------------------------------------
// 1. f(x) getDataPointsFromCSV should do the following
//    > initialize empty arrays for data points, lines, and transformed data points
//    > create a for loop to iterate through csv file
//    > split up dates
//    > return transformed dataPoints
// 2. getDewFromCSV and getHumidityFromCSV achieve similar results
//    > I did this so I didn't have to create one huge f(x) to access three seperate
//      csv files
//    > I thought it'd be easier to access 3 seperate files w/ 3 seperate f(x)'s
// 3. Shoutout to Yifu for helping me with H2Properly parse Dates
// -------------------------------------------------------------------------------- 
 
        function getDataPointsFromCSV(csv) {
            var dataPoints = csvLines = points = [];
            csvLines = csv.split(/[\r?\n|\r|\n]+/);
            for (var i = 0; i < 150; i++)
                if (csvLines[i].length > 0) {
                    points = csvLines[i].split(",");
                    var parts = points[0].split('/');
                    dataPoints.push({ 
                        x: new Date(parts[2],parts[0],parts[1]) ,
                        y: parseFloat(points[1]) 		
                    });
                }
            // console.log(dataPoints);
            return dataPoints;
        }

        function getDewFromCSV(csv) {
            var dewPoints = dewLines = dewData = [];
            dewLines = csv.split(/[\r?\n|\r|\n]+/);
            for (var i = 0; i < 150; i++)
                if (dewLines[i].length > 0) {
                    dewData = dewLines[i].split(",");
                    var parts = dewData[0].split('/');
                    dewPoints.push({ 
                        x: new Date(parts[2],parts[0],parts[1]) ,
                        y: parseFloat(dewData[2]) 		
                    });
                }
            // console.log(dewPoints);
            // console.log(dewLines);
            // console.log(csv);
            return dewPoints;
        }

        function getHumidityFromCSV(csv) {
            var humidityPoints = humidityLines = humidityData = [];
            humidityLines = csv.split(/[\r?\n|\r|\n]+/);
            for (var i = 0; i < 150; i++)
                if (humidityLines[i].length > 0) {
                    humidityData = humidityLines[i].split(",");
                    var parts = humidityData[0].split('/');
                    humidityPoints.push({ 
                        x: new Date(parts[2],parts[0],parts[1]) ,
                        y: parseFloat(humidityData[3]) 		
                    });
                }
            // console.log(humidityPoints);
            return humidityPoints;
        }

// --------------------------------------------------------------------------------
// 1. Access three seperate csv files (test, testMax, testMin)
// 2. Create skeleton for graphs
// 3. Use f(x)'s to grab data points for Temperature, Dew Points, and Humidity
// 4. Issue w/ charts automatically resizing themselves
//    > Resolved: Hardcoded height and width for each chart
// --------------------------------------------------------------------------------
        var chart;

        $.get("test.csv", function(data){
            // console.log(data);
            chart = new CanvasJS.Chart("chartContainer", {
                height: 250,
                width: 1000,
                animationEnabled: true,
                title: {
                    text: "San Francisco Weather (Canvas) [Average]",
                },
                axisY: {
                    title: "Temperature",
                    valueFormatString: "##",
                    interval: 10,
                    suffix: " F"
                },
                axisX:{
                    title: "8/29/2013 - 2/24/2014",
                    valueFormatString: "MM/DD/YYYY" ,
                    interval: 10,
                    intervalType: "month"
                },
                data: [{
                    type: "column",
                    toolTipContent: "{x}: {y} degrees",
                    showInLegend: true,
                    legendText: "Mean Temperature",
                    markerSize: 5,
                    color: "rgba(54,158,173,.7)",
                    dataPoints: getDataPointsFromCSV(data)
                },
                    {
                    type: "area",
                    toolTipContent: "{x}: {y} degrees",
                    showInLegend: true,
                    legendText: "Mean Dew Point",
                    markerSize: 5,
                    color: "rgba(25,75,100,.7)",
                    dataPoints: getDewFromCSV(data)
                },
                    {
                    type: "line",
                    toolTipContent: "{x}: {y} degrees",
                    showInLegend: true,
                    legendText: "Mean Humidity",
                    markerSize: 5,
                    color: "rgba(10,200,80,.7)",
                    dataPoints: getHumidityFromCSV(data)
                    },
                ]
            });
            
            chart.render();
        
        });

        var chart2;

        $.get("testMax.csv", function(data){
            // console.log(data);
            chart2 = new CanvasJS.Chart("chartContainer2", {
                height: 250,
                width: 1000,
                animationEnabled: true,
                title: {
                    text: "San Francisco Weather (Canvas) [Maximum]",
                },
                axisY: {
                    title: "Temperature",
                    valueFormatString: "##",
                    interval: 10,
                    suffix: " F"
                },
                axisX:{
                    title: "8/29/2013 - 2/24/2014",
                    valueFormatString: "MM/DD/YYYY" ,
                    interval: 10,
                    intervalType: "month"
                },
                data: [{
                    type: "column",
                    toolTipContent: "{x}: {y} degrees",
                    showInLegend: true,
                    legendText: "Max. Temperature",
                    markerSize: 5,
                    color: "rgba(54,158,173,.7)",
                    dataPoints: getDataPointsFromCSV(data)
                },
                    {
                    type: "area",
                    toolTipContent: "{x}: {y} degrees",
                    showInLegend: true,
                    legendText: "Max. Dew Point",
                    markerSize: 5,
                    color: "rgba(25,75,100,.7)",
                    dataPoints: getDewFromCSV(data)
                },
                    {
                    type: "line",
                    toolTipContent: "{x}: {y} degrees",
                    showInLegend: true,
                    legendText: "Max. Humidity",
                    markerSize: 5,
                    color: "rgba(10,200,80,.7)",
                    dataPoints: getHumidityFromCSV(data)
                    },
                ]
            });
            
            chart2.render();
        
        });

        var chart3;

        $.get("testMin.csv", function(data){
            // console.log(data);
            chart3 = new CanvasJS.Chart("chartContainer3", {
                height: 250,
                width: 1000,
                animationEnabled: true,
                title: {
                    text: "San Francisco Weather (Canvas) [Minimum]",
                },
                axisY: {
                    title: "Temperature",
                    valueFormatString: "##",
                    interval: 10,
                    suffix: " F"
                },
                axisX:{
                    title: "8/29/2013 - 2/24/2014",
                    valueFormatString: "MM/DD/YYYY" ,
                    interval: 10,
                    intervalType: "month"
                },
                data: [{
                    type: "column",
                    toolTipContent: "{x}: {y} degrees",
                    showInLegend: true,
                    legendText: "Min. Temperature",
                    markerSize: 5,
                    color: "rgba(54,158,173,.7)",
                    dataPoints: getDataPointsFromCSV(data)
                },
                    {
                    type: "area",
                    toolTipContent: "{x}: {y} degrees",
                    showInLegend: true,
                    legendText: "Min. Dew Point",
                    markerSize: 5,
                    color: "rgba(25,75,100,.7)",
                    dataPoints: getDewFromCSV(data)
                },
                    {
                    type: "line",
                    toolTipContent: "{x}: {y} degrees",
                    showInLegend: true,
                    legendText: "Min. Humidity",
                    markerSize: 5,
                    color: "rgba(10,200,80,.7)",
                    dataPoints: getHumidityFromCSV(data)
                    },
                ]
            });
            
            chart3.render();
        
        });

// --------------------------------------------------------------------------------
// 1. Render Charts after tabs have been created.
// 2. Updates the chart to its container size if it has changed.
// 
// --------------------------------------------------------------------------------
    $("#tabs").tabs({
        create: function (event, ui) {
            $("#chartContainer").CanvasJSChart(chart);
            $("#chartContainer2").CanvasJSChart(chart2);
            $("#chartContainer3").CanvasJSChart(chart3);
        },
        activate: function (event, ui) {
            ui.newPanel.children().first().CanvasJSChart().render();
        }
    });
}