import { UpdateProductVid } from '@/components/elements/UpdateProductVid/index'
import { Container } from '@/components/ui/Container'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

const AdminProductsPage = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()
  return (
    <Container>
      <div>
        {shouldLoadContent && <UpdateProductVid />}
      </div>
    </Container>
  )
}
export default AdminProductsPage
