import {useSelector} from "react-redux"

export default function CartList(){
    const cartSelector = useSelector((state)=>state.cart.items)
    console.log(cartSelector)

  return<>
    <div className="cart-container">
      <div className="cart-header;">
        <h2>Your cart Items</h2>
      </div>
      {
        cartSelector.length > 0 ? cartSelector.map((item)=>(
             <div key={item.id} className="cart-item">
          
                <div className="item-info">
                  <img src={item.thumbnail} />
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    <p>{item.brand}</p>
                    </div>
                  </div>
                  
                  <div className="item-actions">
                    <span className="price">{item.price}</span>
                    <button className="btn">Remove</button>
                  </div>
                </div>
            

        ))
        :null

      }
    </div>
    </>
}