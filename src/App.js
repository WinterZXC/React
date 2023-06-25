
import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import TopRectangle from './components/TopRectangle/TopRectangle';
import TopMenu from './components/TopMenu/TopMenu';
import TopContent from './components/TopContent/TopContent';
import Frame from './components/Frame/Frame';
import Cards from './components/Cards/Cards';

function App() {
  return (
    <Container fluid="true">
      <TopRectangle />
      <TopMenu />
      <TopContent />
      <Frame />
      <Cards/>
    </Container>
  );
}

export default App;
