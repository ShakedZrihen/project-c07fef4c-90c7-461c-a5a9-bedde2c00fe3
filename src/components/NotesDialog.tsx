import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { NewsItem, Tag } from '../types/news';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: theme.palette.background.paper,
    borderRadius: 16,
    border: '1px solid rgba(43, 45, 66, 0.1)',
    minWidth: 500,
    maxWidth: 600,
    boxShadow: '0 20px 40px rgba(43, 45, 66, 0.15)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  padding: theme.spacing(2, 3),
}));

const ItemPreview = styled(Box)(({ theme }) => ({
  background: 'rgba(43, 45, 66, 0.04)',
  borderRadius: 8,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  border: '1px solid rgba(43, 45, 66, 0.08)',
}));

const TagsSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

interface TagChipProps {
  tagColor: string;
  isActive: boolean;
}

const TagChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'tagColor' && prop !== 'isActive',
})<TagChipProps>(({ tagColor, isActive }) => ({
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  background: isActive ? `${tagColor}20` : 'rgba(43, 45, 66, 0.06)',
  color: isActive ? tagColor : 'inherit',
  border: isActive ? `2px solid ${tagColor}` : '1px solid rgba(43, 45, 66, 0.12)',
  '&:hover': {
    background: `${tagColor}15`,
  },
}));

const NotesField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    background: 'rgba(43, 45, 66, 0.03)',
  },
}));

interface NotesDialogProps {
  open: boolean;
  item: NewsItem | null;
  tags: Tag[];
  onClose: () => void;
  onSave: (itemId: string, notes: string, tags: string[]) => void;
}

const NotesDialog = ({ open, item, tags, onClose, onSave }: NotesDialogProps) => {
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (item) {
      setNotes(item.notes || '');
      setSelectedTags(item.tags || []);
    }
  }, [item]);

  const handleToggleTag = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  const handleSave = () => {
    if (item) {
      onSave(item.id, notes, selectedTags);
      onClose();
    }
  };

  if (!item) return null;

  return (
    <StyledDialog open={open} onClose={onClose} dir="rtl">
      <StyledDialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          עריכת פריט
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <ItemPreview>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {item.content.substring(0, 150)}...
          </Typography>
          <Typography variant="caption" color="text.secondary">
            מקור: {item.source}
          </Typography>
        </ItemPreview>

        <TagsSection>
          <SectionLabel>תגיות</SectionLabel>
          <TagsContainer>
            {tags.map((tag) => (
              <TagChip
                key={tag.id}
                label={tag.name}
                tagColor={tag.color}
                isActive={selectedTags.includes(tag.name)}
                onClick={() => handleToggleTag(tag.name)}
              />
            ))}
          </TagsContainer>
        </TagsSection>

        <Box>
          <SectionLabel>הערות</SectionLabel>
          <NotesField
            multiline
            rows={4}
            fullWidth
            placeholder="הוסף הערות, סיכום או מידע נוסף..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} color="inherit">
          ביטול
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          שמור שינויים
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default NotesDialog;
