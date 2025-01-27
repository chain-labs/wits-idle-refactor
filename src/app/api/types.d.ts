export interface Materials {
    common: number;
    uncommon: number;
    rare: number;
    legendary: number;
    mythic: number;
  }
  
  export interface ShippingDetails {
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    province: string;
    postalCode: string;
    optional: string;
    rewardId: string;
  }
  
  export interface Reward {
    rewardId: string;
    rewardImageUrl: string;
    rewardName: string;
    dateTimeInSecs: number;
    rewardRarity: string;
  }