import dynamic from 'next/dynamic'
import toastlib from 'react-hot-toast'

const Toaster = dynamic(
  () => import('react-hot-toast').then((c) => c.Toaster),
  {
    ssr: false,
  }
)

export const AppToaster = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 3000,
      style: {
        minWidth: '120px',
        padding: '8px 12px',
        borderRadius: '16px',
        boxShadow: '0px 5px 30px 0px rgba(219, 219, 219, 0.6)',
      },
    }}
  />
)

type Renderable = JSX.Element | string | null
type ToastId = string

export const toast = {
  loading: (message: Renderable, toastId?: ToastId): ToastId =>
    toastlib.loading(() => message, { id: toastId }),

  error: (message: Renderable, toastId?: ToastId): ToastId =>
    toastlib.error(() => message, { id: toastId }),

  unknownError: (error: unknown, toastId?: ToastId): ToastId => {
    if (error instanceof Error) {
      return toastlib.error(error.message, { id: toastId })
    }

    console.error('Unexpected error:', error)
    return toastlib.error('Unexpected error', { id: toastId })
  },

  success: (message: Renderable, toastId?: ToastId): ToastId =>
    toastlib.success(() => message, { id: toastId }),

  promise: function <T>(
    promise: Promise<T>,
    {
      toastId,
      ...options
    }: {
      loading: Renderable
      error: Renderable
      success: Renderable
      toastId?: ToastId
    }
  ) {
    return toastlib.promise(promise, options, { id: toastId })
  },

  hide: (toastId: ToastId) => toastlib.dismiss(toastId),
}
