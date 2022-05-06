import React from 'react';
import tw from 'tailwind-styled-components';
import Minting from './Minting';

const Main = () => {
  return (
    <Container>
      <VideoContainer>
        <Video src="./bg-video.mp4" muted={true} autoPlay={true} loop={true} />
      </VideoContainer>
      <Minting />
    </Container>
  );
};

export default Main;

const Container = tw.div`
  flex flex-col items-center
`;

const VideoContainer = tw.div`
  max-w-screen-lg
  z-0
`;

const Video = tw.video``;
