var svg = d3.select('svg');

d3.csv("fruits.csv", function (fruits) {
    for (var i = 0; i < fruits.length; ++i) {
        fruits[i].carb = Number(fruits[i].carbohydrates)
        fruits[i].fiber = Number(fruits[i].fiber)
        fruits[i].sugar= Number(fruits[i].sugars)
        fruits[i].vitaminc = Number(fruits[i].vitaminC)
        fruits[i].potassium = Number(fruits[i].potassium)
    }
    var fruitNames = fruits.map(d => d.name);
    d3.csv("vegs.csv", function (vegs) {
        for (var i = 0; i < vegs.length; ++i) {
            vegs[i].carb = Number(vegs[i].carbohydrates)
            vegs[i].fiber = Number(vegs[i].fiber)
            vegs[i].sugar= Number(vegs[i].sugars)
            vegs[i].vitaminc = Number(vegs[i].vitaminC)
            vegs[i].potassium = Number(vegs[i].potassium)
        }
        var vegNames = vegs.map(d => d.name);

    //Create SVGs for charts
        var chart1 = d3
            .select("#chart1")
            .append("svg:svg")
            .attr("id", "svg1")
            .attr("width", 1000)
            .attr("height", 650);

        var chart2 = d3
            .select("#chart2")
            .append("svg:svg")
            .attr("id", "svg2")
            .attr("width",400)
            .attr("height", 650);

        var key = d3
            .select("#key")
    
        key.select("#Cooked")
            .append("circle")
            .attr("cx", "10")
            .attr("cy", "6")
            .attr("r", 5)
            .attr("fill", "#FFA500")
            .attr("stroke", "black")
    
        key.select("#Raw")
            .append("circle")
            .attr("cx", "10")
            .attr("cy", "6")
            .attr("r", 5)
            .attr("fill", "darkgreen")
            .attr("stroke", "black")
    
        key.select("#NA")
            .append("circle")
            .attr("cx", "10")
            .attr("cy", "6")
            .attr("r", 5)
            .attr("fill", "darkgray")
            .attr("stroke", "black")

        var mode = "Fruits";
        var carbExtent;
        var fiberExtent;
        var sugarExtent;
        var vitamincExtent;
        var potassiumExtent;
        var names; 
        var file;
        var pad;
        var xScale, yScale, xScale2, yScale2, xAxis, yAxis, xAxis2, yAxis2;
        let xOption = "carb"
        let yOption = "sugar"
        let xLabel = ""
        let yLabel = ""
        var xScale2, yScale2;
        var xpos, ypos;
        
    //Create Dropdown Options and uodate charts
        const categorySelect = d3.select("#category-select");

        categorySelect.append("option")
            .attr("value", "Fruits")
            .text("Fruits");
        categorySelect.append("option")
            .attr("value", "Vegetables")
            .text("Vegetables");

        d3.select("#category-select").on("change", function() {
            mode = this.value;
            updateScale(mode, xOption, yOption);
            chart1.selectAll("*").remove();
            chart2.selectAll("*").remove();
            update(mode);
        });

    //Create X-Axis Dropdown Options for Chart2 and update charts 
        const xAxisSelect = d3.select("#xAxis-select");

        xAxisSelect.append("option")
            .attr("value", "carb")
            .text("Carbohydrate");
        xAxisSelect.append("option")
            .attr("value", "sugar")
            .text("Sugar");
        xAxisSelect.append("option")
            .attr("value", "vitaminc")
            .text("VitaminC");
        xAxisSelect.append("option")
            .attr("value", "potassium")
            .text("Potassium");

        d3.select("#xAxis-select").on("change", function() {
            xOption = this.value;
            updateScale(mode, xOption, yOption);
            chart1.selectAll("*").remove();
            chart2.selectAll("*").remove();
            update(mode);
        });

    //Create Y-Axis Dropdown Options for Chart2 and update charts
        const yAxisSelect = d3.select("#yAxis-select");

        yAxisSelect.append("option")
            .attr("value", "sugar")
            .text("Sugar");
        yAxisSelect.append("option")
            .attr("value", "carb")
            .text("Carbohydrate");
        yAxisSelect.append("option")
            .attr("value", "vitaminc")
            .text("VitaminC");
        yAxisSelect.append("option")
            .attr("value", "potassium")
            .text("Potassium");

        d3.select("#yAxis-select").on("change", function() {
            yOption = this.value;
            updateScale(mode, xOption, yOption);
            chart1.selectAll("*").remove();
            chart2.selectAll("*").remove();
            update(mode);
        });

    // Functions used for scaling axes 
    function updateScale(mode, x, y){
        //Update the extents based on the mode
        if (mode == "Fruits"){
            carbExtent = d3.extent(fruits, function (row) {
                return row.carb;
            });
            fiberExtent = d3.extent(fruits, function (row) {
                return row.fiber;
            });
            sugarExtent = d3.extent(fruits, function (row) {
                return row.sugar;
            });
            vitamincExtent = d3.extent(fruits, function (row) {
                return row.vitaminc;
            });
            potassiumExtent = d3.extent(fruits, function (row) {
                return row.potassium;
            });
            names = fruitNames;
            file = fruits;
            pad = 55.5;
        } else if (mode == "Vegetables"){
            carbExtent = d3.extent(vegs, function (row) {
                return row.carb;
            });
            fiberExtent = d3.extent(vegs, function (row) {
                return row.fiber;
            });
            sugarExtent = d3.extent(vegs, function (row) {
                return row.sugar;
            });
            vitamincExtent = d3.extent(vegs, function (row) {
                return row.vitaminc;
            });
            potassiumExtent = d3.extent(vegs, function (row) {
                return row.potassium;
            });
            names = vegNames;
            file = vegs;
            pad = 52;
        }

    //Initialize variables and set up scale and axis
        xScale = d3.scaleBand().domain(names).range([0, 840]);
        yScale = d3.scaleLinear().domain(fiberExtent).range([300, 30]);

        if (x == "carb"){
            xScale2 = d3.scaleLinear().domain(carbExtent).range([50, 380]);
            xLabel = "Carbohydrates (g)";
            xpos = d => xScale2(d.carb);
        } else if (x == "sugar"){
            xScale2 = d3.scaleLinear().domain(sugarExtent).range([50, 380]);
            xLabel = "Sugar (g)";
            xpos = d => xScale2(d.sugar);
        } else if (x == "vitaminc"){
            xScale2 = d3.scaleLinear().domain(vitamincExtent).range([50, 380]);
            xLabel = "Vitamin C (mg)";
            xpos = d => xScale2(d.vitaminc);
        } else if (x == "potassium"){
            xScale2 = d3.scaleLinear().domain(potassiumExtent).range([50, 380]);
            xLabel = "Potassium (mg)";
            xpos = d => xScale2(d.potassium);
        }

        if (y == "carb"){
            yScale2 = d3.scaleLinear().domain(carbExtent).range([300, 30]);
            yLabel = "Carbohydrates (g)";
            ypos = d => (yScale2(d.carb) + 100);
        } else if (y == "sugar"){
            yScale2 = d3.scaleLinear().domain(sugarExtent).range([300, 30]);
            yLabel = "Sugar (g)"
            ypos = d => (yScale2(d.sugar) + 100);
        } else if (y == "vitaminc"){
            yScale2 = d3.scaleLinear().domain(vitamincExtent).range([300, 30]);
            yLabel = "Vitamin C (mg)"
            ypos = d => (yScale2(d.vitaminc) + 100);
        } else if (y == "potassium"){
            yScale2 = d3.scaleLinear().domain(potassiumExtent).range([300, 30]);
            yLabel = "Potassium (mg)"
            ypos = d => (yScale2(d.potassium) + 100);
        }
     
         xAxis = d3.axisBottom().scale(xScale);
         yAxis = d3.axisLeft().scale(yScale);
     
         xAxis2 = d3.axisBottom().scale(xScale2);
         yAxis2 = d3.axisLeft().scale(yScale2);
    }

    //Function for update charts
    function update(mode){ 
    //Chart1 Axis
        chart1 
            .append("g")
            .attr("transform", "translate(50," + 400 + ")")
            .call(xAxis) 
            .selectAll("text")
            .style("text-anchor", "start")
            .attr("transform", "translate(5, 0) rotate(55)");
    
        chart1 
            .append("g")
            .attr("transform", "translate(50, 100)")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end");
    
    //Chart1 Labels
        chart1
            .append("text")
            .text("Fiber in " + mode)
            .attr('transform','translate(370, 90)')
            .style('font-weight', 'bold')
        
        chart1
            .append("text")
            .text(mode + " Names")
            .attr('transform','translate(430,' + 560 + ')')
            .style('font-weight', 'bold')
    
        chart1
            .append("text")
            .text("Fiber (g)")
            .attr("transform", "rotate(-90)")
            .attr("x", -290)
            .attr("y", 20)
            .style('font-weight', 'bold')

    //Chart2 Axis
        chart2
            .append("g") 
            .attr("transform", "translate(0," + 400 + ")")
            .call(xAxis2)
            .append("text")
            .attr("class", "label")
            .attr("x", 484)
            .attr("y", -6)
            .style("text-anchor", "end");
    
        chart2 
            .append("g") 
            .attr("transform", "translate(50, 100)")
            .call(yAxis2)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end");

    //Chart2 Labels
        chart2
            .append("text")
            .text(xLabel)
            .attr('transform','translate(185,' + 440 + ')')
            .style('font-weight', 'bold')
    
        chart2
            .append("text")
            .text(yLabel)
            .attr("transform", "rotate(-90)")
            .attr("x", -290)
            .attr("y", 15)
            .style('font-weight', 'bold')

    //Create tooltip
        var tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('border', '1px solid black')
            .style('padding', '5px')
            .style('border-radius', '5px')
            .style('opacity', 0); // Start with opacity 0 to keep it hidden
    
    //Draw the bars for chart1 and create mouse over event
        var scale = d3.scaleLinear()
        scale.domain(fiberExtent)
            .range([0, 300-30])
            
        chart1.selectAll('.bar').data(file)
                .enter()
                .append('rect')
                .attr('width', 6)
                .attr('height', d => d.fiber == 0? 5 : scale(d.fiber))
                .attr('x', d => (xScale(d.name)) + pad)
                .attr('y', d => (yScale(d.fiber)) + 100)
                .attr('stroke', 'black')
                .attr('class', function(d) {
                    var name = "bar "
                    if (d.name.includes("cooked")&& d.fiber != 0) {
                        name += 'cooked'
                    } else if (d.fiber != 0){
                        name += 'raw'
                    } 
                    return name;
                    })
                .on('mouseover', function(event, d) {
                    const data = file[d];
                    tooltip.style('opacity', 1)
                        .style('left', ((xScale(data.name)) ) + 'px')
                        .style('top', ((yScale(data.fiber)) + 100) + 'px');
                    tooltip.selectAll('*').remove();
                    tooltip.append('div')
                        .text(data.name)
                        .style('font-weight', 'bold');
                    tooltip.append('div')
                        .text(function(){
                            let text = "Fiber: "
                            if (data.fiber == 0){
                                text += "Not Available"
                            } else {
                                text += data.fiber + " g";
                            }
                            return text;});
                    tooltip.append('div')
                    .text(function(){
                        let text = "Carbohydrate: "
                        if (data.carb == 0){
                            text += "Not Available"
                        } else {
                            text += data.carb + " g";
                        }
                        return text;});
                    tooltip.append('div')
                    .text(function(){
                        let text = "Sugar: "
                        if (data.sugar == 0){
                            text += "Not Available"
                        } else {
                            text += data.sugar + " g";
                        }
                        return text;});
                    tooltip.append('div')
                    .text(function(){
                        let text = "Vitamin C: "
                        if (data.vitaminC == 0){
                            text += "Not Available"
                        } else {
                            text += data.vitaminC + " mg";
                        }
                        return text;});
                    tooltip.append('div')
                    .text(function(){
                        let text = "Potassium: "
                        if (data.potassium == 0){
                            text += "Not Available"
                        } else {
                            text += data.potassium + " mg";
                        }
                        return text;})
                    chart1.selectAll('.bar')
                        .style('opacity', function(d){
                            return d == data? '1':'0.2'});
                    chart2.selectAll('circle')
                        .style('opacity', function(d){
                            return d == data? '1':'0.2'});
                    }).on('mouseout', function() {
                        // TO-DO: Hide the tooltip when not hovering
                        tooltip.style('opacity', 0);
                        chart1.selectAll('.bar')
                        .style('opacity', '1');
                        chart2.selectAll('circle')
                        .style('opacity','1');
                    });
            
    //Draw circle for the scatterplot and mouse over event
        chart2.selectAll('circle')
            .data(file)
            .enter()
            .append('circle')
            .attr('cx', xpos)
            .attr('cy', ypos)
            .attr('r', '4')
            .attr('stroke', 'black')
            .attr('class', function(d) {
                var name;
                if (d.name.includes("cooked")) {
                    name = 'cooked'
                } else {
                    name = 'raw'
                } 
                return name;
              })
            .on('mouseover', function(event, d) {
                const data = file[d];
                let xData, yData;
                if (xOption == "carb"){
                    xData = data.carb;
                } else if (xOption == "sugar"){
                    xData = data.sugar;
                } else if (xOption == "vitaminc"){
                    xData = data.vitaminc;
                } else if (xOption == "potassium"){
                    xData = data.potassium;
                };
                if (yOption == "carb"){
                    yData = data.carb;
                } else if (yOption == "sugar"){
                    yData = data.sugar;
                } else if (yOption == "vitaminc"){
                    yData = data.vitaminc;
                } else if (yOption == "potassium"){
                    yData = data.potassium;
                };
                tooltip.style('opacity', 1)
                    .style('left', (xScale2(xData) + 950) + 'px')
                    .style('top', (yScale2(yData) + 180) + 'px');
                tooltip.selectAll('*').remove();
                tooltip.append('div')
                    .text(data.name)
                    .style('font-weight', 'bold');
                chart1.selectAll('.bar')
                    .style('opacity', function(d){
                        return d == data? '1':'0.2'});
                chart2.selectAll('circle')
                    .style('opacity', function(d){
                        return d == data? '1':'0.2'});
                }).on('mouseout', function() {
                    // TO-DO: Hide the tooltip when not hovering
                    tooltip.style('opacity', 0);
                    chart1.selectAll('.bar')
                    .style('opacity', '1');
                    chart2.selectAll('circle')
                    .style('opacity','1');
                });
            }
    
    //Initialize the charts
        updateScale("Fruits", "carb", "sugar");
        update("Fruits");
    });
});