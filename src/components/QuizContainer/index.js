import styled from 'styled-components';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding-top: 50px;
  margin: auto 10%;

  h1 {
    margin: 0;
  }

  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default QuizContainer;
