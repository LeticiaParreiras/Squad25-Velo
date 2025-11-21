CREATE TABLE MUNICIPIO (
    Codigo_IBGE CHAR(7) PRIMARY KEY,
    Nome_Municipio VARCHAR(100) NOT NULL,
    UF CHAR(2) NOT NULL
);

CREATE TABLE ENDERECO (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    
    CEP CHAR(8) NULL,
    Logradouro VARCHAR(255) NULL,
    Numero VARCHAR(20) NULL,
    Bairro VARCHAR(200) NULL,
    Complemento VARCHAR(100) NULL
);

CREATE TABLE ENTIDADE (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- FK's
    ID_Endereco_Entidade INT, 
    ID_Municipio INT,

    -- Dados Cadastrais
    CNPJ VARCHAR(18) UNIQUE,
    Inscricao_Estadual VARCHAR(30),
    Nome_Fantasia VARCHAR(255),
    Razao_Social VARCHAR(255) NOT NULL,
    Email VARCHAR(100),
    Sigla VARCHAR(20),
    Telefone_Comercial VARCHAR(20),
    Fax VARCHAR(20),

    FOREIGN KEY (ID_Endereco_Entidade) REFERENCES ENDERECO(Id),
    FOREIGN KEY (ID_Municipio) REFERENCES MUNICIPIO(Codigo_IBGE)
);

CREATE TABLE TIPO_CLASSIFICACAO (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    
    Tipo_Ensino_Modalidade VARCHAR(100) UNIQUE NOT NULL,
    Tipo_Projeto VARCHAR(100),
    Tipo_Obra VARCHAR(100),
    Classificacao_Obra VARCHAR(100)
);

CREATE TABLE OBRA (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- Chaves Estrangeiras
    ID_Obra_Vinculada INT, 
    ID_Endereco INT, 
    ID_Entidade INT, 
    ID_Tipo_Obra INT, 
    IBGE CHAR(7), 
    
    -- Dados da Obra
    Nome VARCHAR(255) NOT NULL,
    Situacao VARCHAR(50),
    Latitude DECIMAL(10, 8),
    Longitude DECIMAL(11, 8),
    INEP VARCHAR(50),
    Quantidade_Alunos INT,
    Rede_Ensino_Publico VARCHAR(50),
    
    -- Definição das Chaves Estrangeiras
    FOREIGN KEY (ID_Obra_Vinculada) REFERENCES OBRA(Id),
    FOREIGN KEY (ID_Endereco) REFERENCES ENDERECO(Id),
    FOREIGN KEY (ID_Entidade) REFERENCES ENTIDADE(Id),
    FOREIGN KEY (ID_Tipo_Obra) REFERENCES TIPO_CLASSIFICACAO(Id),
    FOREIGN KEY (IBGE) REFERENCES MUNICIPIOS(Codigo_IBGE)
);

CREATE TABLE CONTRATO (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    ID_Obra INT UNIQUE, -- Chave estrangeira e restrição de unicidade
    
    Modalidade_Licitacao VARCHAR(100),
    Numero_Licitacao VARCHAR(50),
    Homologacao_Licitacao DATE,
    Empresa_Contratada VARCHAR(255),
    Data_Assinatura DATE,
    Prazo_Vigencia VARCHAR(50),
    Data_Termino_Contrato DATE,
    Valor_Contrato DECIMAL(15, 2),
    Valor_Pactuado_FNDE DECIMAL(15, 2),
    Aporte_Recurso_Municipio DECIMAL(15, 2),
    
    FOREIGN KEY (ID_Obra) REFERENCES OBRA(Id)
);

CREATE TABLE TERMOS_CONVENIO (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    ID_Obra INT UNIQUE, -- Chave estrangeira e restrição de unicidade
    
    Termo_Convenio VARCHAR(100),
    Fim_Vigencia DATE,
    Situacao_Termo VARCHAR(50),
    
    FOREIGN KEY (ID_Obra) REFERENCES OBRA(Id)
);

CREATE TABLE FINANCEIRO_SALDO (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    ID_Obra INT UNIQUE, -- Chave estrangeira e restrição de unicidade
    
    Banco VARCHAR(100),
    Agencia VARCHAR(20),
    Conta VARCHAR(50),
    Data_Atualizacao DATE,
    Saldo_Conta DECIMAL(15, 2),
    Saldo_Fundos DECIMAL(15, 2),
    Saldo_Poupanca DECIMAL(15, 2),
    Saldo_CDB DECIMAL(15, 2),
    Saldo_TOTAL DECIMAL(15, 2),
    Total_Pago DECIMAL(15, 2),
    Percentual_Pago DECIMAL(5, 2),

    FOREIGN KEY (ID_Obra) REFERENCES OBRA(Id)
);

CREATE TABLE ACOMPANHAMENTO_STATUS (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    ID_Obra INT, 
    
    -- Retomada
    Data_Analise_Solicitacao DATE,
    Situacao_Solicitacao_Retomada VARCHAR(100),
    Anexos_Inseridos BOOLEAN,
    Alteracao_Projeto VARCHAR(100),
    
    -- Status da Execução
    Percentual_Execucao DECIMAL(5, 2),
    Data_Prevista_Conclusao DATE,
    
    -- Vistoria/Paralisação
    Data_Ultima_Vistoria DATE,
    Situacao_Vistoria VARCHAR(100),
    Tipo_Paralisacao VARCHAR(100),
    OBS TEXT,
    
    FOREIGN KEY (ID_Obra) REFERENCES OBRA(Id)
);