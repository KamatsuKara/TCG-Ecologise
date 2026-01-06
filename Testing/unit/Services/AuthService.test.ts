import { AuthService } from "../../../src/Services/AuthService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const mockUserDAO: any = {
  findByEmail: jest.fn(),
  insert: jest.fn(),
};

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(() => {
    jest.restoreAllMocks();
    service = new AuthService(mockUserDAO);
    mockUserDAO.findByEmail.mockReset();
    mockUserDAO.insert.mockReset();
  });

  test("login returns token when credentials are valid", async () => {
    const user = { id: 1, password: "hashedpwd", role: "USER" };
    mockUserDAO.findByEmail.mockResolvedValue(user);
    (bcrypt as any).compare = jest.fn().mockResolvedValue(true);
    jest.spyOn(jwt, "sign").mockReturnValue("token123" as any);
    process.env.JWT_SECRET = "test_secret";

    const token = await service.login("alice@example.com", "password");

    expect(token).toBe("token123");
    expect(mockUserDAO.findByEmail).toHaveBeenCalledWith("alice@example.com");
  });

  test("login throws when user not found", async () => {
    mockUserDAO.findByEmail.mockResolvedValue(null);
    await expect(service.login("noone@example.com", "pw")).rejects.toThrow("User incorrect");
  });

  test("login throws when password incorrect", async () => {
    const user = { id: 2, password: "hashedpwd", role: "USER" };
    mockUserDAO.findByEmail.mockResolvedValue(user);
    (bcrypt as any).compare = jest.fn().mockResolvedValue(false);

    await expect(service.login("bob@example.com", "bad")).rejects.toThrow("User incorrect");
  });

  test("register hashes password and inserts user", async () => {
    const user: any = { password: "plain" };
    (bcrypt as any).hash = jest.fn().mockResolvedValue("hashed");

    await service.register(user);

    expect(user.password).toBe("hashed");
    expect(user.role).toBe("USER");
    expect(mockUserDAO.insert).toHaveBeenCalledWith(user);
  });
});
