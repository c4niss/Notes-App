export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
export const getinitials = (name)=>{
  if(!name){
    return ""
  }
  const words = name.split(" ")
  let initials = ''

  for(let i =0 ; i < Math.min(words.length, 2); i++){
    initials += words[i][0]
  }
  return initials.toUpperCase()
}