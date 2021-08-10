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

const listQuestions= async () => {
    const res = await executeQuery(`SELECT * FROM questions;`);
    return res.rows;
  };

const listUserQuestions= async (user_id) => {
    const res = await executeQuery(`SELECT * FROM questions WHERE user_id = $1;`,user_id);
    return res.rows;
  };


const addQuestionOption  = async (question_id, option_text, is_correct) => {
  await executeQuery(
    `INSERT INTO question_answer_options
      (question_id, option_text, is_correct)
        VALUES ($1, $2, $3)`,
    question_id,
    option_text,
    is_correct,
  );
};

const listQuestionOptions  = async (question_id) => {
  const res = await executeQuery
  (`SELECT * FROM question_answer_options WHERE question_id = $1;`,question_id);
    return res.rows;
};

const deleteQuestion = async (id) => {
  await executeQuery(
    `DELETE FROM questions
    WHERE id = $1`,
    id,
  );
};

const deleteQuestionOption = async (id) => {
  await executeQuery(
    `DELETE FROM question_answer_options where 
    WHERE id = $1`,
    id,
  );
};





export { 
  addQuestion,
  listQuestions,
  addQuestionOption,
  listUserQuestions,
  listQuestionOptions,
  deleteQuestion,
  deleteQuestionOption,
  
};