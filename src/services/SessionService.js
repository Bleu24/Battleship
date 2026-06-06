export const SessionService = (function () {

  const saveSessionId = (sessionId) => {
    localStorage.setItem("sessionId", sessionId);
  };

  const getSessionId = () => localStorage.getItem("sessionId");

  const clearSession = () => localStorage.clear();


  return {
    saveSessionId,
    getSessionId,
    clearSession
  };
})();
