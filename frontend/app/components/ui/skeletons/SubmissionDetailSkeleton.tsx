'use client';

import { Box, Card, CardContent, Divider, Grid, Skeleton, Stack } from '@mui/material';

export function SubmissionDetailSkeleton() {
  return (
    <Grid container spacing={2}>
      {/* Hero Card */}
      <Grid size={12}>
        <Card variant="outlined" sx={{ borderRadius: 2.5, overflow: 'hidden' }}>
          {/* Top section: company name + summary + chips */}
          <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box flex={1}>
                <Skeleton variant="text" width="40%" height={36} />
                <Skeleton variant="text" width="65%" height={22} sx={{ mt: 0.5 }} />
              </Box>
              <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <Skeleton variant="text" width={40} height={18} />
                  <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: 4 }} />
                </Stack>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <Skeleton variant="text" width={46} height={18} />
                  <Skeleton variant="rounded" width={64} height={28} sx={{ borderRadius: 4 }} />
                </Stack>
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Key info grid: Broker / Owner / Industry / City / Created / Updated */}
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }}
            sx={{ px: 2.5, py: 2, gap: 2, bgcolor: 'rgba(0,0,0,0.015)' }}
          >
            {[70, 55, 50, 45, 55, 50].map((w, i) => (
              <Box key={i}>
                <Skeleton variant="text" width={`${w - 15}%`} height={14} />
                <Skeleton variant="text" width={`${w}%`} height={20} sx={{ mt: 0.25 }} />
                {i < 2 && (
                  <Skeleton variant="text" width={`${w - 10}%`} height={14} sx={{ mt: 0.25 }} />
                )}
              </Box>
            ))}
          </Box>
        </Card>
      </Grid>

      {/* Contacts Card */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Skeleton variant="text" width={70} height={16} />
              <Skeleton variant="rounded" width={24} height={20} sx={{ borderRadius: 1 }} />
            </Stack>
            <Divider sx={{ mb: 2, opacity: 0.5 }} />
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.75}>
              {[0, 1, 2, 3].map((i) => (
                <Stack key={i} direction="row" gap={1.25} alignItems="flex-start">
                  <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    sx={{ flexShrink: 0, mt: 0.25 }}
                  />
                  <Box flex={1}>
                    <Skeleton variant="text" width="70%" height={18} />
                    <Skeleton variant="text" width="50%" height={14} />
                    <Skeleton variant="text" width="80%" height={14} sx={{ mt: 0.25 }} />
                  </Box>
                </Stack>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Documents Card */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Skeleton variant="text" width={80} height={16} />
              <Skeleton variant="rounded" width={24} height={20} sx={{ borderRadius: 1 }} />
            </Stack>
            <Divider sx={{ mb: 2, opacity: 0.5 }} />
            <Stack spacing={1}>
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  sx={{ p: 1.25, borderRadius: 1.5, border: '1px solid', borderColor: 'divider' }}
                >
                  <Skeleton variant="text" width="55%" height={20} />
                  <Stack direction="row" spacing={1} mt={0.25} alignItems="center">
                    <Skeleton variant="rounded" width={52} height={20} sx={{ borderRadius: 4 }} />
                    <Skeleton variant="text" width={80} height={16} />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Notes Section */}
      <Grid size={12}>
        <Card variant="outlined">
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Skeleton variant="circular" width={16} height={16} />
                <Skeleton variant="text" width={48} height={16} />
              </Stack>
              <Skeleton variant="rounded" width={24} height={20} sx={{ borderRadius: 1 }} />
            </Stack>
            <Divider sx={{ mb: 2, opacity: 0.5 }} />
            <Grid container spacing={1.5}>
              {[0, 1, 2].map((i) => (
                <Grid key={i} size={{ xs: 12, md: 6, lg: 4 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 1.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderLeft: '3px solid',
                      borderLeftColor: 'divider',
                    }}
                  >
                    <Stack direction="row" gap={1.25} alignItems="center" mb={1}>
                      <Skeleton variant="circular" width={28} height={28} sx={{ flexShrink: 0 }} />
                      <Box>
                        <Skeleton variant="text" width={90} height={18} />
                        <Skeleton variant="text" width={70} height={14} />
                      </Box>
                    </Stack>
                    <Divider sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="100%" height={16} />
                    <Skeleton variant="text" width="85%" height={16} />
                    <Skeleton variant="text" width="60%" height={16} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
