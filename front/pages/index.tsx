//import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'
import HomePage from '@/components/templates/HomePage/HomePage'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

export default function Home() {
  //const { shouldLoadContent } = useRedirectByUserCheck()
  const getDefaultTextGenerator = () => ''
  const getTextGenerator = () => ''
  return (
    <>
      <Head>
        <title>Ваша мебель | Главная</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="Продажа диванов в Новосибирске.
            Модели мягкой мебели эконом класса."
        />
        <meta
          name="keywords"
          content="Купить диваны, мягкую мебель, недорого, от производителя в Новосибирске"
        />
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
