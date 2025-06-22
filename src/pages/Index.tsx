
import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import HeroSection from '../components/HeroSection';
import StartingSection from '../components/StartingSection';
import ToolsSection from '../components/ToolsSection';
import ArticlesSection from '../components/ArticlesSection';
import InstitutionalSection from '../components/InstitutionalSection';
import { seoConfig } from '../config/seo';

const Index = () => {
  const pageConfig = seoConfig.pages.home;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      seoConfig.organizationSchema,
      seoConfig.websiteSchema,
      seoConfig.educationalOrganizationSchema,
      {
        '@type': 'WebPage',
        '@id': `${seoConfig.siteUrl}/`,
        url: `${seoConfig.siteUrl}/`,
        name: pageConfig.title,
        description: pageConfig.description,
        isPartOf: {
          '@id': `${seoConfig.siteUrl}/#website`
        },
        about: {
          '@id': `${seoConfig.siteUrl}/#organization`
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          '@id': `${seoConfig.siteUrl}/#primaryimage`,
          url: seoConfig.defaultImage,
          width: 1200,
          height: 630
        },
        datePublished: '2024-01-01T00:00:00+00:00',
        dateModified: new Date().toISOString(),
        breadcrumb: {
          '@id': `${seoConfig.siteUrl}/#breadcrumb`
        },
        inLanguage: 'pt-BR',
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: [`${seoConfig.siteUrl}/`]
          }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${seoConfig.siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Início',
            item: `${seoConfig.siteUrl}/`
          }
        ]
      }
    ]
  };

  return (
    <Layout>
      <SEOHead
        title={pageConfig.title}
        description={pageConfig.description}
        keywords={pageConfig.keywords}
        url={`${seoConfig.siteUrl}/`}
        type={pageConfig.type}
        canonical={`${seoConfig.siteUrl}/`}
        jsonLd={jsonLd}
      />
      <HeroSection />
      <StartingSection />
      <ToolsSection />
      <ArticlesSection />
      <InstitutionalSection />
    </Layout>
  );
};

export default Index;
