import 'reflect-metadata';

const DESIGN_PARAM_TYPES = 'design:paramtypes';
const DESIGN_TYPE = 'design:type';
const DESIGN_RETURN_TYPE = 'design:returntype';
const PROPERTIES: Map<string | symbol, any[]> = new Map<string | symbol, any[]>();

function get(key: string, target: any, propertyKey?: string | symbol, own: boolean = false) {
  return own ?
    Reflect.getOwnMetadata(key, target, propertyKey!) :
    Reflect.getMetadata(key, target, propertyKey!);
}

export function getClass(target: any): any {
  return target.prototype ? target : target.constructor;
}

export function getMetadata(key: string, target: any, propertyKey?: string | symbol): any {
  return get(key, target, propertyKey);
}

export function getOwn(key: string, target: any, propertyKey?: string | symbol): any {
  return get(key, target, propertyKey, true);
}

export function getType(target: any, propertyKey?: string | symbol): any {
  return Reflect.getMetadata(DESIGN_TYPE, target, propertyKey!);
}

export function getOwnType(target: any, propertyKey?: string | symbol): any {
  return Reflect.getMetadata(DESIGN_TYPE, target, propertyKey!);
}

export function getReturnType(target: any, propertyKey?: string | symbol): any {
  return Reflect.getMetadata(DESIGN_RETURN_TYPE, target, propertyKey!);
}

export function getOwnReturnType(target: any, propertyKey?: string | symbol): any {
  return Reflect.getOwnMetadata(DESIGN_RETURN_TYPE, target, propertyKey!);
}

export function hasMetadata(key: string, target: any, propertyKey?: string | symbol): boolean {
  try {
    return Reflect.hasMetadata(key, target, propertyKey!);
  } catch (er) {
  }

  return false;
}

export function hasOwnMetadata(key: string, target: any, propertyKey?: string | symbol): boolean {
  return Reflect.hasOwnMetadata(key, target, propertyKey!);
}

export function setParamTypes(target: any, propertyKey: string | symbol, value: any): void {
  return this.set(DESIGN_PARAM_TYPES, value, target.prototype, propertyKey);
}

export function deleteMetadata(key: string, target: any, propertyKey?: string | symbol): boolean {
  return Reflect.deleteMetadata(key, target, propertyKey!);
}

/*
export const getTargetsFromPropertyKey = (metadataKey: string | symbol): any[] =>
  PROPERTIES.has(metadataKey) ? PROPERTIES.get(metadataKey) || [] : []
*/

export function setMetadata(key: string, value: any, target: any, propertyKey?: string | symbol): void {
  const targets: any[] = PROPERTIES.has(key) ? PROPERTIES.get(key) || [] : [];
  const classConstructor = target;

  if (targets.indexOf(classConstructor) === -1) {
    targets.push(classConstructor);
    PROPERTIES.set(key, targets);
  }

  Reflect.defineMetadata(key, value, target, propertyKey!);
}

export function getParamTypes(targetPrototype: any, propertyKey?: string | symbol): any[] {
  return get(DESIGN_PARAM_TYPES, targetPrototype, propertyKey!) || [];
}

export function getOwnParamTypes(target: any, propertyKey?: string | symbol): any[] {
  return get(DESIGN_PARAM_TYPES, target, propertyKey!, true) || [];
}
