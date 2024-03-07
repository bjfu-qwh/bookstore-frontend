import {expect, test} from "vitest"
import devInstance, {getBaseUrl} from "@/network"

test("AXIOS_DEV_TEST", () => {
    const env = import.meta.env.VITE_ENV_MODE;
    expect(devInstance.defaults.baseURL).toBe(getBaseUrl(env));
    expect(devInstance.defaults.timeout).toBe(10000);
});