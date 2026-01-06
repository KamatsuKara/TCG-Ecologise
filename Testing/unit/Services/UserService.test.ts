import { UserService } from "../../../src/Services/UserService";
import bcrypt from "bcrypt";

const mockUserDAO: any = {
  findAll: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    jest.restoreAllMocks();
    service = new UserService(mockUserDAO);
    Object.values(mockUserDAO).forEach((m: any) => m.mockReset());
  });

  test("getAll returns paginated users", async () => {
    mockUserDAO.findAll.mockResolvedValue([1,2,3]);
    const res = await service.getAll(2,1);
    expect(res).toEqual([1,2]);
  });

  test("get hides password and throws when not found", async () => {
    mockUserDAO.findById.mockResolvedValue(null);
    await expect(service.get(1)).rejects.toThrow("User not found");
  });

  test("create hashes password and calls insert", async () => {
    (bcrypt as any).hash = jest.fn().mockResolvedValue("hpass");
    const user: any = { password: "pw" };
    await service.create(user);
    expect(mockUserDAO.insert).toHaveBeenCalled();
    expect(user.password).toBe("hpass");
  });

  test("get returns user and hides password", async () => {
    const u: any = { id: 3, password: "secret" };
    mockUserDAO.findById.mockResolvedValue(u);
    const res = await service.get(3);
    expect(res.id).toBe(3);
    expect(res.password).toBe("");
  });

  test("delete and update call DAO", async () => {
    mockUserDAO.delete.mockResolvedValue(undefined);
    mockUserDAO.update.mockResolvedValue(undefined);
    await service.delete(2);
    await service.update({ id: 2 } as any);
    expect(mockUserDAO.delete).toHaveBeenCalledWith(2);
    expect(mockUserDAO.update).toHaveBeenCalled();
  });
});
