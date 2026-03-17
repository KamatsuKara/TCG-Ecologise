import { BoosterModelController } from "../../../src/Controllers/BoosterModelController";
import { BoosterModel } from "../../../src/Models/BoosterModel";

const mockBoosterModelService: any = {
  getAll: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("BoosterModelController", () => {
  let controller: BoosterModelController;

  beforeEach(() => {
    jest.restoreAllMocks();
    Object.values(mockBoosterModelService).forEach((m: any) => m.mockReset());
    controller = new BoosterModelController(mockBoosterModelService);
  });

  test("getAll responds with boosterModels", async () => {
    const req: any = { query: {} };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockBoosterModelService.getAll.mockResolvedValue(["boosterModel1"]);

    await controller.getAll(req, res);

    expect(res.json).toHaveBeenCalledWith(["boosterModel1"]);
  });

  test("get responds with a boosterModel", async () => {
    const req: any = { params: { id: "5" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockBoosterModelService.get.mockResolvedValue({ id: 5 });

    await controller.get(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 5 });
  });

  test("create responds with success message", async () => {
    const req: any = { body: { name: "New BoosterModel", nmbCard: 1, category: "[]" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const boosterModel = new BoosterModel(0, "New BoosterModel", 1, "[]");

    mockBoosterModelService.create.mockResolvedValue(undefined);

    await controller.create(req, res);

    expect(mockBoosterModelService.create).toHaveBeenCalledWith(boosterModel);
    expect(res.json).toHaveBeenCalledWith("BoosterModel created");
  });

  test("delete responds with success message", async () => {
    const req: any = { params: { id: "3" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockBoosterModelService.delete.mockResolvedValue(undefined);

    await controller.delete(req, res);

    expect(mockBoosterModelService.delete).toHaveBeenCalledWith(3);
    expect(res.json).toHaveBeenCalledWith("BoosterModel deleted");
  });
});