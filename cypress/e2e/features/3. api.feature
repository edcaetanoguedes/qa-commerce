Feature: Teste de API

  Scenario: Criar um novo usuário e verificar sua criação na API
    Given que a API está funcionando corretamente
    When envio uma requisição para criar um usuário
    Then a API deve retornar status 201
    And o corpo da resposta deve conter o id do usuário criado
    And o usuário deve existir na API quando consultado