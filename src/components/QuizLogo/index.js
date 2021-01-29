import styled from 'styled-components';

import React from 'react';

function Logo() {
  return (
    <Title>QUIZ ANOS 90</Title>
  );
}

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;

  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

const Title = styled.h1`
  font-family: 'Bungee Shade', cursive;
  font-size: 36px;
`;

export default QuizLogo;
