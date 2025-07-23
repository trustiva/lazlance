import { 
  users, 
  dashboardStats, 
  quickTools, 
  hotDeals, 
  todoItems,
  type User, 
  type InsertUser,
  type DashboardStats,
  type InsertDashboardStats,
  type QuickTool,
  type InsertQuickTool,
  type HotDeal,
  type InsertHotDeal,
  type TodoItem,
  type InsertTodoItem
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDashboardStats(userId: number): Promise<DashboardStats | undefined>;
  createDashboardStats(stats: InsertDashboardStats): Promise<DashboardStats>;
  updateDashboardStats(userId: number, stats: Partial<DashboardStats>): Promise<DashboardStats | undefined>;
  
  getQuickTools(): Promise<QuickTool[]>;
  createQuickTool(tool: InsertQuickTool): Promise<QuickTool>;
  
  getHotDeals(): Promise<HotDeal[]>;
  createHotDeal(deal: InsertHotDeal): Promise<HotDeal>;
  
  getTodoItems(userId: number): Promise<TodoItem[]>;
  createTodoItem(item: InsertTodoItem): Promise<TodoItem>;
  updateTodoItem(id: number, item: Partial<TodoItem>): Promise<TodoItem | undefined>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    try {
      // Check if data already exists
      const existingUser = await db.select().from(users).limit(1);
      if (existingUser.length > 0) {
        return; // Data already initialized
      }

      // Create default user
      const [defaultUser] = await db.insert(users).values({
        username: "ali_mohammadi",
        password: "password123",
        fullName: "علی محمدی",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
        level: 12,
        totalPoints: 750,
        currentLevelPoints: 750,
        maxLevelPoints: 1000,
      }).returning();

      // Create default dashboard stats
      await db.insert(dashboardStats).values({
        userId: defaultUser.id,
        projectsOutsourced: 12,
        reviewsGained: 47,
        starsEarned: 23,
        monthlyEarnings: "2340.00",
        weeklyProjects: 5,
        weeklyReviews: 12,
        weeklyEarnings: "340.00",
      });

      // Create default quick tools
      const defaultTools = [
        { name: "اوت‌سورس پروژه", icon: "share-alt", description: "پروژه‌هات رو به فریلنسرای دیگه واگذار کن", isActive: true },
        { name: "افزایش ستاره", icon: "star", description: "ستاره‌های پروفایلت رو افزایش بده", isActive: true },
        { name: "درخواست ریویو", icon: "thumbs-up", description: "از مشتریات ریویو مثبت بگیر", isActive: true },
        { name: "پروفایل‌بوستر", icon: "rocket", description: "پروفایلت رو برای موتورای جستجو بهینه کن", isActive: true },
        { name: "رزومه‌ساز", icon: "file-alt", description: "رزومه حرفه‌ای بساز", isActive: true },
        { name: "پاسخ‌دهی خودکار", icon: "robot", description: "به پیام‌هات خودکار جواب بده", isActive: true },
      ];
      await db.insert(quickTools).values(defaultTools);

      // Create default hot deal
      await db.insert(hotDeals).values({
        title: "پکیج ریویو بوست ویژه",
        description: "10 ریویو مثبت در کمتر از 48 ساعت + بوست ستاره رایگان",
        originalPrice: "98.00",
        discountPrice: "49.00",
        discountPercentage: 50,
        timeLeft: "12 ساعت باقی‌مانده",
        isActive: true,
      });

      // Create default todo items
      const defaultTodos = [
        {
          userId: defaultUser.id,
          title: "۴ تا ریویو مونده تا لول بعدی",
          description: "با افزایش ریویوهات، بهتر رنک میشی",
          priority: "high",
          points: 250,
          isCompleted: false,
        },
        {
          userId: defaultUser.id,
          title: "یک پروژه جدید برای اوت‌سورس داری",
          description: "پروژه وب‌سایت شرکت ABC منتظر اوت‌سورسه",
          priority: "medium",
          points: 150,
          isCompleted: false,
        },
        {
          userId: defaultUser.id,
          title: "پروفایلت رو آپدیت کن",
          description: "اضافه کردن مهارت‌های جدید بازدید بیشتری میاره",
          priority: "low",
          points: 50,
          isCompleted: false,
        },
      ];
      await db.insert(todoItems).values(defaultTodos);
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        level: 1,
        totalPoints: 0,
        currentLevelPoints: 0,
        maxLevelPoints: 1000,
      })
      .returning();
    return user;
  }

  async getDashboardStats(userId: number): Promise<DashboardStats | undefined> {
    const [stats] = await db.select().from(dashboardStats).where(eq(dashboardStats.userId, userId));
    return stats || undefined;
  }

  async createDashboardStats(stats: InsertDashboardStats): Promise<DashboardStats> {
    const [dashboardStat] = await db
      .insert(dashboardStats)
      .values(stats)
      .returning();
    return dashboardStat;
  }

  async updateDashboardStats(userId: number, stats: Partial<DashboardStats>): Promise<DashboardStats | undefined> {
    const [updated] = await db
      .update(dashboardStats)
      .set(stats)
      .where(eq(dashboardStats.userId, userId))
      .returning();
    return updated || undefined;
  }

  async getQuickTools(): Promise<QuickTool[]> {
    return await db.select().from(quickTools).where(eq(quickTools.isActive, true));
  }

  async createQuickTool(tool: InsertQuickTool): Promise<QuickTool> {
    const [quickTool] = await db
      .insert(quickTools)
      .values(tool)
      .returning();
    return quickTool;
  }

  async getHotDeals(): Promise<HotDeal[]> {
    return await db.select().from(hotDeals).where(eq(hotDeals.isActive, true));
  }

  async createHotDeal(deal: InsertHotDeal): Promise<HotDeal> {
    const [hotDeal] = await db
      .insert(hotDeals)
      .values(deal)
      .returning();
    return hotDeal;
  }

  async getTodoItems(userId: number): Promise<TodoItem[]> {
    return await db.select().from(todoItems).where(eq(todoItems.userId, userId));
  }

  async createTodoItem(item: InsertTodoItem): Promise<TodoItem> {
    const [todoItem] = await db
      .insert(todoItems)
      .values(item)
      .returning();
    return todoItem;
  }

  async updateTodoItem(id: number, item: Partial<TodoItem>): Promise<TodoItem | undefined> {
    const [updated] = await db
      .update(todoItems)
      .set(item)
      .where(eq(todoItems.id, id))
      .returning();
    return updated || undefined;
  }
}

export const storage = new DatabaseStorage();
