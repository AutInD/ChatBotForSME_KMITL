<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
<<<<<<< HEAD
    HelloWorld
=======
    Popup,
    upDate
  },
 
  data() {
    
    return {
      products:null,
      dialog: false,
      }
  },
  methods: {

    getData()
    {
      axios.get('http://localhost:3000/api/product').then((result)=>{
        console.warn(result)
        this.products=result.data.data
      })
    },
    
   
    
    deleteProduct(idProduct)
    {
         //axios.delete('http://localhost:3000/api/product/'+idProduct).then(()=>{
          Swal.fire({
            title: 'ลบรายการสินค้า',
            text: "คุณต้องการลบสินค้านี้หรือไม่ ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'ยืนยัน'
        }).then((result)=>{
          if (result.isConfirmed) {
            Swal.fire(
              'ลบ!',
              'ลบสินค้าเรียบร้อยแล้ว',
              'success'        
              ).then(()=>{
                axios.delete('http://localhost:3000/api/product/'+idProduct)
                this.getData()
              }).then(this.getData())
            }       
          this.getData()
          
        })
      }
    },
    
  mounted() {
    this.getData()
    
  },

  


};
</script>
<style scoped>
  .product {
    margin: 2% 5% 5% 5%;
  }
  .main {
    margin: 2% 2%;
>>>>>>> develop
  }
}
</script>
