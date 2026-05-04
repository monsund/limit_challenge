import { Suspense } from 'react';
import { SubmissionsPageContent } from '@/components/submissions';

export default function SubmissionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubmissionsPageContent />
    </Suspense>
  );
}
