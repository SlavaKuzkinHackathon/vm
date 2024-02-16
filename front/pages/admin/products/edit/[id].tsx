//import ProductsEdit from '@/components/ProductsEdit';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const AdminUserEditPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
       {/*  <ProductsEdit pageId={id} /> */}
    </>
  );
};
export default AdminUserEditPage;