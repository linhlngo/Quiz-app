import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";


const router = new Router();

router.get("/", mainController.showMain);
router.post("/questions", questionController.addChore);


export { router };