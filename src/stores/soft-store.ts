import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { v4 as uuid } from "uuid";

export const useSoftStore = defineStore("soft-store", () => {
  const projectName = ref("Peter's Soft Digital Store-");
  const apiUrl = ref("https://softdb.com.ng/api/");
  //const apiUrl = ref("https://localhost:7164/api/");
  const serverPath = ref("https://softdb.com.ng/");
  const clientPath = ref("https://peters-soft-store.netlify.app/");
  const user = ref<string>("");
  const isAdmin = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const categoryArr = ref([]as string[]);
  const allProducts = ref([]as any);
  const orders = ref([]as any);
  const offers = ref([]as any);
  const logistics = ref([]as any);
  const _offer = ref({} as any);
  const cart = ref([] as any);
  const vat = ref(0.02);
  const commision = ref(0.05);
  const _edit = ref({} as any);
  const rawChats = ref([]);
  const paystack_url = ref("");
  const fromEmail = ref("peters.soft.network@gmail.com");
  const paystack_public_key = ref("");
  const paystack_secret_key = ref("");

  function setTableName(name : string) {
    const table = projectName.value.concat(name);
    return JSON.stringify(table);
  }

  const parseCurrency = (amount : number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
  }

  const nairaToKobo = (amount : number) => {
    return (amount * 100).toFixed(0)
  }
  const KoboToNaira = (amount : number) => {
    return (amount / 100).toFixed(0)
  }

  const getAllCategory = () => {
    readAll("Category").then(
        response => {
          if (Array.isArray(response.data)) {
            response.data.forEach(element => {
              categoryArr.value.push(JSON.parse(element.key));
          });
          }
        }
    );
}

const getAllProducts = () => {
  readAll("Products").then(
    response => {
      if (Array.isArray(response.data) && response.data.length) {
        response.data.forEach(element => {
          allProducts.value.push(JSON.parse(element.value));
        });
      }
    }
  )
}
const getAllOrders = () => {
  readAll("Orders").then(
    response => {
      if (Array.isArray(response.data) && response.data.length) {
        response.data.forEach(element => {
          orders.value.push(JSON.parse(element.value));
        });
      }
    }
  )
}

const getOffer = () => {
  read("Offer","offer").then(
    response => {
      if (response.data.value) {
        _offer.value = JSON.parse(response.data.value);
      }
    }
  );
}
const getAllOffers = () => {
  readAll("Offers").then(
    response => {
      if (Array.isArray(response.data) && response.data.length) {
      response.data.forEach(element => {
        offers.value.push(JSON.parse(element.value));
      });
    }
    }
  )
}
const getLogistics = () => {
  readAll("Logistics").then(
    response => {
      if (Array.isArray(response.data) && response.data.length) {
        response.data.forEach(element => {
          logistics.value.push(JSON.parse(element.value));
        });
     }
    }
  );
}

  const setUserId = () => {
    user.value = uuid();
    localStorage.setItem("soft-cart-user",user.value);
    create("Users",user.value,{
      id: user.value,
      date : new Date()
    });
  }
  const getUserId = () => {
    if (localStorage.getItem("soft-cart-user")) {
      user.value = localStorage.getItem("soft-cart-user");
      //check and get if user is an admin
      read("Admin",user.value).then(
        response => {
          if (response.data.key) {
            if (JSON.parse(response.data.key) == user.value) {
              isAdmin.value = true;
            }
          }
        }
      )
    } else {
      setUserId();
    }
  }

  const getChats = () => {
    readAll("Chats").then(
      response => {
       if (Array.isArray(response.data) && response.data.length) {
          rawChats.value = [];
          response.data.forEach(chat => {
            rawChats.value = [...rawChats.value, JSON.parse(chat.value)];
          });
       }
      } 
   );
  }

  const encrypt = (tableName : string, key : string, value : any) => {
    const table = setTableName(tableName);
    return axios.post(apiUrl.value+"paystack",{
        Tablename : table,
        SerializedKey : key,
        SerializedValue : JSON.stringify(value)
    });
  }
  const decrypt = (tableName : string, key : string) => {
    const table = setTableName(tableName);
    const id = `${table}_${key}`;
    return axios.get(apiUrl.value+"paystack/"+id);
  }
  
  const create = (tableName : string, key : string, value : any) => {
    const table = setTableName(tableName);
    return axios.post(apiUrl.value+"database",{
        Tablename : table,
        SerializedKey : JSON.stringify(key),
        SerializedValue : JSON.stringify(value)
    });
  }


  const read = async (tablename : string, key : string) => {
    return axios.post(apiUrl.value+"database/read",{
      Tablename : setTableName(tablename),
      SerializedKey : JSON.stringify(key),
      serializedValue : ""
  });
  }

  const readAll = async (tableName:string) => {
    return axios.get(apiUrl.value+"database/"+setTableName(tableName));
  }

  const del = async (tablename : string, key : string) => {
    return axios.put(apiUrl.value+"database/delete",{
        Tablename : setTableName(tablename),
        SerializedKey : JSON.stringify(key),
        serializedValue : ""
    });
  }

  const delAll = async (tableName:string) => {
    return axios.delete(apiUrl.value+"database/"+setTableName(tableName));
  }

  const exists = async (tablename : string, key : string) => {
    return axios.put(apiUrl.value+"database",{
    Tablename : setTableName(tablename),
    SerializedKey : JSON.stringify(key),
    serializedValue : ""
    });
 }

 const find = (data : [], id : string) => {
    var res = data.find((result : any) => result.id == id);
    return res;
 }

 //I love this one oo. Short and precise. I may use later but for now, let me use code below
//paystack api method trial
/*
const makePayment = (data : any) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${paystack_secret_key.value}`
  }
  
  //later I will create a ref value for api status indicating the response of the paystack transaction then later
  //I will now add the transaction to my orders database
  axios.post("https://api.paystack.co/transaction/initialize", data, {
      headers: headers
    }).then(
      response => {
        console.log(response);
        //get the transaction reference then call paystack controller and save the transaction
        paystack_url.value = response.data.data.authorization_url;
        console.log(paystack_url.value);
      }
    )
}
*/
//This approach is valid and will be used
 const makePayment = (data : any, orderInfo : any) => {
  const PaystackPop =  window.PaystackPop;
  if (paystack_public_key.value) {
    var handler = PaystackPop.setup({
      key: paystack_public_key.value,
      email: data.email,
      amount: data.amount,
      currency: 'NGN', 
      ref: data.ref,
      callback: function(response) {
        var reference = response.reference;
        if (response.status == "success") {
          create("Orders",data.ref,orderInfo).then(response => alert(`We can't thrive without you. Thank you so much \n ${response.data}`));
          cart.value = [];
          //call email sending api here
          var body = `<p>Thank you for patronizing us, We really appreciate your patronage on our platform. Thank you. <br> Your transaction with reference Id
          ${reference} is well received. <br> <a href="https://peterstore.vercel.app/">click here to Explore More Content From Peter's 
          Soft Digital Store</a> </p> <br> <br> <a href="https://api.whatsapp.com/send?phone=2349063809830">Chat with our customer care representative</a>`;
          sendEmail(data.email,reference,"Peter's Soft Digital Store", body);
        }
      },
      onClose: function() {
        alert('Transaction was not completed, window closed.');
      },
    });
    handler.openIframe();
  }
  else{
    alert("server is down, transaction can't be completed at this moment \n Kindly try again later.")
  }
 }
 const verifyTrans = async (reference : string) => {
      if (paystack_secret_key.value) {
        return axios.get("https://api.paystack.co/transaction/verify/"+reference, {
          headers: {
            'Authorization': `Bearer ${paystack_secret_key.value}`
          }
        })
      }
 }
 const sendEmail = (toEmail : string, referenceId : string, subject : string, body : string) => {
  axios.post(apiUrl.value+'email',{
    ToEmail : toEmail,
    FromEmail : fromEmail.value,
    SubJect : subject,
    Body : body
  });/*.then(
    response => {
      alert(response.data);
    }
  );*/
}

  return { 
    projectName, apiUrl, serverPath,clientPath, user, isAdmin, categoryArr, allProducts,_offer,cart,
     offers,logistics, commision, vat,orders, _edit, rawChats,isLoading, paystack_public_key, paystack_secret_key,
      paystack_url,
       verifyTrans, setTableName, parseCurrency, nairaToKobo, KoboToNaira, getAllCategory, getChats, getAllProducts,getAllOrders, getOffer,getLogistics, getAllOffers, getUserId, create, 
      read, readAll, del, delAll, exists, find,makePayment, encrypt, decrypt, sendEmail
  };
});
