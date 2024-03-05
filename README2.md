## Customer Input Validation

useState hook is used in FormContext.js along with the validation and then the data is passed to the Form.js with errors.
After that, the errors are handled on handleNext() and handleSubmit().
Finally, the errors are passed to each of CustomerInfo.js, DriversLicenseInfo.js, and CreditCardInfo.js (an extra div is created on each TextField to hold and display the errors)

- # Libraries used:

validator.js -

     validator.isEmail('foo@bar.com'); => true
     validator.isEmpty(''); => true
     validator.isStrongPassword('Example@12'); => true
     validator.equals('foo', 'foo'); => true
     validator.trim(' foo '); => 'foo'

usdl-regex.js -

    isValid('ID', 'ab123456c'); => true (ID is for the state of Idaho)

card-validator.js'

    valid.number('4111 1111 1111 1111').isValid; => true
    valid.expirationDate('1225', 25).isValid; => true
    valid.cvv('999').isValid; => true
