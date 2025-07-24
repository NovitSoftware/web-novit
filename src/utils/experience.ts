/**
 * Calculates years of experience since the company founding date
 * Company founded: February 26, 2015
 */
export function calculateYearsOfExperience(): string {
  const foundingDate = new Date('2015-02-26');
  const currentDate = new Date();
  
  const diffInMs = currentDate.getTime() - foundingDate.getTime();
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25); // Account for leap years
  
  const years = Math.floor(diffInYears);
  
  return `${years}+`;
}