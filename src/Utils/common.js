// import jwt_decode from 'jwt-decode'; 

// return the user data from the session storage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the current user ID from the session storage
export const getUserId = () => {
  const userStr = JSON.parse(localStorage.getItem('user'));
  if (userStr) { 
    const userId = userStr.id;
    if (userId) return JSON.parse(userId);
    else return null;
  }
  else{ return null; }
} 

// return the token from the session storage
export const getToken = () => { 
  if (typeof window !== `undefined` && window.localStorage) { 
    if(localStorage.getItem('token'))
    { 
      // var decodedToken = jwt_decode(localStorage.getItem('token')); 
      var decodedToken =(localStorage.getItem('token')); 
      let currentDate = new Date(); 

      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) 
      {
        console.log("Token expired.");
        localStorage.clear();

        return null;
      } else {
        console.log("Valid token");   

        return localStorage.getItem('token');
      } 
    }
    else
    {
      return null;
    }
  }
  else
  {
    return null;
  }  
 
}
  
// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.clear();

  // this.props.history.push('/auth/signin');
}
  
// set the token and user from the session storage
export const setUserSession = (token, user) => {  
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export const UserRoleId = () => {
  return localStorage.getItem('user');
} 