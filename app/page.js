'use client';

import { Box, Typography, Button, AppBar, Toolbar, Link } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/tracker/tracker');
  };

  const handleNavClick = (path) => {
    router.push(path);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{
        overflow: 'hidden',
        fontFamily: 'monospace',
        backgroundImage: 'url(back.jpeg)',
        backgroundPosition: 'center', 
        backgroundRepeat: 'repeat', }}
    >
   

      <Box
        width="100%"
        height="calc(100% - 64px)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
       
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={4} p={4}  spacing={2} bgcolor=" #c18e57" borderRadius={10} boxShadow={2}>
          <Typography variant="h2"  mb={2} sx={{ fontWeight: 'bold', textAlign: 'center',fontFamily:'monospace' }}>
            Welcome to Pantryhub
          </Typography>
          <Typography variant="h6" mb={4} sx={{ textAlign: 'center' ,fontFamily:'monospace' }}>
           Your Go-To App for Efficient Kitchen Inventory Management.
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleGetStarted}
            sx={{fontFamily:'monospace',
              mt: 2,
              backgroundColor: '#956837',
              '&:hover': {
                backgroundColor: '#99401C',
              },
              padding: '10px 20px',
              borderRadius: '20px',
              textTransform: 'none',
              fontSize: '20px',
              fontWeight: 'bold',
              display: 'block',
            }}
          >
            Start !
          </Button>
        </Box>

        
        
      </Box>
    </Box>
  );
}

