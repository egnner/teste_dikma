import { Box, Link, Typography } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';

export const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'primary.main',
        color: 'white',
        py: { xs: 1, sm: 2 },
        textAlign: 'center',
        fontSize: { xs: '0.75rem', sm: '0.875rem' }
      }}
    >
      <Typography 
        variant="body2" 
        component="div" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 0.5,
          fontSize: 'inherit'
        }}
      >
        Desenvolvido por{' '}
        <Link
          href="https://github.com/egnner"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Egnner
          <GitHubIcon sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }} />
        </Link>
      </Typography>
    </Box>
  );
}; 