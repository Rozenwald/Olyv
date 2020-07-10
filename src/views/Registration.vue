<template lang="pug">
    v-app
        .container
            #RegBigToolBar
                .container
                    img#regLogo(src="../assets/icons/Plus.svg", alt="alt")
            v-text-field.RegNumber(
                v-model: 'Number'
                label='Номер телефона'
                required)

            v-text-field.RegNumber(
                v-model: 'Email'
                label='E-mail'
                required)

            span#SpanRulesNM Нажимая кнопку зарегестрироваться вы принимаете:
            <template>
                    v-dialog(
                        v-model: 'dialog'
                        width="600px")
                        <template v-slot:activator="{ on, attrs }">
                        v-btn#ModalRules(
                                text
                                color="normal"
                                v-bind="attrs"
                                v-on="on") Правила и условия политики конфеденциальности
                        </template>
                        <v-card>
                        v-card-title#V-card-title-rules
                            span#SpanRulesM
                            |Правила и условия политики конфеденциальности
                        v-card-text#ModalRulesText
                        |Текст о правилах и политике конфеденциальности
                        |бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла-бла
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
                            <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
                        </v-card-actions>
                        </v-card>
            </template>
            v-btn#RegButton(
            ) Зарегестрироваться      
            #RegBottomBar
</template>

<style lang="stylus" scoped>
    #ModalRulesText{
        font-size: 16px
    }
    #V-card-title-rules{
        word-break normal
    }
    #SpanRulesNM{
        font-size: 13px
        text-align center
    }
    #SpanRulesM{
        font-size: 20px
        text-align center
    }
    #ModalRules{
        font-size: 10px
        text-decoration:underline
    }
    #RegButton{
        margin-top 25px
        color #FFF
        font-size: 13px
        background: linear-gradient(180deg, #FFA967 0%, #FD7363 100%)
        border none 
        border-radius 30px
        height 6.8%
        width 72%
    }
    .container{
        position relative
        width 100%;
        height 100%;
        padding 0px;
        text-align: center;
        vertical-align middle
    }
    .RegNumber{
        margin-top 10px
        padding-right 10px
        padding-left 10px
    }
    #RegBigToolBar{
        position relative;
        background-color: #2AB06A;
        height: 30vh;
        width: 100%;
        border: none;
        border-radius:0px 0px 50px 0px;
        text-align: center;
    }

    #RegBottomBar{
        position fixed;
        bottom 0;
        background-color: #2AB06A;   
        width: 100%;
        height 10%
        border: none;
        border-radius:50px 0px 0px 0px;
        align-items: center;
    }

    #regLogo{
        position relative
        margin-top 13%
        margin-bottom 13%
        vertical-align middle
        width:auto;
        height:50%;
    }

</style>