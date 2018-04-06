import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: mapState ([
    'Authentication'
  ]),
  methods: {
    ...mapActions([
      'setFacebookObject',
      'setFacebookResponse'
    ]),
    loginWithFacebook(){
      this.Authentication.facebookObject.login((response) => {
        if (response.authResponse) {
          this.$store.state.Authentication.facebookObject.api('/me?fields=id,email,name,gender,friends',(response) => {
            this.setFacebookResponse(response);
            this.$router.push({name: 'Home'});
          });
        } else {

        }
      },{ scope: 'email,user_friends' });
    },
    logOutWithFacebook(){
      this.Authentication.facebookObject.logout((response) => {
        console.log("modi");
        // self.$store.commit('removeFacebookResponse',null);
        // self.$router.push({name:'Welcome'})
      });
    }
  },
  beforeMount () {
    window.fbAsyncInit = () => {
      this.setFacebookObject(FB);
      this.Authentication.facebookObject.init({
        appId      : '170490913717292',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.11',
      });
      this.Authentication.facebookObject.AppEvents.logPageView();
      if (this.Authentication) {
        this.Authentication.facebookObject.getLoginStatus((response) => {
          let lastIndexUri =window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
          if (response.status == "connected") {
            this.Authentication.facebookObject.api('/me?fields=id,email,name,gender,friends,picture',(response) => {
              this.setFacebookResponse(response);
            });
            if(lastIndexUri == ""){
              this.$router.push({name:'Home'});
              return;
            }
          } else {
            if(lastIndexUri != ""){
              this.$router.push({name:'Welcome'})
            } else {
              this.$router.push({name:'Welcome'})
            }
          }
        },{ scope: 'email,user_friends' });
      }
    };
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}
