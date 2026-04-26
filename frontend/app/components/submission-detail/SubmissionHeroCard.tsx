import { Box, Card, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import { SubmissionDetail } from '@/lib/types';
import { getStatusColor, getStatusLabel, getPriorityColor } from '@/lib/utils/submission-utils';
import { formatDateTime } from '@/lib/utils/date-utils';
import { InfoItem } from './InfoItem';

interface SubmissionHeroCardProps {
  data: SubmissionDetail;
}

export function SubmissionHeroCard({ data }: SubmissionHeroCardProps) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2.5,
        p: 0,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: theme.customShadows.cardElevated,
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease',
        '&:hover': {
          boxShadow: theme.customShadows.heroHover,
        },
      }}
    >
      <Stack spacing={0}>
        {/* Company name + status/priority */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{
            px: 2.5,
            pt: 2.5,
            pb: 2,
            background: theme.customGradients.heroHeader,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {data.company.legalName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.summary}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Status
              </Typography>
              <Chip
                label={getStatusLabel(data.status)}
                color={getStatusColor(data.status, theme.submissionColorMappings.status)}
              />
            </Stack>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Priority
              </Typography>
              <Chip
                label={data.priority.toUpperCase()}
                color={getPriorityColor(data.priority, theme.submissionColorMappings.priority)}
              />
            </Stack>
          </Stack>
        </Box>

        <Divider />

        {/* Key info grid */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: '1fr 1fr',
            sm: '1.5fr 1fr 1fr',
            md: '1.5fr 1fr 1fr 1fr 0.75fr 0.75fr',
          }}
          sx={{
            px: 2.5,
            py: 2,
            gap: 2,
            bgcolor: theme.customBgColors.infoStrip,
            '& > *:not(:last-child)': {
              borderRight: { md: '1px solid' },
              borderColor: { md: 'divider' },
              pr: { md: 2 },
            },
          }}
        >
          <InfoItem
            label="Broker"
            value={data.broker?.name}
            sub={data.broker?.primaryContactEmail}
          />
          <InfoItem label="Owner" value={data.owner?.fullName} sub={data.owner?.email} />
          <InfoItem label="Industry" value={data.company?.industry} />
          <InfoItem label="Head Quarter" value={data.company?.headquartersCity} />
          <InfoItem label="Created" value={formatDateTime(data.createdAt)} />
          <InfoItem label="Updated" value={formatDateTime(data.updatedAt)} />
        </Box>
      </Stack>
    </Card>
  );
}
