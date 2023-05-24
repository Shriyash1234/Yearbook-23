export const setUserName = (userName,userMail) => {
  console.log("userName is " + userName)
  console.log("userName is " + userMail)
    return {
      type: "SNAME",
      payloadName: userName,
      payloadMail: userMail
    }
  }