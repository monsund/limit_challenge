'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Chip,
  useTheme,
  Tooltip,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import NotesIcon from '@mui/icons-material/Notes';
import Link from 'next/link';
import { UseQueryResult } from '@tanstack/react-query';

import { getStatusColor, getStatusLabel, getPriorityColor } from '@/lib/utils/submission-utils';
import { formatDateTime } from '@/lib/utils/date-utils';
import { PaginatedResponse, SubmissionListItem } from '@/lib/types';
import { Button } from '@mui/material';
import { SubmissionCardSkeleton } from '../ui/skeletons';
import { ApiErrorState, SubmissionsPagination } from '../ui';

interface SubmissionsListProps {
  page: string;
  submissionsQuery: UseQueryResult<PaginatedResponse<SubmissionListItem>, Error>;
  submissionQueryData: PaginatedResponse<SubmissionListItem> | undefined;
  updateFilter: (key: string, value: string) => void;
}

function SubmissionsListComponent({
  page,
  submissionsQuery,
  submissionQueryData,
  updateFilter,
}: SubmissionsListProps) {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        height: { xs: 'auto', md: 'calc(100vh - 130px)' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          overflowY: { xs: 'visible', md: 'auto' },
        }}
      >
        <Stack spacing={2} sx={{ height: '100%' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Typography variant="h6">
              Submission list ({submissionQueryData?.count ?? 0})
            </Typography>
            <SubmissionsPagination
              page={page}
              totalCount={submissionQueryData?.count}
              hasPrevious={!!submissionQueryData?.previous}
              hasNext={!!submissionQueryData?.next}
              onPreviousClick={() => updateFilter('page', String(Number(page) - 1))}
              onNextClick={() => updateFilter('page', String(Number(page) + 1))}
              onPageClick={(pageNumber) => updateFilter('page', String(pageNumber))}
            />
          </Stack>

          <Divider />

          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              pr: 1,
            }}
          >
            <Stack spacing={2}>
              {/* Loading */}
              {(submissionsQuery.isLoading || submissionsQuery.isFetching) && (
                <SubmissionCardSkeleton />
              )}

              {/* Error */}
              {submissionsQuery.error && <ApiErrorState entityName="submissions" />}

              {/* Empty */}
              {!submissionsQuery.isLoading && (submissionQueryData?.results?.length ?? 0) === 0 && (
                <Typography>No submissions found</Typography>
              )}

              {/* List */}
              {!submissionsQuery.isLoading &&
                submissionQueryData?.results?.map((item, index) => (
                  <Card
                    key={item.id}
                    variant="outlined"
                    sx={{
                      backgroundColor:
                        index % 2 === 0
                          ? theme?.submissionColorMappings?.alternatingRowBackground
                          : 'transparent',
                    }}
                  >
                    <CardContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 2 } }}>
                      <Stack spacing={2}>
                        {/* Header Row: Company & Status/Priority */}
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          justifyContent="space-between"
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          spacing={1}
                        >
                          <Box flex={1}>
                            <Typography
                              variant="h6"
                              sx={{
                                wordBreak: 'break-word',
                                fontSize: { xs: '1rem', sm: '1.25rem' },
                                fontWeight: 600,
                              }}
                            >
                              {item.company.legalName}
                            </Typography>
                          </Box>
                          <Stack
                            direction={{ xs: 'row' }}
                            spacing={1}
                            alignItems="center"
                            sx={{ flexShrink: 0 }}
                          >
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="body2" color="text.secondary">
                                Status:
                              </Typography>
                              <Chip
                                label={getStatusLabel(item.status)}
                                color={getStatusColor(
                                  item.status,
                                  theme.submissionColorMappings.status,
                                )}
                                size="small"
                              />
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="body2" color="text.secondary">
                                Priority:
                              </Typography>
                              <Chip
                                label={item.priority.toUpperCase()}
                                color={getPriorityColor(
                                  item.priority,
                                  theme.submissionColorMappings.priority,
                                )}
                                size="small"
                              />
                            </Box>
                          </Stack>
                        </Stack>

                        {/* Summary */}
                        <Typography
                          sx={{
                            fontSize: { xs: '0.9rem', sm: '0.95rem' },
                            wordBreak: 'break-word',
                            color: 'text.secondary',
                          }}
                        >
                          {item.summary}
                        </Typography>

                        <Divider />

                        {/* Info Row: Broker, Owner, Date */}
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={{ xs: 2, sm: 3 }}
                          divider={
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{ display: { xs: 'none', sm: 'block' } }}
                            />
                          }
                        >
                          <Box flex={1}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              Broker
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {item.broker.name}
                            </Typography>
                          </Box>
                          <Box flex={1}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              Owner
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {item.owner.fullName}
                            </Typography>
                          </Box>
                          <Box flex={1}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              Created
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {formatDateTime(item.createdAt)}
                            </Typography>
                          </Box>
                        </Stack>

                        {/* Document & Notes with Icons */}
                        <Stack direction="row" spacing={3}>
                          <Tooltip title={`${item.documentCount} document(s)`}>
                            <Box display="flex" alignItems="center" gap={0.75}>
                              <DescriptionIcon fontSize="small" color="primary" />
                              <Typography variant="body2" color="text.secondary">
                                {item.documentCount}
                              </Typography>
                            </Box>
                          </Tooltip>
                          <Tooltip title={`${item.noteCount} note(s)`}>
                            <Box display="flex" alignItems="center" gap={0.75}>
                              <NotesIcon fontSize="small" color="primary" />
                              <Typography variant="body2" color="text.secondary">
                                {item.noteCount}
                              </Typography>
                            </Box>
                          </Tooltip>
                        </Stack>

                        {/* Latest Note */}
                        {item.latestNote && (
                          <Box
                            sx={{
                              background: (theme) => `${theme.palette.primary.main}08`,
                              p: 1.5,
                              borderRadius: '6px',
                              borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: 'block', mb: 0.5 }}
                            >
                              Latest Note
                            </Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                              {item.latestNote.bodyPreview}
                            </Typography>
                          </Box>
                        )}

                        {/* View Details Button */}
                        <Box>
                          <Link href={`/submissions/${item.id}`}>
                            <Button size="small">View Details →</Button>
                          </Link>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export const SubmissionsList = React.memo(SubmissionsListComponent);
