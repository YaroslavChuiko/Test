import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

import tabs from './tabs.json'; // not sure that correctly understand the task (downloads a JSON file from a well-known path.). If it was supposed to be a GET request, then I would use useEffect with [] as dependency and fetch

const sortedTabs = tabs.tabs.sort((a, b) => {
  return a - b;
});

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${sortedTabs[0].id}`} replace={true} />} />
      <Route element={<Layout tabs={sortedTabs} />}>
        {sortedTabs.map((tab) => {
          const Component = lazy(async () => await import(`./${tab.path}`));
          return (
            <Route
              key={tab.id}
              path={`/${tab.id}`}
              element={
                <Suspense fallback={<>Loading...</>}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
      </Route>
    </Routes>
  );
};

export default App;
