import React, { useContext } from 'react';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const moods = {
  happy: { emoji: '😊' },
  productive: { emoji: '💪' },
  calm: { emoji: '😌' },
  stressed: { emoji: '😓' },
  tired: { emoji: '😴' },
};

const moodScore = {
  happy: 5,
  productive: 4,
  calm: 3,
  tired: 2,
  stressed: 1
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const TodoHomeScreen = () => {
  const { themeColor, updateTheme, isDarkMode, toggleDarkMode, moodHistory } = useContext(ThemeContext);

  const chartData = moodHistory.map(entry => ({
    date: entry.date,
    score: moodScore[entry.mood] || 0
  }));

  return (
    <StyledThemeProvider theme={{ isDarkMode }}>
      <Container dark={isDarkMode}>
        <AppBar style={{ backgroundColor: themeColor }}>
          <Title><strong>Mood</strong><LightText>Do</LightText></Title>
          <ToggleSwitch onClick={toggleDarkMode}>
            {isDarkMode ? '🌙 Dark' : '☀️ Light'}
          </ToggleSwitch>
        </AppBar>

        <Body>
          <Banner style={{ backgroundColor: themeColor + '20' }}>
            <BannerText>Your mood, your tasks, your way</BannerText>
            <FeaturePills>
              <Pill>✨ Mood Themes</Pill>
              <Pill>📝 Smart Tasks</Pill>
              <Pill>🎁 Rewards</Pill>
              <Pill>💪 Motivation</Pill>
            </FeaturePills>
          </Banner>

          <SectionTitle>How's your vibe today?</SectionTitle>
          <MoodOptions>
            {Object.keys(moods).map(mood => (
              <MoodChip key={mood} onClick={() => updateTheme(mood)}>
                {moods[mood].emoji} {capitalize(mood)}
              </MoodChip>
            ))}
          </MoodOptions>

          <MotivationBox>💬 "Push yourself, because no one else is going to do it for you."</MotivationBox>

          <SectionTitle>Mood Tracker</SectionTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke={themeColor} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <TaskList>📝 Your tasks will appear here...</TaskList>
        </Body>

        <AddButton onClick={() => alert('Add Task Dialog')}>➕</AddButton>
      </Container>
    </StyledThemeProvider>
  );
};

export default TodoHomeScreen;



const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  background-color: ${({ dark }) => (dark ? '#121212' : '#fff')};
  color: ${({ dark }) => (dark ? '#fff' : '#000')};
`;

const AppBar = styled.div`
  padding: 16px;
  text-align: center;
  color: white;
  position: relative;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const LightText = styled.span`
  font-weight: 300;
  color: yellow;
`;

const ToggleSwitch = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
`;

const Body = styled.div`
  padding: 16px;
`;

const Banner = styled.div`
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
`;

const BannerText = styled.p`
  font-weight: 500;
  margin-bottom: 10px;
`;

const FeaturePills = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Pill = styled.div`
  background: white;
  border-radius: 20px;
  padding: 6px 12px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
  font-size: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
`;

const MoodOptions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const MoodChip = styled.button`
  border: none;
  background: #eee;
  padding: 8px 14px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
  &:hover {
    background: #ddd;
  }
`;

const MotivationBox = styled.div`
  margin: 24px 0;
  font-style: italic;
  background: #f9f9f9;
  padding: 16px;
  border-radius: 10px;
`;

const ChartContainer = styled.div`
  margin-top: 10px;
`;

const TaskList = styled.div`
  margin-bottom: 80px;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #8a2be2;
  color: white;
  font-size: 24px;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

