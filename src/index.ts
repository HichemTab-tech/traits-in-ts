type Constructor<T = any> = new (...args: any[]) => T;

type UnionToIntersection<U> =
    (U extends any ? (x: U) => void : never) extends
        (x: infer I) => void
        ? I
        : never;

const TRAITS = Symbol("traits");
const HAS_INSTANCE = Symbol("has_instance_registered");
function ensureTraitInstanceOf(C: Function) {
    if ((C as any)[HAS_INSTANCE]) return;

    Object.defineProperty(C, Symbol.hasInstance, {
        value(instance: any) {
            return !!instance?.[TRAITS]?.has(this);
        },
        enumerable: false,
        writable: false,
    });

    (C as any)[HAS_INSTANCE] = true;
}

export function use<T extends Constructor, R extends Constructor[]>(traits: readonly [...R]): Constructor<UnionToIntersection<InstanceType<R[number]>>>;
export function use<T extends Constructor, R extends Constructor[]>(traits: readonly [...R], parent: T): Constructor<UnionToIntersection<InstanceType<R[number] | T>>>;
export function use<T extends Constructor, R extends Constructor[]>
(traits: readonly [...R], parent?: T) {
    let Mixed: any;

    function constructorBody (this: any, ...args: any[]) {
        this[TRAITS as any] = this[TRAITS as any] ?? new Set<Function>;
        for (const C of traits) {
            ensureTraitInstanceOf(C);
            Object.assign(this, new C(...args));
            this[TRAITS].add(C);
        }
    }
    if (parent) {
        const getExtends = () => parent;

        Mixed = class extends getExtends() {
            constructor(...args: any[]) {
                super(...args);
                constructorBody.call(this, ...args);
            }

        }
    } else {
        Mixed = class {
            constructor(...args: any[]) {
                constructorBody.call(this, ...args);
            }

        }
    }

    for (const t of traits) {
        Object.getOwnPropertyNames(t.prototype).forEach(name => {
            if (name !== "constructor") {
                Object.defineProperty(
                    Mixed.prototype,
                    name,
                    Object.getOwnPropertyDescriptor(t.prototype, name)!
                );
            }
        });
    }

    return Mixed;
}
