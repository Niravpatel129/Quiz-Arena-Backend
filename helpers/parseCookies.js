module.exports = (cookieHeader) => {
  const cookies = {};
  cookieHeader &&
    cookieHeader.split(';').forEach((cookie) => {
      const parts = cookie.match(/(.*?)=(.*)$/);
      cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
  return cookies;
};
