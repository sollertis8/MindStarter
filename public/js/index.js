'use strict';
$(document).ready(function () {
    watchSubmit();

});

window.FontAwesomeConfig = { searchPseudoElements: true };

// const {Project} = require('./models');
// const Project = require('./router');
// const {router} = require('./router');
// const router = express.Router();

// const Project = require('../routes/index.js')


// module.exports = {Project, router};


// let parent = `{    "name" : "${idea_word}",
//                    "children" : "${children}", 
//                    "relationship_type" : "${relationship_type}",
//                    "depth" : "${depth}"
//                  }`;

// let child = `{
//     "idea_word" : "${idea_word}",
//     "relationship_type" : "${relationship_type}",
//     "depth" : "${depth}"
//   }`;

// router.use('/project', Project)


// gets relationship data from the api
function getDataFromApi(relationship, word, depth, callback) {
    let data = {};
    switch (relationship) {
        case "ml":
            data = {
                ml: `${word}`,
                max: `${depth}`
            };
            break;
        case "sel_hom":
            data = {
                sel: `${word}`,
                max: `${depth}`
            };
            break;
        case "sp":
            data = {
                sp: `${word}`,
                max: `${depth}`
            };
            break;
        case "rel_syn":
            data = {
                rel_syn: `${word}`,
                max: `${depth}`
            };
            break;
        case "rel_ant":
            data = {
                rel_ant: `${word}`,
                max: `${depth}`
            };
            break;
        case "rel_rhy":
            data = {
                rel_rhy: `${word}`,
                max: `${depth}`
            };
            break;
    }

    const settings = {
        data: data,
        url: 'https://api.datamuse.com/words',
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings)
}

// allows user to get autocomplete feedback
function autoComplete(callback) {
    const settings = {
        url: 'https://api.datamuse.com/sug',
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings)
}

function formDataToJson(project_name, idea_word, relationship_type, depth, callback) {
    const settings = {
        data: {
            project_name: `${project_name}`,
            idea_word: `${idea_word}`,
            relationship_type: `${relationship_type}`,
            depth: `${depth}`
        },
        url: 'http://localhost:8080/project',
        dataType: 'json',
        contentType: 'application/json',
        type: 'POST',
        success: callback
    };
    $.ajax(settings)
}
// will fix using global variable later
function displayResponseData(response) {
    if(response != 0){

     const ellipsis = '\uf142';
    const projectJson = {

        "name": idea_word,
        "children": []

    };
    // const results = JSON.stringify(response);
    
    for (var i = 0; i < response.length; i++) {
        projectJson.children.push({
            name: response[i].word,
            icon: 'hello',
            size: "2000"
        });
    }
projectJson.children.splice(0, 0, {
        name: "awesome",
        children: [
            {name: "amazing", size: "500"},
            {name: "spectacular", size: "500"},
            {name: "unbelievable", size: "500"},
            {name: "fantastic", size: "500"}
        ]
    });
    // const fs = require('fs');

    // fs.exists('project.json', (exists) => {
    //     if (exists) {
    //         console.log("file exists");
    //         fs.readFile('project.json', function readFileCallBack(err, data) {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 obj = JSON.parse(data);
    //                 for (i = 0; i < data.length; i++) {
    //                     obj.project.push(projectJson);
    //                 }
    //                 const json = JSON.stringify(obj);
    //                 fs.writeFile('project.json', json);

    //             }
    //         });
    //     } else {
    //         console.log("file does not exist")
    //         for (i = 0; i < data.length; i++) {
    //             obj.project.push(projectJson);
    //         }
    //         const json = JSON.stringify(obj);
    //         fs.writeFile('project.json', json);
    //     }
    // })
    // var margin = {top: 20, right: 10, bottom: 20, left: 10};
    // var width = 800 - margin.left - margin.right;
    // var height = 480 - margin.top - margin.bottom;
   
    var width = 960;
    var height = 960;

    var svg = d3.select("svg"),
        margin = 20,
        diameter = +svg.attr("width"),
        g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    var color = d3.scaleLinear()
        .domain([-1, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl);

    var pack = d3.pack()
        .size([diameter - margin, diameter - margin])
        .padding(2);

    // d3.json("project.json", function (error, root) {
    //     if (error) throw error;
    var root = projectJson;
    root = d3.hierarchy(root)
        .sum(function (d) {
            return d.size;
        })
        .sort(function (a, b) {
            return b.value - a.value;
        });

    var focus = root,
        nodes = pack(root).descendants(),
        view;

    // var ellipsis = $('.node--leaf').html(`<i class="fa fa-cog fa-fw"></i>`)

    var rectangle = svg.append('rect')
    .attr({
        'width': width * 0.8,
        'height': height * 0.8,
        'x': width * 0.1,
        'y': height * 0.1,
        'fill': '#F8F8F8'
    });
var foWidth = 100;
var foHeight = 100;
var anchor = {'w': width/3, 'h': height/3};
var t = 50, k = 15;
var tip = {'w': (3/4 * t), 'h': k};


    var circle = g.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function (d) {
            return d.parent ? d.children ? "node" : "node node--leaf js-leaf" : "node node--root js-root";
        })
        .attr("id", (function(d){var a = 0; return function(){return a++}})())
        
        .style("fill", function (d) {
            return d.children ? color(d.depth) : null;
        })
        .on("click", function (d) {
            if (focus !== d) zoom(d), d3.event.stopPropagation();
        })

        .on('mouseover', function() {
            // Selection.html('&#xf040')
            g.select("circle").selectAll("text")
            .html('\uf142');

            // .text(function () {
            //     let icon = selection.html('&#xf040')
            //     return icon;
            // .text('&#xf040')
            // });

        })

        // .on('mouseout', function() {
        //     g.selectAll('text')
        //     .remove();
        // });

    var text = g.selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("class", "label")
        .style("fill-opacity", function (d) {
            return d.parent === root ? 1 : 0;
        })
        .style("display", function (d) {
            return d.parent === root ? "inline" : "none";
        })
        .text(function (d) {
            return d.data.name;
        })
        // .text(function (d) {
        //     return '&#xf040';
        // // .text('&#xf040')
        // });
//  var icon_ellipsis = g.selectAll('text')
//         .data(nodes)
//         .enter().append("text")
//         .attr("class", "ellipsis")
//         .style("fill-opacity", function() {
//                 return d3.parent === root ? "block" : "none";
//         })
//         .style("display", function (d) {
//             return d.parent === root ? "block" : "none";
//         })
//         .text(function(d){
//             return d.data.icon;
//         });

    var node = g.selectAll("circle,text");

    svg
        .style("background", color(-1))
        .on("click", function () {
            zoom(root);
        });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoom(d) {
        var focus0 = focus;
        focus = d;

        var transition = d3.transition()
        // .attr("class", function (d) {
        //     return d.children ? "i" :"fas fa-ellipsis-v";
        // })
            .duration(d3.event.altKey ? 7500 : 750)
            .tween("zoom", function (d) {
                var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                return function (t) {
                    zoomTo(i(t));
                };
            });
            
        transition.selectAll("text")
            .filter(function (d) {
                return d.parent === focus || this.style.display === "inline";
            })
            .filter(function (d) {
                return d.parent === focus || this.style.display === "inline";
            })
            .style("fill-opacity", function (d) {
                return d.parent === focus ? 1 : 1;
            })
            .on("start", function (d) {
                if (d.parent === focus) this.style.display = "inline";
                
            })
            .on("end", function (d) {
                // if (d.parent !== focus) this.style.display = "none";
                if (d.children === focus) this.style.diaplay = "inline";
            });
    }

    function zoomTo(v) {
        var k = diameter / v[2];
        view = v;
        node.attr("transform", function (d) {
            return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
        });
        circle.attr("r", function (d) {
            return d.r * k;
        });
    }
    $('.js-project-response').html(root);
} else {
    const no_results = "Sorry, there were no results for this combination.  Try a different relationship type.";
    $('.js-project-response').html(no_results);
}

}

// function watchLoginSubmit() {
//     $('.js-loginSubmit').submit(event=> {

//     })
// }

let idea_word = "";

function watchSubmit() {
    $('.js-project-form').submit(event => {
        event.preventDefault();
        const project_name_target = $(event.currentTarget).find('.js-project');
        const idea_target = $(event.currentTarget).find('.js-idea');
        const relationship_target = $(event.currentTarget).find('.js-relationship');
        const depth_target = $(event.currentTarget).find('.js-depth');
        const project_name = project_name_target.val();
        idea_word = idea_target.val();
        const relationship_type = relationship_target.val();
        const depth = depth_target.val();
        //  $('.result').text(JSON.stringify($('form').serializeObject()));
        getDataFromApi(relationship_type, idea_word, depth, displayResponseData);
    });
}

// function watchDoubleClick(){
//     $( ".node node--leaf" ).dblclick(event => {
//         // event.preventDefault();
//         const project_name_target = $(event.currentTarget).find('.js-project');
//         const idea_target = $(event.currentTarget).find('.js-idea');
//         const relationship_target = $(event.currentTarget).find('.js-relationship');
//         const depth_target = $(event.currentTarget).find('.js-depth');
//         const project_name = project_name_target.val();
//         idea_word = idea_target.val();
//         const relationship_type = relationship_target.val();
//         const depth = depth_target.val();
//         //  $('.result').text(JSON.stringify($('form').serializeObject()));
//         getDataFromApi(relationship_type, idea_word, depth, displayNodeUpdate);
//         console.log( "Handler for .dblclick() called." );
//       });
      
// }

// function displayNodeUpdate(){
    
// }