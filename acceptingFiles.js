// here is the mock of how it should look like in ejs

 <form class="product-form"
          action="/admin/<% if (editing) { %>edit-product<% } else { %>add-product<% } %>"
          method="POST"
          enctype="multipart/form-data">
        <div class="form-control">
            <label for="title">Title</label>
            <input
                    class="<%= validationErrors.find(e => e.param === 'title') ? 'invalid' : '' %>"
                    type="text"
                    name="title"
                    id="title"
                    value="<% if (editing || hasError) { %><%= product.title %><% } %>">
        </div>
        <!--            <div class="form-control">
                <label for="imageUrl">Image URL</label>
                <input
                    class="<%= validationErrors.find(e => e.param === 'imageUrl')
                ? 'invalid'
                : '' %>"
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    value="<% if (editing || hasError) { %><%= product.imageUrl %><% } %>">
            </div>-->
        <div class="form-control">
            <label for="image">Image</label>
            <input type="file"
                   name="image"
                   id="image">
        </div>
        <div class="form-control">
            <label for="price">Price</label>
            <input
                    class="<%= validationErrors.find(e => e.param === 'price') ? 'invalid' : '' %>"
                    type="number"
                    name="price"
                    id="price"
                    step="0.01"
                    value="<% if (editing || hasError) { %><%= product.price %><% } %>">
        </div>
        <div class="form-control">
            <label for="description">Description</label>
            <textarea
                    class="<%= validationErrors.find(e => e.param === 'description')
                            ? 'invalid'
                            : '' %>"
                    name="description"
                    id="description"
                    rows="5">
                <% if (editing || hasError) { %><%= product.description %>
                <% } %>
            </textarea>
        </div>
        <% if (editing) { %>
            <input type="hidden" value="<%= product._id %>" name="productId">
        <% } %>

        <input type="hidden" name="_csrf" value="<%= csrfToken %>">
        <button class="btn" type="submit">
            <% if (editing) { %>Update Product
            <% } else { %>Add Product
            <% } %>
        </button>
    </form>


//for this action we need parser we will use multer app.js
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "=" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const acceptedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (acceptedTypes.includes(file.mimetype)) {
    cb(null, true);
  }
  cb(null, false);
};

app.use(multer({ storage: fileStorage, fileFilter:fileFilter })
  .single("image"))
