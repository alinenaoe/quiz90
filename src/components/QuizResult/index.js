/* eslint-disable react/prop-types */
import Widget from '../Widget';

export default function QuizResult({ result }) {
  return (
    <Widget>
      <Widget.Header>
        {result === 0 && 'Você não teve nenhum acerto :( Mais sorte da próxima vez!'}

        {result !== 0 && `Você acertou ${result} pergunta${result !== 1 ? 's' : ''}!`}

      </Widget.Header>
    </Widget>
  );
}
