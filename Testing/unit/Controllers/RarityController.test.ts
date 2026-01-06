import { RarityController } from "../../../src/Controllers/RarityController";

const mockRarityService: any = {
  getAll: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("RarityController", () => {
  let controller: RarityController;

  beforeEach(() => {
    jest.restoreAllMocks();
    Object.values(mockRarityService).forEach((m: any) => m.mockReset());
    controller = new RarityController(mockRarityService);
  });

  test("getAll responds with rarities", async () => {
    const req: any = { query: {} };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockRarityService.getAll.mockResolvedValue(["r1"]);

    await controller.getAll(req, res);

    expect(res.json).toHaveBeenCalledWith(["r1"]);
  });

  test("create responds with message", async () => {
    const req: any = { body: { label: "L" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockRarityService.create.mockResolvedValue(undefined);

    await controller.create(req, res);

    expect(mockRarityService.create).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith("Rarity created");
  });

  test("get, delete, update behave correctly", async () => {
    const reqGet: any = { params: { id: "2" } };
    const reqDel: any = { params: { id: "3" } };
    const reqUp: any = { body: { id: 2 } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    mockRarityService.get.mockResolvedValue({ id: 2 });
    await controller.get(reqGet, res);
    expect(res.json).toHaveBeenCalledWith({ id: 2 });

    mockRarityService.delete.mockResolvedValue(undefined);
    await controller.delete(reqDel, res);
    expect(res.json).toHaveBeenCalledWith("Rarity deleted");

    mockRarityService.update.mockResolvedValue(undefined);
    await controller.update(reqUp, res);
    expect(res.json).toHaveBeenCalledWith("Rarity updated");
  });
});
