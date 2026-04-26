'use client';

import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useSubmissionDetail } from '@/lib/hooks/useSubmissions';
import { ApiErrorState, SubmissionDetailSkeleton } from '@/app/components';
import {
  SubmissionHeroCard,
  SubmissionContactsCard,
  SubmissionDocumentsCard,
  SubmissionNotesSection,
} from '@/app/components/submission-detail';

export default function SubmissionDetailPage() {
  const params = useParams<{ id: string }>();
  const submissionId = params?.id ?? '';
  const router = useRouter();

  const { data, isLoading, isError } = useSubmissionDetail(submissionId);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        {!isLoading && !isError && data && (
          <Typography
            onClick={() => router.back()}
            sx={{
              color: 'primary.main',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            ← Back to list
          </Typography>
        )}
      </Stack>

      {/* Loading */}
      {isLoading && <SubmissionDetailSkeleton />}

      {/* Error */}
      {isError && !isLoading && (
        <>
          <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
            <Typography variant="h6">Unable to load submission details</Typography>
            <Link href="/submissions">
              <Button variant="contained">Back to Submissions</Button>
            </Link>
          </Stack>
          <ApiErrorState entityName="submission" />
        </>
      )}

      {/* Success */}
      {!isLoading && !isError && data && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <SubmissionHeroCard data={data} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SubmissionContactsCard contacts={data.contacts ?? []} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SubmissionDocumentsCard documents={data.documents ?? []} />
          </Grid>

          <Grid size={12}>
            <SubmissionNotesSection notes={data.notes ?? []} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
