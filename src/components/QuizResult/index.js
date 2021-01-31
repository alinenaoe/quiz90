/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import Link from 'next/link';
import { useRouter } from 'next/router';
import Widget from '../Widget';
import db from '../../../db.json';

export default function QuizResult({ result }) {
  const router = useRouter();
  const { name } = router.query;
  const playerName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      <Widget>
        <Widget.Header>
          {result === 0 && (
            <h1>{playerName}, você não acertou nenhuma :( <br />
              Mais sorte da próxima vez!
            </h1>
          )}
          {result !== 0 && (
            <h1>{playerName}, você acertou {result} pergunta{result !== 1 ? 's' : ''}</h1>
          )}
        </Widget.Header>
      </Widget>

      <Widget>
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
                  <Link href={`/quiz/${projectName}___${githubUser}?name=${name}`}>
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
