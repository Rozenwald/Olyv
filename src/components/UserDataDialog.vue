<template lang="pug">
  v-dialog(v-model="showDialog")
    .dialog
      v-window.window(v-model="step")
          v-window-item(:value="0")
            v-row.window-item(align='center' justify='center')
              .window-item-wrp
                .description(v-text="description")
                v-btn.btn-go(rounded @click="step++") Начать
          v-window-item(:value="1")
            v-row.window-item(align='center' justify='center')
              .window-item-wrp
                .description Введите имя и фамилию
                v-text-field.input-data(label="Имя"
                              dense color="#65686C"
                              clearable
                              v-model="firstName"
                             )
                v-text-field(label="Фамилия"
                              dense color="#65686C"
                              clearable
                              v-model="lastName"
                            )
                v-row.btns(no-gutters  align='center')
                  v-col(align='center')
                    v-btn.next-btn(rounded @click="step++") Сохранить
          v-window-item(:value="2")
            v-row.window-item(align='center' justify='center')
              .window-item-wrp
                v-avatar(color="#56D68B" size="80")
      v-row.cancel-wrp(align='center' justify='center')
        v-btn.btn-cancel(text :ripple="false") Пропустить
</template>

<script>
export default {
  name: 'user-data-dialog',
  data() {
    return {
      step: 0,
      description: 'Пожалуйста, заполните данные о себе. Это повысит уровень доверия к Вам, а также откроет возможность получения статуса исполнителя.',
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.$store.getters.isVisibleUserDataDialog;
      },
      set(val) {
        this.$store.dispatch('showUserDataDialog', val);
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
  .dialog{
    background-color #FFFFFF
    height 50vh
    padding 0 12px
  }
  .window, .window-item{
    height 43vh
    margin 0
  }
  .description{
    text-align left
  }
  .window-item-wrp{
    text-align center
    width 100%
  }
  .cancel-wrp{
    height 7vh
    margin 0
  }
  .btn-cancel{
    background-color #FFFFFF
    padding 0 !important
    margin 0 -12px
    width 100%
    height 7vh !important
  }
  .btn-go{
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    width 80%
    box-shadow none
    margin-top 20%
  }
  .input-data{
    margin-top 15px
  }

  .btns{
    margin-top 15px
  }

  .next-btn{
    width 90%
    margin-right 5%
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    box-shadow none !important
  }

  .back-btn{
    width 90%
    background none !important
    font-style normal
    font-weight 600
    font-size 13px
    color #56D68B
    border 1px solid #56D68B
    box-shadow none !important
  }
</style>
