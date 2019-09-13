import React from 'react';
import axios from 'axios';
import PrivateRoute from './PrivateRoute';
import styled from '@emotion/styled';
import { useSpring, animated } from 'react-spring';
import Particles from './animations/Particles';
import { Route, Switch } from 'react-router-dom';

import Form from './components/Form';
import Success from './components/Success';

function App() {
  const Background = styled.div`
    height: 100vh;
    width: 100vw;
  `;

  return (
    <Particles>
      <Background>
        <Switch>
          <Route path='/login' component={Form} />
          <PrivateRoute path='/success' component={Success} />
        </Switch>
      </Background>
    </Particles>
  );
}

export default App;
