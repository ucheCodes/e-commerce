<script setup lang="ts">
  import offer from './Offer.vue';
  import router from '@/router';
  import { ref, onMounted } from 'vue';
  import {storeToRefs } from "pinia";
  import {useSoftStore} from "../stores/soft-store";
  import  moment from "moment";
  import axios from "axios";
  import SpinnerVue from './Spinner.vue';

  const softStore = useSoftStore();
  const {setTableName, getUserId, parseCurrency, create, read, readAll, del, delAll, exists} = useSoftStore();
  const {apiUrl,isAdmin, clientPath,projectName, user, categoryArr, allProducts, _offer, _edit, commision, vat} = storeToRefs(softStore);

  const selectedVal = ref("All");
  const param = ref("");
    const products = ref([]);
    const categoryChanged = (e) => {
        selectedVal.value = e.target.value;
        if (e.target.value == "All") {
            products.value = allProducts.value;
        } 
        else if (e.target.value == "Recent") {
          products.value = allProducts.value.filter(log => ((moment(new Date()).diff(moment(log.date),'days')) <= 1));
        }
        else if (e.target.value == "name") {
          products.value = allProducts.value.filter(result => result.name.toLowerCase().includes(param.value.toLowerCase()));
        }
        else if (e.target.value == "id") {
          products.value = allProducts.value.filter(result => result.id.includes(param.value.toLowerCase()));
        }
        else {
            products.value = allProducts.value.filter((result) => result.category == e.target.value);
        }
    }
    onMounted(() => {
        products.value = allProducts.value;
        if (products.value) {
          products.value.sort(function (x ,y) {
                    const a : any = new Date(x.date);
                    const b : any = new Date(y.date);
                    return b - a;
          });
        }
    });

  const edit = (product : any) => {
    _edit.value = product;
    router.push("/data");
  }

  const _delete = (id : string, filepath : any) => {
    if(confirm("This product will be deleted permanently")){
        del("Products",id).then(response =>
        {
          if (response.status == 200) {
            allProducts.value = allProducts.value.filter((p) => p.id != id);
            products.value = products.value.filter((p) => p.id != id);
            deleteImage(filepath);
            alert(response.data);
          }
        });
    }
  }

  const deleteImage = (filepath : any) => {
        if (filepath) {
          var newPath = filepath.replaceAll(`\\`,"_")
            axios.delete(apiUrl.value+"file/"+newPath)
            .then(response => {
                console.log(response.data);
            }).catch(error => console.error(error));
          }
      }

    const inflate = () => {
      var select_inflate = document.getElementById("select-inflate") as HTMLSelectElement;
      if (confirm(`do you really want to inflate ${select_inflate.options[select_inflate.selectedIndex].value} products by 20%`)) {
        if (select_inflate.options[select_inflate.selectedIndex].value == 'all') {
            allProducts.value.forEach(p => {
              if (((moment(new Date()).diff(moment(p.date),'days')) >= 30)) {
                p.date = new Date();
                p.price += (0.2 * p.price);
                create("Products",p.id,p);
              }
            });
            alert("price modification success");   
        } else if (select_inflate.options[select_inflate.selectedIndex].value == 'normal') {
            allProducts.value.forEach(p => {
              if (((moment(new Date()).diff(moment(p.date),'days')) >= 30) && p.category != 'luxury') {
                p.date = new Date();
                p.price += (0.2 * p.price);
                create("Products",p.id,p);
              }
            }); 
            alert("price modification success");        
      }
      else if (select_inflate.options[select_inflate.selectedIndex].value == 'luxury') {
            allProducts.value.forEach(p => {
              if (((moment(new Date()).diff(moment(p.date),'days')) >= 30) && p.category == 'luxury') {
                p.date = new Date();
                p.price += (0.2 * p.price);
                create("Products",p.id,p);
              }
            });
            alert("price modification success");          
      }
      else if (select_inflate.options[select_inflate.selectedIndex].value == 'gold') {
            allProducts.value.forEach(p => {
              if (((moment(new Date()).diff(moment(p.date),'days')) >= 30) && p.category == 'luxury' && p.name.toLowerCase().includes('gold')) {//make 30
                p.date = new Date();
                p.price += (0.2 * p.price);
                create("Products",p.id,p);
              }
            });
            alert("price modification success");         
      }
      else if (select_inflate.options[select_inflate.selectedIndex].value == 'non gold') {
            allProducts.value.forEach(p => {
              if (((moment(new Date()).diff(moment(p.date),'days')) >= 30) && p.category == 'luxury' && !p.name.toLowerCase().includes('gold')) {//make 30
                p.date = new Date();
                p.price += (0.2 * p.price);
                create("Products",p.id,p);
              }
            });   
            alert("price modification success");   
      }
    }
    }
  </script>

<template>
<div>
       
   <div class="container" v-if="allProducts.length">
      <div class="row">
          <div class="col-1">
              <h2 class="title">Automatic Price Inflation</h2>
              <p class="red">Please do not tamper with this section except you are authorized to do so</p>
              <div class="row-3">
                    <p>Inflate Prices by ...</p>
                    <select id="select-inflate">
                      <option value="all">All</option>
                      <option value="normal">Normal</option> 
                      <option value="luxury">Luxury</option>                  
                      <option value="gold">Gold</option>
                      <option value="non gold">Non Gold</option>                   
                    </select>
                    <button @click="inflate" class="btn">inflate</button>
                </div>
           </div>
            <h2 class="title">All Uploaded Products</h2>
            <div class="col-1">
                <div class="row-3">
                    <p>Filter products by ...</p>
                    <select @change="categoryChanged($event)" v-if="categoryArr.length">
                      <option value="All">All</option>
                      <option value="Recent">Most Recent</option>
                      <option value="name">Product's Name</option>                   
                      <option value="id">Product's Id</option>                   
                      <option v-for="c in categoryArr" :key="c" :value="c">{{c}}</option>
                    </select>
                    <input v-model="param" type="text" placeholder="filter parameter">
                </div>
                <div>
                    <table class="table">
                        <thead>
                          <th>S / N</th>
                          <th>Product Id</th>
                          <th>Product Name</th>
                          <th>Unit Price</th>
                          <th>Original Price</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Edit</th>
                          <th>Delete</th>
                          <th>Photo</th>
                        </thead>
                        <tbody>
                          <tr v-for="(product,index) in products">
                            <td data-label="S / N">{{index+1}}</td>
                            <td data-label="Product Id">{{product.id.substring(0,5)}} ... {{product.id.substring(product.id.length-5,product.id.length)}}</td>
                            <td data-label="Product Name">{{product.name}}</td>
                            <td data-label="Unit Price">{{parseCurrency(product.price)}}</td>
                            <td data-label="Original Price">{{parseCurrency(product.price - ((commision + vat) * product.price))}}</td>
                            <td data-label="Date">{{moment(product.date).format('ll')}}</td>
                            <td data-label="Time">{{moment(product.date).format('LT')}}</td>
                            <td @click="edit(product)" data-label="Edit"><button class="btn">Edit</button></td>
                            <td @click="_delete(product.id, product.filepath)" data-label="Delete"><button class="btn">Delete</button></td>
                            <td data-label="Photo"><img :src="product.imageUrl" alt="product"></td>
                          </tr>
                        </tbody>
                      </table>
                </div>
            </div>
        </div>
  </div>
  <div v-else>
        <SpinnerVue/>
    </div>

</div>
</template>