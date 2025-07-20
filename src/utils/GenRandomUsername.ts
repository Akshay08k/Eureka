function generateRandomUsername() {
  const randomString = Math.random().toString(36).substring(2, 7); // e.g., 'x7f3k'
  return `user_${randomString}`;
}

export default generateRandomUsername;
