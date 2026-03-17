import { CardModelController } from "../../../src/Controllers/CardModelController";
import { CardModel } from "../../../src/Models/CardModel";

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

//  test("create responds with message", async () => {
//    const req: any = { body: { title: "T" } };
//    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
//    const cardModel = new CardModel(0, "T", "", "", "", "");
//
//    mockCardModelService.create.mockResolvedValue(undefined);
//
//    await controller.create(req, res);
//
//    expect(mockCardModelService.create).toHaveBeenCalledWith(cardModel);
//    expect(res.json).toHaveBeenCalledWith("CardModel created");
//  });

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

  test("getAll handles errors correctly", async () => {
    const req: any = { query: {} };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardModelService.getAll.mockRejectedValue(new Error("Database error"));

    await controller.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
  });

  test("create throws error for invalid data", async () => {
    const req: any = { body: {} };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardModelService.create.mockRejectedValue(new Error("Invalid data"));

    await controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid data" });
  });
});
