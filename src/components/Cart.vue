<script setup lang="ts">
    import offer from './Offer.vue';
</script>
<template>
    <div>

            <!--Cart Page-->
    <div class="small-container cart-page">
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Sub-total</th>
            </tr>
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="../images/buy-1.jpg" alt="buy-1">
                        <div>
                            <p>Red T-shirt</p>
                            <small>Price : N 500</small><br>
                            <small>Remove</small>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1"></td>
                <td>N2,500</td>
            </tr>
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="../images/buy-1.jpg" alt="buy-1">
                        <div>
                            <p>Red T-shirt</p>
                            <small>Price : N 500</small><br>
                            <small>Remove</small>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1"></td>
                <td>N2,500</td>
            </tr>
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="../images/buy-1.jpg" alt="buy-1">
                        <div>
                            <p>Red T-shirt</p>
                            <small>Price : N 500</small><br>
                            <small>Remove</small>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1"></td>
                <td>N2,500</td>
            </tr>
        </table>

        <div class="total-price">
            <table>
                <tr>
                    <td>Sub - total</td>
                    <td>N 40,000</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td>N 4,000</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>N 44,000</td>
                </tr>
            </table>
        </div>
        <div class="btns">
            <button class="btn">Pay Now</button>
        </div>
    </div>
    <div>
        <offer/>
    </div>
    </div>
</template>