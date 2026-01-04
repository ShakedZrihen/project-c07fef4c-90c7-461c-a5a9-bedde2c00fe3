import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SourceIcon from '@mui/icons-material/Source';
import PersonIcon from '@mui/icons-material/Person';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DescriptionIcon from '@mui/icons-material/Description';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { NewsItem, DeskType } from '../types/news';
import { deskColors, desks } from '../data/mockData';

const PanelContainer = styled(Box)(({ theme }) => ({
  width: 420,
  maxHeight: 'calc(100vh - 180px)',
  position: 'sticky',
  top: theme.spacing(2),
  background: theme.palette.background.paper,
  borderRadius: 12,
  border: '1px solid rgba(43, 45, 66, 0.1)',
  boxShadow: '0 4px 20px rgba(43, 45, 66, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const PanelHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderBottom: '1px solid rgba(43, 45, 66, 0.08)',
  background: 'rgba(43, 45, 66, 0.02)',
}));

const PanelContent = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.85rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const MetaItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
}));

interface TagChipProps {
  isUrgent?: boolean;
}

const TagChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'isUrgent',
})<TagChipProps>(({ theme, isUrgent }) => ({
  height: 26,
  fontSize: '0.75rem',
  fontWeight: 500,
  background: isUrgent 
    ? `${theme.palette.error.main}15`
    : 'rgba(43, 45, 66, 0.08)',
  color: isUrgent 
    ? theme.palette.error.main 
    : theme.palette.text.primary,
  border: isUrgent 
    ? `1px solid ${theme.palette.error.main}40`
    : '1px solid rgba(43, 45, 66, 0.1)',
}));

const MediaGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
}));

const MediaItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 8,
  overflow: 'hidden',
  background: 'rgba(43, 45, 66, 0.05)',
  border: '1px solid rgba(43, 45, 66, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const MediaThumbnail = styled('img')({
  width: '100%',
  height: 100,
  objectFit: 'cover',
});

const MediaPlaceholder = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

const MediaLabel = styled(Typography)({
  fontSize: '0.7rem',
  textAlign: 'center',
  padding: '4px 8px',
  background: 'rgba(43, 45, 66, 0.03)',
});

const NotesBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  background: 'rgba(139, 92, 246, 0.08)',
  borderRadius: 8,
  border: '1px solid rgba(139, 92, 246, 0.2)',
}));

const ContentText = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  lineHeight: 1.8,
  color: theme.palette.text.primary,
}));

interface DeskIndicatorProps {
  deskColor: string;
}

const DeskBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'deskColor',
})<DeskIndicatorProps>(({ deskColor }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 12px',
  borderRadius: 20,
  background: `${deskColor}15`,
  border: `1px solid ${deskColor}40`,
  fontSize: '0.8rem',
  fontWeight: 500,
}));

interface PostDetailPanelProps {
  item: NewsItem | null;
  onClose: () => void;
  onOpenNotes: (item: NewsItem) => void;
}

const PostDetailPanel = ({ item, onClose, onOpenNotes }: PostDetailPanelProps) => {
  if (!item) return null;

  const deskInfo = desks.find(d => d.id === item.desk);
  const deskColor = deskColors[item.desk as DeskType];

  const formatTime = (date: Date) => {
    return date.toLocaleString('he-IL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon />;
      case 'video': return <VideoLibraryIcon />;
      case 'document': return <DescriptionIcon />;
      default: return <ImageIcon />;
    }
  };

  return (
    <PanelContainer>
      <PanelHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <DeskBadge deskColor={deskColor}>
            <span>{deskInfo?.icon}</span>
            <span>{deskInfo?.name}</span>
          </DeskBadge>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </PanelHeader>

      <PanelContent>
        <Section>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, lineHeight: 1.4 }}>
            {item.title}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
            <MetaItem>
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              {formatTime(item.timestamp)}
            </MetaItem>
            <MetaItem>
              <SourceIcon sx={{ fontSize: 16 }} />
              {item.source}
            </MetaItem>
            {item.author && (
              <MetaItem>
                <PersonIcon sx={{ fontSize: 16 }} />
                {item.author}
              </MetaItem>
            )}
            {item.originalUrl && (
              <MetaItem>
                <LinkIcon sx={{ fontSize: 16 }} />
                <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  קישור למקור
                </a>
              </MetaItem>
            )}
          </Box>
        </Section>

        <Divider sx={{ mb: 2 }} />

        <Section>
          <SectionTitle>תוכן</SectionTitle>
          <ContentText>{item.content}</ContentText>
        </Section>

        {item.media && item.media.length > 0 && (
          <Section>
            <SectionTitle>
              <ImageIcon sx={{ fontSize: 18 }} />
              מדיה ({item.media.length})
            </SectionTitle>
            <MediaGrid>
              {item.media.map((media, index) => (
                <MediaItem key={index}>
                  {media.type === 'image' && media.url ? (
                    <MediaThumbnail src={media.url} alt={media.title || 'תמונה'} />
                  ) : (
                    <MediaPlaceholder>
                      {getMediaIcon(media.type)}
                      <Typography variant="caption">
                        {media.type === 'video' ? 'וידאו' : media.type === 'document' ? 'מסמך' : 'תמונה'}
                      </Typography>
                    </MediaPlaceholder>
                  )}
                  {media.title && <MediaLabel>{media.title}</MediaLabel>}
                </MediaItem>
              ))}
            </MediaGrid>
          </Section>
        )}

        <Section>
          <SectionTitle>
            <LocalOfferIcon sx={{ fontSize: 18 }} />
            תגיות
          </SectionTitle>
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
        </Section>

        {item.notes && (
          <Section>
            <SectionTitle>
              <EditNoteIcon sx={{ fontSize: 18 }} />
              הערות
            </SectionTitle>
            <NotesBox>
              <Typography variant="body2">{item.notes}</Typography>
            </NotesBox>
          </Section>
        )}

        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<EditNoteIcon />}
            onClick={() => onOpenNotes(item)}
          >
            {item.notes ? 'עריכת הערות' : 'הוספת הערות'}
          </Button>
        </Box>
      </PanelContent>
    </PanelContainer>
  );
};

export default PostDetailPanel;
