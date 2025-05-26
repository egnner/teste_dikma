import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        height: '125px',
        width: '100%',
        overflow: 'hidden',
        mb: 4,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/images/header-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)',
          zIndex: 1
        }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h1"
          sx={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontSize: {
              xs: '1.75rem',  // Menor em mobile
              sm: '2rem',     // Pequeno em tablets
              md: '2.5rem'    // Médio em desktop
            }
          }}
        >
          Minhas tarefas
        </Typography>
      </Box>
    </Box>
  );
}; 