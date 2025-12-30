import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NewsCard from './NewsCard';
import { NewsItem } from '../types/news';

const FeedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(8),
  color: theme.palette.text.secondary,
}));

interface NewsFeedProps {
  items: NewsItem[];
  onSelectItem: (id: string) => void;
  onOpenNotes: (item: NewsItem) => void;
  filterKeywords: string[];
}

const NewsFeed = ({ items, onSelectItem, onOpenNotes, filterKeywords }: NewsFeedProps) => {
  const getMatchingKeywords = (item: NewsItem): string[] => {
    if (filterKeywords.length === 0) return [];
    
    const text = `${item.title} ${item.content}`.toLowerCase();
    return filterKeywords.filter(keyword => 
      text.includes(keyword.toLowerCase())
    );
  };

  if (items.length === 0) {
    return (
      <EmptyState>
        <Typography variant="h5" sx={{ mb: 1 }}>📰</Typography>
        <Typography variant="h6">אין פריטים להצגה</Typography>
        <Typography variant="body2">נסה לשנות את הסינון או לבחור דסק אחר</Typography>
      </EmptyState>
    );
  }

  return (
    <FeedContainer>
      {items.map((item) => (
        <NewsCard
          key={item.id}
          item={item}
          onSelect={onSelectItem}
          onOpenNotes={onOpenNotes}
          matchingKeywords={getMatchingKeywords(item)}
        />
      ))}
    </FeedContainer>
  );
};

export default NewsFeed;
