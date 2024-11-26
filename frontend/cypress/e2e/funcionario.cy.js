describe('Função de cadastro, edição e remoção de funcionário', () => {

  it('deve retornar o funcionario cadastrado pelo usuário', () => {
      cy.visit('http://localhost:5173/Funcionarios')
      cy.get('#nome').type('Marcos Alberto Souza')
      cy.get('#cargo').type('Dev backend')
      cy.get('#setor').type('A')
      cy.get('#email').type('marcosTI@gmail.com')
      cy.get('.btn-cadastrar').click()
      cy.get('h3').contains('Marcos Alberto Souza')
      cy.get('.btn-editar').click()
      cy.get('[name="cargo"]').type('Full-Stack');
      cy.get('[name="setor"]').type('B');
      cy.get('[type="submit"]').click()
      cy.get('h3').contains('Marcos Alberto Souza')
      cy.get('.btn-deletar').click()
  })

})