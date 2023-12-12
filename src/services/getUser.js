import axios from 'axios'

export const GetUserCookie = async (token) => {
  const response = await axios.get('/profile', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const { user } = response.data
  return user
}
