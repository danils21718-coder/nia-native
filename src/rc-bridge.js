import { Purchases, STOREKIT_VERSION } from '@revenuecat/purchases-capacitor';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AdMob } from '@capacitor-community/admob';
window.NiaPurchases = Purchases;
window.NiaStoreKit = STOREKIT_VERSION;
window.NiaNotif = LocalNotifications;
window.NiaAdMob = AdMob;
