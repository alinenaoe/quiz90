/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import Link from 'next';
import Widget from '../Widget';
import db from '../../../db.json';

export default function QuizResult({ result }) {
  return (
    <>
      <Widget>
        <Widget.Header>
          {result === 0 && 'Você não teve nenhum acerto :( Mais sorte da próxima vez!'}
          {result !== 0 && `Você acertou ${result} pergunta${result !== 1 ? 's' : ''}!`}
        </Widget.Header>
      </Widget>

      <Widget>
        <Widget.Content>
          <h1>Quizes da Galera</h1>

          {/* {db.external.map((linkExterno, index) => {
            const [projectName, githubUser] = linkExterno
              .replace(/\//g, '')
              .replace('https:', '')
              .replace('.vercel.app', '')
              .split('.');

            return (
              <Link href={`/quiz/${projectName}___${githubUser}`} key={`link__${index}`} passHref>
                <Widget.Topic>
                  {`${githubUser}/${projectName}`}
                </Widget.Topic>
              </Link>
            );
          })} */}

          {db.external.map((ext) => <p>{ext}</p>)}

        </Widget.Content>
      </Widget>
    </>
  );
}
