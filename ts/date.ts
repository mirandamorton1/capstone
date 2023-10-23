export default function formatDate(isoString: any) {
    let date = new Date(isoString);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
  
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = months[month];
  
    let formattedDate = `${monthName} ${day}, ${year}`;
    
    return formattedDate;
  }

