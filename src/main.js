import {clearStyleError, isNumeric, isValidForm, setStyleError, useValidate} from "./services/computed-errors.js";

function initialize() {
    const getCreditBtn = document.getElementById('get-credit-btn')
    const creditAmountInput = document.getElementById('credit-amount')
    const repaymentPeriodInput = document.getElementById('repayment-period')

    const creditAmount = Number(creditAmountInput.value)
    const repaymentPeriod = Number(repaymentPeriodInput.value)

    formResult(creditAmount, repaymentPeriod)

    const state = {
        creditAmount,
        repaymentPeriod
    }

    const v$ = useValidate(state)

    getCreditBtn.addEventListener('click', (event) => {
        event.preventDefault()

        if (isValidForm(v$)) {
            console.log('Credit received')
        }
    })

    creditAmountInput.addEventListener('input', (e) =>
        creditAmountListener(e, repaymentPeriodInput, getCreditBtn, v$))
    repaymentPeriodInput.addEventListener('input', (e) =>
        repaymentPeriodListener(e, creditAmountInput, getCreditBtn, v$))
}

function creditAmountListener(e, repaymentPeriodInput, getCreditBtn, v$) {
    const calculatorAmountEl = document.querySelector('.credit-calculator__form > .credit-calculator__amount')

    let creditAmount = e.target.value
    let repaymentPeriod = repaymentPeriodInput.value

    const inputError = document.querySelector('.credit-calculator__amount > .input-error')

    if (!isNumeric(creditAmount)) {
        setStyleError(inputError, calculatorAmountEl, getCreditBtn, 'Incorrect value')
        v$.creditAmount.$error = true
        return
    }

    creditAmount = parseInt(creditAmount)
    repaymentPeriod = parseInt(repaymentPeriod)

    if (creditAmount < 1000 || creditAmount > 50000) {
        setStyleError(inputError, calculatorAmountEl, getCreditBtn, 'Value must be between 1000 and 50000')
        v$.creditAmount.$error = true
        return;
    }

    clearStyleError(inputError, calculatorAmountEl)

    if (repaymentPeriod < 7 || repaymentPeriod > 60) return;

    getCreditBtn.removeAttribute('disabled')
    v$.creditAmount.$error = false

    formResult(creditAmount, repaymentPeriod)
}

function repaymentPeriodListener(e, creditAmountInput, getCreditBtn, v$) {
    const calculatorPeriodEl = document.querySelector('.credit-calculator__form > .credit-calculator__period')

    let repaymentPeriod = e.target.value
    let creditAmount = creditAmountInput.value

    const inputError = document.querySelector('.credit-calculator__period > .input-error')

    if (!isNumeric(repaymentPeriod)) {
        setStyleError(inputError, calculatorPeriodEl, getCreditBtn, 'Incorrect value')
        v$.repaymentPeriod.$error = true
        return
    }

    creditAmount = parseInt(creditAmount)
    repaymentPeriod = parseInt(repaymentPeriod)

    if (repaymentPeriod < 7 || repaymentPeriod > 60) {
        setStyleError(inputError, calculatorPeriodEl, getCreditBtn, 'Value must be between 7 and 60')
        v$.repaymentPeriod.$error = true
        return;
    }

    clearStyleError(inputError, calculatorPeriodEl)

    if (creditAmount < 1000 || creditAmount > 50000) return;

    getCreditBtn.removeAttribute('disabled')
    v$.repaymentPeriod.$error = false

    formResult(creditAmount, repaymentPeriod)
}

function formResult(creditAmount, repaymentPeriod) {
    const dailyAmount = document.querySelector('.credit-calculator__daily-amount > span')
    const totalAmount = document.querySelector('.credit-calculator__total-amount > span')

    const result = calculate(creditAmount, repaymentPeriod)

    dailyAmount.textContent = result.dailyRepayment.toString()
    totalAmount.textContent = result.totalRepayment.toString()
}

function calculate(creditAmount, repaymentPeriod) {
    const interestRate = 2.2

    const dailyRepayment = ((creditAmount + (creditAmount * (interestRate / 100) * repaymentPeriod))
        / repaymentPeriod).toFixed(2)
    const totalRepayment = (dailyRepayment * repaymentPeriod).toFixed(2)

    return {
        dailyRepayment,
        totalRepayment
    }
}


initialize()
