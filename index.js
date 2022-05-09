var inquirer = require("inquirer");
var question = require("./service/questions");


const ReQuestion = (data) => {
  question.mainQuestion()
  .then((response) => question.loadSecondQuestion(response.option))
    .then((res) => {
      if (res.status) {
        //if user choose functionality option
        ReQuestion();
      } else {
        //if user choose Quit option
        console.log(res.message);
      }
    })
    .catch((err) => console.error(err));
};

function init() {
  question
    .mainQuestion()    
    .then((response) => question.loadSecondQuestion(response.option))
    .then(
      (res) => {
      
        if (res.status) {
          //if user choose functionality option
          ReQuestion();
        } else {
          //if user choose Quit option
          console.log(res.message);
        }
      },
      (err) => console.log(err)
    )
    .catch((err) => console.error(err));
}
init();
