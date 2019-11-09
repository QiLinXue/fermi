// Load Cookies
var c = decodeURIComponent(document.cookie);
c = c.substring(2,c.length);
try{
    var dps = JSON.parse(c);
}
catch{
    var dps = []
}

// Initialize Graph
var xVal = dps.length+1;
var yVal = 100; 
var dataLength = 20; // number of dataPoints visible at any point

var chart = new CanvasJS.Chart("chartContainer", {
    title :{
        text: "Progress"
    },
    axisY: {
        includeZero: true
    },      
    data: [{
        type: "line",
        dataPoints: dps
    }]
});

function updateChart(t){
    dps.push({
        x: xVal,
        y: t
    });
    xVal++;

    chart.render();
};

// Initialize Problem
function del(){
    while(dps.length > 0){
        dps.pop();
    }
    chart.render();

    document.cookie = "a="+JSON.stringify(dps)
    xVal = dps.length+1;
}

function generateProblem(){
    console.log(data[0]);
    i = data[Math.floor(Math.random() * data.length)];
    document.getElementById("question").innerHTML = i[0];
    return i
}

problem = generateProblem();

var input = document.getElementById("myInput");

function ev() {
    if(input.value !== ""){
        var x = parseFloat(input.value);
        var feedback = "placeholder";

        error = Math.abs(x-problem[1])
        document.getElementById("correct answer").innerHTML = "Previous Question: "+problem[0]+"<br/>Fermi Answer: <b>" + problem[1] + "</b>, Your Answer: <b>"+input.value;
        document.getElementById("myInput").value = "";

        updateChart(parseFloat(error));
        generateProblem();

        document.cookie = "a="+JSON.stringify(dps)
    }
}

// Event Listener
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        ev();
    }
});

chart.render();