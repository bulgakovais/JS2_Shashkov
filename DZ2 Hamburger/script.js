class Hamburger {
    constructor() {
        this.size = {
            small: { price: 50, calories: 20 },
            big: { price: 100, calories: 40 },
        }
        this.stuffing = {
            cheese: { price: 10, calories: 20 },
            salad: { price: 20, calories: 5 },
            potato: { price: 15, calories: 10 },
        }
        this.mayo = { price: 20, calories: 5 }
        this.flavoring = { price: 15, calories: 0 }
    }

    // Определяет размер гамбургера
    getSize() {
        ckeckSizes.forEach(checkSize => {
            if (checkSize.checked) {
                selectedSize = checkSize.getAttribute('value')
            }
        })
        if (selectedSize === "big") {
            return this.size = this.size.big
        }
        if (selectedSize === "small") {
            return this.size = this.size.small
        }
    }
    // Определяет начинку
    getStuffing() {
        ckeckStuffing.forEach(checkStuf => {
            if (checkStuf.checked) {
                selectedStuffing = checkStuf.getAttribute('value')
            }
        })
        if (selectedStuffing === 'cheese') {
            return this.stuffing = this.stuffing.cheese
        }
        if (selectedStuffing === 'salad') {
            return this.stuffing = this.stuffing.salad
        }
        if (selectedStuffing === 'potato') {
            return this.stuffing = this.stuffing.potato
        }
    }
    // Определяет добавлена ли приправа
    addFlavoring() {

        let selectedFlavoring = ""
        ckeckFlavoring.forEach(ckeckFlav => {
            if (ckeckFlav.checked) {
                selectedFlavoring = ckeckFlav.getAttribute('value')
            }
        })
        if (selectedFlavoring === "flavYes") {
            return this.flavoring
        } else {
            this.flavoring = { price: 0, calories: 0 }
        }
    }

    // Определяет добавлен ли майонез
    addMayo() {

        let selectedMayo = ""
        ckeckMayos.forEach(ckeckMayo => {
            if (ckeckMayo.checked) {
                selectedMayo = ckeckMayo.getAttribute('value')
            }
        })
        if (selectedMayo === "mayoYes") {
            return this.mayo
        } else {
            this.mayo = { price: 0, calories: 0 }
        }
    }

    calculatePrice() {
        let price = this.size.price + this.stuffing.price + this.flavoring.price + this.mayo.price + ' руб.'
        return price;
    }
    calculateCalories() {
        let calories = this.size.calories + this.stuffing.calories + this.flavoring.calories + this.mayo.calories + ' ккал'
        return calories;
    }

    // После нажатия на кнопку "Выбрать" запускает методы обработки форм
    submit() {
        let buttonSubmit = document.querySelector('.submit')
        buttonSubmit.addEventListener('click', () => {
            this.getSize()
            this.getStuffing()
            this.addFlavoring()
            this.addMayo()
            // Убираем из видимости форму ввода
            document.querySelector('div.container').classList.add('hidden')
            this.renderResult()
        })
    }

    // Рендерит результат выбора в <div class="resultOfBurger">
    renderResult() {
        document.querySelector('.resultOfBurger').innerHTML = `Ваш гамбургер стоит ${orderHamburger.calculatePrice()} и в нем всего-то ${orderHamburger.calculateCalories()}!`
    }

}

let ckeckFlavoring = document.querySelectorAll('.form-check-input-flav')
let ckeckMayos = document.querySelectorAll('.form-check-input-mayo')

let ckeckSizes = document.querySelectorAll('.form-check-input-size')
let selectedSize = ""

let ckeckStuffing = document.querySelectorAll('.form-check-input-stuffing')
let selectedStuffing = ""

const orderHamburger = new Hamburger();
orderHamburger.submit()


