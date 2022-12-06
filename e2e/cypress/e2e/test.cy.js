//env values
const user = Cypress.env("user")
const pass = Cypress.env("pass")
const url = Cypress.env("url")

//test data for entrys
const id = '20'
const passport = 'JC4744643'
const id_student = '358134'
const period = '2022-1'
const academic_unity = 'FACULTAD DE CIENCIAS'
const knownledge_area = 'CIENCIASEXACTAS'
const program = 'COMPUTACIONALES'
const username = 'JORGE'
const lastname = 'GARCIA'
const seclastname = 'SERRANO'
const unit = 'CIENCIAS'
const country = 'ESPANA'
const state = 'MADRID'
const lenguage = 'ESPANOL'




describe('Correct login/logout', function(){
    this.beforeEach(function(){
        cy.visit(url);
        cy.wait(5000);
        
    })

    this.afterEach(function(){
        cy.get('.css-1pc2l1w > .MuiButtonBase-root').click();
        cy.get('.MuiPaper-root > .MuiList-root > .MuiButtonBase-root > .MuiListItemIcon-root').click().should(()=>{
            expect(localStorage.getItem('token')).to.be.null;
        })
    })
    
    it('Correct login/logout', function(){
        cy.get('#username').type(user);
        cy.get('#password').type(pass);
        cy.get('.MuiButtonBase-root').click();
        cy.wait(5000);
        cy.get('#main-content').then(($main)=>{
            if ($main.text().includes('Sin Movilidad A. de entrada todavía.')){
                cy.get('.RaEmpty-message').should('exist');
            }else{
                cy.get('.RaDatagrid-root').should('exist');
            }
        })

    })
})


describe('Incorrect login Cases', function(){
    before(function(){
        cy.visit(url);
    })
    
    it('Incorrect Auth', function(){

        cy.get('#username').type(user);
        cy.get('#password').type(pass + '1');
        cy.get('.MuiButtonBase-root').click();
        cy.wait(1000);
        cy.get('.MuiSnackbarContent-message').should('have.text', 'Su sesión ha finalizado, vuelva a conectarse.');
    })
})


describe('Auth Data Cases', function(){
    before(function(){
        cy.visit(url);
    })

    it('Auth Data erased', function(){

        cy.get('#username').type(user);
        cy.get('#password').type(pass);
        cy.get('.MuiButtonBase-root').click().should(()=>{
            expect(localStorage.getItem('token')).to.not.be.null;
        })
        cy.wait(5000);

        cy.get('.css-1pc2l1w > .MuiButtonBase-root').click();
        cy.get('.MuiPaper-root > .MuiList-root > .MuiButtonBase-root > .MuiListItemIcon-root').click().should(()=>{
            expect(localStorage.getItem('token')).to.be.null;
        })
    })
})


describe('Entrance academic mobility cases', function(){
    beforeEach(function(){
        cy.visit(url);
        cy.get('#username').type(user);
        cy.get('#password').type(pass);
        cy.get('.MuiButtonBase-root').click();
    })
    
    it('user creates entry', function(){
        //cy.get('.RaEmpty-toolbar > .MuiButtonBase-root').click(); //if empty list
        cy.get('.RaMenuItemLink-active').click();
        cy.get('.MuiToolbar-root > a.MuiButtonBase-root').click();
        cy.get('#id').type(id);
        cy.get('#periodo').type(period);
        cy.get('#campus_id').click();
        cy.get('[data-value="3"]').click();
        cy.get('#unidad_académica_id').click();
        cy.get('#unidad_académica_id-option-0').click();
        cy.get('#nombre').type(username);
        cy.get('#apellido_paterno').type(lastname);
        cy.get('#apellido_materno').type(seclastname);
        cy.get('#sexo').click();
        cy.get('[data-value="MASCULINO"]').click();
        cy.get('#nivel_de_estudios').click();
        cy.get('[data-value="LICENCIATURA"]').click();
        cy.get('#discapacidad').click();
        cy.get('#hablante_indígena').click();
        cy.get('#origen_indígena').click();
        cy.get('#unidad_emisora').type(unit);
        cy.get('#país_de_la_unidad_emisora').type(country);
        cy.get('#entidad_de_la_unidad_emisora').type(state);
        cy.get('#tipo_de_movilidad_académica').click();
        cy.get('[data-value="ESTANCIA DE INVESTIGACION"]').click();
        cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();
        cy.wait(5000);

        cy.get('[href="#/income_academic_mobilities"]').click();
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .column-id').should('contain', id);
    })
    
    it('user list entrys', ()=>{

        cy.get('.MuiTableRow-head').should('be.visible');
    })

    it('user search entry', ()=>{
        cy.get('#q').type(id+'$');
        cy.wait(1000)
        cy.get('.MuiTableBody-root').should('have.length', 1);

    })
    /*
    it('user creates filter', ()=>{
        //cy.get('#q').type(period);
        cy.get('.css-1baulvz > .MuiButtonBase-root').should('be.visible').click();
    })
    
   //not tested

    it('user edit entry/test inputs', ()=>{
        cy.get('#q').type(id+'$');
        cy.wait(1000)
        cy.get('.RaDatagrid-rowEven').click();
        cy,wait(1000);
        cy.get('#unidad_emisora').type(unit);

    })
    */
    it('user deletes entry', ()=>{
        cy.get('#q').type(id+'$');
        cy.wait(1000)
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-paddingCheckbox > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('[data-test="bulk-actions-toolbar"] > .MuiToolbar-root > .MuiButtonBase-root').click();
        cy.wait(5000);
        cy.get('[href="#/income_academic_mobilities"]').click();
        cy.get('#q').clear().type(id+'$');
        cy.get('.MuiCardContent-root > .MuiTypography-root').should('have.text', "No se han encontrado resultados")

    })
})


describe('outcome academic mobility', ()=>{
    beforeEach(function(){
        cy.visit(url);
        cy.get('#username').type(user);
        cy.get('#password').type(pass);
        cy.get('.MuiButtonBase-root').click();
        cy.get('[href="#/outcome_academic_mobility"]').click();
    })
    
    it('user creates entry', ()=>{
        cy.log(':p')
        cy.get('.RaEmpty-toolbar > .MuiButtonBase-root').click();
        cy.get('#id').type(id);
        cy.get('#nombre').type(username);
        cy.get('#apellido_paterno').type(lastname);
        cy.get('#apellido_materno').type(seclastname);
        cy.get('#sexo').click();
        cy.get('[data-value="MASCULINO"]').click();
        cy.get('#nivel_de_estudios').click();
        cy.get('[data-value="LICENCIATURA"]').click();
        cy.get('#periodo').type(period);
        cy.get('#campus_id').click();
        cy.get('[data-value="3"]').click();
        cy.get('#unidad_académica_id').click();
        cy.get('#unidad_académica_id-option-0').click();
        cy.get('#unidad_receptora').type(unit);
        cy.get('#país_de_la_unidad_receptora').type(country);
        cy.get('#entidad_de_la_unidad_receptora').type(state);
        cy.get('#idioma_de_la_unidad_receptora').type(lenguage);
        cy.get('#tipo_de_movilidad_académica').click();
        cy.get('[data-value="ESTANCIA DE INVESTIGACION"]').click();
        cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();
        cy.wait(5000);

        cy.visit('http://35.91.49.178:3001/#/outcome_academic_mobility');
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .column-id').should('contain', id);
    })
    
    it('user list entrys', ()=>{

        cy.get('.MuiTableRow-head').should('be.visible');
    })

    it('user search entry', ()=>{

        cy.get('#q').type(id+'$');
        cy.wait(1000)
        cy.get('.MuiTableBody-root').should('have.length', 1);

    })

    it('user deletes entry', ()=>{
        cy.get('#q').type(id+'$');
        cy.wait(1000)
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-paddingCheckbox > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('[data-test="bulk-actions-toolbar"] > .MuiToolbar-root > .MuiButtonBase-root').click();
        cy.wait(5000);
        cy.get('[href="#/income_academic_mobilities"]').click();
        cy.get('#q').clear().type(id+'$');
        cy.get('.MuiCardContent-root > .MuiTypography-root').should('have.text', "No se han encontrado resultados")

    })

})


describe('outcome exchange student', ()=>{
    beforeEach(function(){
        cy.visit(url);
        cy.get('#username').type(user);
        cy.get('#password').type(pass);
        cy.get('.MuiButtonBase-root').click();
        cy.get('[href="#/outcome_exchange_student"]').click();
    })
    
    it('user creates entry', ()=>{
        //cy.get('.RaEmpty-toolbar > .MuiButtonBase-root').click(); if empty table
        cy.get('.MuiToolbar-root > a.MuiButtonBase-root').click();
        cy.get('#id').type(id_student);
        cy.get('#nombre').type(username);
        cy.get('#apellido_paterno').type(lastname);
        cy.get('#apellido_materno').type(seclastname);
        cy.get('#sexo').click();
        cy.get('[data-value="MASCULINO"]').click();
        cy.get('#nivel_de_estudios').click();
        cy.get('[data-value="LICENCIATURA"]').click();
        cy.get('#periodo').type(period);
        cy.get('#campus_id').click();
        cy.get('[data-value="3"]').click();
        cy.get('#unidad_académica_id').click();
        cy.get('#unidad_académica_id-option-0').click();
        cy.get('#programa_educativo').type(program);
        cy.get('#área_de_conocimiento').type(knownledge_area);
        cy.get('#tipo_de_intercambio_estudiantil').click();
        cy.get('[data-value="PRACTICAS PROFESIONALES"]').click();
        cy.get('#unidad_receptora').type(unit);
        cy.get('#país_de_la_unidad_receptora').type(country);
        cy.get('#entidad_de_la_unidad_receptora').type(state);
        cy.get('#idioma_de_la_unidad_receptora').type(lenguage);
        cy.get('#recibio_financiamiento').click();
        cy.get('#monto_recibido').type('3000');
        cy.get('#fecha_de_inicio_de_intercambio').type('2022-11-24');
        cy.get('#fecha_de_término_de_intercambio').type('2022-11-27');
        cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();
        cy.wait(5000);

        cy.get('[href="#/outcome_exchange_student"]').click();
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .column-id').should('contain', id_student);
    })
    
    it('user list entrys', ()=>{

        cy.get('.MuiTableRow-head').should('be.visible');
    })

    it('user search entry', ()=>{

        cy.get('#q').type(id_student+'$');
        cy.wait(1000)
        cy.get('.MuiTableBody-root').should('have.length', 1);

    })

    it('user deletes entry', ()=>{
        cy.get('#q').type(id_student+'$');
        cy.wait(1000)
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-paddingCheckbox > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('[data-test="bulk-actions-toolbar"] > .MuiToolbar-root > .MuiButtonBase-root').click();
        cy.wait(5000);
        cy.get('[href="#/outcome_exchange_student"]').click();
        cy.get('#q').clear().type(id_student+'$');
        cy.get('.MuiCardContent-root > .MuiTypography-root').should('have.text', "No se han encontrado resultados")

    })

})

describe('income exchange student', ()=>{
    beforeEach(()=>{
        cy.visit(url);
        cy.get('#username').type(user);
        cy.get('#password').type(pass);
        cy.get('.MuiButtonBase-root').click();
        cy.get('[href="#/income_exchange_student"]').click();
    })
    
    it('user creates entrys', ()=>{
        //cy.get('.RaEmpty-toolbar > .MuiButtonBase-root').click();
        cy.get('.MuiToolbar-root > a.MuiButtonBase-root').click();
        cy.get('#id').type(passport);
        cy.get('#nombre').type(username);
        cy.get('#apellido_paterno').type(lastname);
        cy.get('#apellido_materno').type(seclastname);
        cy.get('#sexo').click();
        cy.get('[data-value="MASCULINO"]').click();
        cy.get('#nivel_de_estudios').click();
        cy.get('[data-value="LICENCIATURA"]').click();
        cy.get('#periodo').type(period);
        cy.get('#campus_id').click();
        cy.get('[data-value="3"]').click();
        cy.get('#unidad_académica_id').click();
        cy.get('#unidad_académica_id-option-0').click();
        cy.get('#programa_educativo').type(program);
        cy.get('#área_de_conocimiento').type(knownledge_area);
        cy.get('#tipo_de_intercambio_estudiantil').click();
        cy.get('[data-value="PRACTICAS PROFESIONALES"]').click();
        cy.get('#discapacidad').click();
        cy.get('#hablante_indígena').click();
        cy.get('#origen_indígena').click();
        cy.get('#unidad_emisora').type(unit);
        cy.get('#país_de_la_unidad_emisora').type(country);
        cy.get('#entidad_de_la_unidad_emisora').type(state);
        cy.get('#idioma_de_la_unidad_emisora').type(lenguage);
        cy.get('#recibio_financiamiento').click();
        cy.get('#monto_recibido').type("1000");
        cy.get('#fecha_de_inicio_de_intercambio').type('2022-11-24');
        cy.get('#fecha_de_término_de_intercambio').type('2022-11-27');
        cy.get('.RaToolbar-defaultToolbar > .MuiButtonBase-root').click();
        cy.wait(5000);

        cy.get('[href="#/income_exchange_student"]').click();
        //cy.get('.RaMenuItemLink-active').click();
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .column-id').should('contain', passport);

    })
    
    it('user list entrys', ()=>{

        cy.get('.MuiTableRow-head').should('be.visible');
    })

    it('user search entry', ()=>{

        cy.get('#q').type(passport+'$');
        cy.wait(1000)
        cy.get('.MuiTableBody-root').should('have.length', 1);

    })

    it('user deletes entry', ()=>{
        cy.get('#q').type(passport+'$');
        cy.wait(1000)
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-paddingCheckbox > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('[data-test="bulk-actions-toolbar"] > .MuiToolbar-root > .MuiButtonBase-root').click();
        cy.wait(5000);
        cy.get('[href="#/income_exchange_student"]').click();
        cy.get('#q').clear().type(passport+'$');
        cy.get('.MuiCardContent-root > .MuiTypography-root').should('have.text', "No se han encontrado resultados")

    })
})
