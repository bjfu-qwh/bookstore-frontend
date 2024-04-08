import {InjectionKey, Ref} from "vue";

export const parentCategoryID = Symbol() as InjectionKey<Ref<string>>;

export const dialogVisible = Symbol() as InjectionKey<Ref<boolean>>;

export const updateParentID = Symbol() as InjectionKey<(parentID: string) => void>;

export const updateDialog = Symbol() as InjectionKey<(visible: boolean) => void>