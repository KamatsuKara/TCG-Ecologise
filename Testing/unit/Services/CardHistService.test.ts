import { CardHistService } from "../../../src/Services/CardHistService";

const mockCardHistDAO: any = {
  findAll: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("CardHistService", () => {
  let service: CardHistService;

  beforeEach(() => {
    jest.restoreAllMocks();
    service = new CardHistService(mockCardHistDAO);
    Object.values(mockCardHistDAO).forEach((m: any) => m.mockReset());
  });

  test("getAll returns paginated cardHists", async () => {
    mockCardHistDAO.findAll.mockResolvedValue([1,2,3]);
    const res = await service.getAll(2,2);
    expect(res).toEqual([3]);
  });

  test("get throws when not found", async () => {
    mockCardHistDAO.findById.mockResolvedValue(null);
    await expect(service.get(7)).rejects.toThrow("CardHist not found");
  });

  test("create sets obtened and delegates delete/update", async () => {
    const ch: any = {};
    mockCardHistDAO.insert.mockResolvedValue(undefined);
    mockCardHistDAO.delete.mockResolvedValue(undefined);
    mockCardHistDAO.update.mockResolvedValue(undefined);

    await service.create(ch);
    expect(typeof ch.obtened).toBe("number");
    await service.delete(2);
    await service.update({ id: 2 } as any);
    expect(mockCardHistDAO.delete).toHaveBeenCalledWith(2);
    expect(mockCardHistDAO.update).toHaveBeenCalled();
  });
});
