export const getAuthDataFromLS = () => {
  const lSData = JSON.parse(localStorage.getItem('auth') as string)

  return lSData
}
