import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";


const router = new Router();

router.get("/", mainController.showMain);

router.get("/questions", questionController.listQuestions);
router.post("/questions", questionController.addQuestion);

router.post("/questions/:id/delete", questionController.deleteQuestion);

router.post("/questions/:id/options", questionController.addQuestionOption);
router.post("/questions/:questionId/options/:optionId/delete", questionController.deleteQuestionOption);



router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

export { router };
