context('virtual items', function () {
    before(function() {
        cy.login();
        cy.newProject().as('projectId');
        cy.createViFolder('@projectId').as('folderId');
    });

    it('move folder into folder', function () {
//todo: пофиксить баг с перемещением папки в папку
    });
});