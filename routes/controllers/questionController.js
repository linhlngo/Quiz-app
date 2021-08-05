import * as questionService from "../../services/choreService.js";

const addQuestion = async ({ request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  console.log(params);

  response.redirect("/");
};

export { addQuestion };