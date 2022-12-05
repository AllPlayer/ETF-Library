import { Logger } from "./logger";
interface BaseModel {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  version?: number;
}
export class Repository {
  logger: Logger;
  repo: any;

  constructor(model: any, db: any) {
    this.repo = db.sequelize.getRepository(model);
    this.logger = new Logger();
  }

  async get() {
    try {
      console.log(this.repo);
      const data = await this.repo.findAll();
      this.logger.info("Data:::", data);
      return data;
    } catch (err) {
      this.logger.error("Error::" + err);
      return [];
    }
  }

  async getById(reqId: number) {
    let data = {};
    try {
      data = await this.repo.findOne({
        where: {
          id: reqId,
        },
      });
      return data;
    } catch (err) {
      this.logger.error("Error::" + err);
      return { err };
    }
  }

  async create(req: BaseModel) {
    let data = {};
    try {
      req.createdAt = new Date().toISOString();
      data = await this.repo.create(req);
      return { ...data, ...{ response: "Success" } };
    } catch (err) {
      this.logger.error("Error::" + err);
      return { err };
    }
  }

  async update(req: BaseModel) {
    let data = {};
    try {
      req.updatedAt = new Date().toISOString();
      data = await this.repo.update(
        { ...req },
        {
          where: {
            id: req.id,
          },
        }
      );
      return { ...data, ...{ response: "Success" } };
    } catch (err) {
      this.logger.error("Error::" + err);
      return { err };
    }
  }

  async delete(reqId: number) {
    let data = {};
    try {
      data = await this.repo.destroy({
        where: {
          id: reqId,
        },
      });
      return { ...data, ...{ response: "Success" } };
    } catch (err) {
      this.logger.error("Error::" + err);
    }
    return data;
  }
}
