describe('Função de cadastro, edição e remoção de EPIs', () => {

    it('deve retornar o Epi cadastrada pelo usuário', () => {
        cy.visit('http://localhost:5173/Epi')
        cy.get('[name="nome"]').type('Capaquete de Proteção')
        cy.get('[name="quantidade"]').type('20')
        cy.get('.btn-cadastrar').click()
        cy.get('h3').contains('Capaquete de Proteção')
        cy.get('.btn-editar').click()
        cy.get('[name="nome"]').type('Capacete de Proteção');
        cy.get('[name="quantidade"]').type('25');
        cy.get('[type="submit"]').click()
        cy.get('h3').contains('Capacete de Proteção')
        cy.get('.btn-deletar').click()
    })
  
  })