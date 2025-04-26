import { test } from "../pages/page-fixtures";

const email = process.env.EMAIL;
const senha = process.env.SENHA;

test.describe("Bug Bank - Página Inicial", async () => {
  test("BB-CT-001 - Acessar Conta com visualização de Senha", async ({ loginPage }) => {
    await loginPage.acessarConta(email!, senha!, true);
  });
  test("BB-CT-002 - Acessar Conta sem visualização de Senha", async ({ loginPage }) => {
    await loginPage.acessarConta(email!, senha!);
  });
  test("BB-CT-003 - Acessar Conta sem Sucesso", async ({ loginPage }) => {
    await loginPage.acessarConta("", "");
  });
});
