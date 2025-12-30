export interface MediaItem {
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  source: string;
  timestamp: Date;
  desk: DeskType;
  tags: string[];
  notes: string;
  isSelected: boolean;
  keywords: string[];
  media?: MediaItem[];
  author?: string;
  originalUrl?: string;
}

export type DeskType = 'iran' | 'syria' | 'lebanon' | 'egypt' | 'gaza';

export interface Desk {
  id: DeskType;
  name: string;
  icon: string;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface FilterState {
  keywords: string[];
  tags: string[];
  desk: DeskType | 'all';
}
