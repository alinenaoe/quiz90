// import loadingAnimation from '../../screens/animations/loading.json';
import styled from 'styled-components';

const LoadingContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    bottom: 0;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    g {
      fill: red;
    }
`;

export default function LoadingWidget() {
  return (
    <LoadingContainer>
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_pnX5L9.json" background="#9e9e9e91" speed="0.7" style={{ width: '100vw', height: '100vh' }} autoPlay />
    </LoadingContainer>
  );
}
