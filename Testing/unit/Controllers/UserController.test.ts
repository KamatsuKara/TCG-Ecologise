import { UserController } from "../../../src/Controllers/UserController";

const mockUserService: any = {
  getAll: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("UserController", () => {
  let controller: UserController;

  beforeEach(() => {
    jest.restoreAllMocks();
    Object.values(mockUserService).forEach((m: any) => m.mockReset());
    controller = new UserController(mockUserService);
  });

  test("getAll responds with users", async () => {
    const req: any = { query: {} };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockUserService.getAll.mockResolvedValue(["u1"]);

    await controller.getAll(req, res);

    expect(res.json).toHaveBeenCalledWith(["u1"]);
  });

  test("create responds with message", async () => {
    const req: any = { body: { email: "x" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockUserService.create.mockResolvedValue(undefined);

    await controller.create(req, res);

    expect(mockUserService.create).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith("User created");
  });

  test("get, getMe, update, updateMe, delete behave correctly", async () => {
    const reqGet: any = { params: { id: "4" } };
    const reqMe: any = { user: { sub: 8 } };
    const reqUpdate: any = { body: { id: 4 } };
    const reqUpdateMe: any = { user: { sub: 8 }, body: {} };
    const reqDelete: any = { params: { id: "9" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    mockUserService.get.mockResolvedValue({ id: 4 });
    await controller.get(reqGet, res);
    expect(res.json).toHaveBeenCalledWith({ id: 4 });

    mockUserService.get.mockResolvedValue({ id: 8 });
    await controller.getMe(reqMe, res);
    expect(res.json).toHaveBeenCalledWith({ id: 8 });

    mockUserService.update.mockResolvedValue(undefined);
    await controller.update(reqUpdate, res);
    expect(mockUserService.update).toHaveBeenCalledWith(reqUpdate.body);
    expect(res.json).toHaveBeenCalledWith("User updated");

    reqUpdateMe.body = { name: "n" };
    await controller.updateMe(reqUpdateMe, res);
    expect(mockUserService.update).toHaveBeenCalledWith({ id: 8, name: "n" });

    mockUserService.delete.mockResolvedValue(undefined);
    await controller.delete(reqDelete, res);
    expect(res.json).toHaveBeenCalledWith("User deleted");
  });
});
