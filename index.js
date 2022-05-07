var inquirer = require("inquirer");
var question = require("./assets/js/questions");

const ReQuestion = (data) => {
  question.mainQuestion()
  .then((response) => question.loadSecondQuestion(response.option))
    .then((res) => {
      if (res.status) {
        ReQuestion();
      } else {
        console.log(res.message);
      }
    })
    .catch((err) => console.error(err));
};

function init() {
  question
    .mainQuestion()
    // Use writeFileSync method to use promises instead of a callback function
    .then((response) => question.loadSecondQuestion(response.option))
    .then(
      (res) => {
       // console.log(res);
        if (res.status) {
          ReQuestion();
        } else {
          console.log(res.message);
        }
      },
      (err) => console.log(err)
    )
    .catch((err) => console.error(err));
}
init();
