<template lang="pug">
  v-container
    .customer-more-info
      v-textarea(
          label="Описание"
          auto-grow
          outlined
          v-model="description"
          rows="7"
          row-height="25"
          shaped)
      v-text-field.RegNumber(
                  label='Цена'
                  v-model="cost"
                  type="number"
                  required)
      v-text-field.RegNumber(
                  label='Адрес'
                  v-model="address"
                  required)
      .information-wrp
        v-row.more-info-wrp-first(align='center' justify='space-between')
          v-checkbox.save-deal(
            label="Защищенная сделка"
            align='center'
            v-model="saveDeal")
        v-row.edit-price(align='center', justify='center')
      v-row.btns(no-gutters  align='center' justify='center')
          v-btn.accept-btn(align-content='center'
                           @click="checkForm"
                           rounded
                           v-text="isEdit ? 'Редактировать' : 'Создать'"
                          )

    v-dialog(v-model="isError")
      v-row(align='center' justify='center')
        .dialog_title {{error}}
      v-btn(@click="error = ''") ок
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

      if (this.error.length === 0) {
        if (this.isEdit) {
          this.editOrder();
          this.$router.go(-1);
        } else {
          this.createOrder();
          this.$router.push('moiZakazi');
        }
      }
    },

    createOrder() {
      /* eslint-disable no-return-assign */
      axios
        .post('http://test.cabinet.olyv.services:8888/api/v1/private/order', {
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

    editOrder() {
      /* eslint-disable no-return-assign */
      axios
        .post('http://test.cabinet.olyv.services:8888/api/v1/private/order', {
          token: this.token,
          method: 'update',
          description: this.description,
          cost: this.cost,
          protect: this.saveDeal ? 'yes' : 'no',
          id: this.id,
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
        default:
          this.error = 'Неизвестная ошибка';
      }
    },

    validCost(cost) {
      const regex = /\d+/;
      return regex.test(cost);
    },

    setEditData() {
      if (Object.keys(this.$route.params).length !== 0) {
        this.isEdit = true;
        this.description = this.$route.params.order.description;
        this.cost = this.$route.params.order.cost;
        this.saveDeal = this.$route.params.order.protect === 'yes';
        // eslint-disable-next-line no-underscore-dangle
        this.id = this.$route.params.order._id;
      }
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
    this.setEditData();
  },
};
</script>

<style lang="stylus" scoped>
  .RegNumber{
    margin-top 10px
    padding-right 10px
    padding-left 10px
  }
  .container {
    background-color #fff
  }

  .name {
    font-style normal
    font-weight 500
    font-size 15px
    line-height 18px
    color #000000
  }

  .customer-more-info-header{
    padding 0 !important
  }

  .customer-more-info{
    margin-bottom 56px
  }

  .parallax {
    margin 15px -12px
    height 150px
    background-color red
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

  .save-deal{
    font-style normal
    font-weight bold
    font-size 10px
    color #FE7664
    margin-left 5px
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

  .media-files .row {
    overflow auto
    white-space nowrap
    flex-wrap nowrap
    margin-top 10px
  }

  .plus-btn, .minus-btn {
    width 40px !important
    height 40px !important
    background none !important
    opacity: 0.3;
    border: 1px solid rgba(101, 104, 108, 0.8);
    box-sizing: border-box;
    border-radius 20px
    box-shadow none !important
    min-width 0 !important
    padding 0 !important
  }

  .currentPrice{
    padding 0 12px
    text-align center
    font-family Golos
    font-style normal
    font-size 14px
    color #3C3F44
  }

  .btns{
    margin-top 15px
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
