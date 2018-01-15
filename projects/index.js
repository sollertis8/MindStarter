'use strict';
$( document ).ready(function() {
    formDataToJson;
});
// const {Project} = require('./models');
// const Project = require('./router');
// const {router} = require('./router');
// const router = express.Router();

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

function formDataToJson() {
    $('.js-project-form').submit(event => {
        event.preventDefault();
        $('#result').text(JSON.stringify($('form').serializeObject()));
       return false;
    });
}
  
  
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
  .findOne()
  .then(project => res.json({
      name: project.name,
      cuisine: restaurant.cuisine
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
  
  
  
  