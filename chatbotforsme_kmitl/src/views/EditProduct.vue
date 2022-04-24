<template>
  <v-app>
    <v-main class="main">
      <v-card class="product">
          <v-card-title>
                <h2 class="">แก้ไขสินค้า</h2>
            </v-card-title>  
        

        <v-form class="px-3" v-for="item in items" v-bind:key="item.idProduct" @submit.prevent="submit1(item.Product_Name,item.Product_Count,item.Product_Cost,item.Product_Detail,item.Product_Picture)">
          <!-- <v-text-field v-for="item in item" v-bind:key="item.idProduct" disabled v-model="item.idProduct" label="รหัสสินค้า" outlined></v-text-field> -->
          <v-text-field
            v-model="item.Product_Name"
            label="ชื่อสินค้า"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="item.Product_Count"
            label="จำนวน"
            outlined
          ></v-text-field>
          
              <template>
            <v-text-field
              v-model="item.Product_Cost"
              label="ราคา"
              outlined
            ></v-text-field>
            <v-textarea
              v-model="item.Product_Detail"
              label="รายละเอียด"
              outlined
            ></v-textarea>
            <v-file-input
              id="file"
              ref="file"
              v-model="item.Product_Picture"
              label="รูปสินค้า"
              dense
              outlined
            ></v-file-input>
            <!--<v-file-input v-model="form.Product_Picture"  label="รูปสินค้า" dense outlined></v-file-input>-->
            <v-row align="center" justify="space-around">
              <v-btn
              type="submit"
                event
                
                center
                class="px-12"
                color="success"
                >บันทึกข้อมูล</v-btn
              >
            </v-row>
            <v-row> &nbsp; </v-row>
          </template>
        </v-form>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";
import moment from "moment";
Vue.use(VueAxios, axios, Swal,moment);
export default {
  name: "",
  components: {},

  data() {
    return {
      items: {
        idProduct: "",
        Product_Name: "",
        Product_Count: "",
        
        Product_Cost: "",
        Product_Detail: "",
      },
      Product_Picture: [],
    };
  },
  computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    
  async mounted() {
    const result = await axios.get(
      " http://localhost:3000/api/product/" + this.$route.params.idProduct
    );
    console.warn(result.data.data);
    this.items = result.data.data;
  },
  methods: {

 formatDate(value) {
      return moment(value).format("lll");
    },
    
    getuserbyid() {
      axios
        .get(
          "https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/product/" +
            this.$route.params.id
        )
        .then((response) => {
          // handle success
          this.items.Product_Name = response.data.Product_Name;
          this.items.Product_Count = response.data.Product_Count;
          this.items.Product_Cost = response.data.Product_Cost;
          this.items.Product_Detail = response.data.Product_Detail;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    },

    submit1(Product_Name,Product_Count,Product_Cost,Product_Detail,Product_Picture) {

      console.log(Product_Name,Product_Count,Product_Cost,Product_Detail,Product_Picture);

      let formData = new FormData();
      formData.append("Product_Name", Product_Name);
      formData.append("Product_Count", Product_Count);
      //formData.append("Product_Expire", Product_Expire);
      formData.append("Product_Cost", Product_Cost);
      formData.append("Product_Detail", Product_Detail);
      formData.append("Product_Picture", Product_Picture);

     const result = axios.patch(
        "https://e621-2403-6200-88a0-3137-187f-3b13-b58c-8fb6.ngrok.io/api/product/" +
          this.$route.params.idProduct,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
      ); if(result.status == 200) {
        console.log('success')
        this.$router.push("/Home");
      }
      
    },
    mounted() {
      
   }
  },
  
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@200;400;500&display=swap");
.product {
  margin: 2% 5% 5% 5%;
}

.main {
  margin: 2% 2%;
  font-family: "Prompt", sans-serif;
}
.button {
  margin: 5px;
}
</style>