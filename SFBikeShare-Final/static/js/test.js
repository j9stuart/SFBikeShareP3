window.onload = function() {
    var dataPoints = [];
    var dewPoints = [];
    var humidityPoints = [];
    var visbilityMaxPoints = [];
    var visbilityAvgPoints = [];
    var visbilityMinPoints = [];
    var windMaxPoints = [];
    var windAvgPoints = [];
    var gustPoints = [];
    var seaMaxPoints = [];
    var seaAvgPoints = [];
    var seaMinPoints = [];
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
//    > Applied same concept to create more graphs
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
        return humidityPoints;
    }

    function getVisibilityMaxFromCSV(csv) {
        var visibilityMaxPoints = visibilityMaxLines = visibilityMaxData = [];
        visibilityMaxLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 0; i < 150; i++)
            if (visibilityMaxLines[i].length > 0) {
                visibilityMaxData = visibilityMaxLines[i].split(",");
                var parts = visibilityMaxData[0].split('/');
                visibilityMaxPoints.push({ 
                    x: new Date(parts[2],parts[0],parts[1]) ,
                    y: parseFloat(visibilityMaxData[1]) 		
                });
            }
        return visibilityMaxPoints;
    }

    function getVisibilityAvgFromCSV(csv) {
        var visibilityAvgPoints = visibilityAvgLines = visibilityAvgData = [];
        visibilityAvgLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 0; i < 150; i++)
            if (visibilityAvgLines[i].length > 0) {
                visibilityAvgData = visibilityAvgLines[i].split(",");
                var parts = visibilityAvgData[0].split('/');
                visibilityAvgPoints.push({ 
                    x: new Date(parts[2],parts[0],parts[1]) ,
                    y: parseFloat(visibilityAvgData[2]) 		
                });
            }
        return visibilityAvgPoints;
    }

    function getVisibilityMinFromCSV(csv) {
        var visibilityMinPoints = visibilityMinLines = visibilityMinData = [];
        visibilityMinLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 0; i < 150; i++)
            if (visibilityMinLines[i].length > 0) {
                visibilityMinData = visibilityMinLines[i].split(",");
                var parts = visibilityMinData[0].split('/');
                visibilityMinPoints.push({ 
                    x: new Date(parts[2],parts[0],parts[1]) ,
                    y: parseFloat(visibilityMinData[3]) 		
                });
            }
        return visibilityMinPoints;
    }


    function getWindMaxFromCSV(csv) {
        var windMaxPoints = windMaxLines = windMaxData = [];
        windMaxLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 0; i < 150; i++)
            if (windMaxLines[i].length > 0) {
                windMaxData = windMaxLines[i].split(",");
                var parts = windMaxData[0].split('/');
                windMaxPoints.push({ 
                    x: new Date(parts[2],parts[0],parts[1]) ,
                    y: parseFloat(windMaxData[1]) 		
                });
            }
        return windMaxPoints;
    }

    function getWindAvgFromCSV(csv) {
        var windAvgPoints = windAvgLines = windAvgData = [];
        windAvgLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 0; i < 150; i++)
            if (windAvgLines[i].length > 0) {
                windAvgData = windAvgLines[i].split(",");
                var parts = windAvgData[0].split('/');
                windAvgPoints.push({ 
                    x: new Date(parts[2],parts[0],parts[1]) ,
                    y: parseFloat(windAvgData[2]) 		
                });
            }
        return windAvgPoints;
    }

    function getGustFromCSV(csv) {
        var gustPoints = gustLines = gustData = [];
        gustLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 0; i < 150; i++)
            if (gustLines[i].length > 0) {
                gustData = gustLines[i].split(",");
                var parts = gustData[0].split('/');
                gustPoints.push({ 
                    x: new Date(parts[2],parts[0],parts[1]) ,
                    y: parseFloat(gustData[3]) 		
                });
            }
        return gustPoints;
    }

    function getSeaMaxFromCSV(csv) {
        var seaMaxPoints = seaMaxLines = seaMaxData = [];
        seaMaxLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 0; i < 150; i++)
            if (seaMaxLines[i].length > 0) {
                seaMaxData = seaMaxLines[i].split(",");
                var parts = seaMaxData[0].split('/');
                seaMaxPoints.push({ 
                    x: new Date(parts[2],parts[0],parts[1]) ,
                    y: parseFloat(seaMaxData[1]) 		
                });
            }
        return seaMaxPoints;
    }

    function getSeaAvgFromCSV(csv) {
        var seaAvgPoints = seaAvgLines = seaAvgData = [];
        seaAvgLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 0; i < 150; i++)
            if (seaAvgLines[i].length > 0) {
                seaAvgData = seaAvgLines[i].split(",");
                var parts = seaAvgData[0].split('/');
                seaAvgPoints.push({ 
                    x: new Date(parts[2],parts[0],parts[1]) ,
                    y: parseFloat(seaAvgData[2]) 		
                });
            }
        return seaAvgPoints;
    }

    function getSeaMinFromCSV(csv) {
        var seaMinPoints = seaMinLines = seaMinData = [];
        seaMinLines = csv.split(/[\r?\n|\r|\n]+/);
        for (var i = 0; i < 150; i++)
            if (seaMinLines[i].length > 0) {
                seaMinData = seaMinLines[i].split(",");
                var parts = seaMinData[0].split('/');
                seaMinPoints.push({ 
                    x: new Date(parts[2],parts[0],parts[1]) ,
                    y: parseFloat(seaMinData[3]) 		
                });
            }
        return seaMinPoints;
    }
// --------------------------------------------------------------------------------
// 1. Access three seperate csv files (test, testMax, testMin)
// 2. Create skeleton for graphs
// 3. Use f(x)'s to grab data points for Temperature, Dew Points, and Humidity
// 4. Issue w/ charts automatically resizing themselves
//    > Resolved: Hardcoded height and width for each chart
// -------------------------------------------------------------------------------- 
    var chart;
    var chart2;
    var chart3;
    var chart4;
    var chart5;
    var chart6;


    var test_csv = "https://raw.githubusercontent.com/j9stuart/SFBikeShareP3/master/DNa%20SF%20Bike/test.csv"
    var max_csv = "https://raw.githubusercontent.com/j9stuart/SFBikeShareP3/master/DNa%20SF%20Bike/testMax.csv"
    var min_csv = "https://raw.githubusercontent.com/j9stuart/SFBikeShareP3/master/DNa%20SF%20Bike/testMin.csv"
    var sea_csv = "https://raw.githubusercontent.com/j9stuart/SFBikeShareP3/master/DNa%20SF%20Bike/testSea.csv"
    var visibility_csv = "https://raw.githubusercontent.com/j9stuart/SFBikeShareP3/master/DNa%20SF%20Bike/testSea.csv"
    var wind_csv = "https://raw.githubusercontent.com/j9stuart/SFBikeShareP3/master/DNa%20SF%20Bike/testWind.csv"

    $.get(max_csv, function(data){
        chart = new CanvasJS.Chart("chartContainer", {
            height: 500,
            width: 1250,
            animationEnabled: true,
            exportEnabled: true,
            zoomEnabled: true,
            theme: "light2",
            title: {
                text: "San Francisco Weather (Canvas) [Maximum]",
                padding: 50
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
                type: "scatter",
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

    $.get(test_csv, function(data){
        chart2 = new CanvasJS.Chart("chartContainer2", {
            height: 500,
            width: 1250,
            animationEnabled: true,
            exportEnabled: true,
            zoomEnabled: true,
            theme: "light2",
            title: {
                text: "San Francisco Weather (Canvas) [Average]",
                padding: 50
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
                type: "scatter",
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

    $.get(min_csv, function(data){
        chart3 = new CanvasJS.Chart("chartContainer3", {
            height: 500,
            width: 1250,
            animationEnabled: true,
            exportEnabled: true,
            zoomEnabled: true,
            theme: "light2",
            title: {
                text: "San Francisco Weather (Canvas) [Minimum]",
                padding: 50
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
                type: "scatter",
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

    $.get(visibility_csv, function(data){
        chart4 = new CanvasJS.Chart("chartContainer4", {
            height: 500,
            width: 1250,
            animationEnabled: true,
            exportEnabled: true,
            zoomEnabled: true,
            theme: "light2",
            title: {
                text: "San Francisco Weather (Canvas)",
                padding: 50
            },
            axisY: {
                title: "Miles",
                valueFormatString: "##",
                interval: 2,
                suffix: " mi"
            },
            axisX:{
                title: "8/29/2013 - 2/24/2014",
                valueFormatString: "MM/DD/YYYY" ,
                interval: 10,
                intervalType: "month"
            },
            data: [{
                type: "splineArea",
                toolTipContent: "{x}: {y} miles [Min]",
                showInLegend: true,
                legendText: "Min. Visibility",
                markerSize: 5,
                color: "rgba(54,158,173,.7)",
                dataPoints: getVisibilityMinFromCSV(data)
            },
            {
                type: "splineArea",
                toolTipContent: "{x}: {y} miles [Avg]",
                showInLegend: true,
                legendText: "Avg. Visibility",
                markerSize: 5,
                color: "rgba(25,75,100,.7)",
                dataPoints: getVisibilityAvgFromCSV(data)
            },
            {
                type: "scatter",
                toolTipContent: "{x}: {y} miles [Max]",
                showInLegend: true,
                legendText: "Max. Visibility",
                markerSize: 5,
                color: "rgba(10,200,80,.7)",
                dataPoints: getVisibilityMaxFromCSV(data)
            }
        ]
    });
    chart4.render();        
});

    $.get(wind_csv, function(data){
        chart5 = new CanvasJS.Chart("chartContainer5", {
            height: 500,
            width: 1250,
            animationEnabled: true,
            exportEnabled: true,
            zoomEnabled: true,                
            theme: "light2",
            title: {
                text: "San Francisco Weather (Canvas)",
                padding: 50
            },
            axisY: {
                title: "Miles per Hour",
                valueFormatString: "##",
                interval: 10,
                suffix: " mph"
            },
            axisX:{
                title: "8/29/2013 - 2/24/2014",
                valueFormatString: "MM/DD/YYYY" ,
                interval: 10,
                intervalType: "month"
            },
            data: [{
                type: "splineArea",
                toolTipContent: "{x}: {y} mph [Max]",
                showInLegend: true,
                legendText: "Max. Wind Speed",
                markerSize: 5,
                color: "rgba(54,158,173,.7)",
                dataPoints: getWindMaxFromCSV(data)
            },
            {
                type: "splineArea",
                toolTipContent: "{x}: {y} mph [Avg]",
                showInLegend: true,
                legendText: "Avg. Wind Speed",
                markerSize: 5,
                color: "rgba(25,75,100,.7)",
                dataPoints: getWindAvgFromCSV(data)
            },
            {
                type: "scatter",
                toolTipContent: "{x}: {y} mph",
                showInLegend: true,
                legendText: "Gust Speed",
                markerSize: 5,
                color: "rgba(10,200,80,.7)",
                dataPoints: getGustFromCSV(data)
            }
        ]
    });
    chart5.render();        
});

    $.get(sea_csv, function(data){
        chart6 = new CanvasJS.Chart("chartContainer6", {
            height: 500,
            width: 1250,
            animationEnabled: true,
            exportEnabled: true,
            zoomEnabled: true,
            theme: "light2",
            title: {
                text: "San Francisco Weather (Canvas)",
                padding: 50
            },
            axisY: {
                title: "Sea Level Pressure",
                valueFormatString: "##",
                interval: 100,
                suffix: " inches"
            },
            axisX:{
                title: "8/29/2013 - 2/24/2014",
                valueFormatString: "MM/DD/YYYY" ,
                interval: 10,
                intervalType: "month"
            },
            data: [{
                type: "stackedArea",
                toolTipContent: "{x}: {y} in [Max]",
                showInLegend: true,
                legendText: "Max. Sea Level Pressure",
                markerSize: 5,
                color: "rgba(54,158,173,.7)",
                dataPoints: getSeaMaxFromCSV(data)
            },
            {
                type: "stackedArea",
                toolTipContent: "{x}: {y} in [Avg]",
                showInLegend: true,
                legendText: "Avg. Sea Level Pressure",
                markerSize: 5,
                color: "rgba(25,75,100,.7)",
                dataPoints: getSeaAvgFromCSV(data)
            },
            {
                type: "stackedArea",
                toolTipContent: "{x}: {y} in [Min]",
                showInLegend: true,
                legendText: "Min. Sea Level Pressure",
                markerSize: 5,
                color: "rgba(10,200,80,.7)",
                dataPoints: getSeaMinFromCSV(data)
            }
        ]
    });
    chart6.render();        
});

// --------------------------------------------------------------------------------
// 1. Render Charts after tabs have been created.
// 2. Updates the chart to its container size if it has changed.
// 
// --------------------------------------------------------------------------------

// $( "#dd" ).change(function() {
//  	chart.options.data[0].dataPoints = [];
//  	var e = document.getElementById("dd");
//     var selected = e.options[e.selectedIndex].value;
//  	dps = jsonData1[selected];
//  	for(var i in dps) {
//  		chart.options.data[0].dataPoints.push({label: dps[i].label, y: dps[i].y});
//  	}
//  	chart.render();
//  });

$("#tabs").tabs({
    create: function (event, ui) {
        $("#chartContainer").CanvasJSChart(chart);
        $("#chartContainer2").CanvasJSChart(chart2);
        $("#chartContainer3").CanvasJSChart(chart3);
        $("#chartContainer4").CanvasJSChart(chart4);
        $("#chartContainer5").CanvasJSChart(chart5);
        $("#chartContainer6").CanvasJSChart(chart6);              
    },
    activate: function (event, ui) {
        ui.newPanel.children().first().CanvasJSChart().render();
    }
});
}