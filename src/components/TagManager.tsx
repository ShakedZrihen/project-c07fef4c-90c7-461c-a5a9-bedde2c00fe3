import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Paper from '@mui/material/Paper';
import { Tag } from '../types/news';

const PanelContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.background.paper,
  borderRadius: 12,
  border: '1px solid rgba(255, 255, 255, 0.08)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const TagInput = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    background: 'rgba(255, 255, 255, 0.03)',
    '& input': {
      padding: '10px 14px',
    },
  },
});

const AddButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  borderRadius: 8,
  '&:hover': {
    background: theme.palette.secondary.dark,
  },
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

interface TagChipProps {
  tagColor: string;
  isSelected: boolean;
}

const TagChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'tagColor' && prop !== 'isSelected',
})<TagChipProps>(({ tagColor, isSelected }) => ({
  borderRadius: 6,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  background: isSelected ? `${tagColor}30` : 'rgba(255, 255, 255, 0.05)',
  color: isSelected ? tagColor : 'inherit',
  border: isSelected ? `2px solid ${tagColor}` : '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    background: `${tagColor}20`,
    borderColor: tagColor,
  },
}));

interface TagManagerProps {
  tags: Tag[];
  selectedTags: string[];
  onAddTag: (name: string) => void;
  onToggleTag: (tagName: string) => void;
  onDeleteTag: (tagId: string) => void;
}

const TagManager = ({ 
  tags, 
  selectedTags, 
  onAddTag, 
  onToggleTag,
  onDeleteTag 
}: TagManagerProps) => {
  const [newTagName, setNewTagName] = useState('');

  const handleAddTag = () => {
    if (newTagName.trim() && !tags.find(t => t.name === newTagName.trim())) {
      onAddTag(newTagName.trim());
      setNewTagName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  return (
    <PanelContainer>
      <SectionTitle>
        <LocalOfferIcon sx={{ fontSize: 18 }} />
        תגיות וקטגוריות
      </SectionTitle>
      
      <TagInput>
        <StyledTextField
          placeholder="הוסף תגית חדשה..."
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
        />
        <AddButton onClick={handleAddTag} size="small">
          <AddIcon />
        </AddButton>
      </TagInput>

      <TagsContainer>
        {tags.map((tag) => (
          <TagChip
            key={tag.id}
            label={tag.name}
            tagColor={tag.color}
            isSelected={selectedTags.includes(tag.name)}
            onClick={() => onToggleTag(tag.name)}
            onDelete={() => onDeleteTag(tag.id)}
          />
        ))}
      </TagsContainer>
    </PanelContainer>
  );
};

export default TagManager;
