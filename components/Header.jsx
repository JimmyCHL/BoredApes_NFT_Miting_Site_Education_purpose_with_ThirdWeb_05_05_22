import React from 'react';
import tw from 'tailwind-styled-components';
import Image from 'next/image';

import logo from '../assets/bayc-logo.webp';

const Header = () => {
  return (
    <Container>
      <HeaderContainer>
        <Image src={logo} width={300} height={70} alt="logo" />
      </HeaderContainer>
    </Container>
  );
};

export default Header;

const Container = tw.div`
  flex justify-center items-center h-20
`;

const HeaderContainer = tw.div`
  mt-[60px] z-10
`;
