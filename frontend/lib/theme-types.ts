type StatusColorMapping = {
  new: 'info';
  in_review: 'warning';
  closed: 'success';
  lost: 'error';
};

type PriorityColorMapping = {
  high: 'error';
  medium: 'warning';
  low: 'success';
};

export type SubmissionColorMappings = {
  status: StatusColorMapping;
  priority: PriorityColorMapping;
  alternatingRowBackground: string;
};

export const SUBMISSION_COLOR_MAPPINGS: SubmissionColorMappings = {
  status: {
    new: 'info',
    in_review: 'warning',
    closed: 'success',
    lost: 'error',
  },
  priority: {
    high: 'error',
    medium: 'warning',
    low: 'success',
  },
  alternatingRowBackground: 'rgba(15, 98, 254, 0.05)',
};

export interface CustomShadows {
  card: string;
  cardElevated: string;
  cardHover: string;
  heroHover: string;
  noteHover: string;
}

export interface CustomGradients {
  heroHeader: string;
  avatar: string;
}

export interface CustomBgColors {
  infoStrip: string;
  documentHover: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    submissionColorMappings: SubmissionColorMappings;
    heroGradient: string;
    customShadows: CustomShadows;
    customGradients: CustomGradients;
    customBgColors: CustomBgColors;
  }
  interface ThemeOptions {
    submissionColorMappings?: SubmissionColorMappings;
    heroGradient?: string;
    customShadows?: CustomShadows;
    customGradients?: CustomGradients;
    customBgColors?: CustomBgColors;
  }
}
