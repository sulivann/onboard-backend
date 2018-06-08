'use strict';

/**
 * Category.js controller
 *
 * @description: A set of functions called "actions" for managing `Category`.
 */

module.exports = {

  /**
   * Retrieve category records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.category.fetchAll(ctx.query);
  },

  /**
   * Retrieve a category record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.category.fetch(ctx.params);
  },

  /**
   * Retrieve a category record with projects available for senior
   *
   * @return {Object}
   */

  findAvailableForSenior: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const categories = await strapi.services.category.fetch(ctx.params);

    categories.projects.forEach((project, index, object) => {
      if (project.senior) {
        object.splice(index, 1);
      }
    });

    return categories;
  },

  /**
   * Retrieve a category record with projects available for junior
   *
   * @return {Object}
   */

  findAvailableForJunior: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const categories = await strapi.services.category.fetch(ctx.params);

    categories.projects.forEach((project, index, object) => {
      if (!project.senior || project.junior) {
        object.splice(index, 1);
      }
    });

    return categories;
  },

  /**
   * Create a/an category record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.category.add(ctx.request.body);
  },

  /**
   * Update a/an category record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.category.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an category record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.category.remove(ctx.params);
  }
};
