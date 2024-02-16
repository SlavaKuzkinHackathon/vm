import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import AuthPage from '@/components/templates/AuthPage/AuthPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'
import { useCallback } from 'react'

const Auth = () => {
  const { shouldLoadContent } = useRedirectByUserCheck(true)
  const getDefaultTextGenerator = useCallback(() => 'Авторизация', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])
  return (
    <>
      <Head>
        <title>Ваша мебель | {shouldLoadContent ? 'Авторизация' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          /> 
      {shouldLoadContent && <AuthPage />}
    </>
  )
}

export default Auth
