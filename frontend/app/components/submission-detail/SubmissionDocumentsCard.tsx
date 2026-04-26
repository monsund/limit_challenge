import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Document } from '@/lib/types';
import { formatDateTime } from '@/lib/utils/date-utils';

interface SubmissionDocumentsCardProps {
  documents: Document[];
}

export function SubmissionDocumentsCard({ documents }: SubmissionDocumentsCardProps) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: theme.customShadows.card,
        transition: 'box-shadow 0.2s ease',
        '&:hover': { boxShadow: theme.customShadows.cardHover },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5}>
          <Typography
            variant="overline"
            sx={{
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              fontWeight: 700,
              color: 'text.secondary',
              lineHeight: 1,
            }}
          >
            Documents
          </Typography>
          <Chip
            label={documents.length}
            size="small"
            variant="outlined"
            sx={{ height: 20, fontSize: '0.7rem', borderRadius: 1 }}
          />
        </Box>
        <Divider sx={{ mb: 2, opacity: 0.5 }} />

        <Stack spacing={1}>
          {documents.map((doc) => (
            <Box
              key={doc.id}
              sx={{
                p: 1.25,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                transition: '0.15s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: theme.customBgColors.documentHover,
                },
              }}
            >
              <MuiLink
                href={doc.fileUrl}
                target="_blank"
                underline="hover"
                sx={{ fontWeight: 600, fontSize: '0.85rem', display: 'block' }}
              >
                {doc.title}
              </MuiLink>
              <Box display="flex" alignItems="center" gap={0.75} mt={0.25}>
                <Chip
                  label={doc.docType}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {formatDateTime(doc.uploadedAt)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
