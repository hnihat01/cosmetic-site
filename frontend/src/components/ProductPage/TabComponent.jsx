import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function LabTabs({product}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '90%', typography: 'body1', marginLeft:'5%', marginRight:'5%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: '#af8779' }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#af8779', // Color of the indicator
                height: 3, // Height of the indicator
              },
              '& .MuiTab-root': {
                fontFamily: 'Vivaldi',
                color: '#745a50', // Default text color
                textDecoration: 'none', // Remove underline by default
                '&:hover': {
                  color: '#af8779', // Text color on hover
                  textDecoration: 'none', // Underline on hover
                  opacity: 0.7, // Opacity on hover
                },
                '&.Mui-selected': {
                  color: '#af8779', // Text color when tab is selected
                  fontWeight: 'bold', // Change font weight
                  '& .MuiTab-wrapper': {
                    textDecoration: 'underline', // Underline when selected
                  },
                },
                '&.Mui-selected:hover': {
                  opacity: 1, // Fully opaque when selected and hovered
                },
              },
            }}
          >
            <Tab label="DESCRIPTION" value="1" />
            <Tab label="Ingredients" value="2" />
            <Tab label="About the brand" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"> {product.secDes}</TabPanel>
        <TabPanel value="2">{product.ingredients}</TabPanel>
        <TabPanel value="3">{product.aboutBrand}</TabPanel>
      </TabContext>
    </Box>
  );
}
