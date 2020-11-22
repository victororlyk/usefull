//pagination.ejs
<section class="pagination">
    <% if(currentPage !== 1 && previousPage !== 1){ %>
        <a href="?page=1">1</a>
    <% } %>
    <% if(hasPreviousPage){ %>
        <a href="?page=<%= previousPage %>"><%= previousPage %></a>
    <% } %>
    <a href="?page=<%= currentPage %>" class="active"><%= currentPage %></a>
    <% if(hasNextPage){ %>
        <a href="?page=<%= nextPage %>"><%= nextPage %></a>
    <% } %>
    <% if(lastPage !== currentPage && nextPage !== lastPage){ %>
        <a href="?page=<%= lastPage %>"><%= lastPage %></a>
    <% } %>

</section>


//ejs index.ejs
            <%- include('../includes/pagination.ejs',
            {currentPage:currentPage,
            nextPage:nextPage,previousPage:previousPage, lastPage:lastPage,
            hasNextPage:hasNextPage, hasPreviousPage:hasPreviousPage}) %>

//shop controller
const ITEMS_PER_PAGE = 2;
exports.getIndex = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems = 0;
  Product.find()
         .countDocuments()
         .then(numberOfProducts => {
           totalItems = numberOfProducts;
           Product.find()
             // pagination skip previous pages
                  .skip((page - 1) * ITEMS_PER_PAGE)
             // limit to some amount
                  .limit(ITEMS_PER_PAGE)
                  .then(products => {
                    res.render("shop/index", {
                      prods: products,
                      pageTitle: "Shop",
                      path: "/",
                      currentPage: page,
                      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                      hasPreviousPage: page > 1,
                      nextPage: page + 1,
                      previousPage: page - 1,
                      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
                    });
                  })
                  .catch(err => {
                    console.log(err);
                  });
         });

};
