import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Container from '../../components/container/Container'
import Button from '../../components/button/Button'
import { getProduct } from '../../services/api'
import type { IProduct } from '../../types/server'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'

function Product() {
    const [product, setProduct] = useState<IProduct>()
    const params = useParams<{ id: string }>();

    const { handleDecreaseProductQty,
         handleIncreaseProductQty,
          cartItems, getProductQty,
           handleRemoveProduct 
        } = useShoppingCartContext();

    useEffect(() => {
        getProduct(params.id as string).then((data) => {
            setProduct(data);
        });
    }, []);

    console.log(cartItems);


    return (
        <div>
            <Container>
                <div className=" h-96 shadow mt-4 grid grid-cols-12">
                    <div className="col-span-10 p-4">
                        <h1 className="text-right">{product?.title}</h1>
                        <div>
                            <p className="text-right">{product?.price}</p>
                            <p className="text-right">{product?.description}</p>
                        </div>
                    </div>

                    <div className=" col-span-2 p-4 bg-sky-200">
                        <img className="rounded" src={product?.image} alt="" />


                        {
                            getProductQty(parseInt(params.id as string)) === 0 ? (
                                <Button
                                    className="mt-2 w-full !py-3"
                                    variant="primary"
                                    onClick={() =>
                                        handleIncreaseProductQty(parseInt(params.id as string))
                                    }
                                >
                                    Add to Cart
                                </Button>

                            ) : (

                                <>
                                    <div className='grid grid-cols-3'>

                                        <Button
                                            className="mt-2 w-full"
                                            variant="primary"
                                            onClick={() =>
                                                handleIncreaseProductQty(parseInt(params.id as string))
                                            }
                                        >
                                            +
                                        </Button>

                                        <span className='flex justify-center items-center'>{getProductQty(parseInt(params.id as string))}</span>

                                        <Button

                                            className="mt-2 w-full"
                                            variant="primary"
                                            onClick={() => {
                                                handleDecreaseProductQty(parseInt(params.id as string));
                                            }}
                                        >
                                            -
                                        </Button>

                                    </div>

                                    <Button
                                        className="mt-2 w-full !py-3"
                                        variant="danger"
                                        onClick={() =>
                                            handleRemoveProduct(parseInt(params.id as string))}
                                    >
                                        حذف
                                    </Button>

                                </>

                            )}








                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Product
