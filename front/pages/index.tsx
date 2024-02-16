import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'
import HomePage from '@/components/templates/HomePage/HomePage'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

export default function Home() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const getDefaultTextGenerator = () => ''
  const getTextGenerator = () => ''
  return (
    <>
      <Head>
        <title>Ваша мебель | Главная</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <Breadcrumbs
          getDefaultTextGenerator={getDefaultTextGenerator}
          getTextGenerator={getTextGenerator}
        />
        <HomePage />
        <div className="overlay" />
      </main>
    </>
  )
}
