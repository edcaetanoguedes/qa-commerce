Feature: Checkout Simples

  Scenario: Usuário adiciona um produto ao carrinho com sucesso
    Given O usuário acessa a página de um produto
    When clica no botão "Adicionar ao Carrinho"
    Then O produto deve constar no carrinho
  
  Scenario: Usuário conclui o checkout simples com sucesso
    Given o usuário tem um produto no carrinho
    And acessa a página de checkout
    When preenche todos os campos obrigatórios
    And escolhe um método de pagamento
    And aceita os termos e condições
    And confirma a compra
    Then uma mensagem de sucesso deve ser exibida