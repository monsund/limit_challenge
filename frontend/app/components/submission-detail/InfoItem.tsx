import { Box, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

interface InfoItemProps {
  label: string;
  value?: string | null;
  sub?: string | null;
}

export function InfoItem({ label, value, sub }: InfoItemProps) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          fontSize: '0.625rem',
          fontWeight: 700,
          color: 'text.disabled',
          display: 'block',
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{ mt: 0.25, lineHeight: 1.4, color: 'text.primary' }}
      >
        {value || ''}
      </Typography>
      {sub && (
        <Box display="flex" alignItems="center" gap={0.5} mt={0.25}>
          <EmailIcon sx={{ fontSize: '0.65rem', color: 'text.secondary' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
            {sub}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
