/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Input from '../src/components/Input';
import Footer from '../src/components/Footer';
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
          <Widget
            as={motion.section}
            transition={{ delay: 0.2, duration: 0.3 }}
            variants={{
              show: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
              >
                <Input
                  type="text"
                  name="nome"
                  value={name}
                  onChange={handleInputChange}
                  placeholder="Digite aqui seu nome"
                  spellcheck="false"
                  autoFocus
                  autoComplete="off"
                />
                <Button type="submit" disabled={name.length === 0}>JOGAR</Button>
              </form>
            </Widget.Content>
          </Widget>

        </QuizContainer>
        <Footer />
        <GitHubCorner projectUrl="https://github.com/alinenaoe" />
      </QuizBackground>
    </>
  );
}
