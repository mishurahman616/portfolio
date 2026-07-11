export const getYearsOfExperience = () => {
    // Started career in December 2023
    const startDate = new Date('2023-12-01');
    const today = new Date();
    
    // Calculate total difference in months
    const diffMonths = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth());
    
    // Calculate years with decimals
    const totalYears = diffMonths / 12;
    
    // Round down to the nearest 0.5 (e.g., 2.4 -> 2.0, 2.7 -> 2.5, 3.1 -> 3.0)
    return Math.floor(totalYears * 2) / 2;
};
