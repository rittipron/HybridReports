// MOCK data แบบง่าย (ใช้แทน API จริง)
const mockUsers = [
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
]

// Function ยิง API (เปลี่ยน baseURL ได้)
export async function fetchUsers() {
  // ถ้าจะใช้ API จริง: ใช้ axios.get() หรือ fetch()
  // return axios.get<User[]>('/api/users').then(res => res.data)

  // Mock Delay
  await new Promise(res => setTimeout(res, 500))
  return mockUsers
}

export async function createUser(user) {
  const newUser = {
    id: Math.floor(Math.random() * 1000),
    ...user
  }

  // mock delay
  await new Promise(res => setTimeout(res, 300))
  return newUser
}

export async function login() {
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username: username.value, password: password.value }),
  })

  if (res.ok) {
    alert('Login success')
    router.push('/profile')
  } else {
    alert('Login failed')
  }
}
