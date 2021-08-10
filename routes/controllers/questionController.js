import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    title: params.get("title"),
    question_text: params.get("question_text"),
    validationErrors: [],
  };
};


const addQuestion = async ({ request, response,user,render }) => {

  const questionData = await getQuestionData(request);

  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );

  if (!passes) {
    console.log(errors);
    questionData.validationErrors = errors;
    render("questions.eta", questionData);
  } else {
    await questionService.addQuestion(
      user.id,
      questionData.title,
      questionData.question_text,
    );

    response.redirect("/questions");
  }


};


const listQuestions = async ({ render,user }) => {
    render("questions.eta", {
       questions: await questionService.listQuestions() ,
       userQuestions = await questionService.listUserQuestions(user.id)
      });
  };

const addQuestionOption =  async ({ request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  let is_correct = false;
  if (request.body.has("is_correct")) is_correct = true
  await questionService.addQuestionOption(
      params.id,  //check
      params.get("option_text"),
      is_correct,
     );
    response.redirect(`/questions/${params.id}`);//
};

const listQuestionOptions =  async ({ render,  request, response }) => {
  render("question.eta", { 
    questionOptions: await questionService.listQuestionOptions() });
};

const deleteQuestion =  async ({ request, response }) => {
  const urlParts = request.url.split("/");
  await questionService.deleteQuestion(urlParts[2]);
  response.redirect("/questions")
};

const deleteQuestionOption =  async ({ request, response }) => {
  const urlParts = request.url.split("/");
  await questionService.deleteQuestion(urlParts[4]);
  response.redirect(`/questions/${urlParts[2]}`)
};




export {
  addQuestion,
  listQuestions,
  addQuestionOption,
  listQuestionOptions,
  deleteQuestion,
  deleteQuestionOption
};