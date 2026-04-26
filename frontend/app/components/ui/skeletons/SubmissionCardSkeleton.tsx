'use client';

import { Box, Card, CardContent, Divider, Skeleton, Stack } from '@mui/material';

function SingleCardSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent sx={{ px: 3, py: 2 }}>
        <Stack spacing={2}>
          {/* Header row: company name + status/priority chips */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Skeleton variant="text" width="35%" height={32} />
            <Stack direction="row" spacing={1}>
              <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rounded" width={64} height={24} sx={{ borderRadius: 4 }} />
            </Stack>
          </Stack>

          {/* Summary */}
          <Skeleton variant="text" width="75%" height={20} />

          <Divider />

          {/* Info row: broker / owner / created */}
          <Stack direction="row" spacing={3}>
            <Box flex={1}>
              <Skeleton variant="text" width="50%" height={16} />
              <Skeleton variant="text" width="80%" height={20} />
            </Box>
            <Box flex={1}>
              <Skeleton variant="text" width="40%" height={16} />
              <Skeleton variant="text" width="70%" height={20} />
            </Box>
            <Box flex={1}>
              <Skeleton variant="text" width="45%" height={16} />
              <Skeleton variant="text" width="60%" height={20} />
            </Box>
          </Stack>

          {/* Doc & notes icon row */}
          <Stack direction="row" spacing={3}>
            <Skeleton variant="rounded" width={48} height={20} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rounded" width={48} height={20} sx={{ borderRadius: 1 }} />
          </Stack>

          {/* Latest note preview */}
          <Skeleton variant="rounded" width="100%" height={52} sx={{ borderRadius: 1.5 }} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export function SubmissionCardSkeleton() {
  return (
    <Stack spacing={2}>
      {[0, 1, 2].map((i) => (
        <SingleCardSkeleton key={i} />
      ))}
    </Stack>
  );
}
