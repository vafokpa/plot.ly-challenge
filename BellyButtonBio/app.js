
// Importing the dataset from the JSON file
var file = "data/samples.json";

var data = d3.json(file);


d3.json(file).then(function(data){

    var select = d3.select("#selDataset")

    data.names.forEach(person => {
        select.append("option").attr("value",person).text(person)

    })

// Create a listener based on person
select.on("change", personSelect);

function personSelect (patient_select) {
    var person_id = d3.select(this).property("value");
    var person_data = data.samples.filter(d => +d.id == +person_id)[0]
    var person_demo = data.metadata.filter(d => d.id == person_id)[0]
    var space = "    "
    barChart(person_data)
    bubbleChart(person_data) 

    // Adding the summary stats to the summary box 

    var summary = d3.select("#id")
    summary.text(`id: ${person_id}`);
    var ethnicity= d3.select("#ethnicity");
    ethnicity.text(`ethnicity: ${person_demo.ethnicity}`);
    var gender = d3.select("#gender");
    gender.text(`gender: ${person_demo.gender}`);
    var age = d3.select("#age");
    age.text(`age: ${person_demo.age}`);
    var location = d3.select("#location");
    location.text(`location: ${person_demo.location}`);
    var bbtype = d3.select("#bbtype");
    bbtype.text(`bbtype: ${person_demo.bbtype}`);
    var wfreq = d3.select("#wfreq");
    wfreq.text(`wfreq: ${person_demo.wfreq}`);



}

});
// Creating a function for the bar chart
function barChart(pdata) {
    var sample_values = pdata.sample_values;
    var otu_ids = pdata.otu_ids;
    var otu_labels = pdata.otu_labels;

// Data information for plotly
data = [{
    x: sample_values.slice(0,10).reverse(),
    y: otu_ids.slice(0,10).map(val => "OTU " + val + " ").reverse(),
    type: 'bar',
    orientation: 'h',
    text: otu_labels.slice(0,10),
}]

var layout = {
    showlegend:false
}

Plotly.newPlot("bar", data, layout);

}
// Creating a function for the bubble chart

function bubbleChart(pdata) {
    var sample_values = pdata.sample_values;
    var otu_ids = pdata.otu_ids;
    var otu_labels = pdata.otu_labels;

// Data info for the bubble chart
data2 = [{
    x: otu_ids,
    y: sample_values,
    mode: 'markers',
    text: otu_labels,
    marker:{
        size: sample_values,
        color: otu_ids
    },
}]

var layout = {
    showlegend:false
}

Plotly.newPlot("bubble", data2, layout);


}








