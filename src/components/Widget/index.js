import styled from 'styled-components';

const Widget = styled.div`
  /* margin-top: 24px; */
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 8px;
  overflow: hidden;

  h1, h2, h3 {
    font-size: 20px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};

  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Input = styled.input`
  color: ${({ theme }) => theme.colors.contrastText};
  width: 100%;
  height: 40px;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.contrastText};
  padding: 10px;
`;

export default Widget;
