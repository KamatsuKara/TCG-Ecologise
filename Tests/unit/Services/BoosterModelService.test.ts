import { BoosterModelService } from "../../../src/Services/BoosterModelService";

const mockBoosterModelDAO: any = {
  findAll: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

const mockWalletDAO: any = {
  findByUserAndCurrency: jest.fn(),
  update: jest.fn(),
};

const mockBoosterDAO: any = {
  insert: jest.fn(),
};

describe("BoosterModelService", () => {
  let service: BoosterModelService;

  beforeEach(() => {
    jest.restoreAllMocks();
    service = new BoosterModelService(mockBoosterModelDAO, {} as any, mockWalletDAO);
    Object.values(mockBoosterModelDAO).forEach((m: any) => m.mockReset());
    Object.values(mockWalletDAO).forEach((m: any) => m.mockReset());
  });

  test("getAll returns paginated boosterModels", async () => {
    mockBoosterModelDAO.findAll.mockResolvedValue([1, 2, 3, 4]);
    const res = await service.getAll(2, 2);
    expect(res).toEqual([3, 4]);
  });

  test("get throws when not found", async () => {
    mockBoosterModelDAO.findById.mockResolvedValue(null);
    await expect(service.get(10)).rejects.toThrow("BoosterModel not found");
  });

  test("create calls insert", async () => {
    const boosterModel: any = { name: "New BoosterModel" };
    await service.create(boosterModel);
    expect(mockBoosterModelDAO.insert).toHaveBeenCalledWith(boosterModel);
  });

  test("delete calls DAO delete", async () => {
    await service.delete(1);
    expect(mockBoosterModelDAO.delete).toHaveBeenCalledWith(1);
  });

  test("update calls DAO update", async () => {
    const boosterModel: any = { id: 1, name: "Updated BoosterModel" };
    await service.update(boosterModel);
    expect(mockBoosterModelDAO.update).toHaveBeenCalledWith(boosterModel);
  });

  test("buyBooster throws error for insufficient funds", async () => {
    mockWalletDAO.findByUserAndCurrency.mockResolvedValue({ amount: 50 });
    await expect(service.buyBooster(1, 1)).rejects.toThrow("Insufficient funds");
  });

  test("buyBooster succeeds with sufficient funds", async () => {
    mockWalletDAO.findByUserAndCurrency.mockResolvedValue({ amount: 150 });
    mockBoosterModelDAO.findById.mockResolvedValue({ id: 1, price: 100 });

    await service.buyBooster(1, 1);

    expect(mockWalletDAO.update).toHaveBeenCalled();
    expect(mockBoosterDAO.insert).toHaveBeenCalled();
  });
});