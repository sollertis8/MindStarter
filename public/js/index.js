'use strict';
$(document).ready(function () {
    watchSubmit();

});

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

     
    const projectJson = {

        "name": idea_word,
        "children": []

    };
    // const results = JSON.stringify(response);
    
    for (var i = 0; i < response.length; i++) {
        projectJson.children.push({
            name: response[i].word,
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

    var circle = g.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function (d) {
            return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
        })
        .attr("id", (function(d){var a = 0; return function(){return a++}})())
        .style("fill", function (d) {
            return d.children ? color(d.depth) : null;
        })
        .on("click", function (d) {
            if (focus !== d) zoom(d), d3.event.stopPropagation();
        });

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
        });

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
            .style("fill-opacity", function (d) {
                return d.parent === focus ? 1 : 0;
            })
            .on("start", function (d) {
                if (d.parent === focus) this.style.display = "inline";
            })
            .on("end", function (d) {
                if (d.parent !== focus) this.style.display = "none";
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
    // });


    $('.js-project-response').html(root);
} else {
    const no_results = "Sorry, there were no results for this combination.  Try a different relationship type.";
    $('.js-project-response').html(no_results);
}

}

// function circleSize() {
//     var adjust_size = function (circle) {
//         var size = circle.height() + 10;
//         circle.width(size).height(size);
//     };

//     $.each($('.circle'), function (index, circle) {
//         adjust_size($(circle));
//     });
// }

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