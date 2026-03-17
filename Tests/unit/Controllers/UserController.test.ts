import { UserController } from "../../../src/Controllers/UserController";
import { CardController } from "../../../src/Controllers/CardController";
import { BoosterController } from "../../../src/Controllers/BoosterController";
import { User } from "../../../src/Models/User";

const mockUserService: any = {
  getAll: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

const mockCardController: any = {
  getByMe: jest.fn(),
  getByUser: jest.fn(),
  getMe: jest.fn(),
  get: jest.fn(),
};

const mockBoosterController: any = {
  getByMe: jest.fn(),
  getByUser: jest.fn(),
  getMe: jest.fn(),
  get: jest.fn(),
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
    const user = new User(0, "", "", "x", "", "USER", Date.now());

    mockUserService.create.mockResolvedValue(undefined);

    await controller.create(req, res);

    expect(mockUserService.create).toHaveBeenCalledWith(user);
    expect(res.json).toHaveBeenCalledWith("User created");
  });

  test("get, getMe, update, updateMe, delete behave correctly", async () => {
    const reqGet: any = { params: { id: "4" } };
    const reqMe: any = { user: { sub: 8 } };
    const reqUpdate: any = { body: { id: 4 } };
    const reqUpdateMe: any = { user: { sub: 8 }, body: {} };
    const reqDelete: any = { params: { id: "9" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    const user = new User(4, "", "", "", "", "USER", Date.now());

    mockUserService.get.mockResolvedValue(user);
    await controller.get(reqGet, res);
    expect(res.json).toHaveBeenCalledWith(user);

    mockUserService.update.mockResolvedValue(undefined);
    await controller.update(reqUpdate, res);
    expect(mockUserService.update).toHaveBeenCalledWith(new User(4, "", "", "", "", "USER", Date.now()));
    expect(res.json).toHaveBeenCalledWith("User updated");

    reqUpdateMe.body = { name: "n" };
    await controller.updateMe(reqUpdateMe, res);
    expect(mockUserService.update).toHaveBeenCalledWith(new User(8, "n", "", "", "", "USER", Date.now()));
    expect(res.json).toHaveBeenCalledWith("User updated");

    mockUserService.delete.mockResolvedValue(undefined);
    await controller.delete(reqDelete, res);
    expect(mockUserService.delete).toHaveBeenCalledWith(9);
    expect(res.json).toHaveBeenCalledWith("User deleted");
  });
});

describe("UserController - Additional Routes", () => {
  let controller: UserController;

  beforeEach(() => {
    jest.restoreAllMocks();
    Object.values(mockCardController).forEach((m: any) => m.mockReset());
    Object.values(mockBoosterController).forEach((m: any) => m.mockReset());
    controller = new UserController(mockUserService);
  });

  test("getByMe for cards responds with user's cards", async () => {
    const req: any = { user: { sub: 1 } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardController.getMe.mockResolvedValue(["card1"]);

    await mockCardController.getMe(req, res);

    expect(mockCardController.getMe).toHaveBeenCalledWith(req);
    expect(res.json).toHaveBeenCalledWith(["card1"]);
  });

  test("getByUser for cards responds with user's cards", async () => {
    const req: any = { params: { id: "2" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardController.get.mockResolvedValue(["card2"]);

    await mockCardController.get(req, res);

    expect(mockCardController.get).toHaveBeenCalledWith(req);
    expect(res.json).toHaveBeenCalledWith(["card2"]);
  });

  test("getByMe for boosters responds with user's boosters", async () => {
    const req: any = { user: { sub: 1 } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockBoosterController.getMe.mockResolvedValue(["booster1"]);

    await mockBoosterController.getMe(req, res);

    expect(mockBoosterController.getMe).toHaveBeenCalledWith(req);
    expect(res.json).toHaveBeenCalledWith(["booster1"]);
  });

  test("getByUser for boosters responds with user's boosters", async () => {
    const req: any = { params: { id: "2" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockBoosterController.get.mockResolvedValue(["booster2"]);

    await mockBoosterController.get(req, res);

    expect(mockBoosterController.get).toHaveBeenCalledWith(req);
    expect(res.json).toHaveBeenCalledWith(["booster2"]);
  });
});
