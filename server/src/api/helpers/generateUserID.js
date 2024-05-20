//Function to create the unique USER ID
exports.generateUserID = () => {
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let userID = "U";
    for (let i = 0; i < 3; i++) {
      userID += possibleChars.charAt(
        Math.floor(Math.random() * possibleChars.length)
      );
    }
    return userID;
  };

  