import { RarityService } from "../../../src/Services/RarityService";

const mockRarityDAO: any = {
  findAll: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("RarityService", () => {
  let service: RarityService;

  beforeEach(() => {
    jest.restoreAllMocks();
    service = new RarityService(mockRarityDAO);
    Object.values(mockRarityDAO).forEach((m: any) => m.mockReset());
  });

  test("getAll returns paginated rarities", async () => {
    mockRarityDAO.findAll.mockResolvedValue([1,2,3,4]);
    const res = await service.getAll(3,1);
    expect(res).toEqual([1,2,3]);
  });

  test("get throws when not found", async () => {
    mockRarityDAO.findById.mockResolvedValue(null);
    await expect(service.get(5)).rejects.toThrow("Rarity not found");
  });

  test("create calls insert and delete/update delegate", async () => {
    mockRarityDAO.insert.mockResolvedValue(undefined);
    mockRarityDAO.delete.mockResolvedValue(undefined);
    mockRarityDAO.update.mockResolvedValue(undefined);

    await service.create({} as any);
    await service.delete(3);
    await service.update({ id: 3 } as any);

    expect(mockRarityDAO.insert).toHaveBeenCalled();
    expect(mockRarityDAO.delete).toHaveBeenCalledWith(3);
    expect(mockRarityDAO.update).toHaveBeenCalled();
  });
});
