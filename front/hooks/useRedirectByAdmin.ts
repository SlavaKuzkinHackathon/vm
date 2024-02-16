import { checkUserAuthFx } from '@/app/api/auth'
import { $auth, $user, setAuth, setUser } from '@/context/user'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const useRedirectByAdmin = (isAdminPage = false) => {
  const user = useStore($user)
  const auth = useStore($auth)

  const [shouldAccessAllow, setshouldAccessAllow] = useState(false)

  const router = useRouter()

  const shouldAccessAuth = useRef(true)

  useEffect(() => {
    if (shouldAccessAuth.current) {
      shouldAccessAuth.current = false
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    if (auth) {
      const isAdmin = user.roles.findIndex((role) => role.id === 2) !== -1
      
      if (isAdmin) {
        setAuth(isAdminPage)
        setshouldAccessAllow(true)
        return
      }
    }
    router.push('/')
  }

  return { shouldAccessAllow }
}

export default useRedirectByAdmin
