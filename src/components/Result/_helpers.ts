export function convertToAMPM(dateTimeString: string) {
    // Parse the input date-time string
    const dateTime = new Date(dateTimeString);
  
    // Extract hours and minutes
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
  
    // Convert hours to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
    // Add leading zero to minutes if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    // Determine if it's AM or PM
    const period = hours < 12 ? 'AM' : 'PM';
  
    // Construct the final formatted string
    const formattedTimeString = `${formattedHours}.${formattedMinutes} ${period}`;
  
    return formattedTimeString;
  }