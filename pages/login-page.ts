import { Page, Locator, expect, test, test as setup } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly form: Locator;
  readonly email: Locator;
  readonly senha: Locator;
  readonly botaoVisualizarSenha: Locator;
  readonly botaoAcessar: Locator;
  readonly validarCampoEmail: Locator;
  readonly validarCampoSenha: Locator;
  readonly mensagemCampoObrigatorio: string;

  constructor(page: Page) {
    this.page = page;
    this.form = this.page.locator("form");
    this.email = this.form
      .filter({ hasText: /E-mail/ })
      .first()
      .getByPlaceholder("Informe seu e-mail");
    this.senha = this.form.filter({ hasText: /Senha/ }).first().getByPlaceholder("Informe sua senha");
    this.botaoVisualizarSenha = page.getByRole("button", { name: "Icon Close Eye" }).first();
    this.botaoAcessar = page.getByRole("button", { name: "Acessar" });
    this.validarCampoEmail = this.page.locator('[id="__next"]');
    this.validarCampoSenha = this.page.getByText("É campo obrigatório").nth(1);
    this.mensagemCampoObrigatorio = "É campo obrigatório";
  }

  async irParaSiteBugBank() {
    await test.step(
      "Visitar Site Banco Bug Bank",
      async () => {
        await this.page.goto(setup.info().project.use.baseURL!);
        await expect(this.page).toHaveTitle("BugBank | O banco com bugs e falhas do seu jeito");
      },
      { box: true },
    );
  }

  async inserirCredenciais(email: string, senha: string, visualizarSenha: boolean) {
    await test.step(
      `Preencher email: ${email} e senha: ${senha}`,
      async () => {
        await this.email.fill(email);
        await this.senha.fill(senha);

        if (visualizarSenha) {
          await expect(this.botaoVisualizarSenha.first()).toBeVisible();
          await this.botaoVisualizarSenha.click();
          await expect(this.page.locator('input[type="text"]')).toBeVisible();
        }
      },
      { box: true },
    );
    await test.step(
      "Validar campo Email",
      async () => {
        if (!email) {
          await this.email.press("Tab");
          await expect(this.validarCampoEmail).toContainText(this.mensagemCampoObrigatorio);
          console.log("Campo E-mail contém validação:", this.mensagemCampoObrigatorio);
        }
      },
      { box: true },
    );

    await test.step(
      "Validar campo Senha",
      async () => {
        if (!senha) {
          await this.senha.press("Tab");
          await expect(this.validarCampoSenha).toContainText(this.mensagemCampoObrigatorio);
          console.log("Campo Senha contém validação:", this.mensagemCampoObrigatorio);
        }
      },
      { box: true },
    );
  }

  async acessarConta(email: string, senha: string, visualizarSenha: boolean = false) {
    await test.step(
      "Acessar Conta BugBank",
      async () => {
        await this.irParaSiteBugBank();
        await this.inserirCredenciais(email, senha, visualizarSenha);
        await this.clicarBotaoAcessar();
      },
      { box: true },
    );
  }

  async clicarBotaoAcessar() {
    await test.step("Clicar no botão Acessar", async () => {
      await this.botaoAcessar.click();
    });
  }
}
