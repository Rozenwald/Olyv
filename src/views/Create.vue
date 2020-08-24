<template lang="pug">
  v-container.createdOrder
    .customer-more-info
      v-textarea.description(
          hide-details
          label="Описание"
          outlined
          v-model="description"
          rows="2"
          row-height="14")
      v-row.add-cost-addres(align='center' justify='center')
        v-textarea.add-cost(
                    rows="1"
                    row-height="14"
                    outlined
                    label='Цена'
                    hide-details
                    v-model="cost"
                    type="number"
                    required)
        v-textarea.add-addres(
                    rows="1"
                    row-height="14"
                    outlined
                    label='Адрес'
                    hide-details
                    v-model="address"
                    required)
      .information-wrp
        v-row.add-files(align='center' justify='space-between')
          v-checkbox.save-deal(label="Защищенная сделка"
                              align='center'
                              v-model="saveDeal"
                              hide-details)
          v-file-input.add-img(solo
                               flat
                               multiple
                               class='add-img-padding'
                               hide-details
                               dense
                               label="Прикрепить файл"
                               v-show="false")
      v-row.btns(no-gutters  align='center' justify='center')
          v-btn.accept-btn(align-content='center'
                           @click="checkForm"
                           rounded
                           v-text="isEdit ? 'Редактировать' : 'Создать'"
                          )

    v-dialog.error-message(v-model="isError")
      v-row.error-message( align='center' justify='center')
        .dialog_title {{error}}
        v-btn.circle-btn(@click="error = ''") ок
</template>

<script>
import axios from 'axios';
import SvgIcon from '../components/SvgIcon.vue';

export default {
  name: 'Create',
  components: {
    SvgIcon,
    axios,
  },
  data() {
    return {
      isFocus: false,
      windowHeight: null,
      description: null,
      cost: null,
      address: null,
      saveDeal: false,
      error: '',
      isEdit: false,
      id: null,
    };
  },
  methods: {
    checkForm() {
      if (this.address == null) {
        this.error = 'Укажите адресс';
      }

      if (this.cost != null) {
        if (!this.validCost(this.cost)) {
          this.error = 'Неверный формат цены';
        }
      } else {
        this.error = 'Укажите цену';
      }

      if (this.description != null) {
        if (this.description.length < 10) {
          this.error = 'Описание должно быть больше 10 символов';
        }
      } else {
        this.error = 'Описание должно быть больше 10 символов';
      }

      if (!this.error) {
        this.createOrder();
      }
    },

    createOrder() {
      /* eslint-disable no-return-assign */
      axios
        .post(`${this.$baseUrl}api/v1/private/order`, {
          token: this.token,
          method: 'add',
          description: this.description,
          cost: this.cost,
          protect: this.saveDeal ? 'yes' : 'no',
        })
        .then((response) => (this.checkResonse(response)))
        .catch(() => (this.error = 'Ошибка'));
      /* eslint-enable no-return-assign */
    },

    checkResonse(response) {
      switch (response.data.status) {
        case 'invalidCost':
          this.error = 'Неверный формат цены';
          break;
        case 'invalidDescription':
          this.error = 'Описание должно быть больше 10 символов';
          break;
        case 'success':
          this.$router.back();
          break;
        case 'notAuthenticate':
          this.$store.dispatch('showRepeatLoginDialog', true);
          break;
        default:
          this.error = 'Ошибка';
      }
    },

    validCost(cost) {
      const regex = /\d+/;
      return regex.test(cost);
    },
  },
  computed: {
    isError: {
      get() {
        if (this.error.length) {
          return true;
        }
        return false;
      },
      set() {
        this.error = '';
      },
    },
    token() {
      return this.$store.getters.getToken;
    },
  },
  created() {
    this.$store.commit('setTitle', 'Создание заказа');
    this.windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
      if (window.innerHeight < this.windowHeight) {
        this.isFocus = true;
      } else {
        this.isFocus = false;
      }
    });
  },
};
</script>

<style lang="stylus" scoped>
  .v-dialog{
    box-shadow none !important
  }
  .circle-btn{
    background: linear-gradient(180deg, #FFA967 0%, #FD7363 100%) !important
    border-radius 50%
    width 80px
    height 80px !important
    margin 10px
  }
  .dialog_title{
    display flex
    background-color #e5e5e5
    width 100%
    font-size 20px
    text-align center
    padding 20px
    border-radius 15px
  }
  .error-message{
    background-color transparent !important
    box-shadow none !important
  }
  .add-cost{
    margin-right 2px
  }
  .add-addres{
    margin-left 2px
  }
  .error-message{
    background-color: #E5E5E5
  }
  .add-cost-addres{
    margin-top 10px !important
    width 100%
    flex: 1 1 auto
    flex-wrap: nowrap
  }
  .add-files{
    flex-wrap: wrap
    flex: 1 1 auto
  }
  .add-img{
    margin-left 5px
    margin-top 7px
    margin-bottom 7px
    padding 0px
  }
  .add-img-padding.v-input__slot{
    padding-left 0px !important
  }
  .save-deal{
    width 100%
    font-style normal
    font-weight bold
    font-size 10px
    color #FE7664
    margin-left 5px
  }
  .createLogo{
  }
  .logo{
    width:auto;
    height:50%;
  }
  .createdOrder{
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .container {
    background-color #fff
  }
  .row{
    margin 0
  }
  .cost-wrp {
    background #FEF5EE
    border-radius 10px 0 0 10px
    width 100px
    height 36px
    max-width 100px
    margin 0 -12px 0 0
  }
  .cost {
    font-family Golos
    font-style normal
    font-weight 600
    font-size 18px
    color: #FE7664
  }
  .more-info-wrp-second {
    margin 15px 0
    text-align center
    font-style normal
    font-size 10px
    line-height 1.4
    color #65686C
  }
  .more-info-wrp-second div {
    max-width 95px
  }
  .more-info-wrp-second .black-text {
    color: #000000
  }
  .responded {
    margin-right 15px
  }
  .responded-text, .distantion-text {
    margin-left 5px
  }
  .description {
    font-family Golos
    font-style normal
    font-weight normal
    font-size 13px
    line-height 19px
    color #3C3F44
  }
  .btns{
    margin-top 15px
    margin-bottom 15px
    text-align center
  }

  .edit-price{
    margin-top 3px
  }

  .accept-btn{
    width 80%
    background linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
    font-style normal
    font-weight 600
    font-size 13px
    color #FFFFFF
    box-shadow none !important
  }
</style>
