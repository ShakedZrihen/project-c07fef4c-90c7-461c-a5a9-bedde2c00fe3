import { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from './Header';
import DeskNavigation from './DeskNavigation';
import NewsFeed from './NewsFeed';
import FilterPanel from './FilterPanel';
import TagManager from './TagManager';
import SummaryPanel from './SummaryPanel';
import NotesDialog from './NotesDialog';
import { desks, generateMockNews, initialTags } from '../data/mockData';
import { NewsItem, DeskType, Tag } from '../types/news';

const DashboardContainer = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #f1fffa 0%, #e8fff5 100%)',
  display: 'flex',
  flexDirection: 'column',
});

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  overflow: 'hidden',
}));

const FeedSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.7)',
  borderRadius: 12,
  border: '1px solid rgba(43, 45, 66, 0.08)',
  overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(43, 45, 66, 0.06)',
}));

const FeedHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid rgba(43, 45, 66, 0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'rgba(255, 255, 255, 0.5)',
}));

const FeedContent = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(43, 45, 66, 0.03)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(43, 45, 66, 0.15)',
    borderRadius: 4,
    '&:hover': {
      background: 'rgba(43, 45, 66, 0.25)',
    },
  },
});

const SidePanel = styled(Box)(({ theme }) => ({
  width: 340,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(43, 45, 66, 0.15)',
    borderRadius: 3,
  },
}));

const Dashboard = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(generateMockNews());
  const [activeDesk, setActiveDesk] = useState<DeskType | 'all'>('all');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [summary, setSummary] = useState('');

  const filteredItems = useMemo(() => {
    let items = newsItems;

    // Filter by desk
    if (activeDesk !== 'all') {
      items = items.filter(item => item.desk === activeDesk);
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      items = items.filter(item =>
        selectedTags.some(tag => item.tags.includes(tag))
      );
    }

    // Sort by timestamp (newest first)
    return items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [newsItems, activeDesk, selectedTags]);

  const selectedItems = useMemo(() => 
    newsItems.filter(item => item.isSelected),
    [newsItems]
  );

  const newItemsCount = useMemo(() => 
    newsItems.filter(item => {
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      return item.timestamp.getTime() > fiveMinutesAgo;
    }).length,
    [newsItems]
  );

  const handleSelectItem = (id: string) => {
    setNewsItems(prev => prev.map(item =>
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    ));
  };

  const handleOpenNotes = (item: NewsItem) => {
    setEditingItem(item);
    setNotesDialogOpen(true);
  };

  const handleSaveNotes = (itemId: string, notes: string, itemTags: string[]) => {
    setNewsItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, notes, tags: itemTags } : item
    ));
  };

  const handleAddKeyword = (keyword: string) => {
    setKeywords(prev => [...prev, keyword]);
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword));
  };

  const handleAddTag = (name: string) => {
    const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];
    const newTag: Tag = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      color: colors[tags.length % colors.length],
    };
    setTags(prev => [...prev, newTag]);
  };

  const handleToggleTag = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  const handleDeleteTag = (tagId: string) => {
    setTags(prev => prev.filter(t => t.id !== tagId));
  };

  const handleGenerateSummary = () => {
    const summaryText = selectedItems.map(item => 
      `• ${item.title}: ${item.content.substring(0, 100)}...`
    ).join('\n\n');
    
    setSummary(`סיכום ${selectedItems.length} פריטים נבחרים:\n\n${summaryText}`);
  };

  const handleClearSelection = () => {
    setNewsItems(prev => prev.map(item => ({ ...item, isSelected: false })));
    setSummary('');
  };

  const activeDeskInfo = activeDesk === 'all' 
    ? { name: 'כל הדסקים', icon: '🌍' }
    : desks.find(d => d.id === activeDesk);

  return (
    <DashboardContainer>
      <Header newItemsCount={newItemsCount} />
      <DeskNavigation
        desks={desks}
        activeDesk={activeDesk}
        onDeskChange={setActiveDesk}
        newsItems={newsItems}
      />
      
      <MainContent>
        <FeedSection>
          <FeedHeader>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {activeDeskInfo?.icon} {activeDeskInfo?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredItems.length} פריטים
              </Typography>
            </Box>
          </FeedHeader>
          <FeedContent>
            <NewsFeed
              items={filteredItems}
              onSelectItem={handleSelectItem}
              onOpenNotes={handleOpenNotes}
              filterKeywords={keywords}
            />
          </FeedContent>
        </FeedSection>

        <SidePanel>
          <FilterPanel
            keywords={keywords}
            onAddKeyword={handleAddKeyword}
            onRemoveKeyword={handleRemoveKeyword}
          />
          <TagManager
            tags={tags}
            selectedTags={selectedTags}
            onAddTag={handleAddTag}
            onToggleTag={handleToggleTag}
            onDeleteTag={handleDeleteTag}
          />
          <SummaryPanel
            selectedItems={selectedItems}
            onGenerateSummary={handleGenerateSummary}
            onClearSelection={handleClearSelection}
            summary={summary}
          />
        </SidePanel>
      </MainContent>

      <NotesDialog
        open={notesDialogOpen}
        item={editingItem}
        tags={tags}
        onClose={() => setNotesDialogOpen(false)}
        onSave={handleSaveNotes}
      />
    </DashboardContainer>
  );
};

export default Dashboard;
