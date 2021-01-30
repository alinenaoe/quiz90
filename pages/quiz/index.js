import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';
import db from '../../db.json';

export default function OtherQuizzes() {
  return (
    <ThemeProvider theme={db.theme}>
      <QuizScreen
        externalQuizData={db.questions}
        externalBg={db.bg}
      />
    </ThemeProvider>
  );
}
