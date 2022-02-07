<template>
    <v-dialog max-width="600px">
        <template v-slot:activator="{ on }">    
            <v-btn class="button"
                color="yellow"
                elevation="2"
                v-on="on"
                @click="getProductById(item.idProduct)"
                
              >แก้ไข</v-btn>
        </template>

        <v-card>
            <v-card-title>
                <h2 class="">แก้ไขสินค้า</h2>
            </v-card-title>  
            <v-card-text>
                <div v-for="item in products" v-bind:key="item.idProduct">

                <v-form class="px-3">
                    <v-text-field v-model="item.idProduct" label="รหัส" outlined></v-text-field>
                    <v-text-field v-model="item.Product_Name" label="ชื่อสินค้า" outlined></v-text-field>
                    <v-text-field v-model="item.Product_Count" label="จำนวน" outlined></v-text-field>
                <v-menu
                    
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="item.Product_Expire"
                        label="วันที่ผลิต"
                        prepend-icon=""
                        outlined
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                </template>
                    <v-date-picker
                        v-model="item.Product_Expire"
                        @input="menu2 = false"
                    > </v-date-picker>
                </v-menu> 
                <template>   
                    <v-text-field v-model="item.Product_Cost" label="ราคา" outlined></v-text-field>
                    <v-textarea v-model="item.Product_Detail" label="รายละเอียด" outlined></v-textarea>
                    <!--<v-file-input v-model="form.Product_Picture"  label="รูปสินค้า" dense outlined></v-file-input>-->
                    
                    <v-row align="center" justify="space-around">                
                        <v-btn event v-on:click="submit()" center class="px-12" color="success">บันทึกข้อมูล</v-btn>
                    </v-row>
                </template>    
                </v-form>
                </div>
            </v-card-text>   
        </v-card>
    </v-dialog>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swal from 'sweetalert2'
Vue.use(VueAxios,axios,Swal)
export default {

    

    data() {
        
        return {

            item: {
                idProduct: '',
                Product_Name: '',
                Product_Count: '',
                Product_Expire: '',
                Product_Cost: '',
                Product_Detail: '',
                Product_Picture: '',
            }
        }
    },

   

    methods: {

     getProductById(idProduct)
    {
        
      axios.get('http://localhost:3000/api/product/'+idProduct,{
        
      }).then((result)=>{
        
        console.warn(result.data.data)
        this.products=result.data.data
       
      })
      
    },

        submit(){
            axios.post('http://localhost:3000/api/product:id',this.form).then(() => {

                Swal.fire({
                
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 4000
                
                })
            }).then(((window.location.reload())))
            


                    
            .catch(error => console.log(error))
        }
    


    },
    
}
</script>