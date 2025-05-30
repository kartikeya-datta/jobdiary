import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GET_ALL_OFFERS } from '../graphql/query';
import JobApplicationDialog from './JobApplicationDialog';
import useJobApplicationDialog from '../hooks/useJobApplicationDialog';
import useSortableTable from '../hooks/useSortableTable';
import SortableTable from './common/SortableTable';
import CustomDialog from './common/CustomDialog';

export default function OfferListDialog({ handleClose, open }) {
  const [offers, setOffers] = useState([]);
  
  const { loading, error, data, refetch } = useQuery(GET_ALL_OFFERS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => setOffers(data.allOffer),
  });

  const { 
    open: jobDialogOpen, 
    jobApplication, 
    handleOpen: handleJobDialogOpen, 
    handleClose: handleJobDialogClose 
  } = useJobApplicationDialog(() => {
    refetch().then(({ data }) => setOffers(data.allOffer));
  });

  const columns = [
    {
      key: 'jobApplication.companyName', // Nested property example
      label: 'Company Name',
      sortable: true,
      render: (value, row) => value || row.jobApplication?.companyName || 'N/A', // Fallback for nested value
    },
    { key: 'offerDate', label: 'Offer Date', sortable: true },
    { key: 'salaryOffered', label: 'Salary Offered', sortable: true },
    { key: 'description', label: 'Note' },
    {
      key: 'actions',
      label: 'Job Application',
      render: (value, row) => (
        <Button 
          size="small" 
          color="info" 
          variant="outlined" 
          onClick={() => handleJobDialogOpen(row.jobApplication)}
        >
          Job Details
        </Button>
      ),
      align: 'center',
    },
  ];

  const { sortedData, handleSort, getSortIndicator } = useSortableTable(offers, columns);

  useEffect(() => {
    if (open) {
      refetch()
        .then(({ data }) => {
          if (data) setOffers(data.allOffer);
        })
        .catch((err) => console.error('Refetch error:', err));
    }
  }, [open, refetch]);

  return (
    <CustomDialog
      open={open}
      onClose={handleClose}
      onCancel={handleClose}
      title="Offer List"
    >
      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error" align="center">
            Something went wrong. Please try again later.
          </Typography>
        ) : (
          <SortableTable
            data={sortedData}
            columns={columns}
            handleSort={handleSort}
            getSortIndicator={getSortIndicator}
          />
        )}
      </DialogContent>
      <JobApplicationDialog
        jobApplication={jobApplication}
        open={jobDialogOpen}
        handleClose={handleJobDialogClose}
      />
    </CustomDialog>
  );
}
