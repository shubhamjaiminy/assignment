describe('TipTop Form Verification', () => {
  const baseUrl = 'https://d3pv22lioo8876.cloudfront.net/tiptop/';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Verify the input element with xpath is disabled', () => {
    cy.xpath(".//input[@name='my-disabled']").should('be.disabled');
  });

  it('Verify readonly input field using 2 xpaths', () => {
    cy.xpath(".//input[@value='Readonly input']").should(
      'have.attr',
      'readonly'
    );
    cy.xpath("//input[@type='text' and @readonly]").should(
      'have.attr',
      'value',
      'Readonly input'
    );
  });

  it('Verify dropdown field to select color has 8 elements using 2 xpaths', () => {
    cy.xpath("(//select[@name='my-select'])[1]/option").should(
      'have.length',
      8
    );
  });

  it('Verify submit button is disabled when no data is entered in Name field', () => {
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Verify submit button is enabled when Name and Password fields are filled', () => {
    cy.xpath(`//input[@id='my-name-id']`).type('Test Name');
    cy.xpath(`//input[@id='my-password-id']`).type('TestPassword');
    cy.get('button[type="submit"]').should('be.enabled');
  });

  it('Verify page shows "Received" text on form submit', () => {
    // Fill the form
    cy.xpath(`//input[@id='my-name-id']`).type('Test Name');
    cy.xpath(`//input[@id='my-password-id']`).type('TestPassword');
    cy.get('button[type="submit"]').should('be.enabled').click();

    // Verify "Received" text
    cy.contains('Received').should('be.visible');
  });

  it('Verify all data passed to the URL on form submission', () => {
    // Fill the form
    cy.xpath(`//input[@id='my-name-id']`).type('TestName');
    cy.xpath(`//input[@id='my-password-id']`).type('TestPassword');
    cy.get('button[type="submit"]').should('be.enabled').click();

    cy.url()
      .should('include', 'submitted.html')
      .and('include', 'my-name=TestName')
      .and('include', 'my-password=TestPassword')
      .and('include', 'my-readonly=Readonly+input')
      .and('include', 'my-select=white');
  });
});
