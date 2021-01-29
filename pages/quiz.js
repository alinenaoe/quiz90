/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import LoadingWidget from '../src/components/LoadingWidget';
// import QuizResult from '../src/components/QuizResult';

function QuestionWidget({
  question, questionIndex, totalQuestions, onSubmit,
}) {
  const questionId = `question___${questionIndex}`;

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, alternativeindex) => {
            const alternativeID = `alternative__${alternativeindex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeID}
              >
                <input
                  style={{
                    marginRight: '12px',
                  }}
                  id={alternativeID}
                  name={questionId}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>

      {screenState === screenStates.QUIZ && (
        <QuizContainer>
          <QuizLogo />
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        </QuizContainer>
      )}
      {screenState === screenStates.LOADING && (
        <QuizContainer>
          <QuizLogo />
          <LoadingWidget />
        </QuizContainer>
      )}
      {screenState === screenStates.RESULT && (
        <QuizContainer>
          <QuizLogo />
          {/* <QuizResult /> */}
          <p>RESULTADO DO QUIZ</p>
        </QuizContainer>
      )}

      <GitHubCorner projectUrl="https://github.com/alinenaoe" />
    </QuizBackground>
  );
}
