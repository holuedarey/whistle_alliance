import { AppResourcesNavMap } from "src/app/app-resources";
import { AuthResourcesNavMap } from "src/app/pages/auth/auth-resources";
import { ExceptionResourcesNavMap } from "src/app/pages/exceptions/exceptions-resources";
import { PagesResourcesNavMap } from "src/app/pages/pages-resources";
import { ResourceNavModel } from "../models/resource-nav.model";

export const GlobalResources = new Map<string, ResourceNavModel>([
    ...AppResourcesNavMap,
    ...PagesResourcesNavMap,
    ...ExceptionResourcesNavMap,
    ...AuthResourcesNavMap,
]);
