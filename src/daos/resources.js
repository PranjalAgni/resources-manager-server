const { models } = require("../models");

class ResourcesDao {
  async createResource(resource) {
    const resourceResult = await models.Resources.create(resource);
    return resourceResult;
  }

  async getAllLatestResources() {
    const latestResourcesList = await models.Resources.findAll({
      order: [["createdAt", "DESC"]]
    });

    return latestResourcesList;
  }
}

module.exports = new ResourcesDao();
