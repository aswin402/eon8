import rawPolicyPages from '@/data/policyPages.json';

export interface PolicySection {
  heading: string;
  paragraphs: string[];
}

export interface PolicyData {
  slug: string;
  metaTitle: string;
  metaDesc: string;
  title: string;
  subtitle?: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export const policyPagesData = rawPolicyPages as Record<string, PolicyData>;
