"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DutyRecordStatus = exports.HkType = exports.SemTerm = exports.SemStatus = exports.LogsStatus = exports.QrType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
    UserRole["Coordinator"] = "coordinator";
    UserRole["Scholar"] = "scholar";
    UserRole["QrHolder"] = "qr_holder";
})(UserRole || (exports.UserRole = UserRole = {}));
var QrType;
(function (QrType) {
    QrType["Regular"] = "Regular";
    QrType["Special"] = "Special";
    QrType["Custom"] = "Custom";
})(QrType || (exports.QrType = QrType = {}));
var LogsStatus;
(function (LogsStatus) {
    LogsStatus["Success"] = "Success";
    LogsStatus["Failed"] = "Failed";
})(LogsStatus || (exports.LogsStatus = LogsStatus = {}));
var SemStatus;
(function (SemStatus) {
    SemStatus["Active"] = "Active";
    SemStatus["Inactive"] = "Inactive";
})(SemStatus || (exports.SemStatus = SemStatus = {}));
var SemTerm;
(function (SemTerm) {
    SemTerm["First"] = "First";
    SemTerm["Second"] = "Second";
})(SemTerm || (exports.SemTerm = SemTerm = {}));
var HkType;
(function (HkType) {
    HkType["HK100"] = "HK100";
    HkType["HK75"] = "HK75";
    HkType["HK50"] = "HK50";
    HkType["HK25"] = "HK25";
})(HkType || (exports.HkType = HkType = {}));
var DutyRecordStatus;
(function (DutyRecordStatus) {
    DutyRecordStatus["Pending"] = "Pending";
    DutyRecordStatus["Approved"] = "Approved";
    DutyRecordStatus["Declined"] = "Declined";
    DutyRecordStatus["Void"] = "Void";
})(DutyRecordStatus || (exports.DutyRecordStatus = DutyRecordStatus = {}));
//# sourceMappingURL=index.js.map