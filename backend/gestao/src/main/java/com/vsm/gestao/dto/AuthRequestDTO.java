package com.vsm.gestao.dto;

// DTO para receber os dados da requisição de login
public record AuthRequestDTO(String login, String password) {}