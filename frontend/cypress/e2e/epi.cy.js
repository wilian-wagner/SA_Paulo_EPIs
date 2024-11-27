describe('Função de cadastro, edição e remoção de EPIs', () => {
    it('deve retornar o Epi cadastrado pelo usuário, editar e deletar', () => {
        cy.visit('http://localhost:5173/Epi');

        // Cadastro de EPI
        cy.get('[name="nome"]').type('Capaquete de Proteção');
        cy.get('[name="quantidade"]').clear().type('20');
        cy.get('.btn-cadastrar').click();
        cy.get('.epi-card').should('contain', 'Capaquete de Proteção');

        // Localiza e clica no botao para editar
        cy.contains('h3', 'Capaquete de Proteção')
            .parent() // Acha o card pai mais próximo
            .find('.btn-editar') // Localiza o botão 'Editar'
        .click();

        // Edita o nome e a quantidade
        cy.get('[name="nome"]').clear().type('Capacete de Proteção');
        cy.get('[name="quantidade"]').clear().type('25');
        cy.get('[type="submit"]').click();

        // Verifica se foi atualizado corretamente
        cy.get('h3').contains('Capacete de Proteção');

        // Deleta o EPI 
        cy.contains('h3', 'Capacete de Proteção')
            .parent()
            .find('.btn-deletar')
        .click();
    });
});