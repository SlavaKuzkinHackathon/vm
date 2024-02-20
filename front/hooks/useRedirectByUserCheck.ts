import { checkUserAuthFx } from '@/app/api/auth'
import { setAuth, setUser } from '@/context/user'
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
    const token = localStorage.getItem('/auth/check-auth')
    const user = await checkUserAuthFx(token)

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
    /* if (isAuthPage) {
      if (!user) {
        //setUser(user)
        setShouldLoadContent(true)
        return
      } else {
        router.push('/')
      }
    }

    if (user) {
      setUser(user)
      setShouldLoadContent(true)
      return
    } */

    router.push('/')
  }

  return { shouldLoadContent }
}

export default useRedirectByUserCheck

/* import { checkUserAuthFx } from '@/app/api/auth'
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

export default useRedirectByUserCheck */

/*
'use client';
import { checkUserAuthFx } from '@/api/auth';
import { setUser } from '@/context/user';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const useUserCheck = (isLockedPage = false) => {
  const [allowAccess, setAllowAccess] = useState(false);
  const router = useRouter();
  const shouldCheckAuth = useRef(true);

  useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false;
      checkUser();
    }
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem('auth_connection');
    const user = await checkUserAuthFx(token);

    if (isLockedPage) {
      if (user) {
        setUser(user);
        setAllowAccess(true);
      } else {
        router.push('/');
      }
    }

    if (user) {
      setUser(user);
      setAllowAccess(true);
    }
  };

  return { allowAccess };
};

export default useUserCheck;

*/

/*

*/
