<template lang="en">
    <v-app>
        <v-main class="main">
           <!-- Messenger ปลั๊กอินแชท Code -->
    <div id="fb-root"></div>
<h1>Sdasdasd</h1>
    <!-- Your ปลั๊กอินแชท code -->
    <div id="fb-customer-chat" class="fb-customerchat">ฟหกฟหก
    </div>
        </v-main>
    </v-app>
</template>
<script>


export default {
     name: "jamemo",
  components: {
    
    
  },
  
}

</script>

<script>
      var chatbox = document.getElementById('fb-customer-chat');
      chatbox.setAttribute("page_id", "110100641400020");
      chatbox.setAttribute("attribution", "biz_inbox");
</script>

 <script>
      window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v13.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/th_TH/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
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