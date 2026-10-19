import { Purchases, STOREKIT_VERSION } from '@revenuecat/purchases-capacitor';
import { LocalNotifications } from '@capacitor/local-notifications';
window.NiaPurchases = Purchases;
window.NiaStoreKit = STOREKIT_VERSION;
window.NiaNotif = LocalNotifications;
