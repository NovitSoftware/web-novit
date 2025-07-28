/**
 * Calculate the years of experience for NOVIT Software
 * Based on the company founding date: February 26, 2015
 */
export function calculateYearsOfExperience(): string {
  const foundingDate = new Date('2015-02-26');
  const currentDate = new Date();
  
  // Calculate the difference in milliseconds
  const diffInMs = currentDate.getTime() - foundingDate.getTime();
  
  // Convert to years (accounting for leap years)
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
  
  // Get the floor value to only increment after each anniversary
  const years = Math.floor(diffInYears);
  
  return `${years}+`;
}