import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Input from '../src/components/Input';
// import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  function handleInputChange(e) {
    setName(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Quiz anos 90</title>
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                router.push('/quiz');
              }}
              >
                <Input
                  type="text"
                  name="nome"
                  value={name}
                  onChange={handleInputChange}
                  spellcheck="false"
                  autoFocus
                />
                <Button type="submit" disabled={name.length === 0}>JOGAR</Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>

              <p>lorem ipsum dolor sit amet...</p>
            </Widget.Content>
          </Widget>
          {/* <Footer /> */}
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/alinenaoe" />
      </QuizBackground>
    </>
  );
}
