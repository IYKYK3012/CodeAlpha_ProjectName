import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <SplashContainer>
      <AppName>MoodDo</AppName>
      <Tagline>Tasks that match your vibe</Tagline>
      <Loader />
    </SplashContainer>
  );
};

export default SplashScreen;

// Styled components
const SplashContainer = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom right, #8A2BE2, #4FB0FF);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const AppName = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 48px;
  font-weight: bold;
`;

const Tagline = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10px;
`;

const Loader = styled.div`
  border: 4px solid white;
  border-left-color: transparent;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-top: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
