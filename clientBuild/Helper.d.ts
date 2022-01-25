export declare type DeviceType = 'phone' | 'tablet' | 'desktop';
export declare type Orientation = 'vertical' | 'horizontal';
export declare class Device {
    static isPhone(): boolean;
    static isTabletOrPhone(): boolean;
    static getType(): DeviceType;
    static getOrientation(): Orientation;
}
