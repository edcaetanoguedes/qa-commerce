Feature: Teste de recursos admin

    Scenario: Reset do Banco de dados de Usuários
        Given o usuário tem conta no sistema
        When a requisição de reset é enviada por um admin
        Then o banco de dados é retorna para o estado inicial