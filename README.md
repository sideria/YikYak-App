# YikYak FrontEnd

**No Internet. No Servers. No Login. Just Vibes.**

This is a peer-to-peer (P2P) mesh messaging application that works completely offline. It uses **Bluetooth Low Energy (BLE)** to create a local network, allowing devices to chat anonymously without Wi-Fi or cellular data.






## Features

* **100% Offline:** Zero dependency on ISPs or servers.
* **Bluetooth Mesh:** Messages hop between devices to extend range.
* **Anonymous:** No sign-ups, no profiles, just an ID.
* **Minimalist UI:** High-contrast, distraction-free "YikYak" aesthetic.
* **Battery Efficient:** Optimized for BLE Low Latency.

##  How It Works

1.  **Advertise:** Your phone broadcasts a unique "Service UUID" via Bluetooth.
2.  **Scan:** It simultaneously listens for other phones broadcasting the same ID.
3.  **Connect:** When two phones find each other, they form a direct GATT link.
4.  **Sync:** Messages are flooded across the network instantly.

## Preview

![Safety Image](https://raw.githubusercontent.com/sideria/YikYak-App/main/src/pages/Sign-Up-Page.jpg)
![Boards Image](https://raw.githubusercontent.com/sideria/YikYak-App/main/src/pages/Boards.jpg)
![Sign-Up-Page Image](https://raw.githubusercontent.com/sideria/YikYak-App/main/src/pages/Safety.jpg)







## Installation

1.  Go to the **[Releases](../../releases)** page.
2.  Download the latest `YikYakFE.apk`.


##  Tech Stack

* **Vite**
* **TypeScript**
* **React**
* **Tailwind CSS**
* **shadcn-ui**

---
*Built for the FAIL.EXE Hackathon 2026.*
