import { CardModelService } from "../../../src/Services/CardModelService";

const mockCardModelDAO: any = {
  findAll: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("CardModelService", () => {
  let service: CardModelService;

  beforeEach(() => {
    jest.restoreAllMocks();
    service = new CardModelService(mockCardModelDAO);
    Object.values(mockCardModelDAO).forEach((m: any) => m.mockReset());
  });

  test("getAll returns paginated cardModels", async () => {
    mockCardModelDAO.findAll.mockResolvedValue([1,2,3,4]);
    const res = await service.getAll(2,2);
    expect(res).toEqual([3,4]);
  });

  test("get throws when not found", async () => {
    mockCardModelDAO.findById.mockResolvedValue(null);
    await expect(service.get(9)).rejects.toThrow("CardModel not found");
  });

  test("create/delete/update delegate to DAO", async () => {
    mockCardModelDAO.insert.mockResolvedValue(undefined);
    mockCardModelDAO.delete.mockResolvedValue(undefined);
    mockCardModelDAO.update.mockResolvedValue(undefined);

    await service.create({} as any);
    await service.delete(4);
    await service.update({ id: 4 } as any);

    expect(mockCardModelDAO.insert).toHaveBeenCalled();
    expect(mockCardModelDAO.delete).toHaveBeenCalledWith(4);
    expect(mockCardModelDAO.update).toHaveBeenCalled();
  });
});
