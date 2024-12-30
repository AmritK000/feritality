/*********************************************************
   *This function is used to calculate dog current age by calculating its dob
   *********************************************************/
export const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear()
    let months = now.getMonth() - birthDate.getMonth()
    if (months < 0) {
        years--;
        months += 12
    }
    return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
};

/*********************************************************
* Function Name : shortAddress
* Description   : shortAddress
* By            : Noor Alam
* Date          : 16August-2024 
*********************************************************/
export const shortAddress = (text, wordLimit) => {
    try{
       const words = text.split('');
       if(words.length>wordLimit){
        return words.slice(0, wordLimit).join('') + '...';
       }
    }catch (error){
        return text;
    }
}



/*********************************************************
* Function Name : getCurrentDayStoreHours
* Description   : getCurrentDayStoreHours
* By            : Noor Alam
* Date          : 26August-2024 
*********************************************************/
export const getCurrentDayStoreHours = (hoursData) => {
    try {
        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const currentDayIndex = new Date().getDay();
        const currentDay = daysOfWeek[currentDayIndex]; // Get the name of the current day
        
        // Find the store hours for the current day
        const storeHoursForToday = hoursData.find(entry => entry.day === currentDay);
        
        if (storeHoursForToday) {
            return {
                openTime: storeHoursForToday.open_time,
                closeTime: storeHoursForToday.close_time,
                status: storeHoursForToday.status
            };
        } else {
            return {
                openTime: "Not available",
                closeTime: "Not available",
                status: "Closed"
            };
        }
    } catch (error) {
        console.error("Error getting store hours:", error);
        return {
            openTime: "Error",
            closeTime: "Error",
            status: "Error"
        };
    }
};


