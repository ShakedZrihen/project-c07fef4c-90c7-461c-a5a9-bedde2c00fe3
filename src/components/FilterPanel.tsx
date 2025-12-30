import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';

const PanelContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.background.paper,
  borderRadius: 12,
  border: '1px solid rgba(43, 45, 66, 0.1)',
  boxShadow: '0 2px 8px rgba(43, 45, 66, 0.06)',
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

const KeywordInput = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    background: 'rgba(43, 45, 66, 0.03)',
    '& input': {
      padding: '10px 14px',
    },
  },
}));

const AddButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 8,
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));

const ChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

const KeywordChip = styled(Chip)(({ theme }) => ({
  borderRadius: 6,
  fontWeight: 500,
  background: 'rgba(0, 191, 165, 0.15)',
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}40`,
  '& .MuiChip-deleteIcon': {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}));

interface FilterPanelProps {
  keywords: string[];
  onAddKeyword: (keyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
}

const FilterPanel = ({ keywords, onAddKeyword, onRemoveKeyword }: FilterPanelProps) => {
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      onAddKeyword(newKeyword.trim());
      setNewKeyword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddKeyword();
    }
  };

  return (
    <PanelContainer>
      <SectionTitle>
        <SearchIcon sx={{ fontSize: 18 }} />
        סינון לפי מילות מפתח
      </SectionTitle>
      
      <KeywordInput>
        <StyledTextField
          placeholder="הוסף מילת מפתח (עברית/ערבית)..."
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <AddButton onClick={handleAddKeyword} size="small">
          <AddIcon />
        </AddButton>
      </KeywordInput>

      <ChipsContainer>
        {keywords.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            אין מילות מפתח פעילות
          </Typography>
        ) : (
          keywords.map((keyword) => (
            <KeywordChip
              key={keyword}
              label={keyword}
              onDelete={() => onRemoveKeyword(keyword)}
            />
          ))
        )}
      </ChipsContainer>
    </PanelContainer>
  );
};

export default FilterPanel;
