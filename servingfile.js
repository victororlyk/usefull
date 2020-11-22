//first we need to have protected route like this
router.get('/orders/:orderId', isAuth, shopController.getInvoice )


// and here we have controller which servers that file
exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
       .then(order => {
         if (!order) {
           return next(new Error("no order found"));
         }
         if (order.user.userId.toString() !== req.user._id.toString()) {
           return next(new Error("Unauthorized"));
         }
         const invoiceName = `invoice-${orderId}.pdf`;
         const invoicePath = path.join("data", "invoices", invoiceName);

         const file = fs.createReadStream(invoicePath);
           res.setHeader("Content-Type", "application/pdf");
           res.setHeader('Content-Disposition', 'inline; filename="'+invoiceName+'"');
           file.pipe(res)
       })
       .catch(err => next(err));

};
