import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { NewsItem } from '../types/news';

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

const SelectedCount = styled(Chip)(({ theme }) => ({
  background: `${theme.palette.primary.main}20`,
  color: theme.palette.primary.main,
  fontWeight: 600,
  marginRight: theme.spacing(1),
}));

const SelectedItemsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  maxHeight: 200,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
  },
}));

const SelectedItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  background: 'rgba(255, 255, 255, 0.03)',
  borderRadius: 6,
  fontSize: '0.8rem',
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  flex: 1,
  minWidth: 120,
}));

const SummaryOutput = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  background: 'rgba(0, 191, 165, 0.08)',
  borderRadius: 8,
  border: `1px solid ${theme.palette.primary.main}30`,
}));

interface SummaryPanelProps {
  selectedItems: NewsItem[];
  onGenerateSummary: () => void;
  onClearSelection: () => void;
  summary: string;
}

const SummaryPanel = ({ 
  selectedItems, 
  onGenerateSummary, 
  onClearSelection,
  summary 
}: SummaryPanelProps) => {
  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <PanelContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <SectionTitle sx={{ mb: 0, flex: 1 }}>
          <AutoAwesomeIcon sx={{ fontSize: 18 }} />
          פריטים נבחרים
        </SectionTitle>
        <SelectedCount label={selectedItems.length} size="small" />
      </Box>

      {selectedItems.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
          סמן פריטים ליצירת סיכום משולב
        </Typography>
      ) : (
        <SelectedItemsList>
          {selectedItems.map((item) => (
            <SelectedItem key={item.id}>
              <Typography 
                sx={{ 
                  flex: 1, 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap' 
                }}
              >
                {item.title}
              </Typography>
            </SelectedItem>
          ))}
        </SelectedItemsList>
      )}

      <ButtonGroup>
        <ActionButton
          variant="contained"
          color="primary"
          startIcon={<AutoAwesomeIcon />}
          disabled={selectedItems.length === 0}
          onClick={onGenerateSummary}
        >
          צור סיכום
        </ActionButton>
        <ActionButton
          variant="outlined"
          color="inherit"
          startIcon={<ClearAllIcon />}
          disabled={selectedItems.length === 0}
          onClick={onClearSelection}
        >
          נקה בחירה
        </ActionButton>
      </ButtonGroup>

      {summary && (
        <SummaryOutput>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="primary">
              סיכום משולב
            </Typography>
            <Button 
              size="small" 
              startIcon={<ContentCopyIcon />}
              onClick={handleCopySummary}
            >
              העתק
            </Button>
          </Box>
          <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
            {summary}
          </Typography>
        </SummaryOutput>
      )}
    </PanelContainer>
  );
};

export default SummaryPanel;
