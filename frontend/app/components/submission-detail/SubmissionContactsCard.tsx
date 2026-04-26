import { Avatar, Box, Card, CardContent, Chip, Divider, Typography, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Contact } from '@/lib/types';

interface SubmissionContactsCardProps {
  contacts: Contact[];
}

export function SubmissionContactsCard({ contacts }: SubmissionContactsCardProps) {
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
            Contacts
          </Typography>
          <Chip
            label={contacts.length}
            size="small"
            variant="outlined"
            sx={{ height: 20, fontSize: '0.7rem', borderRadius: 1 }}
          />
        </Box>
        <Divider sx={{ mb: 2, opacity: 0.5 }} />

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.75}>
          {contacts.map((c) => (
            <Box key={c.id} display="flex" gap={1.25} alignItems="flex-start">
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  background: theme.customGradients.avatar,
                  flexShrink: 0,
                  mt: 0.25,
                }}
              >
                {c.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.3 }}>
                  {c.name}
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block' }}>
                  {c.role}
                </Typography>
                {c.email && (
                  <Box display="flex" alignItems="center" gap={0.5} mt={0.25}>
                    <EmailIcon sx={{ fontSize: '0.65rem', color: 'primary.main' }} />
                    <Typography
                      variant="caption"
                      sx={{ color: 'primary.main', fontSize: '0.7rem' }}
                    >
                      {c.email}
                    </Typography>
                  </Box>
                )}
                {c.phone && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <PhoneIcon sx={{ fontSize: '0.65rem', color: 'text.secondary' }} />
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', fontSize: '0.7rem' }}
                    >
                      {c.phone}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
