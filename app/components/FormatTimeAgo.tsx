import { formatDistanceToNow } from 'date-fns';

export default function formatTimeAgo(date:Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';

  let result = formatDistanceToNow(date, { addSuffix: true });

  // Remove "about", "over", "almost" etc.
  result = result.replace(/^(about|over|almost)\s+/i, '');

  return result;
}