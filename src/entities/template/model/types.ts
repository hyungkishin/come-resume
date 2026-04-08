export interface Template {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  category: 'minimal' | 'creative' | 'professional' | 'developer';
  isPremium: boolean;
  colors: string[];
}
