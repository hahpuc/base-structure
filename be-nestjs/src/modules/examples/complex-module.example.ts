/**
 * EXAMPLES: How to use the enhanced createBaseModule factory
 *
 * This file shows different ways to create modules using the base module factory.
 */

/* eslint-disable */

/**
 * EXAMPLE 1: Complex E-commerce Product Module
 *
 * For modules with many components, use arrays:
 *
 * export const ProductModule = createBaseModule({
 *   entities: [Product, ProductCategory, ProductImage, ProductVariant],
 *   services: [ProductService, ProductCategoryService, ProductImageService],
 *   controllers: [ProductAdminController, ProductPublicController],
 *   repositories: [ProductRepository, ProductCategoryRepository],
 *   providers: [ProductGuard, ProductInterceptor],
 *   imports: [ElasticsearchModule, BullModule],
 *   exports: [ProductSearchService],
 *   isGlobal: false,
 * });
 */

/**
 * EXAMPLE 2: Simple User Module
 *
 * For modules with single components, use single values:
 *
 * export const UserModule = createBaseModule({
 *   entities: User,
 *   services: UserService,
 *   controllers: [UserAdminController, UserPublicController],
 *   repositories: UserRepository,
 * });
 */

/**
 * EXAMPLE 3: Blog Module (Mixed)
 *
 * Real-world example mixing single and multiple components:
 *
 * export const BlogModule = createBaseModule({
 *   entities: [BlogPost, BlogCategory, BlogComment, BlogTag],
 *   services: [BlogPostService, BlogCategoryService, BlogCommentService],
 *   controllers: [BlogAdminController, BlogPublicController],
 *   repositories: [BlogPostRepository, BlogCategoryRepository],
 *   providers: [BlogAuthGuard, BlogCacheInterceptor],
 *   imports: [CacheModule, MailerModule],
 *   exports: [BlogPostService, BlogSearchService],
 * });
 */

/**
 * USAGE PATTERNS:
 *
 * 1. Simple modules (like Category):
 *    - Use createSimpleModule() for backward compatibility
 *    - Single entity, service, repository
 *    - Maybe admin + public controllers
 *
 * 2. Medium complexity:
 *    - Single main entity + related entities
 *    - Multiple services for different concerns
 *    - Multiple controllers for different access levels
 *
 * 3. Complex modules:
 *    - Multiple related entities
 *    - Many services for different business logic
 *    - Multiple controllers for different features
 *    - External integrations
 *    - Custom providers
 */
