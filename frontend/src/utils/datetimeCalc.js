

export const isBirthDate = (birthDate)=>{
    let bornAt = new Date(birthDate)

    const current = Date.now()

    return current>bornAt
}