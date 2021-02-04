const resourcesDAO = require("../daos/resources");

class ResourcesService {
  async createResourceHandler({ url, description }) {
    await resourcesDAO.createResource({ url, description });
  }

  async getAllResources() {
    return await resourcesDAO.getAllLatestResources();
  }
}

module.exports = new ResourcesService();
