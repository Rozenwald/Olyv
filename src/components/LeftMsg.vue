<template lang="pug">
  v-row(align='start' justify='start')
    .card(align='end' justify='start')
      .card-message
        .card-message-text(lang="ru") {{msg.text}}
      .card-time
        .card-time-text {{hours}}:{{minutes}}

</template>

<script>
export default {
  name: 'left-msg',
  props: {
    msg: Object,
  },
  computed: {
    time() {
      return new Date(this.msg.ofCreateDate);
    },
    hours() {
      return this.time.getHours() <= 9 ? `0${this.time.getHours()}` : this.time.getHours();
    },
    minutes() {
      return this.time.getMinutes() <= 9 ? `0${this.time.getMinutes()}` : this.time.getMinutes();
    },
  },
};
</script>

<style lang="stylus" scoped>
  .card {
    display inline-block
    padding 5px 10px
    margin-top 3px
    background-color #e7e7e7
    border-radius 15px 15px 0px 15px
    font-size 13px
    max-width 75%

    &-message {
      display inline-block
      vertical-align:bottom
      max-width 100%
      text-align left
      float: left
      hyphens none

      &-text {
        max-width 100%
        word-wrap break-word !important
        word-break normal
        white-space pre-line
        hyphens none
        text-align left
      }
    }
    &-time {
      display inline-block
      vertical-align:bottom
      text-align right
      max-width 100%
      padding-left 5px
      font-size 10px
      &-text {
        vertical-align:bottom
      }
    }
  }
</style>

                      ⣀⣤⣤⣤⡴⢦⣤⣄⡀
                   ⡿⠛⠉⠁⠀⠀⠀⠀⠀⠈⠉⠛⠦⣄
                ⣿⠋⠀⠀⣀⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀⠈⠙⢦⡀
               ⣿⠃⢀⣤⠴⠶⠷⠷⠿⢯⣝⡳⠄⠀⠀⠀⠀⠀⠀⢳⡀⠀⠀⠀⣀⣀⣀⣀
              ⣿⠃⠀⠈⣴⣶⡖⠒⠶⢶⣤⡈⠉⠓⠆⠀⠀⠀⠀⠀⠘⣿⡟⠛⠋⠉⠉⠙⠛⠿⣶⣄
              ⣿⢀⣴⠋⠉⢈⡿⠋⠉⠉⠙⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀  ⠙⢷⡄
              ⣿⣿⣥⣤⣴⣿⣀⣀⣀⠀⢀⡇⠀⠀⠀⠀⠀⠀⠀⢀⣼⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⠹⣦
              ⠀⣿⢿⣼⣿⠧⢯⡼⠉⢉⡏⠀⠀⠀⠀⠀⠀⣠⡴⠞⠁⠀⠀⠀⠀⠀⢀⣀⣀⠀⠀⠀    ⠘⢧⡀
              ⢀⡿⠋⠁⢸⡄⠀⠀⢀⡜⢃⣤⡴⠶⠚⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⡞⠀⠀ ⢿⠀⠀⠀⠀  ⠘⣧
             ⡞⠀⠀⢀⠎⠙⠲⠶⠊⠀⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⣄⠀⣸⡇⠀⠀⠀⠀   ⣿⠀
            ⡟⠀⠀⠀⣸⠒⠦⠀⡀⠀⠀⢧⡀⠀⠀⠀⠀⠀⠀⣰⠊⠁⠉⡇⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⠀ ⣼⠇
           ⣹⠁⠀⠀⠀⡟⠒⢄⠀⠀⠁⠦⠶⢹⡆⠀⠀⠀⠀⠀⠿⢤⡤⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⣿⠁
         ⠀⢸⡄⠀⣠⣼⠃⠀⡠⠋⡟⠒⠳⠖⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠒⣲⠀⠀ ⢰⡟⠀⠀
         ⠀⠀⠉⠉⠁⢸⠀⢠⠁⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡏⢀⡟⠀⠀ ⣸⠃⠀⠀
         ⠀⠀⠀⠀⠀⡇⢠⠁⠀⡘⠀⠀⠀⠀⠀⢀⠔⠒⡆⠀⢀⠤⢂⣩⠬⠬⠍⣲⢄⠀⠀ ⠷⠞⠁⠀⢀⡟⠀⠀⠀
         ⠀⠀⠀⠀⢸⢀⠇⠀⠀⠃⠀⠀⠀⠀⣰⠁⢀⡼⢡⠎⢀⠔⠁⠀⠀⠀⠀⠀⡌⡇⠀⠀⠀⠀⠀⠀⢠⡿⠀⠀⠀⠀
         ⠀⠀⠀⠀⡏⡜⠀⠀⠠⠀⠀⠀⠀⠀⠙⠒⠋⡴⠁⢠⠃⠀⠀⠀⠀⠀⠀⠀⠁⣇⠀⡴⢲⡀⠀⢠⣿⠃⠀⠀⠀⠀
         ⠀⠀⠀⣸⢠⠃⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⣰⠁⢠⠃⠀⠀⠀⠀⡄⠀⠀⡸⢀⡇⢸⠃⣼⠀⣠⡞⠁⠀⠀⠀⠀⠀
         ⠀⠀⢀⠇⢸⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⢀⡇⠀⡆⠀⠀⠀⢀⠾⡇⠀⣰⢃⠞⠀⠘⠛⠁⣴⠋⠀
         ⠀⠀⡼⠀⣾⠀⠀⠀⠸⠀⠀⠀⠀⠀⠀⢸⠀⢀⡇⠀⠀⠀⢸⠀⠓⠚⣡⠋⠀⠀⠀⢠⡾⠁⠀⠀
     ⡀⠀⣀⠔⠛⠁⠀⡟⠶⡂⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⢸⡆⠀⠀⠀⠘⠒⠒⠋⠀⠀⠀⢠⡾⠃⠀⠀⠀⠀
    ⡟⠛⠻⣅⡀⠀⠀⠀⠀⠀⠘⠄⡀⠀⠀⠀⠀⠀⠀⢸⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀
    ⠛⠳⣄⡈⠉⠓⠒⠤⠄⣀⠀⠀⠈⠑⠦⣤⣀⡀⠀⣿⠀⠀⣧⠀⠀⠀⠀⠀⠀⢀⣴⡋⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠈⠉⠋⠉⠀⠂⠄⠀⠉⠑⠢⢄⣀⡀⠈⠉⠉⠉⠛⠒⠙⠒⠢⠤⢤⣀⡀⠋⠀⣷⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠄⣉⠉⠙⠛⠛⠛⠒⠦⣄⣀⢀⣀⣀⣀⣉⠉⢛⣉⣷⡀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠓⠛⠛⠒⠒⠒⠦⣀⡀⢀⣀⡀⠀⠈⠀⠀⠀⠈⠓⣦⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠀⠉⠁⠈⠉⠙⠓⠛⠛⠉⠀
