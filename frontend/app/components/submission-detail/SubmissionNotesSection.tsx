import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import { NoteDetail } from '@/lib/types';
import { formatDateTime } from '@/lib/utils/date-utils';

interface SubmissionNotesSectionProps {
  notes: NoteDetail[];
}

export function SubmissionNotesSection({ notes }: SubmissionNotesSectionProps) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: theme.customShadows.card,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <NotesIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
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
              Notes
            </Typography>
          </Box>
          <Chip
            label={notes.length}
            size="small"
            variant="outlined"
            sx={{ height: 20, fontSize: '0.7rem', borderRadius: 1 }}
          />
        </Box>
        <Divider sx={{ mb: 2, opacity: 0.5 }} />

        <Grid container spacing={1.5}>
          {notes.map((note) => (
            <Grid key={note.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Box
                sx={{
                  p: 2,
                  height: '100%',
                  borderRadius: 1.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderLeft: `3px solid ${theme.palette.primary.main}`,
                  background: theme.palette.background.paper,
                  transition: 'box-shadow 0.2s ease, border-left-color 0.2s ease',
                  '&:hover': {
                    boxShadow: theme.customShadows.noteHover,
                    borderLeftColor: 'primary.dark',
                  },
                }}
              >
                <Box display="flex" gap={1.25} alignItems="center" mb={1}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      background: theme.customGradients.avatar,
                      flexShrink: 0,
                    }}
                  >
                    {note.authorName[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                      {note.authorName}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.disabled', fontSize: '0.68rem' }}
                    >
                      {formatDateTime(note.createdAt)}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.65,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    pt: 1,
                    mt: 0.5,
                  }}
                >
                  {note.body}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
