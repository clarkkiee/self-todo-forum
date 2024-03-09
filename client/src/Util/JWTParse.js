const JWTParse = (token) => {
  const base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const parsedPayload = JSON.parse(jsonPayload);
  const payload = {
    id: parsedPayload.id,
    username: parsedPayload.username,
    fullname: parsedPayload.fullname,
    expires: parsedPayload.exp,
  };

  return payload;
};

module.exports = JWTParse;
