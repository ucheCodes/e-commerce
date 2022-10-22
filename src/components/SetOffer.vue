<script setup lang="ts">
    import router from '@/router';
    import { ref, onMounted } from 'vue';
    import {storeToRefs } from "pinia";
    import {useSoftStore} from "../stores/soft-store";
    import moment from "moment";
    import axios from "axios";

    const softStore = useSoftStore();
    const {setTableName, getUserId, parseCurrency, create, read, readAll, del, delAll, exists} = useSoftStore();
    const {apiUrl,isAdmin, clientPath,projectName, user, categoryArr, allProducts, _offer, offers,_edit} = storeToRefs(softStore);

    const setOffer = (product : any) =>{
      create("Offer","offer",product).then(
        response => {alert(response.data)}
      );
      _offer.value = product;
    }
    const _delete = (id : string, filepath : any) => {
    if(confirm("This offer will be deleted permanently")){
        del("Offers",id).then(response =>
        {
          if (response.status == 200) {
            offers.value = offers.value.filter((p) => p.id != id);
            alert(response.data);
            deleteImage(filepath);
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

  const edit = (product : any) => {
    _edit.value = product;
    router.push("/data");
  }

    onMounted(() => {
    });
</script>

<template>
    <div>
       
            <!--Orders-->
    <div class="container">
        <div class="row">
            <h2 class="title">Set Offer</h2>
            <div class="col-1">
                <div class="row-3">
                    <p>Filter offers by ...</p>
                    <select>
                        <option value="Computers">Computers</option>
                        <option value="Phones">Phones</option>
                        <option value="Computers">Computers</option>
                        <option value="Phones">Phones</option>
                        <option value="Computers">Computers</option>
                        <option value="Phones">Phones</option>
                    </select>
                    <input type="text" placeholder="filter parameter">
                </div>
                <div>
                    <table class="table">
                        <thead>
                          <th>S / N</th>
                          <th>Product Id</th>
                          <th>Product Name</th>
                          <th>Unit Price</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Set Btn</th>
                          <th>Photo</th>
                          <th v-if="isAdmin">Edit</th>
                          <th v-if="isAdmin">Delete</th>
                        </thead>
                        <tbody>
                          <tr v-for="(product,index) in offers" :key="product.id">
                            <td data-label="S / N">{{index + 1}}</td>
                            <td data-label="Product Id">{{product.id.slice(0,5)}} ... {{product.id.slice(product.id.length-5,product.id.length)}}</td>
                            <td data-label="Product Name">{{product.name}}</td>
                            <td data-label="Unit Price">{{parseCurrency(product.price)}}</td>
                            <td data-label="Date">{{moment(product.date).format('ll')}}</td>
                            <td data-label="Time">{{moment(product.date).format('LT')}}</td>
                            <td data-label="Set Btn"><button @click="setOffer(product)" class="btn">Set Offer</button></td>
                            <td data-label="Photo"><img :src="product.imageUrl" :alt="product.name"></td>
                            <td @click="edit(product)" class="icon" v-if="isAdmin" data-label="Edit"><i class="fa fa-edit"></i></td>
                            <td @click="_delete(product.id, product.filepath)" class="icon" v-if="isAdmin" data-label="Delete"><i class="fa fa-trash"></i></td>
                          </tr>
                        </tbody>
                      </table>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>