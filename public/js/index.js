'use strict';

$(document).ready(function () {
    openLoginModal();
    closeLoginModal();
    openSignupModal();
    closeSignupModal();
    watchSubmit();
    watchUpdate();
    ajaxLogin(getAuthHeader);
    handleSignup(handleCreateAccountSuccess);
    createNewProject();
});

let user_id = "";
let project_name = "";
let relationship = "";
let idea_word = "";
let projectJson = {
    "children": []
};


function clearPage() {
    $(".main-content").hide();

}

function renderHomePage() {
    $(".main-content").show();
    $('.js-top-nav').show();
    $('.js-top').show();
    $('.js-cards').show();
}

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
        contentType: 'application/json',
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


function handleProtectedAuth() {
    var token = window.localStorage.getItem('jwt');
    var auth = 'Bearer ' + token;
    return auth;
}


function handleAccountAccess(callback) {
    // const url = "/user/:" + username 
    const settings = {
        headers: {
            'Authorization': handleProtectedAuth()
        },
        url: '/user/:userId/account',
        dataType: 'html',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);
}

function createNewProject() {
    $('.js-new-project').click(event => {
        event.preventDefault();
        // clearCanvas();
        handleProjectPage(renderProjectPage);
    })
}

function handleProjectPage(callback) {
    const url = '/user/profile';
    const settings = {
        headers: {
            'Authorization': handleProtectedAuth()
        },
        url: url,
        datatype: 'html',
        type: 'GET',
        success: callback
    }
    $.ajax(settings);
}

// get authorization header, store in local storage, call project page
function getAuthHeader(data, textStatus, request) {
    const response = request.responseJSON.authToken;
    user_id = request.responseJSON.user_id;
    // const id = "";
    localStorage.setItem('jwt', response);
    handleProjectPage(renderProjectPage);

}

// display Project page
function renderProjectPage(data, textStatus, request) {
    // $('.js-project-response').html('');
    // $('.mindstarter-project').html('');
    // $('.js-project-title').html('');
    const url = '/user/' + user_id + '/profile';
    window.history.pushState("", "Project", url);
    $('.loginModal').hide();
    $('.top-nav').hide();
    $('.js-top').hide();
    $('.js-cards').hide();
    $('.project-nav').css("display", "block");
    $('.new-project-icon').css("display", "block");
    $('.left-nav').css("display", "inline");
    $('.mindstarter-container').css("display", "block");
    $('.update-project').hide();

    //     for ( let i=0 ; i < data.projects.length; i++ ) {
    //     $('.projects-list').html(`<div class="project-item">
    //     <div class="project-right-title">${data.projects[i].name}</div>
    //     <div class="project-right-icon-bg">
    //         <div class="count"></div>
    //     </div>
    // </div>`)
    // }
}

// handle node count
function nodeCount() {
    const count = "";
    for (let i = 0; i < projectJson.length; i++) {
        count = i;
    }
    $('.count').html(count);
}

// parse login
function ajaxLogin(callback) {
    $('.js-login').submit(event => {
        event.preventDefault();
        const data = $(event.target).serialize();
        const settings = {
            data: data,
            url: "/api/auth/login",
            dataType: "json",
            type: "POST",
            success: callback
        }
        $.ajax(settings);
    })
}

function handleSignup(callback) {
    $('.js-signup').submit(event => {
        event.preventDefault();
        if ($('.js-signup-password').val() === $('.js-signup-password-confirm').val()) {
            const data = {}
            data.username = $('.js-signup-username').val();
            data.password = $('.js-signup-password').val();

            const settings = {
                data: data,
                url: "/api/users",
                dataType: "json",
                type: "POST",
                success: callback
            }
            $.ajax(settings)
        } else {
            $('.js-signup-message').html('passwords must match');
        }
    })

}


function handleCreateAccountSuccess() {
    $('.signupModal').css("display", "none");
    $('.loginModal').css("display", "block");
    $('.js-login-title').html('<b>Success!  Please sign in to continue.')
}

function renderProject() {
    var width = 960;
    var height = 960;

    var svg = d3.select(".mindstarter-project"),
        margin = 20,
        diameter = +svg.attr("width");
    window.g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    var color = d3.scaleSequential(d3.interpolateMagma)
        .domain([-4, 4]);

    var pack = d3.pack()
        .size([diameter - margin, diameter - margin])
        .padding(2);

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

    var circle = window.g.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function (d) {
            return d.parent ? d.children ? "node" : "node node--leaf js-leaf" : "node node--root js-root";
        })
        .attr("id", (function (d) {
            var a = 0;
            return function () {
                return a++
            }
        })())

        .style("fill", function (d) {
            return d.children ? color(d.depth) : null;
        })
        .on("click", function (d) {
            if (focus !== d) zoom(d), d3.event.stopPropagation();
            $('.js-idea').val(this.__data__.data.name);
        });
    var text = window.g.selectAll("text")
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

    var relationship = window.g.selectAll("relationship")
        .data(nodes)
        .enter().append("text")
        .attr("class", "relationships")
        .style("fill-opacity", function (d) {
            return d.parent === root ? 1 : 0;
        })
        .style("display", function (d) {
            return d.parent === root ? "inline" : "none";
        })
        .text(function (d) {
            return d.data.relationship;
        })

    var node = window.g.selectAll("circle,text,relationship");

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
                // if (!d.hasOwnProperty("children")) {
                //     this.style.display = "inline";
                // }
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
    $('.js-project-response').html(root);
};


function clearCanvas() {
    window.g.remove();
}

function displayResponseData(response, callback) {
    if (response != 0) {
        for (var i = 0; i < response.length; i++) {
            projectJson.children.push({
                name: response[i].word,
                size: "2000",
                relationship: relationship
            });
        }
        let project_data = projectJson;
        project_data.idea_word = idea_word;

        renderProject();
        updateDatabase(project_data, displayUpdatedResponse);
        // store project_data in database

    } else {
        const no_results = "Sorry, there were no results for this combination.  Try a different relationship type.";
        $('.js-project-response').html(no_results);
    };

};

function updateDatabase(project_data, callback) {
    const mindstarter_project = {
        id: user_id,
        project: {
            project_data
        }
    }

    const mindstarter_data = JSON.stringify(mindstarter_project);

    const url = '/project/' + user_id;
    const settings = {
        headers: {
            'Authorization': handleProtectedAuth,
        },
        data: mindstarter_data,
        url: url,
        headers: {
            "X-HTTP-Method-Override": "PUT"
        },
        dataType: 'json',
        contentType: "application/json",
        type: 'PUT',
        success: callback
    };
    $.ajax(settings);
}

function displayUpdatedResponse(data, textStatus, request) {
    console.log(`${data}`);
}

function displayNodeUpdate(response) {
    // check that the api response is not empty
    if (response != "") {
        // clear the canvas for redrawing
        clearCanvas();
        const new_child = [];
        // checking for a match of child nodes with the selected word
        for (var i = 0; i < projectJson.children.length; i++) {
            if (idea_word === projectJson.children[i].name) {
                for (var k = 0; k < response.length; k++) {
                    new_child.push({
                        name: response[k].word,
                        size: "500",
                        relationship: relationship
                    });
                }
                // add new children to specific child node
                projectJson.children[i].children = new_child;
                renderProject();
                // checking if child nodes have any children (2 levels deep)
            } else if (typeof projectJson.children[i].children != "undefined") {
                // matching selected word with its node 
                for (var l = 0; l < projectJson.children[i].children.length; l++) {
                    if (idea_word === projectJson.children[i].children[l].name) {
                        for (var m = 0; m < response.length; m++) {
                            new_child.push({
                                name: response[m].word,
                                size: "250",
                                relationship: relationship
                            });
                        }
                        // adding new children to specific node (now 3 levels deep)
                        projectJson.children[i].children[l].children = new_child;
                        renderProject();
                        // checking if children of child nodes have any children (at 3 levels deep)
                    } else if (typeof projectJson.children[i].children[l].children != "undefined") {
                        // matching selected word with its node
                        for (var n = 0; n < projectJson.children[i].children[l].children.length; n++) {
                            if (idea_word === projectJson.children[i].children[l].children[n].name) {
                                for (var o = 0; o < response.length; o++) {
                                    new_child.push({
                                        name: response[o].word,
                                        size: "125",
                                        relationship: relationship
                                    });
                                }
                                // adding new children to node now 4 levels deep
                                projectJson.children[i].children[l].children[n].children = new_child;
                                renderProject();
                            }
                        };
                    }
                };
            }
        };
    } else if (response == "") {
        const no_results = "Sorry, there were no results for this combination.  Try a different relationship type.";
        $('.js-project-response').html(no_results);
    }
};


function getRelationship(relationship_type) {
    let data = "";
    switch (relationship_type) {
        case "ml":
            data = "means like";
            break;
        case "sel_hom":
            data = "soundslike";
            break;
        case "sp":
            data = "spelled like";
            break;
        case "rel_syn":
            data = "synonym";
            break;
        case "rel_ant":
            data = "antonym";
            break;
        case "rel_rhy":
            data = "rhymes with";
            break;
    }
    return data;
}

function watchSubmit() {
    $('.js-project-form').submit(event => {
        console.log('save button clicked');
        event.preventDefault();
        const project_name_target = $(event.currentTarget).find('.js-project');
        const idea_target = $(event.currentTarget).find('.js-idea');
        const relationship_target = $(event.currentTarget).find('.js-relationship');
        const depth_target = $(event.currentTarget).find('.js-depth');
        project_name = project_name_target.val();
        idea_word = idea_target.val();
        const relationship_type = relationship_target.val();
        relationship = getRelationship(relationship_type);
        const depth = depth_target.val();

        projectJson.name = idea_word;
        projectJson.relationship = relationship;
        //  $('.result').text(JSON.stringify($('form').serializeObject()));
        getDataFromApi(relationship_type, idea_word, depth, displayResponseData);
        console.log('save submitted');
        $('.js-project-form').hide();
        $('.js-update-project').show();
        $('.js-project-title').html(project_name);
        $('.js-project-title').show();
        // updateProjectsList(project_name);
    });
}

function watchUpdate() {
    $('#update').click(event => {
        console.log('update button clicked');
        $('.js-update-project').submit(event => {
            event.preventDefault();
            const project_name_target = $(event.currentTarget).find('.js-project');
            const idea_target = $(event.currentTarget).find('.js-idea');
            const relationship_target = $(event.currentTarget).find('.js-relationship');
            const depth_target = $(event.currentTarget).find('.js-depth');
            const project_name = project_name_target.val();
            idea_word = idea_target.val();
            const relationship_type = relationship_target.val();
            relationship = getRelationship(relationship_type);
            const depth = depth_target.val();
            projectJson.name = idea_word;
            projectJson.relationship = relationship;
            getDataFromApi(relationship_type, idea_word, depth, displayNodeUpdate);
            console.log('update submitted');
        });
    });
};


function openLoginModal() {
    $('.js-openLogin').click(event => {
        event.preventDefault();
        // window.history.pushState("", "Login", "/login");
        $('.loginModal').css("display", "block");
    });
};

function closeLoginModal() {
    $().click(event => {
        if ((event.target == $('.loginModal'))) {
            $('.loginModal').css("display", "none");
        }
    })

    $('.close').click(event => {
        // window.history.pushState("", "Home", "/");
        $('.loginModal').css("display", "none");

    });
};

function openSignupModal() {
    $('.get-started').click(event => {
        event.preventDefault();
        $('.signupModal').css("display", "block");
    });
};

function closeSignupModal() {
    $().click(event => {
        if ((event.target == $('.signupModal'))) {
            $('.signupModal').css("display", "none");
        }
    })

    $('.close').click(event => {
        $('.signupModal').css("display", "none");

    });
};

function handleUserAccount() {
    $('.fa-user-circle').click(event => {
        event.preventDefault();

    })
}