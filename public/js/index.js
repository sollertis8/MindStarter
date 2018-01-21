// 'use strict';
// $( document ).ready(function() {
//     watchSubmit();

// });
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
       contentType : 'application/json',
       type: 'POST',
       success: callback
    };
    $.ajax(settings)
}

function displayResponseData(response) {
   if (response.data.length == 0) {
       $('.js-project-response').html('It Worked!');
       return
   }
}

function watchSubmit() {
$('.js-project-form').submit(event => {
    event.preventDefault();
    const project_name_target = $(event.currentTarget).find('.js-project');
    const idea_target = $(event.currentTarget).find('.js-idea');
    const relationship_target = $(event.currentTarget).find('.js-relationship');
    const depth_target = $(event.currentTarget).find('.js-depth');
    const project_name = (project_name_target).val();
    const idea_word = (idea_target).val();
    const relationship_type = (relationship_target).val();
    const depth = (depth_target).val();
    //  $('.result').text(JSON.stringify($('form').serializeObject()));
    formDataToJson(project_name, idea_word, relationship_type, depth, displayResponseData);
    });
}

