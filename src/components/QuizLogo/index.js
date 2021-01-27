import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

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

  @font-face {
    font-family: 'Monofett', cursive;
    src: url('https://fonts.googleapis.com/css2?family=Monofett&display=swap');
  }

  font-family: 'Monofett', cursive;

`

export default QuizLogo;
