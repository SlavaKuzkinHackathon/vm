import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import OrderPage from '@/components/templates/OrderPage/OrderPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'
import { useCallback } from 'react'

const Order = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  const getDefaultTextGenerator = useCallback(() => 'Оформление заказа', [])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])

  return (
    <>
      <Head>
        <title>
          Ваша мебель | {shouldLoadContent ? 'Оформление заказа' : ''}
        </title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {shouldLoadContent && (
        <main>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <OrderPage />
          <div className="overlay" />
        </main>
      )}
    </>
  )
}

export default Order
