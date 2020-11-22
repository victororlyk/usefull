exports.getIndex = (req, res, next) => {
  const page = req.query.page;
  
  Product.find()
         // pagination skip previous pages
         .skip((page - 1) * ITEMS_PER_PAGE)
         // limit to some amount
         .limit(ITEMS_PER_PAGE)
         .then(products => {
           res.render("shop/index", {
             prods: products,
             pageTitle: "Shop",
             path: "/"
           });
         })
         .catch(err => {
           console.log(err);
         });
};
