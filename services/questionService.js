import { executeQuery } from "../database/database.js";

const addQuestion = async (user_id, title, question_text) => {
  await executeQuery(
    `INSERT INTO questions
      (user_id, title, question_text)
        VALUES ($1, $2, $3)`,
    user_id,
    title,
    question_text,
  );
};

export { addQuestion };