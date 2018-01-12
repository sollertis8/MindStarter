$(docment).ready(function () {
    displayProject();
})

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



