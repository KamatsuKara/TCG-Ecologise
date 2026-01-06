import { CardModelController } from "../../../src/Controllers/CardModelController";

const mockCardModelService: any = {
  getAll: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("CardModelController", () => {
  let controller: CardModelController;

  beforeEach(() => {
    jest.restoreAllMocks();
    Object.values(mockCardModelService).forEach((m: any) => m.mockReset());
    controller = new CardModelController(mockCardModelService);
  });

  test("getAll responds with cardModels", async () => {
    const req: any = { query: {} };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardModelService.getAll.mockResolvedValue(["cm1"]);

    await controller.getAll(req, res);

    expect(res.json).toHaveBeenCalledWith(["cm1"]);
  });

  test("create responds with message", async () => {
    const req: any = { body: { title: "T" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardModelService.create.mockResolvedValue(undefined);

    await controller.create(req, res);

    expect(mockCardModelService.create).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith("CardModel created");
  });

  test("get, delete, update behave correctly", async () => {
    const reqGet: any = { params: { id: "6" } };
    const reqDel: any = { params: { id: "7" } };
    const reqUp: any = { body: { id: 6 } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    mockCardModelService.get.mockResolvedValue({ id: 6 });
    await controller.get(reqGet, res);
    expect(res.json).toHaveBeenCalledWith({ id: 6 });

    mockCardModelService.delete.mockResolvedValue(undefined);
    await controller.delete(reqDel, res);
    expect(res.json).toHaveBeenCalledWith("CardModel deleted");

    mockCardModelService.update.mockResolvedValue(undefined);
    await controller.update(reqUp, res);
    expect(res.json).toHaveBeenCalledWith("CardModel updated");
  });
});
