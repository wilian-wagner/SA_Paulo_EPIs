describe('Função de cadastro, edição e remoção de funcionário', () => {

  it('deve retornar o funcionario cadastrado pelo usuário, editar e deletar', () => {
    cy.visit('http://localhost:5173/Funcionarios')

    // Cadastro de funcionario
    cy.get('#nome').type('Marcos Alberto Souza');
    cy.get('#cargo').type('Dev backend');
    cy.get('#setor').type('A');
    cy.get('#email').type('marcosTI@gmail.com');
    cy.get('.btn-cadastrar').click();
    cy.get('.funcionarios-cards').should('contain', 'Marcos Alberto Souza');

    // Verificando se é possivel cadastrar funcionario com mesmo email
    cy.get('#nome').clear().type('Ana Beatriz');
    cy.get('#cargo').clear().type('Designer');
    cy.get('#setor').clear().type('B');
    cy.get('#email').clear().type('marcosTI@gmail.com'); // Email duplicado
    cy.get('.btn-cadastrar').click();

    // Confirma que o segundo funcionário não foi cadastrado
    cy.get('.funcionarios-cards').should('not.contain', 'Ana Beatriz');

    // Localiza e clica no botao para editar
    cy.get('.funcionario-card')
      .contains('Marcos Alberto Souza')
      .parent()
      .find('.btn-editar')
    .click();
    // Insere informações 
    cy.get('[name="cargo"]').type('Full-Stack');
    cy.get('[name="setor"]').type('B');
    cy.get('[type="submit"]').click();

    // Verifica se as mudanças foram aplicadas
    cy.get('.funcionarios-cards').should('contain', 'Full-Stack');

    // Deleta funcionario
    cy.get('.funcionario-card')
      .contains('Marcos Alberto Souza')
      .parent()
      .find('.btn-deletar')
    .click();

    cy.get('.funcionarios-cards').should('not.contain', 'Marcos Alberto Souza');
  })
})