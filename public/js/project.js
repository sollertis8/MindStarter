// const {Project} = require('../../projects/router.js');

// module.exports = {Project};

// $(document).ready(function () {
//     displayProject();
// })

// gets relationship data from the api
function getDataFromApi(word, relationship, depth, callback) {
const settings = {
    data: {
       ml: `${meansLike}`,
       sl: `${soundsLike}`,
       sp: `${spelledLike}`,
       rl_jja: `${popularNounModified}`,
       rl_syn: `${synonym}`,
       rl_ant: `${antonym}`,
       topics: `${topic}`,
       max: `${depth}`
    },
    url: 'https://api.datamuse.com/words',
    dataType: 'json',
    type:'GET',
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

// displays user project
function displayProject() {

}

function getUserProject(projectName) {
const words = {};
const relationships = {};
const relationship = "";
const depth = "";

}

function displayUserProject() {

}

function generateBrainstorm() {

}

function createProject() {
    Project
.then(project => res.json({
    name: project.name,
    size: restaurant.size
}))
.catch(err => {
    console.error(err)
    res.status(500).json({message: 'Something went wrong'})}
);
}

function loadProject() {
    Project
    .findOne()
    .then(project => res.json({
        name: project.name,
        id: project.id
    }))
    .catch(err => {
        console.error(err)
        res.status(500).json({message: 'Something went wrong'})}
    );
}


function circleSize() {
    var adjust_size = function(circle){
        var size = circle.height()+10;
        circle.width(size).height(size);
    };
    
    $.each($('.circle'), function(index, circle){
            adjust_size($(circle));
    });
}



