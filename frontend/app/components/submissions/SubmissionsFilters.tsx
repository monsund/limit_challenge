'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  MenuItem,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Collapse,
  Chip,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

import { STATUS_OPTIONS } from '@/lib/utils/submission-utils';
import { useRouter } from 'next/navigation';
import { Broker, PaginatedResponse } from '@/lib/types';
import { ValidationErrorSnackbar } from '../ui';

interface SubmissionsFiltersProps {
  status: string;
  companySearchInput: string;
  hasDocuments: string;
  hasNotes: string;
  createdFrom: string;
  createdTo: string;
  updateFilter: (key: string, value: string) => void;
  setCompanySearchInput: (value: string) => void;
  brokerQuery: UseQueryResult<PaginatedResponse<Broker>, Error>;
  brokerQueryData: PaginatedResponse<Broker> | undefined;
  selectedBroker: Broker | null;
}

export function SubmissionsFiltersComponent({
  status,
  companySearchInput,
  hasDocuments,
  hasNotes,
  createdFrom,
  createdTo,
  updateFilter,
  setCompanySearchInput,
  brokerQuery,
  brokerQueryData,
  selectedBroker,
}: SubmissionsFiltersProps) {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [expandAdvanced, setExpandAdvanced] = useState(false);

  const handleDateChange = (key: string, value: string) => {
    const fromDate = key === 'createdFrom' ? value : createdFrom;
    const toDate = key === 'createdTo' ? value : createdTo;

    // Validate date range if both dates are set
    if (fromDate && toDate && fromDate > toDate) {
      setSnackbarOpen(true);
      return;
    }

    updateFilter(key, value);
  };

  // Count active filters
  const activeFiltersCount = [
    status ? 1 : 0,
    companySearchInput ? 1 : 0,
    selectedBroker ? 1 : 0,
    createdFrom ? 1 : 0,
    createdTo ? 1 : 0,
    hasDocuments ? 1 : 0,
    hasNotes ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <Stack spacing={2}>
      <Card
        variant="outlined"
        sx={{
          '&:hover': {
            borderColor: (theme) => `${theme.palette.primary.main}40`,
          },
        }}
      >
        <CardContent>
          <Stack spacing={3}>
            {/* Header with icon */}
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <FilterListIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Filters
              </Typography>
              {activeFiltersCount > 0 && (
                <Chip
                  label={activeFiltersCount}
                  size="small"
                  color="primary"
                  variant="filled"
                  sx={{ ml: 'auto' }}
                />
              )}
            </Box>

            {/* Primary Filters */}
            <Stack spacing={2}>
              {/* Status */}
              <TextField
                select
                label="Status"
                value={status}
                onChange={(e) => updateFilter('status', e.target.value)}
                fullWidth
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value || 'all'} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* Broker */}
              <Autocomplete
                options={brokerQueryData?.results ?? []}
                getOptionLabel={(option) => (typeof option === 'string' ? '' : option.name)}
                value={selectedBroker}
                onChange={(event, newValue) => {
                  updateFilter('brokerId', newValue ? String(newValue.id) : '');
                }}
                loading={brokerQuery.isLoading}
                disabled={brokerQuery.isLoading || brokerQuery.isError}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Broker"
                    size="small"
                    error={brokerQuery.isError}
                    helperText={
                      brokerQuery.isError
                        ? 'Failed to load brokers'
                        : brokerQuery.isLoading
                          ? 'Loading brokers...'
                          : ''
                    }
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />
                )}
                fullWidth
              />

              {/* Company Search */}
              <TextField
                label="Company search"
                placeholder="Search by name or industry"
                value={companySearchInput}
                onChange={(e) => setCompanySearchInput(e.target.value)}
                fullWidth
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
            </Stack>

            <Divider />

            {/* Advanced Filters Toggle */}
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Advanced Filters
              </Typography>
              <IconButton
                size="small"
                onClick={() => setExpandAdvanced(!expandAdvanced)}
                sx={{
                  transform: expandAdvanced ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <ExpandMoreIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Advanced Filters Collapse */}
            <Collapse in={expandAdvanced} timeout="auto" unmountOnExit>
              <Stack spacing={2}>
                {/* Date Range */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
                  >
                    Created Date Range (Optional)
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      type="date"
                      label="From"
                      value={createdFrom}
                      onChange={(e) => handleDateChange('createdFrom', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                    <TextField
                      type="date"
                      label="To"
                      value={createdTo}
                      onChange={(e) => handleDateChange('createdTo', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Stack>
                </Box>

                {/* Checkbox Filters */}
                <Box
                  sx={{
                    background: (theme) => `${theme.palette.primary.main}10`,
                    p: 2,
                    borderRadius: '8px',
                    border: (theme) => `1px solid ${theme.palette.primary.main}20`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
                  >
                    Content Filters (Optional)
                  </Typography>
                  <Stack spacing={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={hasDocuments === 'true'}
                          onChange={(e) =>
                            updateFilter('hasDocuments', e.target.checked ? 'true' : '')
                          }
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">Has Documents</Typography>}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={hasNotes === 'true'}
                          onChange={(e) => updateFilter('hasNotes', e.target.checked ? 'true' : '')}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">Has Notes</Typography>}
                    />
                  </Stack>
                </Box>
              </Stack>
            </Collapse>
          </Stack>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="center">
        <Button
          variant="outlined"
          size="small"
          startIcon={<ClearIcon />}
          onClick={() => router.push('/submissions')}
          sx={{
            borderRadius: '8px',
          }}
        >
          Reset All
        </Button>
      </Box>

      <ValidationErrorSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message='"From" date cannot be after "To" date'
        severity="error"
      />
    </Stack>
  );
}

export const SubmissionsFilters = React.memo(SubmissionsFiltersComponent);
