'use strict';

/**
 * Application.js controller
 *
 * @description: A set of functions called "actions" for managing `Application`.
 */

module.exports = {

  /**
   * Retrieve application records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.application.fetchAll(ctx.query);
  },

  /**
   * Retrieve a application record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.application.fetch(ctx.params);
  },

  /**
   * Create a/an application record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.application.add(ctx.request.body);
  },

  /**
   * Update a/an application record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.application.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an application record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.application.remove(ctx.params);
  }
};
