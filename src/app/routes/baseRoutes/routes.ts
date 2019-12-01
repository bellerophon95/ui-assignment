interface ModuleMap {
    [moduleName: string]: string,
}

export const MODULE: ModuleMap = {
    CORE: 'CORE',
    LANDING_PAGE: 'LANDING_PAGE',
};

interface Route {
    regexPath: string,
}

const MODULE_VS_ROUTE_MAP: Record<string, Route> = {
    [MODULE.CORE]: {
        regexPath: '/core',
    },
    [MODULE.LANDING_PAGE]: {
        regexPath: '/',
    },
};

export default MODULE_VS_ROUTE_MAP;