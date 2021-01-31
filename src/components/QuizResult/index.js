/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import Widget from '../Widget';
import db from '../../../db.json';

export default function QuizResult({ result }) {
  const router = useRouter();
  const { name } = router.query;
  const playerName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      <Widget
        as={motion.section}
        transition={{ delay: 0.5, duration: 0.35 }}
        variants={{
          show: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: '100%' },
        }}
        initial="hidden"
        animate="show"
      >
        <Widget.Header>
          {result === 0 && (
            <h1>{playerName}, você não acertou nenhuma :( <br />
              Mais sorte da próxima vez!
            </h1>
          )}
          {result !== 0 && (
            <h1>{playerName}, você acertou {result} pergunta{result !== 1 ? 's' : ''}</h1>
          )}

          <Link href="/" passHref>
            <a style={{ marginTop: 20 }}>Refazer quiz!</a>
          </Link>
        </Widget.Header>
      </Widget>

      <Widget
        as={motion.section}
        transition={{ delay: 0.8, duration: 0.5 }}
        variants={{
          show: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: '100%' },
        }}
        initial="hidden"
        animate="show"
      >
        <Widget.Content>
          <h1>Quer mais quiz? </h1>
          <ul>
            {db.external.map((linkExterno) => {
              const [projectName, githubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.');

              return (
                <li key={linkExterno}>
                  <Link href={`/quiz/${projectName}___${githubUser}`}>
                    <Widget.Topic>
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </Link>
                </li>
              );
            })}
          </ul>

        </Widget.Content>
      </Widget>
    </>
  );
}
