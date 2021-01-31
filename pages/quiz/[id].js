/* eslint-disable react/prop-types */

import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function OtherQuizes({ externalQuizData }) {
  return (
    <ThemeProvider theme={externalQuizData.theme}>
      <QuizScreen
        externalQuizData={externalQuizData.questions}
        externalBg={externalQuizData.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const [projectname, githubUser] = id.split('___');

  const externalQuizData = await fetch(`https://${projectname}.${githubUser}.vercel.app/api/db`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Falha na requisição');
    })
    // .then((response) => console.log(response))
    .catch((err) => console.log(err));

  return {
    props: {
      id,
      externalQuizData,
    }, // will be passed to the page component as props
  };
}
