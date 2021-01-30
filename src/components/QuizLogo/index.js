import styled from 'styled-components';

import React from 'react';
import Link from 'next/link';

function Logo() {
  return (
    <Link href="/" passHref>
      <Title>SUPER ALURA QUIZ</Title>
    </Link>
  );
}

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;

  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

const Title = styled.a`
  font-family: 'Fredoka One', cursive;
  font-size: 40px;
  margin: 30px 0;
  text-shadow: 2px 2px ${({ theme }) => theme.colors.secondary};
`;

export default QuizLogo;
