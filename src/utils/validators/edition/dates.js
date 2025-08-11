// Utilities to validate edition submission windows

// Parse YYYY-MM-DD as local Date (avoid timezone issues)
export const toLocalDate = (dateStr) => {
  if (!dateStr) return null;
  const [y, m, d] = String(dateStr).split("-").map(Number);
  if (!y) return null;
  return new Date(y, (m || 1) - 1, d || 1);
};

// Check if "now" is between start and end (inclusive); end is inclusive until 23:59:59.999
export const isDateInRange = (now, start, end) => {
  const startDate = toLocalDate(start);
  const endDate = toLocalDate(end);
  if (!startDate || !endDate) return false;
  endDate.setHours(23, 59, 59, 999);
  return now >= startDate && now <= endDate;
};

// True if either first or second submission window is open
export const isSubmissionWindowOpen = (edition, now = new Date()) => {
  if (!edition) return false;
  const inFirst = isDateInRange(
    now,
    edition.initial_submission_date,
    edition.final_submission_date
  );
  const inSecond = isDateInRange(
    now,
    edition.initial_second_submission_date,
    edition.final_second_submission_date
  );
  return inFirst || inSecond;
};

// Returns which phase is open: 'first' | 'second' | null
export const getCurrentSubmissionPhase = (edition, now = new Date()) => {
  if (!edition) return null;
  if (
    isDateInRange(
      now,
      edition.initial_submission_date,
      edition.final_submission_date
    )
  )
    return "first";
  if (
    isDateInRange(
      now,
      edition.initial_second_submission_date,
      edition.final_second_submission_date
    )
  )
    return "second";
  return null;
};
