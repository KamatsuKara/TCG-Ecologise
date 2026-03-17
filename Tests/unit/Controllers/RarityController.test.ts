import { RarityController } from "../../../src/Controllers/RarityController";
import { Rarity } from "../../../src/Models/Rarity";

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
    const rarity = new Rarity(0, "L");

    mockRarityService.create.mockResolvedValue(undefined);

    await controller.create(req, res);

    expect(mockRarityService.create).toHaveBeenCalledWith(rarity);
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

  test("getAll handles errors correctly", async () => {
    const req: any = { query: {} };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockRarityService.getAll.mockRejectedValue(new Error("Database error"));

    await controller.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
  });

  test("create throws error for invalid data", async () => {
    const req: any = { body: {} };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockRarityService.create.mockRejectedValue(new Error("Invalid data"));

    await controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid data" });
  });
});
