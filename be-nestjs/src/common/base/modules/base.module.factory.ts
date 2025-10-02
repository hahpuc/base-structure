import { Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BaseEntity } from '../repositories/entities/base.entity';

/**
 * Enhanced Base Module Factory to handle complex modules with multiple components
 */
export interface BaseModuleOptions {
  // Entities - can be single or array
  entities: Type<BaseEntity> | Type<BaseEntity>[];

  // Services - can be single or array
  services: Type<any> | Type<any>[];

  // Controllers - optional, can be single or array
  controllers?: Type<any> | Type<any>[];

  // Repositories - optional, can be single or array
  repositories?: Type<any> | Type<any>[];

  // Additional providers (guards, interceptors, etc.)
  providers?: Type<any>[];

  // Additional modules to import
  imports?: Type<any>[];

  // Additional exports (useful for shared modules)
  exports?: Type<any>[];

  // Global module flag
  isGlobal?: boolean;
}

/**
 * Utility function to ensure array format
 */
function ensureArray<T>(item: T | T[]): T[] {
  return Array.isArray(item) ? item : [item];
}

export function createBaseModule(options: BaseModuleOptions): Type<any> {
  const {
    entities,
    services,
    controllers = [],
    repositories = [],
    providers = [],
    imports = [],
    exports = [],
    isGlobal = false,
  } = options;

  // Convert all inputs to arrays for consistency
  const entitiesArray = ensureArray(entities);
  const servicesArray = ensureArray(services);
  const controllersArray = ensureArray(controllers);
  const repositoriesArray = ensureArray(repositories);

  // Build module configuration
  const moduleProviders = [
    ...servicesArray,
    ...repositoriesArray,
    ...providers,
  ];

  const moduleControllers = [...controllersArray];

  const moduleImports = [TypeOrmModule.forFeature(entitiesArray), ...imports];

  const moduleExports = [...servicesArray, ...repositoriesArray, ...exports];

  // Create the module class
  const moduleConfig: any = {
    imports: moduleImports,
    providers: moduleProviders,
    controllers: moduleControllers,
    exports: moduleExports,
  };

  // Add global flag if specified
  if (isGlobal) {
    moduleConfig.global = true;
  }

  @Module(moduleConfig)
  class BaseModuleClass {}

  // Set a meaningful name for debugging
  Object.defineProperty(BaseModuleClass, 'name', {
    value: `DynamicModule_${Date.now()}`,
  });

  return BaseModuleClass;
}

/**
 * Simplified factory for single-entity modules (backward compatibility)
 */
export function createSimpleModule<TEntity extends BaseEntity>(options: {
  entity: Type<TEntity>;
  service: Type<any>;
  adminController?: Type<any>;
  publicController?: Type<any>;
  repository?: Type<any>;
}): Type<any> {
  const { entity, service, adminController, publicController, repository } =
    options;

  return createBaseModule({
    entities: entity,
    services: service,
    controllers: [
      ...(adminController ? [adminController] : []),
      ...(publicController ? [publicController] : []),
    ].filter(Boolean),
    repositories: repository ? [repository] : [],
  });
}
