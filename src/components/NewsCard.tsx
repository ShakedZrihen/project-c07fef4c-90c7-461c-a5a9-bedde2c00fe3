import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SourceIcon from '@mui/icons-material/Source';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DescriptionIcon from '@mui/icons-material/Description';
import { NewsItem, DeskType } from '../types/news';
import { deskColors, desks } from '../data/mockData';

interface StyledCardProps {
  isSelected: boolean;
  deskColor: string;
  hasMatch: boolean;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => 
    prop !== 'isSelected' && prop !== 'deskColor' && prop !== 'hasMatch',
})<StyledCardProps>(({ theme, isSelected, deskColor, hasMatch }) => ({
  background: isSelected 
    ? `linear-gradient(135deg, ${deskColor}10 0%, ${theme.palette.background.paper} 100%)`
    : theme.palette.background.paper,
  border: isSelected 
    ? `2px solid ${deskColor}` 
    : hasMatch 
      ? `2px solid ${theme.palette.warning.main}`
      : '1px solid rgba(43, 45, 66, 0.1)',
  borderRadius: 12,
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'visible',
  boxShadow: '0 2px 8px rgba(43, 45, 66, 0.06)',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: isSelected ? deskColor : 'rgba(43, 45, 66, 0.2)',
  },
}));

const DeskIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>(({ color }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: 4,
  height: '100%',
  background: color,
  borderRadius: '0 12px 12px 0',
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}));

const TitleSection = styled(Box)({
  flex: 1,
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  lineHeight: 1.4,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
}));

const MetaInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
}));

const MetaItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

const Content = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  marginBottom: theme.spacing(2),
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
  marginTop: theme.spacing(1),
}));

interface TagChipProps {
  isUrgent?: boolean;
}

const TagChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'isUrgent',
})<TagChipProps>(({ theme, isUrgent }) => ({
  height: 24,
  fontSize: '0.7rem',
  fontWeight: 500,
  background: isUrgent 
    ? `${theme.palette.error.main}15`
    : 'rgba(43, 45, 66, 0.08)',
  color: isUrgent 
    ? theme.palette.error.main 
    : theme.palette.text.secondary,
  border: isUrgent 
    ? `1px solid ${theme.palette.error.main}40`
    : '1px solid rgba(43, 45, 66, 0.1)',
}));

const MatchIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -8,
  left: 16,
  background: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
  padding: '2px 10px',
  borderRadius: 10,
  fontSize: '0.7rem',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const ActionButtons = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const NotesIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1),
  background: 'rgba(139, 92, 246, 0.15)',
  borderRadius: 6,
  fontSize: '0.75rem',
  color: '#8B5CF6',
  marginTop: theme.spacing(1),
}));

const MediaIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.75, 1),
  background: 'rgba(43, 45, 66, 0.05)',
  borderRadius: 6,
  marginTop: theme.spacing(1),
}));

const MediaBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: '0.7rem',
  color: theme.palette.text.secondary,
}));

interface NewsCardProps {
  item: NewsItem;
  onSelect: (id: string) => void;
  onOpenNotes: (item: NewsItem) => void;
  onOpenDetail: (item: NewsItem) => void;
  matchingKeywords: string[];
}

const NewsCard = ({ item, onSelect, onOpenNotes, onOpenDetail, matchingKeywords }: NewsCardProps) => {
  const deskInfo = desks.find(d => d.id === item.desk);
  const deskColor = deskColors[item.desk as DeskType];
  const hasMatch = matchingKeywords.length > 0;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `לפני ${diffMins} דקות`;
    } else if (diffMins < 1440) {
      return `לפני ${Math.floor(diffMins / 60)} שעות`;
    }
    return date.toLocaleDateString('he-IL');
  };

  const highlightContent = (text: string) => {
    if (matchingKeywords.length === 0) return text;
    
    let result = text;
    matchingKeywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      result = result.replace(regex, '【$1】');
    });
    return result;
  };

  const getMediaCounts = () => {
    if (!item.media) return null;
    const images = item.media.filter(m => m.type === 'image').length;
    const videos = item.media.filter(m => m.type === 'video').length;
    const docs = item.media.filter(m => m.type === 'document').length;
    return { images, videos, docs };
  };

  const mediaCounts = getMediaCounts();

  const handleCardClick = () => {
    onOpenDetail(item);
  };

  return (
    <StyledCard 
      isSelected={item.isSelected} 
      deskColor={deskColor}
      hasMatch={hasMatch}
      onClick={handleCardClick}
    >
      <DeskIndicator color={deskColor} />
      
      {hasMatch && (
        <MatchIndicator>
          🔔 התאמה: {matchingKeywords.join(', ')}
        </MatchIndicator>
      )}
      
      <CardContent sx={{ p: 2 }}>
        <CardHeader>
          <TitleSection>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography sx={{ fontSize: '1rem' }}>{deskInfo?.icon}</Typography>
              <Typography variant="caption" color="text.secondary">
                {deskInfo?.name}
              </Typography>
            </Box>
            <Title>{highlightContent(item.title)}</Title>
          </TitleSection>
          
          <ActionButtons>
            <Tooltip title="עריכת הערות">
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenNotes(item);
                }}
                sx={{ color: item.notes ? '#8B5CF6' : 'text.secondary' }}
              >
                <EditNoteIcon />
              </IconButton>
            </Tooltip>
            <Checkbox
              checked={item.isSelected}
              onChange={() => onSelect(item.id)}
              onClick={(e) => e.stopPropagation()}
              sx={{
                color: 'rgba(43, 45, 66, 0.3)',
                '&.Mui-checked': { color: deskColor },
              }}
            />
          </ActionButtons>
        </CardHeader>

        <MetaInfo>
          <MetaItem>
            <AccessTimeIcon sx={{ fontSize: 14 }} />
            {formatTime(item.timestamp)}
          </MetaItem>
          <MetaItem>
            <SourceIcon sx={{ fontSize: 14 }} />
            {item.source}
          </MetaItem>
        </MetaInfo>

        <Content>{highlightContent(item.content)}</Content>

        {mediaCounts && (mediaCounts.images > 0 || mediaCounts.videos > 0 || mediaCounts.docs > 0) && (
          <MediaIndicator>
            {mediaCounts.images > 0 && (
              <MediaBadge>
                <ImageIcon sx={{ fontSize: 16 }} />
                {mediaCounts.images}
              </MediaBadge>
            )}
            {mediaCounts.videos > 0 && (
              <MediaBadge>
                <VideoLibraryIcon sx={{ fontSize: 16 }} />
                {mediaCounts.videos}
              </MediaBadge>
            )}
            {mediaCounts.docs > 0 && (
              <MediaBadge>
                <DescriptionIcon sx={{ fontSize: 16 }} />
                {mediaCounts.docs}
              </MediaBadge>
            )}
          </MediaIndicator>
        )}

        {item.notes && (
          <NotesIndicator>
            <EditNoteIcon sx={{ fontSize: 14 }} />
            יש הערות
          </NotesIndicator>
        )}

        <TagsContainer>
          {item.tags.map((tag) => (
            <TagChip 
              key={tag} 
              label={tag} 
              size="small"
              isUrgent={tag === 'דחוף'}
            />
          ))}
        </TagsContainer>
      </CardContent>
    </StyledCard>
  );
};

export default NewsCard;
