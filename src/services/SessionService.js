export const SessionService = (function () {

  const saveSessionId = (sessionId) => {
    localStorage.setItem("sessionId", sessionId);
  };


  return {
    saveSessionId
  };
})();
