Vue.component("err", {
    data() {
        return {
            textErr: '',
            errorHere: false,
        }
    },
    methods: {
        catchError(error, text) {
            if (text) {
                this.textErr = text;
                this.errorHere = true;
            }
        }
    },
    template: `
            <p class = "textColor textSize" v-show="errorHere" v-model= 'catchError' >'${this.textErr}'</p>
    `
})