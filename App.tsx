import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import VexTool from './components/VexTool';
import KnowledgeBase from './components/KnowledgeBase';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.VEX_TOOL:
        return <VexTool />;
      case ViewState.BEST_PRACTICES:
        return <KnowledgeBase />;
      case ViewState.FAQ: // Merged into KnowledgeBase
        return <KnowledgeBase />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;