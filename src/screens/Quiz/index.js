/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

// import db from '../../db.json';
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
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={selectedAlternative === alternativeIndex}
                data-status={isConfirmed && isCorrect ? 'SUCCESS' : 'ERROR'}
              >
                <input
                  style={{
                    marginRight: '12px',
                  }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={selectedAlternative === undefined}>
            Confirmar
          </Button>
          {isCorrect && isConfirmed && <p>Certa resposta!</p>}
          {!isCorrect && isConfirmed && <p>Errrrrrooooou!</p>}
        </AlternativesForm>
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
  const question = externalQuizData.questions[questionIndex];
  const totalQuestions = externalQuizData.questions.length;
  const bg = externalBg;

  function addResult(isCorrect) {
    if (isCorrect) {
      setResult(result + 1);
    }
  }

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
      setTimeout(() => {
        setScreenState(screenStates.RESULT);
      }, 2000);
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
        <QuizContainer>
          <QuizLogo />
          <LoadingWidget />
        </QuizContainer>
      )}
      {screenState === screenStates.RESULT && (
        <QuizContainer>
          <QuizLogo />
          <QuizResult result={result} />
        </QuizContainer>
      )}

      <GitHubCorner projectUrl="https://github.com/alinenaoe" />
    </QuizBackground>
  );
}
