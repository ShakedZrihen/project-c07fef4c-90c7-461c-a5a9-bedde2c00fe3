import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';
import { Desk, DeskType, NewsItem } from '../types/news';

const NavContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  background: 'rgba(255, 255, 255, 0.8)',
  borderBottom: '1px solid rgba(43, 45, 66, 0.08)',
}));

const StyledTabs = styled(Tabs)({
  minHeight: 56,
  '& .MuiTabs-flexContainer': {
    gap: 8,
  },
});

interface StyledTabProps {
  deskColor: string;
}

const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== 'deskColor',
})<StyledTabProps>(({ theme, deskColor }) => ({
  minHeight: 56,
  borderRadius: '8px 8px 0 0',
  padding: theme.spacing(1.5, 3),
  transition: 'all 0.2s ease',
  '&.Mui-selected': {
    background: `linear-gradient(180deg, ${deskColor}15 0%, transparent 100%)`,
    borderBottom: `3px solid ${deskColor}`,
  },
  '&:hover': {
    background: 'rgba(43, 45, 66, 0.05)',
  },
}));

const TabContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

const DeskIcon = styled(Box)({
  fontSize: '1.5rem',
});

const DeskName = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.95rem',
  color: theme.palette.text.primary,
}));

interface DeskNavigationProps {
  desks: Desk[];
  activeDesk: DeskType | 'all';
  onDeskChange: (desk: DeskType | 'all') => void;
  newsItems: NewsItem[];
}

const DeskNavigation = ({ desks, activeDesk, onDeskChange, newsItems }: DeskNavigationProps) => {
  const getItemCount = (deskId: DeskType | 'all') => {
    if (deskId === 'all') return newsItems.length;
    return newsItems.filter(item => item.desk === deskId).length;
  };

  const getUrgentCount = (deskId: DeskType | 'all') => {
    const items = deskId === 'all' 
      ? newsItems 
      : newsItems.filter(item => item.desk === deskId);
    return items.filter(item => item.tags.includes('דחוף')).length;
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      onDeskChange('all');
    } else {
      onDeskChange(desks[newValue - 1].id);
    }
  };

  const currentIndex = activeDesk === 'all' 
    ? 0 
    : desks.findIndex(d => d.id === activeDesk) + 1;

  return (
    <NavContainer>
      <StyledTabs
        value={currentIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ style: { display: 'none' } }}
      >
        <StyledTab
          deskColor="#00BFA5"
          label={
            <TabContent>
              <DeskIcon>🌍</DeskIcon>
              <DeskName>כל הדסקים</DeskName>
              <Badge 
                badgeContent={getItemCount('all')} 
                color="primary"
                sx={{ 
                  '& .MuiBadge-badge': { fontSize: '0.7rem' },
                  marginLeft: '0.5rem',
                }}
              />
            </TabContent>
          }
        />
        {desks.map((desk) => (
          <StyledTab
            key={desk.id}
            deskColor={desk.color}
            label={
              <TabContent>
                <DeskIcon>{desk.icon}</DeskIcon>
                <DeskName>{desk.name}</DeskName>
                <Badge
                  badgeContent={getUrgentCount(desk.id)}
                  color="error"
                  invisible={getUrgentCount(desk.id) === 0}
                  sx={{ 
                    '& .MuiBadge-badge': { fontSize: '0.7rem' },
                    marginLeft: '0.5rem',
                  }}
                />
              </TabContent>
            }
          />
        ))}
      </StyledTabs>
    </NavContainer>
  );
};

export default DeskNavigation;
