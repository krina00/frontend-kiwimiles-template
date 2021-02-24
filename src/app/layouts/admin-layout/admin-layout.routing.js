"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLayoutRoutes = void 0;
var dashboard_component_1 = require("../../pages/dashboard/dashboard.component");
var icons_component_1 = require("../../pages/icons/icons.component");
var maps_component_1 = require("../../pages/maps/maps.component");
var user_profile_component_1 = require("../../pages/user-profile/user-profile.component");
var tables_component_1 = require("../../pages/tables/tables.component");
exports.AdminLayoutRoutes = [
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'user-profile', component: user_profile_component_1.UserProfileComponent },
    { path: 'tables', component: tables_component_1.TablesComponent },
    { path: 'icons', component: icons_component_1.IconsComponent },
    { path: 'maps', component: maps_component_1.MapsComponent }
];
//# sourceMappingURL=admin-layout.routing.js.map