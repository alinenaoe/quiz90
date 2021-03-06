/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import GitHubCorner from '../../components/GitHubCorner';
import Button from '../../components/Button';
import LoadingWidget from '../../components/LoadingWidget';
import QuizResult from '../../components/QuizResult';
import AlternativesForm from '../../components/AlternativesForm';

function QuestionWidget({
  question, questionIndex, totalQuestions, onSubmit, addResult,
}) {
  const questionId = `question___${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const isCorrect = selectedAlternative === question.answer;
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <Widget>
      <Widget.Header>
        <h3 style={{ marginTop: 0 }}>
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

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsConfirmed(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsConfirmed(false);
              setSelectedAlternative(undefined);
            }, 2000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            let dataStatus = 'NEUTRAL';

            if (isConfirmed && isCorrect) {
              dataStatus = 'SUCCESS';
            } else if (isConfirmed && !isCorrect) {
              dataStatus = 'ERROR';
            } else {
              dataStatus = 'NEUTRAL';
            }

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={selectedAlternative === alternativeIndex}
                data-status={dataStatus}
              >
                <input
                  style={{
                    marginRight: '12px',
                  }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  value={alternativeIndex}
                  checked={alternativeIndex === selectedAlternative}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={selectedAlternative === undefined}>
            Confirmar
          </Button>
        </AlternativesForm>
        {isCorrect && isConfirmed && <h1 style={{ textAlign: 'center', marginTop: 20 }}>Certa resposta!</h1>}
        {!isCorrect && isConfirmed && <h1 style={{ textAlign: 'center', marginTop: 20 }}>Errrrrrooooou!</h1>}
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuizData, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [result, setResult] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuizData[questionIndex];
  const totalQuestions = externalQuizData.length;
  const bg = externalBg;

  function addResult(isCorrect) {
    if (isCorrect) {
      setResult(result + 1);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.LOADING);
      setTimeout(() => {
        setScreenState(screenStates.RESULT);
      }, 3000);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>

      {screenState === screenStates.QUIZ && (
        <QuizContainer>
          <QuizLogo />
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        </QuizContainer>
      )}
      {screenState === screenStates.LOADING && (
        <>
          <QuizContainer>
            <QuizLogo />
          </QuizContainer>
          <LoadingWidget />
        </>
      )}
      {screenState === screenStates.RESULT && (
        <QuizContainer>
          <QuizLogo />
          <QuizResult result={result} />
        </QuizContainer>
      )}

      <GitHubCorner projectUrl="https://github.com/alinenaoe/quiz90" />
    </QuizBackground>
  );
}
