import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'


describe('Signup', () => {

    //before(function() {
    //    cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
    //})

    //beforeEach(function() {
    //    cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
    //})

    //after(function() {
    //    cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
    //})
    //afterEach(function() {
    //    cy.log('Tudo aqui é executado sempre uma única vez DEPOIS de CADA caso de teste')
    //})

    //beforeEach(() => {
    //    cy.fixture('deliver').then(function (d) {
    //        this.deliver = d
    //    })
    //})

    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', function () {


        //    var deliver = {
        //        name: 'Márcio Peneluca',
        //        cpf: '655166830AA',
        //        email: 'marcio.peneluca@gmail.com',
        //        whatsapp: '11999999999',
        //        address:{
        //            postalcode: '40230680',
        //            street: 'Rua Sérgio de Carvalho',
        //            number: '801',
        //            details: 'Aptº 106, Bloco B',
        //            district: 'Federação',
        //            city_state: 'Salvador/BA'
        //        },
        //        delivery_method: 'Moto',
        //        cnh: 'cnh-digital.jpg'
        //        
        //    }
        var deliver = signupFactory.deliver()

        deliver.cpf = '923883295AA'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })


    it('Incorrect email', function () {
        var deliver = signupFactory.deliver()

        deliver.email = 'user.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'deliver_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function () {
            signup.go()
            signup.submit()
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                signup.alertMessageShouldBe(msg.output)
            })
        })
    })

    //it('Required fields', function () {
    //    signup.go()
    //    signup.submit()
    //    signup.alertMessageShouldBe('É necessário informar o nome')
    //    signup.alertMessageShouldBe('É necessário informar o CPF')
    //    signup.alertMessageShouldBe('É necessário informar o email')
    //    signup.alertMessageShouldBe('É necessário informar o CEP')
    //    signup.alertMessageShouldBe('É necessário informar o número do endereço')
    //    signup.alertMessageShouldBe('Selecione o método de entrega')
    //    signup.alertMessageShouldBe('Adicione uma foto da sua CNH')

    //})
})