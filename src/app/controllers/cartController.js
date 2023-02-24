class cartController {
  
  
    showCart(req, res) {
      res.render('cart');
      // const test=localStorage.getItem('cartItems');
      // console.log(test);
    }
    
  }
  module.exports = new cartController();