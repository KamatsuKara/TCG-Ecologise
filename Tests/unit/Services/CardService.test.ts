import { CardService } from "../../../src/Services/CardService";

const mockCardDAO: any = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByUser: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("CardService", () => {
  let service: CardService;

  beforeEach(() => {
    jest.restoreAllMocks();
    service = new CardService(mockCardDAO);
    Object.values(mockCardDAO).forEach((m: any) => m.mockReset());
  });

  test("getAll returns paginated slice", async () => {
    mockCardDAO.findAll.mockResolvedValue([1,2,3,4,5]);
    const res = await service.getAll(2, 2);
    expect(res).toEqual([3,4]);
  });

  test("get throws when not found", async () => {
    mockCardDAO.findById.mockResolvedValue(null);
    await expect(service.get(10)).rejects.toThrow("Card not found");
  });

  test("create calls insert", async () => {
    const card: any = { name: "c" };
    await service.create(card);
    expect(mockCardDAO.insert).toHaveBeenCalled();
    expect(typeof (card.created)).toBe("number");
  });

  test("get returns card when found", async () => {
    const c = { id: 5 };
    mockCardDAO.findById.mockResolvedValue(c);
    const res = await service.get(5);
    expect(res).toBe(c);
  });

  test("getByUser returns cards or throws", async () => {
    mockCardDAO.findByUser.mockResolvedValue([{ id: 2 }]);
    const res = await service.getByUser(2);
    expect(res).toEqual([{ id: 2 }]);

    mockCardDAO.findByUser.mockResolvedValue(null);
    await expect(service.getByUser(3)).rejects.toThrow("Card not found");
  });

  test("delete calls DAO.delete and update calls DAO.update", async () => {
    mockCardDAO.delete.mockResolvedValue(undefined);
    mockCardDAO.update.mockResolvedValue(undefined);
    await service.delete(1);
    await service.update({ id: 1 } as any);
    expect(mockCardDAO.delete).toHaveBeenCalledWith(1);
    expect(mockCardDAO.update).toHaveBeenCalled();
  });
});
