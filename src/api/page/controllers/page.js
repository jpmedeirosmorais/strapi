const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::page.page", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const entity = await strapi.entityService.findMany("api::page.page", {
      ...query,
      populate: {
        menu: {
          populate: {
            logo: true,
            logo_text: true,
            menu_link: {
              populate: {
                link_text: true,
                url: true,
              },
            },
          },
        },
        sections: {
          populate: {
            title: true,
            content: true,
            description: true,
            image: true,
            text_grid: {
              populate: {
                title: true,
                description: true,
              },
            },
            image_grid: {
              populate: {
                image: true,
              },
            },
            metadata: {
              populate: {
                name: true,
                section_id: true,
                background: true,
              },
            },
          },
        },
        sidebar: {
          populate: {
            img: true,
            links: {
              populate: {
                icon: true,
              },
            },
          },
        },
      },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));