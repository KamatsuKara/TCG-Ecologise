import { BoosterService } from "../../../src/Services/BoosterService";

const mockBoosterDAO: any = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByUser: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("BoosterService", () => {
  let service: BoosterService;

  beforeEach(() => {
    jest.restoreAllMocks();
    service = new BoosterService(mockBoosterDAO, {} as any, {} as any, {} as any, {} as any, {} as any);
    Object.values(mockBoosterDAO).forEach((m: any) => m.mockReset());
  });

  test("getAll returns paginated boosters", async () => {
    mockBoosterDAO.findAll.mockResolvedValue([1, 2, 3, 4]);
    const res = await service.getAll(2, 2);
    expect(res).toEqual([3, 4]);
  });

  test("get throws when not found", async () => {
    mockBoosterDAO.findById.mockResolvedValue(null);
    await expect(service.get(10)).rejects.toThrow("Booster not found");
  });

  test("getByUser returns user's boosters", async () => {
    mockBoosterDAO.findByUser.mockResolvedValue(["booster1"]);
    const res = await service.getByUser(1);
    expect(res).toEqual(["booster1"]);
  });

  test("create calls insert", async () => {
    const booster: any = { name: "New Booster" };
    await service.create(booster);
    expect(mockBoosterDAO.insert).toHaveBeenCalledWith(booster);
  });

  test("delete calls DAO delete", async () => {
    await service.delete(1);
    expect(mockBoosterDAO.delete).toHaveBeenCalledWith(1);
  });

  test("update calls DAO update", async () => {
    const booster: any = { id: 1, name: "Updated Booster" };
    await service.update(booster);
    expect(mockBoosterDAO.update).toHaveBeenCalledWith(booster);
  });
});