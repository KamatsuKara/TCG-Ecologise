import { CardController } from "../../../src/Controllers/CardController";

const mockCardService: any = {
  getAll: jest.fn(),
  get: jest.fn(),
  getByUser: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("CardController", () => {
  let controller: CardController;

  beforeEach(() => {
    jest.restoreAllMocks();
    Object.values(mockCardService).forEach((m: any) => m.mockReset());
    controller = new CardController(mockCardService);
  });

  test("getAll responds with data", async () => {
    const req: any = { query: {} };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardService.getAll.mockResolvedValue([1,2]);

    await controller.getAll(req, res);

    expect(res.json).toHaveBeenCalledWith([1,2]);
  });

  test("create responds with success message", async () => {
    const req: any = { body: { name: "C" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardService.create.mockResolvedValue(undefined);

    await controller.create(req, res);

    expect(mockCardService.create).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith("Card created");
  });

  test("get responds with a card", async () => {
    const req: any = { params: { id: "5" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardService.get.mockResolvedValue({ id: 5 });

    await controller.get(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 5 });
  });

  test("getByUser and getByMe respond with data", async () => {
    const reqU: any = { params: { id: "2" } };
    const reqMe: any = { user: { sub: 3 } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardService.getByUser.mockResolvedValue(["a"]);

    await controller.getByUser(reqU, res);
    expect(res.json).toHaveBeenCalledWith(["a"]);

    await controller.getByMe(reqMe, res);
    expect(res.json).toHaveBeenCalledWith(["a"]);
  });

  test("delete and update respond with messages", async () => {
    const reqDel: any = { params: { id: "7" } };
    const reqUp: any = { body: { id: 7 } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardService.delete.mockResolvedValue(undefined);
    mockCardService.update.mockResolvedValue(undefined);

    await controller.delete(reqDel, res);
    expect(res.json).toHaveBeenCalledWith("Card deleted");

    await controller.update(reqUp, res);
    expect(res.json).toHaveBeenCalledWith("Card updated");
  });
});
