import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

function App(props) {
  const [selectedOption, setSelectedOption] = useState('')
  const [historyList, setHistoryList] = useState({ list: [] });
  const [open, setOpen] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const host = "http://localhost:3001"

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    handleClose();
    if (selectedOption) {
      const res = await fetch(`${host}/rollback?id=${selectedOption}`)
      if (res.status === 200) {
        console.log("Rollback Successfully")
      }
    }
  };

  const formatDate = (date) => {
    return date.toLocaleString('en-US', { timeZone: 'UTC' });
  }

  useEffect(() => {
    const getHistory = async () => {
      const result = await fetch(
        `${host}/history`,
      );
      const res = await result.json()
      res["list"].forEach((item) => {
        const validTimestamp = item["time"].replace(/(\d{2})-(\d{2})-(\d{2})-(\d{3})Z/, "$1:$2:$3.$4Z");
        const dateObject = new Date(validTimestamp);
        item["time"] = formatDate(dateObject);
      })
      setHistoryList(res);
    };

    getHistory()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption) {
      // Alert
      setShowAlert(true);
      return;
    } else {
      handleClickOpen();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {showAlert && (
        <Alert
          severity="error"
          onClose={() => setShowAlert(false)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          Please choose a version to rollback
        </Alert>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FormControl
          sx={{
            width: 400
          }}
        >
          <InputLabel id="demo-simple-select-label">
            Version
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={selectedOption}
            label="Version"
            onChange={(e) => setSelectedOption(e.target.value)}
            sx={{ mb: 2 }}
          >
            {historyList["list"].map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.id} | {item.time}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={handleSubmit}>Start Rollback</Button>
        </FormControl>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Rollback Confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Are you sure to rollback to version with id ${selectedOption}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}

export default App;
