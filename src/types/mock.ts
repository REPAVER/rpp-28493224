// ---------- MockSiteConfig: コンポーネントベースモック設定 ----------

export interface MockSiteColors {
  primary: string;
  primary_light: string;
  accent: string;
  bg: string;
  surface: string;
  text: string;
  text_muted: string;
  border: string;
}

export interface MockFeatureItem {
  icon?: string;
  title: string;
  text: string;
  image?: string;
  label?: string;
}

export interface MockTestimonialItem {
  text: string;
  author: string;
  role?: string;
  stars?: number;
  avatar?: string;
}

export interface MockGalleryItem {
  image: string;
  caption?: string;
}

export interface MockContactField {
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
}

export interface MockFooterColumn {
  heading: string;
  links: Array<{ text: string; href: string }>;
}

export interface MockSiteContent {
  // Header
  logo: string;
  nav: string[];
  cta_text?: string;
  cta_url?: string;
  tel?: string;

  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_badge?: string;
  hero_eyebrow?: string;
  hero_image?: string;
  hero_image_alt?: string;
  hero_cta_text: string;
  hero_cta_secondary?: string;

  // Features
  features_title?: string;
  features_subtitle?: string;
  features?: MockFeatureItem[];

  // Gallery
  gallery_title?: string;
  gallery_items?: MockGalleryItem[];

  // Testimonials
  testimonials_title?: string;
  testimonials_subtitle?: string;
  testimonials?: MockTestimonialItem[];

  // Access
  access_title?: string;
  access_shop_name?: string;
  address?: string;
  map_address?: string;
  business_hours?: string;
  phone?: string;

  // Contact
  contact_title?: string;
  contact_subtitle?: string;
  contact_submit?: string;
  contact_fields?: MockContactField[];

  // Pricing / Menu
  pricing_title?: string;
  pricing_subtitle?: string;
  pricing_categories?: Array<{
    name: string;
    items: Array<{ name: string; price: string; description?: string }>;
  }>;
  pricing_plans?: Array<{
    name: string;
    price: string;
    description?: string;
    features: string[];
    highlighted?: boolean;
  }>;

  // Products
  products_title?: string;
  products_subtitle?: string;
  products?: Array<{
    name: string;
    price: string;
    image: string;
    description?: string;
    badge?: string;
  }>;

  // News / Blog
  news_title?: string;
  news_subtitle?: string;
  news_articles?: Array<{
    title: string;
    date: string;
    category?: string;
    excerpt: string;
    image?: string;
  }>;

  // Staff
  staff_title?: string;
  staff_subtitle?: string;
  staff?: Array<{
    name: string;
    role: string;
    image?: string;
    description?: string;
  }>;

  // Concept
  concept_title?: string;
  concept_text?: string;
  concept_image?: string;
  concept_image_position?: "left" | "right";
  concept_bg_image?: string;

  // CTA section
  cta_section_title?: string;
  cta_section_text?: string;
  cta_section_button?: string;

  // Footer
  footer_desc?: string;
  footer_copyright?: string;
  footer_columns?: MockFooterColumn[];
  sns?: {
    instagram?: string;
    x?: string;
    facebook?: string;
    youtube?: string;
    line?: string;
  };
}

export interface MockSiteConfig {
  components: string[];
  colors: MockSiteColors;
  content: MockSiteContent;
  page_title: string;
}
