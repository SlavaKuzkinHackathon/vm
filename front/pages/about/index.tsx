import Head from 'next/head'
import AboutPage from '@/components/templates/AboutPage/AboutPage'
import { useCallback } from 'react'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

function About() {
  const getDefaultTextGenerator = useCallback(() => 'О компании', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])
  return (
    <>
      <Head>
        <title>Ваша мебель | O компании</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <AboutPage />
    </>
  )
}
export default About
