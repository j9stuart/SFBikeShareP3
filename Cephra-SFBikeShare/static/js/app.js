// Plot the default route once the page loads
var defaultURL = "/bar";
console.log("We made it!");
d3.json(defaultURL).then(function(data) {
      var data1 = [data[0]];
      var data2 = [data[1]];
  console.log(data);
  var layout1 = { 
      margin: { t: 30, b: 100 }, 
      title: "Most Popular Start Stations - Bay Area",
      xaxis: {
        title: "Station Name"
      },
      yaxis: {
        title: "Number of Trips"
      }
  };
  var layout2 = { 
      margin: { t: 30, b: 100 }, 
      title: "Most Popular End Stations - Bay Area",
      xaxis: {
        title: "Station Name"
      },
      yaxis: {
        title: "Number of Trips"
      }
  };
  Plotly.plot("bar1", data1, layout1);
  Plotly.plot("bar2", data2, layout2);
});

// Update the plot with new data
function updatePlotlyStart(newdata) {
  Plotly.restyle("bar1", "x", [newdata.x]);
  Plotly.restyle("bar1", "y", [newdata.y]);
}

function updatePlotlyEnd(newdata) {
  Plotly.restyle("bar2", "x", [newdata.x]);
  Plotly.restyle("bar2", "y", [newdata.y]);
}

// Get new data whenever the dropdown selection changes
function getData(route) {
  console.log(route);
  d3.json(`${route}`).then(function(data) {
    console.log("newdata", data);
    updatePlotly(data);
  });
}

function cityDataS(route) {
     console.log(route);
  d3.json(`/city/${route}`).then(function(data) {
    console.log("newdata", data);
    updatePlotlyStart(data);
  });
}

function cityDataE(route) {
     console.log(route);
  d3.json(`/city/${route}`).then(function(data) {
    console.log("newdata", data);
    updatePlotlyEnd(data);
  });
}
