import { AuthController } from "../../../src/Controllers/AuthController";

const mockAuthService: any = {
  login: jest.fn(),
  register: jest.fn(),
};

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(() => {
    jest.restoreAllMocks();
    mockAuthService.login.mockReset();
    mockAuthService.register.mockReset();
    controller = new AuthController(mockAuthService);
  });

  test("login responds with token on success", async () => {
    const req: any = { body: { email: "a@a.com", password: "pw" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockAuthService.login.mockResolvedValue("tokenXYZ");

    await controller.login(req, res);

    expect(res.json).toHaveBeenCalledWith({ token: "tokenXYZ" });
  });

  test("login responds 500 on error", async () => {
    const req: any = { body: { email: "a@a.com", password: "pw" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockAuthService.login.mockRejectedValue(new Error("boom"));

    await controller.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "boom" });
  });

  test("register calls service and responds with success message", async () => {
    const payload = { name: "test", email: "t@t.com", password: "pw" };
    const req: any = { body: payload };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockAuthService.register.mockImplementation(() => {});

    await controller.register(req, res);

    expect(mockAuthService.register).toHaveBeenCalledWith(payload);
    expect(res.json).toHaveBeenCalledWith("Register done");
  });

  test("register responds 500 on error", async () => {
    const payload = { name: "test" };
    const req: any = { body: payload };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockAuthService.register.mockImplementation(() => { throw new Error("fail"); });

    await controller.register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "fail" });
  });
});
