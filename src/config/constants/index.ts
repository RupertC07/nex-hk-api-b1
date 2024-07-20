export enum UserRole {
    Admin = 'admin',
    Coordinator = 'coordinator',
    Scholar = 'scholar',
    QrHolder = 'qr_holder',
}

export enum QrType {
    Regular = 'Regular',
    Special = 'Special',
    Custom = 'Custom',
}

export enum LogsStatus {
    Success = 'Success',
    Failed = 'Failed',
}

export enum SemStatus {
    Active = 'Active',
    Inactive = 'Inactive',
}

export enum SemTerm {
    First = 'First',
    Second = 'Second',
}

export enum HkType {
    HK100 = 'HK100',
    HK75 = 'HK75',
    HK50 = 'HK50',
    HK25 = 'HK25',
}

export enum DutyRecordStatus {
    Pending = 'Pending',
    Approved = 'Approved',
    Declined = 'Declined',
    Void = 'Void',
}
