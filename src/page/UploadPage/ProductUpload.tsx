import { useUser } from '../../contexts/UserProvider'
import UploadNotFound from '../NotFoundPage/NotFound';
import ProductUploadForm from './upload-form/ProductUploadForm'
import styels from './ProductUpload.module.scss'

const ProductUpload = () => {
  
  const {user} = useUser();
  const admin = 'admin@gmail.com'

  return (
    <>
      {user?.email === admin ? (
        <div className='page'>
          <h1 className={styels.product_upload}>상품 업로드</h1>
          <ProductUploadForm/>
        </div>
        ) : (
          <div>
            <UploadNotFound/>
          </div>
        )}
    </>
  )
}

export default ProductUpload