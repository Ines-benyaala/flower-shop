import Product from './Product'

function Products({products, search}) {
  return (
    <div className="products-container">
        {products.filter(product => product.name.toUpperCase().includes(search.toUpperCase())).map(product => {
         return(
        <Product product={product}/>
         )
       })}
    </div>
  )
}

export default Products