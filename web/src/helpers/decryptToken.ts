export const decryptToken = (token: string) => {
  if (!token) return null

  try {
    const base64Url = token.split('.')[1]
    const jwtDecrypt = atob(base64Url)
    const jwtObject = JSON.parse(jwtDecrypt)
  
    return jwtObject
  } catch {
    return null
  }
}
