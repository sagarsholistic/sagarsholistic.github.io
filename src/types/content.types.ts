import { Timestamp } from 'firebase/firestore';

// Base interface for all page content
export interface BasePageContent {
  id: string;
  sectionName: string;
  lastModified: Timestamp;
  modifiedBy: string;
  version: number;
}

// Banner page content
export interface BannerContent extends BasePageContent {
  content: {
    title: string;
    subtitle: string;
    doctorName: string;
    credentials: string;
    email: string;
    phone: string;
  };
}

// Journey page content
export interface JourneyContent extends BasePageContent {
  content: {
    paragraphs: string[];
    imageUrl?: string;
  };
}

// Education page structures
export interface EducationItem {
  title: string;
  year: string;
  institution: string;
  city: string;
}

export interface CertificationItem {
  title: string;
  contents: string[];
}

export interface EducationContent extends BasePageContent {
  content: {
    educations: EducationItem[];
    certifications: CertificationItem[];
  };
}

// Conditions Treated page structures
export interface Condition {
  title: string;
  image: string;
  details: string[];
}

export interface ConditionsTreatedContent extends BasePageContent {
  content: {
    conditions: Condition[];
  };
}

// Generic page content for pages with paragraphs or HTML
export interface GenericPageContent extends BasePageContent {
  content: {
    title?: string;
    paragraphs?: string[];
    lists?: { type: 'ordered' | 'unordered'; items: string[] }[];
    html?: string; // Rich text HTML content
  };
}

// Fee Payment page content
export interface FeePaymentContent extends BasePageContent {
  content: {
    title?: string;
    sections: {
      heading?: string;
      paragraphs: string[];
      fees?: { description: string; amount: string }[];
    }[];
  };
}

// Footer content
export interface FooterContent extends BasePageContent {
  content: {
    businessName: string;
    email: string;
    copyright: string;
  };
}

// Union type for all page content types
export type PageContentType =
  | BannerContent
  | JourneyContent
  | EducationContent
  | ConditionsTreatedContent
  | GenericPageContent
  | FeePaymentContent
  | FooterContent;

// Review interface
export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1-5
  reviewText: string; // HTML from rich text editor
  reviewDate: Timestamp;
  isPublished: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string; // Admin email
}

// Admin user interface
export interface AdminUser {
  email: string;
  displayName: string;
  role: 'admin' | 'super_admin';
  createdAt: Timestamp;
  lastLogin: Timestamp;
}

// Page identifiers for type-safe routing
export type PageId =
  | 'banner'
  | 'journey'
  | 'education'
  | 'conditionsTreated'
  | 'firstConsultation'
  | 'followUpConsultations'
  | 'feePayment'
  | 'whatIsHomeopathy'
  | 'appointment'
  | 'footer';

// Page metadata for dashboard
export interface PageMetadata {
  id: PageId;
  name: string;
  description: string;
}
