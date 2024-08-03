'use client';

import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { Box, Typography, Stack, TextField, Button, AppBar, Toolbar, Link, List, ListItem, ListItemText, Snackbar, Alert } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, query, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function TrackerPage() {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    updateInventory();
  }, []);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, `pantry`));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    if (item.trim() === '') return;
    const docRef = doc(collection(firestore, `pantry`), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, `pantry`), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    updateInventory();
  };

  const handleNavClick = (path) => {
    router.push(path);
  };

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Box
      sx={{
        backgroundImage: 'url(/back.jpeg)', 
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        fontFamily: 'monospace',
        overflow: 'auto', 
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: " #825b30", padding: '10px 20px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
            <Link
              href="#"
              onClick={() => handleNavClick('/')}
              sx={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', mx: 2,fontSize:'20px' }}
            >
              Home
            </Link>
         
          </Box>
        </Toolbar>
      </AppBar>

      
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        pb={4} 
        
      >
        <br></br>
        <br></br>
       
        <Box width="60%" spacing={2} p={2} bgcolor=" #c18e57" borderRadius={10} boxShadow={2}>
          <Typography variant="h4" spacing={2} mb={2} fontWeight={'bold'} sx={{fontFamily:'monospace'}}> 
            <br></br>
            Your Pantry
          </Typography>
          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              variant="outlined"
              label="Add an item..."
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem(itemName)} 
              
            />
            <Button variant="contained" color="primary" onClick={() => addItem(itemName)} >
              Add
            </Button>
          </Stack>

          <TextField
            variant="outlined"
            label="Search pantry..."
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />

          <List>
            {filteredInventory.map((item) => (
              <ListItem
                key={item.name}
                sx={{
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold', fontSize: '25px',fontFamily:'monospace'}}>
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1" sx={{fontFamily:'monospace'}}>
                      Quantity: {item.quantity}
                    </Typography>
                  }
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removeItem(item.name)}
                  style={{
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    minWidth: '40px',
                    padding: 0,
                    fontWeight: 'bold',
                    bgcolor:"white",
                  }}
                >
                  -
                </Button>
                <Typography
                  variant="body1"
                  sx={{ mx: 2, fontWeight: 'bold' ,fontFamily:'monospace'}} 
                >
                  {item.quantity}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => addItem(item.name)}
                  style={{
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    minWidth: '40px',
                    padding: 0,
                    fontWeight: 'bold',
                  }}
                >
                  +
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
   
    </Box>
  );
}
