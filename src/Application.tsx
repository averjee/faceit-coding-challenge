import React from 'react';
import Container from './components/Container';
import H4 from './components/H4';
import TournamentList from './containers/TournamentList';
import TopSection from './containers/TopSection';

const App: React.FC = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <TopSection />
      <TournamentList />
    </Container>
  );
};

export default App;
