import { Card } from "../../../src/Models/Card";
import { CardModel } from "../../../src/Models/CardModel";
import { User } from "../../../src/Models/User";
import { Rarity } from "../../../src/Models/Rarity";
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

    const card = new Card(
      0,
      new User(0, "", "", "", "", "USER", Date.now()),
      new CardModel(0, "", "", "", "", ""),
      new Rarity(0, ""),
      Date.now(),
      Date.now()
    );

    mockCardService.create.mockResolvedValue(undefined);

    await controller.create(req, res);

    expect(mockCardService.create).toHaveBeenCalledWith(card);
    expect(res.json).toHaveBeenCalledWith("Card created");
  });

  test("get responds with a card", async () => {
    const req: any = { params: { id: "5" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardService.get.mockResolvedValue({ id: 5 });

    await controller.get(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 5 });
  });

  test("getByUser responds with user's cards", async () => {
    const req: any = { params: { id: "2" } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardService.getByUser.mockResolvedValue(["card1", "card2"]);

    await controller.getByUser(req, res);

    expect(mockCardService.getByUser).toHaveBeenCalledWith(2);
    expect(res.json).toHaveBeenCalledWith(["card1", "card2"]);
  });

  test("getByMe responds with user's cards", async () => {
    const req: any = { user: { sub: 1 } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockCardService.getByUser.mockResolvedValue(["cardA", "cardB"]);

    await controller.getByMe(req, res);

    expect(mockCardService.getByUser).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(["cardA", "cardB"]);
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
