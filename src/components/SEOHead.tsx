import React from 'react';
import useSEO from '../hooks/useSEO';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  canonical?: string;
  robots?: string;
  jsonLd?: object;
}

const SEOHead: React.FC<SEOHeadProps> = (props) => {
  useSEO(props);
  return null;
};

export default SEOHead;