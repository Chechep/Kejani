// src/utils/roleGuard.js
export const getUserRole = (email) => {
    if (!email) return "guest";
  
    if (email.endsWith("@house.com")) return "landlord";
    if (email.endsWith("@agent.com")) return "agent";
  
    return "tenant";
  };
  