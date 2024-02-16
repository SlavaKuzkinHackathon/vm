import { checkUserAuthFx } from '@/app/api/auth'
import { setAuth } from '@/context/user'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const useRedirectByUserCheck = (isAuthPage = false) => {
  const [shouldLoadContent, setShouldLoadContent] = useState(false)
  const router = useRouter()
  const shouldCheckAuth = useRef(true)

  useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const user = await checkUserAuthFx('/auth/check-auth')

    if (isAuthPage) {
      if (!user) {
        setShouldLoadContent(true)
        return
      }

      router.push('/')
      return
    }

     if (user) {
     setAuth(true)
      setShouldLoadContent(true)
      return
    }  

    router.push('/')
  }

  return { shouldLoadContent }
}

export default useRedirectByUserCheck
