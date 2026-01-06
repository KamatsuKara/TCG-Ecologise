import { CardHistController } from "../../../src/Controllers/CardHistController";

const mockCardHistService: any = {
  getAll: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("CardHistController", () => {
  let controller: CardHistController;

  beforeEach(() => {
    jest.restoreAllMocks();
    Object.values(mockCardHistService).forEach((m: any) => m.mockReset());
    controller = new CardHistController(mockCardHistService);
  });

  test("getAll responds with cardHists", async () => {
    const req: any = { query: {} };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardHistService.getAll.mockResolvedValue(["ch1"]);

    await controller.getAll(req, res);

    expect(res.json).toHaveBeenCalledWith(["ch1"]);
  });

  test("create responds with message", async () => {
    const req: any = { body: { info: "I" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardHistService.create.mockResolvedValue(undefined);

    await controller.create(req, res);

    expect(mockCardHistService.create).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith("CardHist created");
  });

  test("get, delete, update behave correctly", async () => {
    const reqGet: any = { params: { id: "3" } };
    const reqDel: any = { params: { id: "4" } };
    const reqUp: any = { body: { id: 3 } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    mockCardHistService.get.mockResolvedValue({ id: 3 });
    await controller.get(reqGet, res);
    expect(res.json).toHaveBeenCalledWith({ id: 3 });

    mockCardHistService.delete.mockResolvedValue(undefined);
    await controller.delete(reqDel, res);
    expect(res.json).toHaveBeenCalledWith("CardHist deleted");

    mockCardHistService.update.mockResolvedValue(undefined);
    await controller.update(reqUp, res);
    expect(res.json).toHaveBeenCalledWith("CardHist updated");
  });
});
