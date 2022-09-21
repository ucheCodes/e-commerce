<template>
    <div>

            <!--Product Details Page-->
    <div class="small-container single-product">
        <div class="row">
            <div class="col-2">
                <img src="../images/gallery-1.jpg" alt="gallery-1" width="100%">

                <div class="small-img-row">
                    <div class="small-img-col">
                        <img src="../images//gallery-2.jpg" alt="gallery-2" width="100%">
                    </div>
                    <div class="small-img-col">
                        <img src="../images//gallery-2.jpg" alt="gallery-2" width="100%">
                    </div>
                    <div class="small-img-col">
                        <img src="../images//gallery-2.jpg" alt="gallery-2" width="100%">
                    </div>
                    <div class="small-img-col">
                        <img src="../images//gallery-2.jpg" alt="gallery-2" width="100%">
                    </div>
                </div>
            </div>
            <div class="col-2">
                <p>Product / prd name T - T-shirt</p>
                <h1>Red Printed T-shirt</h1>
                <h4>N 2,500.00</h4>
                <input type="number" value="1">
                <button class="btn">Add to Cart</button>
                <h3>Product Description <i class="fa fa-indent"></i></h3><br>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Excepturi perferendis quae, fuga accusamus delectus asperiores non vero totam magnam esse.
                </p>
                <div class="btns">
                    <button class="btn">Edit</button>
                    <button class="btn"><i class="fa fa-trash"></i> Delete</button>
                </div>
            </div>
        </div>

        <div class="row row-2">
            <h2>Related Products</h2>
            <p>View More </p>
        </div>
        <div class="row">
            <div class="col-4">
                <img src="../images/product-1.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div class="col-4">
                <img src="../images/product-2.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div class="col-4">
                <img src="../images/product-3.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div class="col-4">
                <img src="../images/product-4.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
        </div>
    </div>

    </div>

</template>