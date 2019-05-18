context('Add, update and delete', () => {
    it('should add a contact', () => {
        cy.visit('http://localhost:3000/')

        // Go on contact creation page
        cy.contains('Add a new entry').click()
        cy.url().should('include', 'http://localhost:3000/add')

        // Fill the form
        cy.get('#firstname').type('TESTF')
        cy.get('#lastname').type('TESTL')
        cy.get('#phonenumber').type('+ 33 47 698521')
        cy.get('button').click()

        // Check if added
        cy.visit('http://localhost:3000/')
        cy.contains('TESTF')
    })

    it('should update a contact', () => {
        cy.visit('http://localhost:3000/')

        // Click on the update button
        cy.contains('TESTF').parent().children().children().children('a').click()

        cy.get('#firstname').type('Updated')

        cy.get('button').click()

        // Check if updated
        cy.visit('http://localhost:3000/')
        cy.contains('TESTFUpdated')
    })

    it('should delete a contact', () => {
        cy.visit('http://localhost:3000/')

        // Click on the delete button
        cy.contains('TESTF').parent().children().children().children('button').click()

        // Check if the contact is deleted
        cy.contains('TESTF').should('not.have.value', 'TESTF')

    })
})