import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { getSignUps } from './services';
import Context from './context';
import SignIn from './components/SignIn';
import SignUpChild from './components/SignUpChild';
import SignUpResult from './components/SignUpResult';
import SignUpsList from './components/SignUpsList';
import TeamsList from './components/TeamsList';

function App() {
  const [context, setContext] = useState('default context value');
  // const [loading, setLoading] = useState(true);
  const [signUps, setSignUps] = useState([]);

  const memoisedContext = useMemo(
    () => [context, setContext],
    [context, setContext]
  );

  async function fetchData() {
    setSignUps(await getSignUps());
    // setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Context.Provider value={memoisedContext}>
        <Routes>
          <Route path="/" element={<SignUpsList signUps={signUps} />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="teams" element={<TeamsList />} />
          <Route path="add-child" element={<SignUpChild />} />
          <Route path="child-added" element={<SignUpResult />} />
          {/* () => {
            if (!loading) {
              return (
                <>
                  <Route path="/" element={<SignUpsList signUps={signUps} />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="teams" element={<TeamsList />} />
                  <Route path="add-child" element={<SignUpChild />} />
                  <Route path="child-added" element={<SignUpResult />} />
                </>
              );
            }
            return <Route path="/" element={null} />;
          } */}
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
