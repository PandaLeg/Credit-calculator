export function useValidate(state) {
    const v$ = {}

    for (let prop in state) {
        v$[prop] = {
            $error: false
        }
    }

    return v$
}

export function setStyleError(inputError, inputBlock, getCreditBtn, message) {
    inputError.textContent = message
    inputError.style.display = 'block'

    inputBlock.classList.add('form-error')

    getCreditBtn.setAttribute('disabled', '')
}

export function clearStyleError(inputError, inputBlock) {
    inputError.textContent = ''
    inputError.style.display = 'none'
    inputBlock.classList.remove('form-error')
}

export function isValidForm(v$) {
    return !v$.creditAmount.$error && !v$.repaymentPeriod.$error
}

export function isNumeric(value) {
    if (typeof value != 'string') return false

    return !isNaN(value) && !isNaN(parseFloat(value))
}
