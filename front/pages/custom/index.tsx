import ServicesPage from '@/components/templates/ServicesPage/ServicesPage'
import Head from 'next/head'
import React from 'react'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useCallback } from 'react'

function Services() {
  const getDefaultTextGenerator = useCallback(() => 'Изготовление на заказ', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
      <Head>
        <title> Ваша мебель | Изготовление на заказ </title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
        <main>
           <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          /> 
          <ServicesPage isCustomPage={false} />
          <div className="overlay" />
        </main>
    </>
  )
}

export default Services
