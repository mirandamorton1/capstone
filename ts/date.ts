export default function formatDate(isoString: any) {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
  
    const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
    const monthName = months[month];
  
    const formattedDate = `${monthName} ${day}, ${year}`;
    
    return formattedDate;
  }

