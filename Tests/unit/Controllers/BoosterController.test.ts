import { BoosterController } from "../../../src/Controllers/BoosterController";

const mockBoosterService: any = {
  getAll: jest.fn(),
  get: jest.fn(),
  getByUser: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("BoosterController", () => {
  let controller: BoosterController;

  beforeEach(() => {
    jest.restoreAllMocks();
    Object.values(mockBoosterService).forEach((m: any) => m.mockReset());
    controller = new BoosterController(mockBoosterService);
  });

  test("getAll responds with boosters", async () => {
    const req: any = { query: {} };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockBoosterService.getAll.mockResolvedValue(["booster1"]);

    await controller.getAll(req, res);

    expect(res.json).toHaveBeenCalledWith(["booster1"]);
  });

  test("get responds with a booster", async () => {
    const req: any = { params: { id: "5" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockBoosterService.get.mockResolvedValue({ id: 5 });

    await controller.get(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 5 });
  });

  test("getByUser responds with user's boosters", async () => {
    const req: any = { params: { id: "2" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockBoosterService.getByUser.mockResolvedValue(["booster2"]);

    await controller.getByUser(req, res);

    expect(res.json).toHaveBeenCalledWith(["booster2"]);
  });

  test("getByMe responds with user's boosters", async () => {
    const req: any = { user: { sub: 1 } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockBoosterService.getByUser.mockResolvedValue(["boosterA"]);

    await controller.getByMe(req, res);

    expect(res.json).toHaveBeenCalledWith(["boosterA"]);
  });
});