import React, { useState } from 'react';
import './home.css';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Identification from '../../components/identification';
import Weeks from '../../components/weeks';
import References from '../../components/references';
import Logo from '../../components/logo';
import Menu from '../../components/menu';
import Header from '../../components/header';
import Footer from '../../components/footer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Home() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (

    <>
      <Header />
      <div className='container-home'>
        <div className='menu-home'>
          <Menu />
        </div>

        <Logo />

        <div className='content-ppt'>
          <span className='title'>Plano Pedagógico de Trabalho - PPT</span>
          <Box sx={{ width: '100%' }}>
            <AppBar position="static">
              <Tabs className='all-tabs'
                value={value}
                onChange={handleChange}
                indicatorColor=""
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"

              >
                <Tab label="Identificação" {...a11yProps(0)} className='tab' />
                <Tab label="Sequência Semanal" {...a11yProps(1)} className='tab' />
                <Tab label="Referências" {...a11yProps(2)} className='tab' />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel className='tabsss' value={value} index={0} dir={theme.direction}>
                <Identification />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Weeks />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <References />
              </TabPanel>
            </SwipeableViews>
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );

}