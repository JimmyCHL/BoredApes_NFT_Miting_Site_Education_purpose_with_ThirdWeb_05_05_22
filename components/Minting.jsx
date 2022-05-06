import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { useAddress, useDisconnect, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import ReactLoading from 'react-loading';

const Minting = () => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  const connectWithMetamask = useMetamask();
  const editionDrop = useEditionDrop('0xf5aCB11a687196AD4eC3222EC4E3A91a2a5a5B8A');

  const mint = async () => {
    if (editionDrop && address) {
      setInProgress(true);
      const tx = await editionDrop.claimTo(address, 0, 1);
      console.log(tx);
      setInProgress(false);
      setCompleted(true);
    }
  };

  const viewOpenSea = () => {
    const url = 'https://testnets.opensea.io/collection/bored-ape-clone-udjdhftjrf';
    window.open(url, '_blank');
  };

  const startOver = () => {
    setCompleted(false);
    setInProgress(false);
    disconnectWallet();
  };

  useEffect(() => {
    const getTotal = async () => {
      if (editionDrop) {
        const total = await editionDrop.totalSupply(0);
        setTotalSupply(total.toNumber());
      }
    };
    getTotal();
  }, [editionDrop, completed]);

  return (
    <Container>
      <Mint>
        <TitleContainer>
          <Title>
            Welcome to
            <br /> the Bored Ape
            <br /> Yach Club
          </Title>
          <Count>{address && totalSupply}</Count>
        </TitleContainer>
        <ButtonContainer>
          {address ? (
            <>
              {completed ? (
                <FilledButton onClick={viewOpenSea}>View OpenSea</FilledButton>
              ) : (
                <FilledButton onClick={mint} disabled={inProgress}>
                  {inProgress ? <ReactLoading type="bubbles" color="#000" height={64}></ReactLoading> : 'Mint'}
                </FilledButton>
              )}

              <UnFilledButton disabled={inProgress} onClick={startOver}>
                Disconnect
              </UnFilledButton>
            </>
          ) : (
            <FilledButton onClick={connectWithMetamask}>Connect Wallet</FilledButton>
          )}
        </ButtonContainer>
      </Mint>
    </Container>
  );
};

export default Minting;

const Container = tw.div`
  max-w-screen-lg
  w-full
  z-50
`;

const Mint = tw.div`
  lg:w-1/3
  bg-black
  lg:-mt-[200px]
  pb-4
  pr-4
 
`;

const TitleContainer = tw.div`
  flex

`;

const Title = tw.h2`
  uppercase text-3xl italic font-bold pt-2
`;

const ButtonContainer = tw.div`
mt-2 flex gap-4
`;

const FilledButton = tw.button`
 flex justify-center items-center flex-1 bg-[#bfc500] hover:bg-white text-black font-bold py-2 px-4 rounded cursor-pointer h-14
`;

const UnFilledButton = tw(FilledButton)`
  bg-black text-[#bfc500] border-2 border-[#bfc500] hover:bg-[#bfc500] hover:text-black
`;

const Count = tw.div`
  flex-1 flex items-center justify-center text-white
`;
