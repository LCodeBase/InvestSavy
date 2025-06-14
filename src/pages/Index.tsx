
import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import StartingSection from '../components/StartingSection';
import ToolsSection from '../components/ToolsSection';
import ArticlesSection from '../components/ArticlesSection';
import InstitutionalSection from '../components/InstitutionalSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StartingSection />
      <ToolsSection />
      <ArticlesSection />
      <InstitutionalSection />
    </Layout>
  );
};

export default Index;
