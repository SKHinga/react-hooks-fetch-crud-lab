import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    const asynch = async()=>{
      const response = await fetch("http://localhost:4000/questions");
      const figures = await response.json();
      setQuestions(figures);
    };
    asynch();
  }, [])

  function deleteItem(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    }).then(r=>r.json).then(()=>{
      const removed = questions.filter(did => did.id !== id);
      setQuestions(removed);
    } 
    )}

  const data = questions.map(quiz=>(
    <QuestionItem question={quiz} key={quiz.id} handleDelete={deleteItem}/>
  ))


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{data}</ul>
    </section>
  );
}

export default QuestionList;
