import { useUser } from '../../UserProvider'
import UploadNotFound from '../NotFoundPage/uploadNotFound/UploadNotFound';
import ProductUploadForm from './upload/ProductUploadForm'

const ProductUpload = () => {
  
  const {user} = useUser();

  return (
    <>
    {/* {user?.email === 'asdf' ? (
      <div className='page'>
        <h1 className='text-[20px] font-bold'>상품 업로드</h1>
        <ProductUploadForm/>
    </div>
    ) : (
      <div>
        <UploadNotFound/>
      </div>
    )} */}
    <div className='page'>
      <h1 className='text-[25px] font-bold mb-7'>상품 업로드</h1>
      <ProductUploadForm/>
    </div>
    </>
  )
}

export default ProductUpload