

export const isBirthDate = (birthDate)=>{
    let bornAt = new Date(birthDate)

    const current = Date.now()

    return current>bornAt
}

export const parseBirth = (birth) =>{

  const date = new Date(birth);

  
  let day = date.getDate();
  day = day<10?`0${day}`:`${day}`
  let month = date.getMonth() + 1; 
  month = month<10?`0${month}`:`${month}`
  let year = date.getFullYear();

  return `${day}-${month}-${year}`;
}