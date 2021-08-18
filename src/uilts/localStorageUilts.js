export default {
    setUser:(user)=> {localStorage.setItem("user_key",JSON.stringify(user))},
    getUser:()=> JSON.parse(localStorage.getItem("user_key")) || {},
    removeUser:()=>{localStorage.removeItem("user_key")}

}