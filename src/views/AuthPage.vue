<template>
    <v-container fill-height class="ma-0 pa-0 auth-wrapper" fluid>
        <v-row align="center" justify="center" no-gutters>
        <v-card max-width="30%" dark :loading="cardLoading">
            <v-img src="../assets/logo.png" />
                <v-card-text>
                    <v-form ref="loginForm" v-model="valid" lazy-validation>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field 
                                v-model="user.username" 
                                :rules="loginEmailRules" 
                                label="Имя пользователя" 
                                required>
                            </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field 
                                v-model="user.password" 
                                :append-icon="show1?'mdi-eye':'mdi-eye-off'" 
                                :rules="[rules.required, rules.min]" 
                                :type="show1 ? 'text' : 'password'" 
                                name="input-10-1" 
                                label="Пароль" 
                                hint="At least 8 characters" 
                                counter @click:append="show1 = !show1"></v-text-field>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                <v-col><v-btn text x-large block color="grey" @click="requirePassword">Забыли пароль?</v-btn></v-col>
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                <v-col><v-btn x-large block :disabled="!valid" color="#41c8d4" @click="handleLogin">Вход в систему</v-btn></v-col>
                            </v-col>
                        </v-row> 
                    </v-form>
                </v-card-text>
            </v-card>
        </v-row>
        <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        >
        {{ errorMessage }}
        <template v-slot:action="{ attrs }">
            <v-btn
                color="red"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Закрыть
            </v-btn>
        </template>
        </v-snackbar>
    </v-container>
</template>

<script>
import User from '../models/user';

export default {
    name: "AuthPage",
    data: () => ({
        user: new User('', ''),
        show1: false,
        valid: true,
        cardLoading: false,
        loginEmailRules: [
        v => !!v || "Required",
        ],
        rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 1) || "Min 8 characters"
        },
        multiLine: true,
        snackbar: false,
        errorMessage: '',
    }),
    computed: {
        passwordMatch() {
            return () => this.password === this.verify || "Password must match";
        },
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    created() {
        if(this.loggedIn) {
            this.$router.push('/');
        }
    },
    methods: {
        handleLogin() {
            if (this.$refs.loginForm.validate()) {
                this.cardLoading = true;
                 this.$store.dispatch('auth/login', this.user).then(
                    () => {
                        this.cardLoading = false;
                        this.$router.push('/projects');
                    },
                    error => {
                        this.cardLoading = false;
                        this.errorMessage = (error.response && error.response.data) || error.message || error.toString();
                        this.snackbar = true;
                    }
                )
            }
        },
        reset() {
            this.$refs.form.reset();
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        },
        requirePassword() {
            this.errorMessage = 'Вспомни';
            this.snackbar = true;
        }
    }
}
</script>

<style lang="scss" scoped>
    .auth-wrapper{
        background-image: url('../assets/wbBG.png');
        background-size: 100%;
        background-repeat: repeat;
    }
</style>