import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
  background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(17, 24, 39, 0.95) 100%)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(10px)',
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: 12,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
}));

const TitleSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const MainTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

const ActionSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
    background: 'rgba(0, 191, 165, 0.1)',
  },
}));

interface HeaderProps {
  newItemsCount: number;
}

const Header = ({ newItemsCount }: HeaderProps) => {
  const currentTime = new Date().toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const currentDate = new Date().toLocaleDateString('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <HeaderContainer>
      <LogoSection>
        <LogoIcon>
          <NewspaperIcon sx={{ color: '#000', fontSize: 28 }} />
        </LogoIcon>
        <TitleSection>
          <MainTitle>מערכת דסק חדשות בינלאומי</MainTitle>
          <SubTitle>מזרח תיכון וצפון אפריקה</SubTitle>
        </TitleSection>
      </LogoSection>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
            {currentTime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentDate}
          </Typography>
        </Box>

        <ActionSection>
          <Badge badgeContent={newItemsCount} color="error">
            <StyledIconButton>
              <NotificationsIcon />
            </StyledIconButton>
          </Badge>
          <StyledIconButton>
            <SettingsIcon />
          </StyledIconButton>
        </ActionSection>
      </Box>
    </HeaderContainer>
  );
};

export default Header;
