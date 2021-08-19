Vue.component("err", {
    data() {
        return {
            textErr: '',
            errorHere: false,
        }
    },
    methods: {
        catchError(error, text) {
            console.log(error)
            if (text) {
                this.textErr = text;
                this.errorHere = true;
            }
        }
    },
    template: `
            <p class = "textColor textSize" v-show="errorHere"> {{ this.textErr }} </p>
    `
})