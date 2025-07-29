// Pseudo-implementation
export const fakeUserDB = [
  { username: 'john', password: '123456' },
  { username: 'emma', password: 'abcdef' }
];

export function authenticate(username: string, password: string) {
  return fakeUserDB.find(
    (u) => u.username === username && u.password === password
  );
}
